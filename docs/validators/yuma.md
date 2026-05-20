# Yuma scoring

Governed validator admission, top-K submission permits, and median-clipped
stake-weighted per-epoch operator scoring.

## How it works

Per epoch (360 blocks, about 36 minutes at the current 6-second block time):

1. Governance adds or removes validator accounts in `pallet-yuma-consensus`,
   assigning each account a stake weight and entity id.
2. Governance rotates the active Yuma permit set for the epoch to the top
   permitted validators by stake weight, with deterministic account-id tie
   breaking.
3. Only validators permitted for that epoch can submit weight vectors over
   operators.
4. Admission enforces a bounded validator set and an entity concentration cap.
5. `compute_epoch_incentives` clips each submitted score to the per-operator
   median, aggregates clipped scores by validator stake weight, then normalizes
   operator incentives to basis points.

## Validator allocation

The target economics reserve 15% of per-job emission split for validators,
opML watchers, and zkML provers. Validator allocation is intended to be
proportional to:

- Sampling volume × match-rate-to-consensus.
- Low coverage → lose emission.
- Drift from consensus → lose emission and bond stake.

## Validator permit

The implemented runtime enforces a bounded governed validator set and a
separate epoch-scoped permit set. `rotate_permits(epoch)` selects the top
permitted validators by governed stake weight before weight submissions begin
for that epoch. In the current runtime configuration the governed set is capped
at 64 validators and all 64 can be permitted.

## Concentration cap

The current Yuma membership extrinsics enforce an entity stake-share cap after
bootstrap, using the entity id attached to each validator admission record.

## See also

- [Replay sampling](/validators/replay)
- [RFC-0005 — Slashing extrinsic ABI](/protocol/rfcs/0005)
