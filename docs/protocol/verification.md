# Verification stack

Verifiable inference is not one mechanism. Orogen layers eight, so a defect in
any single layer does not silently degrade the whole network. Layers compound:
TEE attestation answers "what binary ran on what hardware"; deterministic
kernels answer "did the same inputs produce the same outputs"; validator
replay answers "did this operator actually do the work".

## In this section

- [Pallets](/protocol/pallets) — where each layer lands on chain.
- [RFC-0001](/protocol/rfcs/0001) — the receipt that ties every layer together.
- [RFC-0002](/protocol/rfcs/0002) — multi-vendor attestation report.
- [RFC-0006](/protocol/rfcs/0006) — sampling randomness for replay.

## The eight layers

| # | Layer | What it answers | Status at TGE |
| --- | --- | --- | --- |
| L1 | **GPU device certificate + stake binding** | Hardware-rooted identity. Same `device_cert` across coldkeys → both slashed 100% (red-team rule 7). | Required. |
| L2 | **Multi-vendor TEE** — Intel TDX, AMD SEV-SNP, NVIDIA H100/H200/B200 CC | What binary, what firmware, what GPU, attested by a vendor PKI. | Required at `dc-*` and `cloud-rented` tiers. |
| L3 | **Deterministic kernels** — SGLang det-mode, batch-invariant kernels | Same `(model, adapter, prompt, seed)` produces a byte-identical response, enabling cheap replay. | Required at `dc-*`; best-effort below. |
| L4 | **Stake-weighted validator sampling** — Yuma | ≥10% of jobs replayed on independent hardware. Per-detection slashing (RFC-0005). | Required. |
| L5 | **opML challenge window** | Optimistic-rollup-style challenge for high-value jobs only. | Phase 4 (Q3 2027). |
| L6 | **zkML small heads** | Zero-knowledge proofs for moderation, routing, classification heads where they are cheap. | Opt-in at `embed-only`. |
| L7 | **cuPOW kernel** | Compute-bound proof-of-work that monetises idle Hopper-class GPUs into the 5% optional emission lane. | Deferred to Q4 2028. |
| L8 | **Watermarks** | Output provenance — Orogen-marked generations identifiable downstream. | Best-effort. |

## What we explicitly do not claim

- Protection against silicon-undisclosed side channels (Hopper unencrypted
  NVLink, BAR0 register leakage, bimodal timing channels). Operators acknowledge
  these in ToS. Mitigation for confidential workloads: B200/B300, encrypted
  NVLink. See [RFC-0002](/protocol/rfcs/0002).
- Bit-identical determinism for non-deterministic kernel paths. The pallet
  permits a per-tier `log_probs` ε to absorb floating-point drift below the
  faultable threshold; over ε is `LogProbDrift` and is slashable at 2%.

## Where each layer lands on chain

| Layer | Pallet |
| --- | --- |
| L1, L2 | `pallet-attestation-registry` + `pallet-operator-stake` |
| L3 | enforced off-chain; mismatch surfaces via L4 |
| L4 | `pallet-yuma-consensus` + `pallet-slashing` |
| L5 | `pallet-slashing` (challenge window extension) |
| L6 | `pallet-job-market` (proof attached to receipt) |
| L7 | `pallet-pouw-mint` |
| L8 | off-chain, customer-side verification |

The receipt format ([RFC-0001](/protocol/rfcs/0001)) carries the hashes that
every layer signs against: `model_weight_hash`, `kernel_pack_hash`,
`attestation_report_hash`, `gpu_model`, `driver_version`, `cuda_version`. A
validator with an independent operator pool can reconstruct the environment
exactly from those fields and replay.
