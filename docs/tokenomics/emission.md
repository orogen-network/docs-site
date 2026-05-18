# Emission

Per-epoch mint is computed by `pallet-bme` against a hard rule. The foundation
cannot mint outside the rule. Governance can adjust the elasticity coefficient
and the supply ceiling subject to the 14-day timelock and the 2-day public
delay; it cannot bypass the rule itself.

## In this section

- [Burn-and-mint loop](/tokenomics/bme) — where mint headroom is consumed.
- [Tokenomics overview](/tokenomics/) — split and allocation.
- [RFC-0004](/protocol/rfcs/0004) — batch settlement that the headroom limits.
- [Governance](/governance/) — what governance can and cannot adjust.

## The rule

```text
target_epoch_mint = MIN(
    BOOTSTRAP_CAP_THIS_EPOCH,           // Year 1: 8% supply / 365 epochs
                                        // Year 2: 4% supply / 365 epochs
                                        // Year 3+: not applied
    rolling_180d_burn * elasticity,     // Year 3+ demand-elastic
    HARD_CEILING_PER_EPOCH              // 5% supply / 365 epochs
);

target_epoch_mint = MAX(target_epoch_mint, MIN_FLOOR_PER_EPOCH);
                                        // 0.5% supply / 365 epochs floor
```

`elasticity` is a governance parameter, defaults to 1.0, bounded to `[0.8, 1.5]`.
`HARD_CEILING_PER_EPOCH` is fixed in the runtime; changing it is a runtime
upgrade, which means a re-audit gate and the full 14-day +
2-day timelock.

## Why a 180-day rolling window

The earlier draft used a 90-day window. Red-team analysis showed that a 90-day
window can be gamed by pulse-stake attacks: a coordinated burst of customer
demand briefly inflates the cap, then attackers harvest the resulting mint
headroom. Extending to 180 days raises the cost of that attack by 2× without
materially slowing legitimate demand response.

## What the four numbers actually do

| Parameter | Year-1 default | Purpose |
| --- | --- | --- |
| Bootstrap cap | 8% / year | Avoid the cold-start trap: enough emission for operator break-even before organic demand. |
| Year-2 step-down | 4% / year | Forces foundation-led demand growth on a clock. |
| Demand-elastic regime | Y3+ | Mint is pinned to real burn — no demand, no mint. |
| Hard ceiling | 5% / year | Caps maximum dilution under any demand trajectory. |
| Hard floor | 0.5% / year | Pays validators + watchers even in a deep demand trough so the verification slice never starves. |

## Splits at mint

When `pallet-bme::mint_to_operator` fires, the freshly-minted OROG is split
on-chain at the runtime layer:

- **75%** to the operator hotkey settling the batch.
- **15%** to the verification pool (validators + opML watchers + zkML provers,
  weighted per Yuma scoring).
- **5%** to the foundation treasury.
- **5%** to the governance / ecosystem pool.

The split is hard-coded in `pallet-bme` and changes only via runtime upgrade.
There is no extrinsic that adjusts the split at run time.
