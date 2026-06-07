# Validators

Validators are the verification half of the network. They sample inferences
emitted by operators, replay them on independent hardware, and submit a
stake-weighted weight vector to `pallet-yuma-consensus` each epoch. The
verification slice — 15% of per-job emission — is split across validators,
opML watchers, and zkML provers, weighted by their match-to-consensus.

This is the side of the network that turns "the operator says it ran model X"
into "the chain accepts the receipt because an independent replicate of model
X on independent hardware produced the same response hash."

## In this section

- [Replay sampling](/validators/replay) — planned RFC-0006 randomness,
  per-tier sample-rate floors, and the independence requirement.
- [Yuma scoring](/validators/yuma) — how stake-weighted weight vectors
  aggregate into a per-operator `Incentive` vector with outlier clipping.

## What you do, per epoch

1. **Read sampled-receipt assignment.** Per-receipt selection is seeded by
   `BLAKE2(epoch_random || receipt_merkle_root || batch_id)` so neither the
   operator nor you can predict which receipts are due for replay
   ([RFC-0006](/protocol/rfcs/0006)).
2. **Replay `(model, adapter, prompt, seed)`** using the kernel pack and
   driver/CUDA versions named in the receipt. Deterministic kernels make
   replay cheap; matching is to a per-tier `log_probs` ε.
3. **Submit a Yuma weight vector** per epoch via `pallet-yuma-consensus`.
   Weights aggregate stake-weighted with outlier clipping (Bittensor pattern).
4. **Submit a slashing extrinsic** on mismatch ([RFC-0005](/protocol/rfcs/0005)).
   Slashing is per-detection, bounded per incident, and the stake is escrowed
   pending dispute.

## What you need

- **Replay hardware.** Capable of running each tier's models. A `dc-premium`
  validator needs B200/H200-equivalent GPUs; a validator that only audits
  `cloud-rented` and below needs less.
- **Validator stake.** 10× the operator minimum.
- **Entity diversity.** Validator stake-concentration cap is 20% per entity in
  the current runtime. Subnet/IP correlation is an off-chain watcher signal,
  not a Yuma permit rule yet.
- **Top-K permit.** The governed Yuma set is capped at 64 validators in the
  current runtime, and `rotate_permits(epoch)` controls which accounts can
  submit weight vectors for that epoch.

## Verification allocation

The 15% verification slice is proportional to:

- **Sampling volume × match-rate-to-consensus.** Low coverage loses emission;
  the chain knows what was assigned and what you actually replayed.
- **Adherence to consensus.** Drift from consensus (you say `wrong`, everyone
  else says `right`) loses emission and bond stake. Cheap-signalling defectors
  are unprofitable by construction.

## The independence requirement

A validator's worker pool must be **operationally independent** of the
operator being audited. The validator-watcher service flags subnet
correlation between validator and operator and reduces the validator's
score weight. This is the rule that closes the obvious attack:
self-replay produces self-confirmation.

## When validators come online

- **Forge testnet (live):** the chain is up at `wss://forge-rpc.orogen.network`,
  with two foundation-run validators admitted to the current testnet set.
  Independent validator replay is being hardened, so external validator slots
  are not generally open yet.
- **Mainnet TGE:** mainnet opens to vetted validators after the multi-firm
  audit; top-K stake determines aggregation.
- **Permissionless:** open registration follows TGE, subject to the same
  stake-concentration and IP-diversity rules. Future runtime upgrades can raise
  the Yuma validator cap through the normal governance/RFC process.
