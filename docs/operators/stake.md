# Stake + slashing

## Stake denomination

OROG with USD-pegged ratchet via governance every 30 days. The ratchet adjusts the required token amount as OROG price moves so the USD-equivalent floor stays stable.

## Floor stakes by tier

| Tier | Floor (USD equivalent) |
|---|---|
| dc-premium | $5K |
| dc-standard | $2K |
| cloud-rented | $1K |
| prosumer | $500 |
| edge | $100 |
| embed-only | $50 |

## Slashing severities

| Fault | Severity |
|---|---|
| WrongModel / QuantizationSwap / ValidatorCollusion / BatchOvercommit | 10% |
| WrongResponse / CacheReplay | 5% |
| LogProbDrift / AttestationStale | 2% |
| KernelPackMismatch | 0.5% |
| DeviceCertCollision / SanctionsHit | 100% |
| FakeBurn | 50% |
| HeartbeatMiss | soft (emission decay only) |

## Caps

- Single-incident: 10%
- Daily: 30%
- Monthly: 50%

Circuit breaker pauses pallet-slashing if network-wide slashing exceeds 3× rolling baseline.

## Dispute path

7 days to file, 28 days total resolution, sortition panel of 3 operators, 5-of-7 multisig ratification. See [Disputes + arbitration](/governance/disputes).

## Re-registration after slash

6mo cooldown + new coldkey + fresh sanctions screen. Permanent ban for `SanctionsHit` and `DeviceCertCollision`.
