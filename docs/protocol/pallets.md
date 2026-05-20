# Pallets

The runtime composes eleven FRAME pallets. Each one owns a narrow contract;
cross-pallet coordination happens through events and explicit hook calls, never
through shared mutable state. The Cargo workspace lives under
[`pallet-suite/`](https://github.com/orogen-network/pallet-suite).

## In this section

- [Verification stack](/protocol/verification) — the eight verification layers
  that feed these pallets.
- [RFCs](/protocol/rfcs/) — the type contracts.
- [Tokenomics](/tokenomics/) — what `pallet-bme` and `pallet-pouw-mint` enforce.

## The eleven

| Pallet | Owns | Key extrinsics |
| --- | --- | --- |
| `pallet-model-registry` | Base models + LoRA adapters + licence + royalty config (RFC-0011) | `register_model`, `register_adapter`, `set_royalty` |
| `pallet-operator-stake` | Operator registry, bond, hotkey rotation, on-chain heartbeats (RFC-0009, RFC-0003) | `register_operator`, `bond_more`, `unbond`, `heartbeat` |
| `pallet-job-market` | Job lifecycle state machine (queue → assigned → settled → disputed) | `submit_job`, `assign_job`, `settle_batch` |
| `pallet-yuma-consensus` | Governed validator admission, top-K permits, stake-weighted scoring with median clipping | `add_validator`, `remove_validator`, `update_validator_stake`, `rotate_permits`, `submit_weights`, `compute_epoch_incentives` |
| `pallet-bme` | Burn-and-mint equilibrium; per-epoch mint headroom; oracle binding | `burn`, `mint_to_operator`, `update_cap` |
| `pallet-slashing` | Per-detection slashing with escrow, dispute, and circuit breaker (RFC-0005) | `report`, `open_dispute`, `ratify`, `pause` |
| `pallet-pouw-mint` | Optional cuPOW emission lane — deferred to Q4 2028 | `submit_pow`, `claim` |
| `pallet-attestation-registry` | Multi-vendor TEE quotes + CRL (RFC-0002) | `submit_report`, `revoke`, `rotate_crl` |
| `pallet-oracle-twap` | 4-source TWAP price oracle (RFC-0008) | `submit_price`, `freeze`, `resume` |
| `pallet-nonce-vault` | 24-hour customer nonce anti-replay window (RFC-0007) | `record_nonce` |
| `pallet-treasury-ext` | Foundation treasury, per-spend timelock, audit trail | `propose_spend`, `execute_spend` |

## Cross-pallet flow on a typical inference

1. Customer signs a request with a fresh nonce. The gateway forwards it.
2. Operator serves; emits a receipt (RFC-0001).
3. Gateway aggregates many receipts into a `SettlementBatch` (RFC-0004) and
   submits it. `pallet-job-market::settle_batch` calls `pallet-bme::burn` then
   `pallet-bme::mint_to_operator` against the epoch headroom.
4. Validators replay receipts off-chain and submit Yuma weight vectors;
   mismatches are reported through `pallet-slashing::report`.
5. `pallet-nonce-vault` records the customer nonce so the same receipt cannot
   be settled twice.

## Stability guarantee

Breaking changes to any pallet extrinsic or storage layout require an RFC bump
and lead-of-leads sign-off. Compatibility tests live alongside the
runtime; the `chain-tooling-rust` CLIs assert wire-format identity against the
codegen produced by `subxt-codegen`.

For per-pallet detail, read the source under `pallet-suite/` —
the dedicated per-pallet doc pages land alongside each pallet's v1.0
ratification.
