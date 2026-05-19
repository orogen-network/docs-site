# Forge testnet

Forge is the public Orogen testnet. A foundation-run seed validator on the
edge VM produces blocks every six seconds; anyone can connect to it for
RPC, WebSocket subscriptions, or libp2p peering — no allow-list, no auth.

The chain itself is **liveness-only** today: the runtime pallets compile
and dispatch correctly, but the economic logic (BME settlement, Yuma
aggregation, slashing severity) is still skeleton code awaiting the
multi-firm audit and the chain-engineering hire wave. Treat Forge as a
chain you can build wallet tooling, explorers, indexers, and SDK
integrations against, **not** as a chain that prices inference or pays
operators. Mainnet TGE follows audits; see [Roadmap](/start/roadmap).

## Public endpoints

| Use | URL |
|---|---|
| HTTPS JSON-RPC (read-only) | `https://forge-rpc.orogen.network` |
| HTTPS + WSS JSON-RPC (Polkadot.js, subxt, explorer) | `https://chain.orogen.network` · `wss://chain.orogen.network` |
| libp2p bootnode (IPv6 only) | `/ip6/2a01:240:ad00:2502:3:a68c:1ab2:1861/tcp/30333/p2p/12D3KooWQdR4TD9JEDkim5nKsETDhS3guQVR1U5s1S6JMefVMSn8` |

The RPC server is started with `--rpc-methods Safe`, so unsafe methods
(`author_*` write paths, `system_addReservedPeer`, etc.) are rejected.
Use a self-hosted full node if you need them.

The libp2p endpoint requires IPv6 connectivity — the seed VM has no
publicly-routed IPv4 for non-HTTP transports.

## Chain identity

| Field | Value |
|---|---|
| `name` | `Orogen Forge Testnet` |
| `id` | `orogen_forge` |
| `chainType` | `Live` |
| `protocolId` | `orogenforge` |
| Token | `OROG`, 12 decimals |
| ss58 prefix | `42` |
| Genesis hash | `0x78f3de354670b9080a9d1c92cfe0413765a7a42f073bd7dfa51b4d5219cd003d` |

## Quick checks

```sh
# Identity
curl -s https://forge-rpc.orogen.network \
  -H 'Content-Type: application/json' \
  -d '{"jsonrpc":"2.0","method":"system_chain","params":[],"id":1}'
# → {"jsonrpc":"2.0","id":1,"result":"Orogen Forge Testnet"}

# Health
curl -s https://forge-rpc.orogen.network \
  -H 'Content-Type: application/json' \
  -d '{"jsonrpc":"2.0","method":"system_health","params":[],"id":1}'

# Latest finalized head
curl -s https://forge-rpc.orogen.network \
  -H 'Content-Type: application/json' \
  -d '{"jsonrpc":"2.0","method":"chain_getFinalizedHead","params":[],"id":1}'
```

## Connect with Polkadot.js

```ts
import { ApiPromise, WsProvider } from "@polkadot/api";

const api = await ApiPromise.create({
  provider: new WsProvider("wss://chain.orogen.network"),
});

console.log("connected to:", (await api.rpc.system.chain()).toString());
console.log("genesis:", api.genesisHash.toHex());
```

## Connect with subxt (Rust)

```rust
use subxt::{OnlineClient, PolkadotConfig};

let api = OnlineClient::<PolkadotConfig>::from_url("wss://chain.orogen.network").await?;
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

# Sync from the seed (read-only, no validator key).
./target/release/chain-node \
  --chain forge \
  --base-path ~/.local/share/orogen-forge \
  --name my-forge-node \
  --bootnodes /ip6/2a01:240:ad00:2502:3:a68c:1ab2:1861/tcp/30333/p2p/12D3KooWQdR4TD9JEDkim5nKsETDhS3guQVR1U5s1S6JMefVMSn8 \
  --rpc-port 9944 \
  --port 30333
```

Once the local node is syncing you can verify the genesis matches:

```sh
curl -s http://127.0.0.1:9944 \
  -H 'Content-Type: application/json' \
  -d '{"jsonrpc":"2.0","method":"chain_getBlockHash","params":[0],"id":1}'
# → 0x78f3de354670b9080a9d1c92cfe0413765a7a42f073bd7dfa51b4d5219cd003d
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
