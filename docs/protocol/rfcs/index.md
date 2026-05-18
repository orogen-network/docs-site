# Protocol RFCs

The ten RFCs below define every on-chain type, extrinsic, and protocol contract
that the chain, the runtime, and the off-chain services agree on. They are
versioned: a breaking change requires lead-of-leads sign-off and a
compatibility-test bump.

## In this section

The "Source" column points at the canonical specification in the monorepo;
the per-RFC pages below summarise it for readers without duplicating it.

| RFC | Topic | Status | Owner | Source |
| --- | --- | --- | --- | --- |
| [RFC-0001](/protocol/rfcs/0001) | Signed response receipt format | Live on Forge · ratification pending audit | Verification Lead | [spec](https://github.com/orogen-network/chain-tooling-rust/blob/main/specs/RFC-0001-receipt-format.md) |
| [RFC-0002](/protocol/rfcs/0002) | Multi-vendor attestation report | Live on Forge · ratification pending audit | Security Lead | [spec](https://github.com/orogen-network/chain-tooling-rust/blob/main/specs/RFC-0002-attestation-report.md) |
| [RFC-0003](/protocol/rfcs/0003) | Heartbeat schema | Draft | Serving Lead | [spec](https://github.com/orogen-network/chain-tooling-rust/blob/main/specs/RFC-0003-heartbeat-schema.md) |
| [RFC-0004](/protocol/rfcs/0004) | Batch settlement format | Draft | Pallet Lead | [spec](https://github.com/orogen-network/chain-tooling-rust/blob/main/specs/RFC-0004-batch-settlement.md) |
| [RFC-0005](/protocol/rfcs/0005) | Slashing extrinsic ABI | Draft | Pallet Lead + Verification Lead | [spec](https://github.com/orogen-network/chain-tooling-rust/blob/main/specs/RFC-0005-slashing-extrinsic.md) |
| [RFC-0006](/protocol/rfcs/0006) | Sampling randomness | Draft | Verification Lead | [spec](https://github.com/orogen-network/chain-tooling-rust/blob/main/specs/RFC-0006-sampling-randomness.md) |
| [RFC-0007](/protocol/rfcs/0007) | Customer nonce protocol | Draft | Gateway Lead + DevEx | [spec](https://github.com/orogen-network/chain-tooling-rust/blob/main/specs/RFC-0007-nonce-protocol.md) |
| [RFC-0008](/protocol/rfcs/0008) | Oracle feed | Draft | Tokenomics Lead | [spec](https://github.com/orogen-network/chain-tooling-rust/blob/main/specs/RFC-0008-oracle-feed.md) |
| [RFC-0009](/protocol/rfcs/0009) | Operator registration | Draft | Pallet Lead + Security Lead | [spec](https://github.com/orogen-network/chain-tooling-rust/blob/main/specs/RFC-0009-operator-registration.md) |
| [RFC-0010](/protocol/rfcs/0010) | RPC endpoint contract | Draft | DevOps + Foundation | [spec](https://github.com/orogen-network/chain-tooling-rust/blob/main/specs/RFC-0010-rpc-endpoint-contract.md) |

## Planned RFCs (stubs)

The slots below are reserved for contracts that follow the next runtime
phases. They are listed here so the gap is explicit, not so the gap is
hidden.

| Planned RFC | Topic | Owner |
| --- | --- | --- |
| RFC-0011 | Adapter / LoRA publishing and royalty contract | Adapter Lead |
| RFC-0012 | opML challenge window extension to slashing | Verification Lead |
| RFC-0013 | zkML small-head proof attachment to receipt | Verification Lead |
| RFC-0014 | cuPOW kernel and proof submission | Pallet Lead |
| RFC-0015 | Cross-chain bridge ABI (Snowbridge fork) | Bridge Lead |

If you need a contract that isn't listed, open a discussion on the monorepo.

## Versioning and breaking changes

- Backwards-compatible changes (new optional fields, additive extrinsics):
  patch-version bump on the RFC, no chain upgrade required.
- Backwards-incompatible changes (renamed field, type change, removed
  extrinsic): minor-version bump on the RFC, runtime upgrade required, audit
  gate triggered if the change touches `pallet-bme`, `pallet-slashing`, or
  `pallet-attestation-registry`.
- Major versions (v2.0+): require pre-announced deprecation of v1 endpoints
  with a minimum 90-day overlap so SDKs and integrators can migrate.
