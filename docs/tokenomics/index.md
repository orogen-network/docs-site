# Tokenomics

Two tokens. One rule. No foundation mint discretion.

- **OROG** — native utility token. Required to burn for any paid inference.
  Listed (post-TGE), transferable, used for staking by operators and
  validators.
- **CUC** (Compute Unit Credit) — non-transferable, USD-pegged at mint,
  soulbound to the account that burned the OROG. 30-day expiry. The only
  thing that pays for inference at the gateway.

The bridge between the two is the burn-and-mint equilibrium (BME), enforced
in `pallet-bme`. There is no extrinsic that bypasses the rule. The foundation
cannot mint outside it.

## In this section

- [Burn-and-mint loop](/tokenomics/bme) — what the chain actually checks on
  each settlement batch (RFC-0004), and the asymmetric outcomes when OROG
  appreciates vs depreciates between burn and mint.
- [Emission rule](/tokenomics/emission) — the per-epoch mint formula, the
  bootstrap caps, the demand-elastic regime, and the hard ceiling / floor.
- [Slashing economics](/tokenomics/slashing) — what happens to slashed stake,
  how disputes resolve, and why per-detection rather than per-epoch.

## The loop

```
Customer USD --burn at oracle TWAP--> CUC minted (non-transferable, 30d expiry)
                                       |
                                       v
                          inference served by operator
                                       |
                                       v
        CUC consumed --pallet-bme--> OROG minted to operator
                                     (split 75 / 15 / 5 / 5)
```

## Allocation

| Pool | Share | Vesting |
| --- | --- | --- |
| Mining / emission pool | 40% | Long-term, capped by the per-epoch rule. |
| Investors (seed + Series A) | 12% | 4-year cliff + 4-year linear. |
| Team + advisors | 12% | 4-year cliff + 4-year linear. |
| Treasury (foundation) | 10% | DAO-controlled. |
| Ecosystem / grants | 8% | DAO-controlled. |
| Provider bootstrap | 8% | 24-month emission ramp. |
| Public / community | 5% | Unlocked at TGE. |
| Reserve | 5% | DAO-controlled. |

The 4-year cliff on insider allocations is unusual — investor and team
incentives don't unlock until permissionless operation has been running for
24 months past TGE. This is what makes the chain credibly distinct from the
foundation in the period when the foundation is otherwise unavoidably
load-bearing.

## Per-mint split

When `pallet-bme::mint_to_operator` fires inside a settlement batch:

| Recipient | Share |
| --- | --- |
| Operator (settling the batch) | 75% |
| Verification pool (validators + opML watchers + zkML provers) | 15% |
| Foundation treasury | 5% |
| Governance / ecosystem | 5% |

The split is hard-coded in `pallet-bme` and changes only via runtime upgrade
(audit gate, 14-day timelock, 2-day public delay).

## Emission, in one paragraph

Per-epoch mint is the minimum of the bootstrap cap (Year 1: 8%/year; Year 2:
4%/year), the rolling-90d burn multiplied by an elasticity coefficient
(default 1.0, governance-bounded `[0.8, 1.5]`), and the hard 5%/year supply
ceiling. There is a 0.5%/year floor below which mint will not fall, so the
verification slice never starves in a deep trough. See
[/tokenomics/emission](/tokenomics/emission).

## Subsidy targets

- **Year 1:** organic demand covers ≥50% of operator USD-equivalent payouts;
  emission subsidy is `<2×` organic burn.
- **Year 2:** organic demand covers ≥85%; emission subsidy is `<1.2×`.
- **Year 3:** subsidy target is `<1×` under the burn-linked mint rule.

These targets will appear in the subsidy dashboard once that surface is live.
They are the second-most important gating signal at permissionless launch after
the audit.
