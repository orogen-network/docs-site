# Disputes + arbitration

When an operator is slashed, they can dispute. Slashed stake is **escrowed not burned** until resolution (RFC-0005).

## Timeline

| T+ | Step |
|---|---|
| T+0 | Slashing extrinsic submitted, stake moves to escrow account, `Slashing` event emitted |
| T+0 to T+7d | Operator files dispute, posts 10% of slash amount as dispute bond |
| T+7d to T+14d | Evidence gathering window |
| T+14d | On-chain sortition selects 3-operator panel from top-50 stake (excluding slashed operator, slashing validator, anyone in same coldkey cluster). Each panelist posts 1% stake bond |
| T+14d to T+21d | Panel reviews evidence + replays |
| T+21d | Panel votes 2-of-3 (`uphold` / `overturn` / `insufficient`) |
| T+21d to T+28d | 5-of-7 foundation council reviews panel decision |
| T+28d | Resolution executed — either slash finalizes (escrow → burn) or stake is restored |

## Outcomes

- **Dispute upheld** (operator wins): stake restored, dispute bond returned, slashing validator's score reduced, panelist bonds returned + small bounty.
- **Dispute rejected:** slash finalizes, dispute bond burned (anti-frivolous).
- **Bad-faith dispute:** additional 25% slash for false claim.

## Watcher penalty

Watchers can submit slashing evidence. False evidence → bond burned (1st offense) → bond × 10 + 2nd-offense ban.

## See also

- [Multisig + timelock](/governance/multisig)
- [RFC-0005 — Slashing extrinsic ABI](/protocol/rfcs/0005)
