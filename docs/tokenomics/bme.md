# Burn-and-mint loop

The burn-and-mint equilibrium (BME) is the only path by which OROG enters or
leaves operator hands during normal network operation. It is pallet-enforced —
there is no extrinsic on `pallet-bme` that bypasses the rule, and the
foundation multisig cannot override the math (governance red line #16).

## In this section

- [Tokenomics overview](/tokenomics/) — the four-way split.
- [Emission rule](/tokenomics/emission) — the mint headroom calculation.
- [Slashing economics](/tokenomics/slashing) — how punishment feeds the burn side.
- [RFC-0004](/protocol/rfcs/0004) — batch settlement format.
- [RFC-0008](/protocol/rfcs/0008) — the oracle TWAP that prices the burn.

## The loop, one inference at a time

```
+--------------+   USD or stablecoin    +--------------+
|  Customer    | ---------------------> |  Gateway     |
+--------------+                        +------+-------+
                                                |
                                                | (1) burn OROG at oracle TWAP
                                                v
                                        +--------------+
                                        |  pallet-bme  |
                                        +------+-------+
                                                |
                                                | (2) mint CUC (non-transferable)
                                                v
                                        +--------------+
                                        |  Customer    |
                                        |  CUC balance |
                                        +------+-------+
                                                |
                                                | (3) request inference
                                                v
                                        +--------------+
                                        |  Operator    |
                                        +------+-------+
                                                |
                                                | (4) receipt + settlement batch
                                                v
                                        +--------------+
                                        |  pallet-bme  |
                                        +------+-------+
                                                |
                                                | (5) consume CUC, mint OROG to operator
                                                v
                                        +--------------+
                                        |  Operator    |
                                        | OROG settle. |
                                        +--------------+
```

## What the chain actually checks at settlement

A `SettlementBatch` extrinsic (see [RFC-0004](/protocol/rfcs/0004)) is rejected
if any of the following fails:

1. The gateway signature matches a registered gateway hotkey.
2. Per-operator aggregates are within the operator's on-chain stake-pool
   capacity.
3. The batch's aggregate mint is `≤` the epoch's remaining headroom from
   `pallet-bme`.
4. The batch's aggregate burn is `≥` aggregate mint at the oracle TWAP USD
   ratio (rejects under-burn, i.e. inflation attacks against the rule).

## Asymmetric outcomes

- **OROG appreciates between burn and mint.** Fewer OROG are minted for the
  same USD-denominated payout than were burned at the customer side. Net effect:
  structural deflation on the supply curve.
- **OROG depreciates between burn and mint.** More OROG are minted, still
  capped by the rolling-180d burn-cap and the 5%/year supply ceiling. Operators
  receive the USD-equivalent target, the supply expands within the ceiling.

This is the asymmetry that makes the network's payouts USD-denominated to the
operator without making OROG a stablecoin.

## CUC properties

- Non-transferable. Soulbound to the account that burned the OROG.
- USD-pegged at mint by the oracle TWAP. 30-day expiry (forces fresh burn,
  keeps the customer side honest against speculative pre-buys).
- Spent on inference at gateway settlement; can also be refunded back to OROG
  before expiry via `pallet-bme::refund` at the live TWAP (so an operator
  outage does not strand customer funds).
