# Architecture summary

```
                    +-----------------------+
                    |  Customer (any tier)  |
                    +----------+------------+
                               |
                               v
                    +-----------------------+        +----------------------+
                    |  Gateway / Router     |<------>|  Billing bridge      |
                    |  (LiteLLM front)      |        |  (Stripe / x402)     |
                    +----------+------------+        +----------------------+
                               |
            +------------------+------------------+
            |                                      |
            v                                      v
   +-----------------+                +-----------------+
   |  Operator(s)    |                |  Validator(s)   |
   |  vLLM/SGLang    |                |  replay sampler |
   |  TEE attested   |                |  Yuma scoring   |
   +--------+--------+                +--------+--------+
            |                                  |
            v                                  v
                +---------------------------------+
                |  Chain (Substrate)              |
                |  pallet-{model-registry,        |
                |   operator-stake, job-market,   |
                |   yuma-consensus, bme,          |
                |   slashing, pouw-mint,          |
                |   attestation-registry,         |
                |   oracle-twap, nonce-vault,     |
                |   treasury-ext}                 |
                +---------------------------------+
                                |
                                v
                +---------------------------------+
                |  Explorer · Subsidy dashboard   |
                |  Indexer (Subsquid)             |
                +---------------------------------+
```

## Verification stack (8 layers)

1. **GPU device certificate + stake binding** — hardware-rooted identity. Same device cert across coldkeys → both slashed 100%.
2. **TEE attestation** — Intel TDX + AMD SEV-SNP + NVIDIA H100/H200/B200 CC. Multi-vendor mandatory at launch.
3. **Deterministic kernels** — SGLang det-mode + batch-invariant kernels. Enables cheap replay.
4. **Stake-weighted validator sampling** — Yuma. ≥10% sample rate floor (red-team rule 2). Per-detection slashing.
5. **opML challenge window** — high-value jobs only (Phase 4).
6. **zkML** — small heads (moderation, routing, classification).
7. **cuPOW kernel** — minting only (5% supply, optional, deferred to Q4 2028).
8. **Watermarks** — output provenance.

## Off-chain services

- **Worker daemon** (`infer-worker-vllm`) — primary; vLLM V1 plugin shim.
- **Gateway / Router** — OpenAI-compatible; routes by capability + tier + latency + price.
- **Validator network** — replay sampling, Yuma scoring, slashing evidence submission.
- **Attestation service** — multi-vendor PKI aggregator; produces combined signed reports.
- **Weight CDN** — content-addressed; triple-source (S3 + R2 + IPFS).

## Tokenomics summary

- **OROG** — native token. Required to burn for any paid inference.
- **CUC** — non-transferable, account-soulbound compute credit. Minted on burn.
- **BME** — burn-mint equilibrium. Year 1 cap 8% supply, Year 2 4%, Year 3+ demand-elastic (180-day rolling cap).
- **Split** — 75% operator / 15% verification / 5% treasury / 5% governance.
- **Subsidy target** — Y1 <2×, Y2 <1.2×, Y3 <1×.
