# Multisig + timelock

5-of-7 multisig with 14-day timelock and 2-day public delay even for emergency fast-track.

## Composition

- 2× Foundation council
- 2× C-corp executives
- 1× Independent technical advisor
- 1× Independent legal/compliance advisor
- 1× Community-elected (held by independent steward until Q3 2027)

Hardware wallets (Ledger or equivalent), geographic distribution required (no >3 in one jurisdiction), quarterly rotation drill, 1-year cooldown on outgoing signers beyond vested tokens.

## Upgrade path

1. Code merged behind feature flag
2. Devnet 7d soak
3. Forge 14d soak
4. Shadowfork 7d + rollback drill
5. Re-audit if triggered
6. On-chain governance proposal
7. **14-day timelock**
8. **2-day public delay** (cannot bypass, even emergency)
9. `pallet-system::set_code` executes
10. 48h elevated on-call
11. Postmortem within 7d

## Emergency upgrades

Only for active exploit, chain halt, demonstrable fund-loss-in-progress. Still require:
- 5-of-7 signers
- 2-day public delay (red line #18)
- Independent advisor sign-off
- Public statement at hour 0
- Postmortem within 72h

## What governance cannot do

- Mint outside BME rule
- Bypass timelock for non-emergency actions
- Bypass 2-day public delay even for emergencies
- Override slashing math
- Discretionary slashing
- Foundation buyback
