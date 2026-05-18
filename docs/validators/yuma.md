# Yuma scoring

Stake-weighted consensus on per-operator performance per epoch.

## How it works

Per epoch (~72 min, 360 blocks):

1. Each validator submits a weight vector over operators based on replay results, attestation freshness, heartbeat liveness, and latency.
2. `pallet-yuma-consensus` aggregates the vectors stake-weighted with outlier clipping (Bittensor pattern — prevents >50%-stake lying).
3. Output: per-operator `Incentive` vector that determines per-epoch emission share.

## Validator earnings

Validators earn 15% of per-job emission split with opML watchers + zkML provers. Earnings are proportional to:
- Sampling volume × match-rate-to-consensus.
- Low coverage → lose emission.
- Drift from consensus → lose emission and bond stake.

## Validator permit

Top-K stake (K=128) get validator permits. Below the cap, validators continue submitting but their weights aren't aggregated. Above the cap, lowest-stake validator is bumped out on each registration.

## Concentration cap

No single entity can hold >20% of validator stake (enforced via on-chain check at registration). Plan §6 rule 6.

## See also

- [Replay sampling](/validators/replay)
- [RFC-0005 — Slashing extrinsic ABI](/protocol/rfcs/0005)
