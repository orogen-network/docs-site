# Onboarding

The Forge testnet is open to outside operators. This page shows the manual
`wallet-cli` path that works against the live testnet today. A guided
`operator-onboarding-ui` wizard is forthcoming.

## 1-click web wizard (forthcoming)

For Forge, `operator-onboarding-ui` will walk new operators through:

1. **GPU detection** — auto-detects local NVIDIA / AMD GPUs via lspci + nvidia-smi.
2. **TEE attestation** — produces a combined NVIDIA CC + Intel TDX (or AMD SEV-SNP) quote via `attestation-service`. (Forge issues **mock quotes**.)
3. **Wallet generation** — creates an account via `wallet-cli`; keystore encrypted with passphrase.
4. **Stake bind** — submits `OperatorStake::register` with the attestation hash.
5. **Daemon install** — runs the operator worker under systemd with a watchdog.

Until the wizard ships, follow the manual path below.

## Manual path

The manual path uses the live Forge endpoints. Set the RPC URL once so every
command picks it up:

```bash
export OROGEN_RPC_URL=wss://forge-rpc.orogen.network
```

```bash
# 1. Create an account (sr25519 hotkey + EVM-bridge key from one mnemonic).
wallet-cli new my-operator
wallet-cli address my-operator        # prints the ss58 + eth addresses

# 2. Fund it from the public faucet lane (testnet OROG, low-cap).
curl -X POST https://faucet.orogen.network/drip-public \
  -H 'Content-Type: application/json' \
  -d '{"recipient":"<the ss58 address from step 1>"}'
wallet-cli balance my-operator        # confirm the drip landed

# 3. Get an attestation report (Forge issues mock quotes).
curl -X POST "https://attestation-service.orogen.network/v1/attest" \
  -H 'Content-Type: application/json' \
  -d '{"operator_id":"my-operator"}'
# -> returns an attestation report; note its H256 hash.

# 4. Register as an operator. --stake is in plancks (atomic units);
#    MinStake on Forge is 1_000_000_000_000 = 1 OROG.
wallet-cli register-operator my-operator \
  --stake 1000000000000 \
  --attestation-hash 0x<attestation-report-hash> \
  --rpc-url wss://forge-rpc.orogen.network

# 5. Submit an on-chain liveness heartbeat for the current epoch.
wallet-cli heartbeat-test my-operator --submit --epoch <current-epoch>
```

Notes:

- `register-operator` takes the keystore **account name** as a positional
  argument, then `--stake <plancks>` and `--attestation-hash 0x..`. The
  attestation hash defaults to the zero hash for bring-up, so you can register
  before attestation is wired.
- The on-chain heartbeat command is `heartbeat-test <name> --submit --epoch <n>`.
  Without `--submit` it prints a signed gateway heartbeat payload instead of
  submitting on-chain. The runtime requires `epoch >= last_heartbeat_epoch` and
  advance by at most `MaxHeartbeatEpochAdvance` (1 on Forge), so pass the
  current epoch.
- The default `--rpc-url` is `ws://127.0.0.1:9944` (a local node). Point it at
  Forge with `--rpc-url wss://forge-rpc.orogen.network` or by exporting
  `OROGEN_RPC_URL`.
- See the [`wallet-cli` README](https://github.com/orogen-network/wallet-cli)
  for the full subcommand reference.

## Worker daemon

The operator worker images are forthcoming and will be published at
`ghcr.io/orogen-network/infer-worker-vllm` (plus `-sglang`, `-trtllm`,
`-llamacpp` variants). The production heartbeat loop lives in
`worker-control-plane`; until the images publish, run the worker from source
per its repo README and submit heartbeats manually with
`wallet-cli heartbeat-test`.

## Tier requirements

See [Tiers + hardware](/operators/tiers). Quick sketch:

| Tier | Floor stake |
|---|---|
| dc-premium | $5K equivalent OROG |
| dc-standard | $2K equivalent OROG |
| cloud-rented | $1K equivalent OROG |
| prosumer | $500 equivalent OROG |
| edge | $100 equivalent OROG |
| embed-only | $50 equivalent OROG |

Stake is OROG with USD-pegged ratchet via governance every 30 days. On Forge,
`MinStake` is `1_000_000_000_000` plancks (1 OROG) regardless of tier; the
USD-pegged floors above apply to mainnet.
