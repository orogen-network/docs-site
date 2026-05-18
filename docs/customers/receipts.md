# Receipts (RFC-0001)

Every inference returns a signed response receipt:

```
{
  "version": 1,
  "job_id": "0x...",
  "operator_id": "5DfhG...",
  "model_id": "0x...",
  "model_weight_hash": "0x...",
  "customer_nonce": "0x...",
  "request_hash": "0x...",
  "response_hash": "0x...",
  "kv_metadata": { "prefix_hint": "0x...", "cache_hit": true, "kv_blocks_used": 42 },
  "kernel_pack_hash": "0x...",
  "gpu_model": "H100-SXM-80GB",
  "driver_version": "550.54",
  "cuda_version": "12.4",
  "attestation_report_hash": "0x...",
  "timestamp_ms": 1700000000000,
  "gateway_id": "5DfhG...",
  "operator_signature": "..."
}
```

## How verification works

Two paths:

1. **Client-side (best-effort)** — your SDK checks signature format, attestation freshness, nonce uniqueness, and (if configured) model-registry membership.
2. **On-chain (authoritative)** — validators sample ≥10% of receipts per epoch (RFC-0006 sampling), replay with deterministic kernels (RFC-0003), and submit slashing extrinsics on mismatch (RFC-0005).

The operator stakes OROG to participate; mismatch leads to per-detection slash up to 10% per incident.

## See also

- [RFC-0001 — Signed response receipt format](https://github.com/orogen-network/chain-tooling-rust/blob/main/specs/RFC-0001-receipt-format.md)
- [RFC-0006 — Sampling randomness](https://github.com/orogen-network/chain-tooling-rust/blob/main/specs/RFC-0006-sampling-randomness.md)
