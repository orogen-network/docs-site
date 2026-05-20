# Slashing economics

Slashing is the only mechanism by which OROG leaves operator hands outside
voluntary unbonding. It is per-detection, bounded per incident, and disputable;
it is also pallet-enforced — governance cannot override the math (red line #16).
For the on-chain extrinsic shape, see [RFC-0005](/protocol/rfcs/0005).

## In this section

- [Operators — stake + slashing](/operators/stake) — operator-facing summary.
- [Disputes + arbitration](/governance/disputes) — the 28-day resolution path.
- [Burn-and-mint loop](/tokenomics/bme) — where the burned stake lands.
- [Emission rule](/tokenomics/emission) — the mint side.

## Severities at a glance

| Fault | Severity | Notes |
| --- | --- | --- |
| `WrongModel`, `QuantizationSwap`, `ValidatorCollusion`, `BatchOvercommit` | 10% | Per-detection — 100 cheats are 100 slash events. |
| `WrongResponse`, `CacheReplay` | 5% | Replay mismatch beyond per-tier ε. |
| `LogProbDrift`, `AttestationStale` | 2% | Below-threshold drift; stale attestation past 7-day grace. |
| `KernelPackMismatch` | 0.5% | Wrong kernel pack hash — usually misconfiguration. |
| `FakeBurn` | 50% | Gateway-corroborated only. |
| `DeviceCertCollision`, `SanctionsHit` | 100% | No dispute path; permanent ban (DECISIONS H14). |
| `HeartbeatMiss` | soft | Emission decay only; not a stake slash. |

## Caps

- **Single incident:** 10% maximum (excludes the 50%/100% no-dispute codes).
- **Daily:** 30%.
- **Monthly:** 50%.
- **Circuit breaker:** if network-wide slashing exceeds 3× rolling baseline,
  `pallet-slashing` enters paused state. Resume requires 5-of-7 multisig +
  2-day public delay.

## Where the slashed stake goes

1. **T+0 — escrow.** Slashing extrinsic moves stake to a pallet-owned escrow
   account, not to the slasher. The `Slashing` event is emitted.
2. **T+7d — dispute window.** Operator may file a dispute by posting 10% of the
   slash as bond.
3. **T+14d — sortition.** Three-operator panel selected from the top 50 stake,
   excluding the slashed operator, the slashing validator, and any same-coldkey
   cluster. Each panellist posts 1% stake bond.
4. **T+21d — panel vote.** 2-of-3 votes `uphold`, `overturn`, or `insufficient`.
5. **T+28d — execution.** 5-of-7 foundation council ratifies the panel
   decision. If upheld, escrow → burned (i.e. OROG supply contracts). If
   overturned, escrow returns to the operator, dispute bond returns, the
   slashing validator's Yuma weight is reduced, and panellists' bonds return
   plus a small bounty.

## Asymmetric outcomes

- **Upheld slash.** Stake burned. The burned stake is destroyed — it does not
  go to the slasher and does not increase the mint headroom. The burn is
  observable in the supply chart but is not part of the BME burn aggregate
  (which is customer-side only).
- **Bad-faith dispute.** Additional 25% slash on the dispute filer. Anti-frivolous.
- **False watcher claim.** Watcher bond burned on first offence; bond × 10
  plus permanent ban on second.

## Why per-detection rather than per-epoch

A per-epoch slash is bounded by what the operator can do in an epoch, which is
arbitrarily small. A per-detection slash is bounded by the operator's bond.
For an adversary running 100 small cheats hoping the aggregate severity stays
below threshold, per-detection slashing makes the expected cost rise linearly
in the number of cheats, not in the share of stake at risk per epoch. See
[RFC-0005](/protocol/rfcs/0005) design rule 1.
