# Operators

Operators serve inference and receive OROG settlement via the burn-and-mint
loop. Payouts are USD-denominated at the oracle TWAP: the chain mints the OROG
quantity that clears at the customer's burn price, capped by the per-epoch
headroom.

The operator's job, at the protocol level, is to keep an attested worker
daemon online, route by capability and tier, emit signed receipts, and stay
inside the per-tier verification SLA (sample rate, latency, replay match-rate).
Failure modes are bounded — per-detection slashing with a dispute window —
not catastrophic.

## In this section

- [Tiers + hardware](/operators/tiers) — the six-tier matrix from `dc-premium`
  through `embed-only`, with verification requirements per tier.
- [Onboarding](/operators/onboarding) — the manual `wallet-cli` path against
  the live Forge testnet (and the forthcoming 1-click wizard).
- [Attestation](/operators/attestation) — multi-vendor TEE quote production
  and the 7-day re-attestation cadence (RFC-0002).
- [Stake + slashing](/operators/stake) — bond requirements, severities, caps,
  and dispute path.

## Settlement Mechanics

- **Per-job settlement.** The runtime applies the protocol split only after
  routed work is served and verified.
- **Oracle-priced accounting.** Burn-and-mint quantities are computed at the
  oracle TWAP for the finalized job.
- **Reputation that affects routing.** The Yuma scoring vector folds into the
  gateway's routing decision alongside tier, latency, and verification state.
- **Optional cuPOW lane** (deferred to Q4 2028) remains a separate protocol
  work lane for Hopper-class GPUs.

## What you need

| Floor | Requirement |
| --- | --- |
| Stake bond | $2K–$5K USD-equivalent OROG, with a 30-day USD-pegged ratchet via governance. |
| Attestation | Multi-vendor TEE quote at registration, refreshed every 7 days for `dc-*` and `cloud-rented` tiers. Stake-only for `prosumer`/`edge`. |
| Hotkey + coldkey | `wallet-cli` generates both; coldkey is the economic identity, hotkey signs receipts. |
| Sanctions screening proof | Required at registration ([RFC-0009](/protocol/rfcs/0009)). |
| Geographic / IP diversity | IP /24 collisions are flagged; cluster ratios above threshold block registration. |

## Honest tier self-declaration

Tier is self-declared at registration. The validator-watcher pool probes
uptime, latency, and verification SLA for 7 days; misclassification is a
slash event plus auto-downgrade. If your hardware cannot pass the verification
matrix for `dc-premium`, register as the highest tier you can actually serve —
you keep your bond and your reputation.

## Registration Path

- **Forge testnet (live):** operator registration is open now via the manual
  `wallet-cli` path (a 1-click [onboarding wizard](/operators/onboarding) is
  forthcoming). Fund a hotkey from the public faucet, then
  `wallet-cli register-operator` against `wss://forge-rpc.orogen.network`.
- **Mainnet TGE:** mainnet opens to vetted operators after the multi-firm
  audit clears.
- **Permissionless:** open registration follows TGE, gated on the Day-30 KPIs.
  Stake-concentration and IP-diversity rules apply to every registration path.
