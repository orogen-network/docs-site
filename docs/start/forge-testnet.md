# Forge testnet

Forge is the planned public Orogen testnet. In the current split-repo state,
do not treat any public RPC, WebSocket, GraphQL, gateway, validator, or
operator endpoint as live unless the coordination handoff explicitly says so.

The chain/runtime code can be exercised locally, and the split-repo local
gate is green. The production Forge milestone still requires durable
service configuration, independent validator replay inputs, live chaos
drills, CI/CODEOWNERS, real release artifacts, and audit coverage.

## Endpoint Policy

Public endpoint tables are intentionally withheld until Forge is actually
operating. Hostnames must either serve the real service or an explicit
unavailable response; docs must not imply live chain access before that.

## Chain identity

| Field | Value |
|---|---|
| `name` | `Orogen Forge Testnet` |
| `id` | `orogen_forge` |
| `chainType` | Planned testnet |
| `protocolId` | `orogenforge` |
| Token | `OROG`, 12 decimals |
| ss58 prefix | `42` |
| Genesis hash | To be published with the signed chain spec |

## Quick checks

Quick checks will be published with the signed chain spec and public RPC
announcement.

## Connect with Polkadot.js

```ts
import { ApiPromise, WsProvider } from "@polkadot/api";

const api = await ApiPromise.create({
  provider: new WsProvider(process.env.FORGE_WS_URL),
});

console.log("connected to:", (await api.rpc.system.chain()).toString());
console.log("genesis:", api.genesisHash.toHex());
```

## Connect with subxt (Rust)

```rust
use subxt::{OnlineClient, PolkadotConfig};

let api = OnlineClient::<PolkadotConfig>::from_url(std::env::var("FORGE_WS_URL")?).await?;
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

# Sync from a published seed once Forge endpoints are announced.
./target/release/chain-node \
  --chain forge \
  --base-path ~/.local/share/orogen-forge \
  --name my-forge-node \
  --bootnodes "$FORGE_BOOTNODE" \
  --rpc-port 9944 \
  --port 30333
```

Once the local node is syncing you can verify the genesis matches:

```sh
curl -s http://127.0.0.1:9944 \
  -H 'Content-Type: application/json' \
  -d '{"jsonrpc":"2.0","method":"chain_getBlockHash","params":[0],"id":1}'
# Compare with the published genesis hash.
```

If you see a different genesis hash, your local runtime WASM is at a
different `pallet-suite` SHA than the seed; rebuild against
[`pallet-suite`](https://github.com/orogen-network/pallet-suite) `main`.

## Caveats

- **Single validator.** Block production and GRANDPA finality depend on
  one foundation-run authority. If it stalls, the network stalls.
  Multi-validator forge spec is on the post-audit roadmap.
- **Skeleton pallet logic.** The runtime API is wired and dispatchables
  accept signed extrinsics, but the math inside `pallet-bme`,
  `pallet-yuma-consensus`, `pallet-slashing`, `pallet-attestation-registry`
  and `pallet-oracle-twap` is placeholder code. Do not derive economic
  conclusions from on-chain state.
- **Spec regenerability.** The raw chain-spec is byte-deterministic given
  the same `pallet-suite` SHA. If we bump `pallet-suite` and rebuild, the
  genesis hash changes; the public endpoints will be reset on the next
  cycle entry in [HANDOFF](https://github.com/orogen-network/orogen-coordination/blob/main/HANDOFF.md).
- **No faucet yet.** The validator account is endowed at genesis; other
  accounts have zero balance. A `testnet-faucet` deployment is a
  follow-up — until then, integrations should test against zero-balance
  flows.

For the full operational record (keystore layout, systemd unit, ufw
rules), see the [seed node spec README](https://github.com/orogen-network/chain-node/blob/main/specs/orogen-forge.README.md).
