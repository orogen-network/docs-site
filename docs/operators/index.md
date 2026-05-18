# Operators

Operators serve inference and earn OROG via the burn-and-mint loop. Payouts
are USD-denominated at the oracle TWAP, not yield-of-token speculation: the
chain mints the OROG quantity that clears at the customer's burn price, capped
by the per-epoch headroom.

The operator's job, at the protocol level, is to keep an attested worker
daemon online, route by capability and tier, emit signed receipts, and stay
inside the per-tier verification SLA (sample rate, latency, replay match-rate).
Failure modes are bounded — per-detection slashing with a dispute window —
not catastrophic.

## In this section

- [Tiers + hardware](/operators/tiers) — the six-tier matrix from `dc-premium`
  through `embed-only`, with verification requirements per tier.
- [Onboarding](/operators/onboarding) — the 1-click wizard on Forge testnet
  and the manual `wallet-cli` path.
- [Attestation](/operators/attestation) — multi-vendor TEE quote production
  and the 7-day re-attestation cadence (RFC-0002).
- [Stake + slashing](/operators/stake) — bond requirements, severities, caps,
  and dispute path.

## What you get

- **75% of per-job emission.** The largest operator share in the category —
  Bittensor SN3 pays 41% to its analogue role.
- **USD-denominated payouts via burn-and-mint.** The chain mints the OROG
  amount that matches the customer-side USD burn at the oracle TWAP.
- **Reputation that affects routing.** The Yuma scoring vector folds into the
  gateway's routing decision; consistent operators get preferential routing
  within tier.
- **Optional cuPOW lane** (deferred to Q4 2028) as a separate 5% supply
  emission for Hopper-class GPUs.

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

## How registration works today

- **Forge testnet:** foundation-vetted operators register through the
  [onboarding wizard](/operators/onboarding) or the manual `wallet-cli` path.
- **Mainnet TGE:** mainnet opens to vetted operators after the multi-firm
  audit clears.
- **Permissionless:** open registration follows TGE, gated on the Day-30 KPIs
  in plan §10.4. Stake-concentration and IP-diversity rules apply to every
  registration path.
