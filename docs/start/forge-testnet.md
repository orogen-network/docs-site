# Forge testnet

Forge is the public Orogen testnet. It is live and open to outside operators
who want to join and mine. Treat it as a **test-mode preview**: endpoints are
real and reachable, but the runtime carries the caveats in the
[Caveats](#caveats) section below — do not derive economic conclusions or
production guarantees from it.

The chain/runtime code can also be exercised entirely locally, and the
split-repo local gate is green. The production Forge milestone still requires
durable multi-validator operation, independent validator replay inputs, live
chaos drills, and audit coverage.

## Public endpoints

| Service | Endpoint | Notes |
|---|---|---|
| Chain RPC (WSS) | `wss://forge-rpc.orogen.network` | Primary node WebSocket RPC. Alias: `wss://chain.orogen.network`. |
| Inference gateway | `https://gateway.orogen.network` | OpenAI-compatible API. **Test-mode.** |
| Attestation service | `https://attestation-service.orogen.network` | Produces operator attestation reports. Uses **mock quotes** on Forge. |
| Attestation explorer | `https://attestation.orogen.network` | Browse submitted attestation reports. |
| Indexer (GraphQL) | `https://indexer.orogen.network/graphql` | Subsquid index of chain events. |
| Docs | `https://docs.orogen.network` | This site. |
| Faucet | `https://faucet.orogen.network` | Public testnet-OROG faucet. **Low-cap.** |

These are testnet services. They can be reset on a chain-spec rebuild (see
[Spec regenerability](#caveats)); when that happens the genesis hash changes
and balances are wiped.

## Chain identity

| Field | Value |
|---|---|
| `name` | `Orogen Forge Testnet` |
| `id` | `orogen_forge` |
| `protocolId` | `orogenforge` |
| Runtime spec version | `6` |
| Token | `OROG`, 12 decimals |
| ss58 prefix | `42` |
| `MinStake` | `1_000_000_000_000` plancks (= 1 OROG) |

## Get testnet OROG

Operators and integrators can request testnet OROG from the public faucet
lane:

```sh
curl -X POST https://faucet.orogen.network/drip-public \
  -H 'Content-Type: application/json' \
  -d '{"recipient":"<your-ss58-address>"}'
```

The public lane is **low-cap** (rate-limited, small drip) — enough to register
an operator and submit heartbeats, not to stress-test balances.

## Quick checks

```sh
# Chain name and runtime version over the public RPC.
curl -s https://indexer.orogen.network/graphql \
  -H 'Content-Type: application/json' \
  -d '{"query":"{ squidStatus { height } }"}'
```

## Connect with Polkadot.js

```ts
import { ApiPromise, WsProvider } from "@polkadot/api";

const url = process.env.FORGE_WS_URL ?? "wss://forge-rpc.orogen.network";
const api = await ApiPromise.create({ provider: new WsProvider(url) });

console.log("connected to:", (await api.rpc.system.chain()).toString());
console.log("genesis:", api.genesisHash.toHex());
```

## Connect with subxt (Rust)

```rust
use subxt::{OnlineClient, PolkadotConfig};

let url = std::env::var("FORGE_WS_URL")
    .unwrap_or_else(|_| "wss://forge-rpc.orogen.network".to_string());
let api = OnlineClient::<PolkadotConfig>::from_url(url).await?;
let header = api.blocks().at_latest().await?.header().clone();
println!("head #{} hash {:?}", header.number, header.hash());
```

## Run a full node against Forge

You need the `chain-node` binary built with the `dev-runtime` feature so
it knows about the `forge` chain-spec id (the production-shaped build is
intentionally strict — see
[`orogen-network/chain-node`](https://github.com/orogen-network/chain-node)
for the full toolchain recipe).

```sh
git clone https://github.com/orogen-network/chain-node.git
cd chain-node
cargo build --release --features dev-runtime

./target/release/chain-node \
  --chain forge \
  --base-path ~/.local/share/orogen-forge \
  --name my-forge-node \
  --rpc-port 9944 \
  --port 30333
```

Once the local node is syncing you can verify the genesis matches the public
RPC:

```sh
curl -s http://127.0.0.1:9944 \
  -H 'Content-Type: application/json' \
  -d '{"jsonrpc":"2.0","method":"chain_getBlockHash","params":[0],"id":1}'
# Compare with the genesis returned by wss://forge-rpc.orogen.network.
```

If you see a different genesis hash, your local runtime WASM is at a
different `pallet-suite` SHA than the seed; rebuild against
[`pallet-suite`](https://github.com/orogen-network/pallet-suite) `main`.

## Caveats

- **Test-mode gateway.** `gateway.orogen.network` runs in test mode. Routing,
  pricing, and settlement are exercised end-to-end but are not production
  guarantees.
- **Mock attestation quotes.** The attestation service issues mock TEE quotes
  on Forge. On-chain attestation hashes are accepted but not yet hardware-validated.
- **Low-cap faucet.** The public faucet drip is small and rate-limited.
- **Foundation validators.** Block production and GRANDPA finality currently
  depend on two foundation-run authorities. If the foundation validator set
  stalls, the network stalls. Independent validator expansion remains part of
  the Forge hardening path.
- **Skeleton pallet logic.** The runtime API is wired and dispatchables
  accept signed extrinsics, but the math inside `pallet-bme`,
  `pallet-yuma-consensus`, `pallet-slashing`, `pallet-attestation-registry`
  and `pallet-oracle-twap` is placeholder code. Do not derive economic
  conclusions from on-chain state.
- **Spec regenerability.** The raw chain-spec is byte-deterministic given
  the same `pallet-suite` SHA. If we bump `pallet-suite` and rebuild, the
  genesis hash changes and balances reset; the public endpoints are reset on
  the next cycle entry in [HANDOFF](https://github.com/orogen-network/orogen-coordination/blob/main/HANDOFF.md).

For the full operational record (keystore layout, systemd unit, ufw
rules), see the [seed node spec README](https://github.com/orogen-network/chain-node/blob/main/specs/orogen-forge.README.md).
