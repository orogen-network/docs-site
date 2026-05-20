# Protocol

The chain is a Substrate fork (Polkadot SDK) with Frontier EVM JSON-RPC
compatibility. 6-second blocks in the current runtime. GRANDPA finality. Aura authoring at TGE
(16–24 foundation-run validators), BABE at permissionless. The runtime
composes eleven pallets that share narrow contracts and one off-chain
service stack that does the work the chain cannot.

This section describes the on-chain surface. The off-chain surface
(gateway, worker daemons, validator replay) lives under the role-specific
sections.

## In this section

- [Pallets](/protocol/pallets) — the eleven FRAME pallets and what each one
  owns.
- [Verification stack](/protocol/verification) — the eight verification
  layers (TEE attestation, deterministic kernels, validator replay, opML,
  zkML, watermarks) and what each one answers.
- [RFCs](/protocol/rfcs/) — every cross-team integration contract.

## On-chain pallets (11)

| Pallet | Purpose |
| --- | --- |
| `pallet-model-registry` | Base models + adapters (LoRA) + licence + royalties. |
| `pallet-operator-stake` | Operator registry + staking + heartbeats. |
| `pallet-job-market` | Job lifecycle state machine. |
| `pallet-yuma-consensus` | Governed validator admission, top-K permits, and median-clipped stake-weighted scoring. |
| `pallet-bme` | Burn-and-mint equilibrium; per-epoch mint headroom; oracle binding. |
| `pallet-slashing` | Slashing + disputes + arbitration. |
| `pallet-pouw-mint` | Optional 5% emission lane (Hopper cuPOW) — deferred to Q4 2028. |
| `pallet-attestation-registry` | TEE quotes + CRL. |
| `pallet-oracle-twap` | Multi-source TWAP price oracle. |
| `pallet-nonce-vault` | Customer nonce anti-replay. |
| `pallet-treasury-ext` | Foundation treasury operations. |

See [Pallets](/protocol/pallets) for extrinsic-level detail.

## Cross-team integration RFCs

| RFC | Topic |
| --- | --- |
| [RFC-0001](/protocol/rfcs/0001) | Signed response receipt format |
| [RFC-0002](/protocol/rfcs/0002) | Multi-vendor attestation report |
| [RFC-0003](/protocol/rfcs/0003) | Heartbeat schema |
| [RFC-0004](/protocol/rfcs/0004) | Batch settlement format |
| [RFC-0005](/protocol/rfcs/0005) | Slashing extrinsic ABI |
| [RFC-0006](/protocol/rfcs/0006) | Sampling randomness |
| [RFC-0007](/protocol/rfcs/0007) | Customer nonce protocol |
| [RFC-0008](/protocol/rfcs/0008) | Oracle feed |
| [RFC-0009](/protocol/rfcs/0009) | Operator registration |
| [RFC-0010](/protocol/rfcs/0010) | RPC endpoint contract |

The canonical sources live in
[`chain-tooling-rust/specs/`](https://github.com/orogen-network/chain-tooling-rust/tree/main/specs);
the per-RFC pages in [/protocol/rfcs/](/protocol/rfcs/) summarise the contract
for readers without duplicating the spec.

## Chain parameters at TGE

| Parameter | Value |
| --- | --- |
| Block time | 6 s |
| Epoch | 360 blocks (~36 min) |
| Finality | GRANDPA |
| Authoring | Aura at TGE; BABE at permissionless |
| Validator set | 16–24 foundation-run at TGE; governed Yuma set capped at 64 in the current runtime |
| EVM | Frontier JSON-RPC, full eth_* surface |
| Cross-chain | Snowbridge fork to Ethereum (post-TGE) |

Stability guarantee: breaking changes to any pallet extrinsic or storage
layout require an RFC bump and lead-of-leads sign-off. Wire-format compat
tests run alongside the runtime.
