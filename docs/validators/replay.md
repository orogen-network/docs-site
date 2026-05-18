# Replay sampling

Validators sample ≥10% of inferences per epoch and replay them on independent hardware.

## Selection (RFC-0006)

Commit-reveal randomness:

1. Per epoch, each validator commits `H_i = BLAKE2(secret_i)`.
2. One epoch later, each reveals `secret_i`. Defectors lose one epoch's emissions; 2nd offense loses permit.
3. `epoch_random = XOR(all revealed secrets)`.
4. Per-receipt sample selection: stake-weighted Fisher-Yates seeded by `BLAKE2(epoch_random || receipt_merkle_root || batch_id)`.

## Replay process

For each sampled receipt:

1. Pull receipt blob from `chain-indexer` or operator's pinned URL.
2. Re-fetch `(model, adapter)` from `pallet-model-registry` content-addressed URLs.
3. Replay using exact environment (`model_weight_hash`, `kernel_pack_hash`, `gpu_model`, `driver_version`, `cuda_version`).
4. Compare `response_hash` and `log_probs_sample` per-tier float ε.
5. Mismatch → submit slashing extrinsic (RFC-0005).

## Sample rate by tier

| Tier | Min sample |
|---|---|
| dc-premium | 10% |
| dc-standard | 10% |
| cloud-rented | 15% |
| prosumer | 25% |

## Independence requirement

A validator's worker pool must be **independent of the operator being audited**. Otherwise a colluding validator could pass everything. The `validator-watcher` flags subnet correlation between validator + operator and reduces the validator's score weight.
