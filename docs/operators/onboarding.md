# Onboarding

## 1-click web wizard

On Forge testnet, `operator-onboarding-ui` walks new operators through:

1. **GPU detection** — auto-detects local NVIDIA / AMD GPUs via lspci + nvidia-smi.
2. **TEE attestation** — produces a combined NVIDIA CC + Intel TDX (or AMD SEV-SNP) quote via `attestation-service`.
3. **Wallet generation** — creates a coldkey + hotkey via `wallet-cli`; keystore encrypted with passphrase.
4. **Stake bind** — submits `pallet-operator-stake::register` with attestation + sanctions screening proof + IP /24 hash.
5. **Daemon install** — pulls the latest `infer-worker-vllm` Docker image; starts under systemd; runs watchdog.

Median onboarding time target: **<15 minutes** (p90 <30 min).

## Manual path

Operators can skip the wizard:

```bash
# 1. Generate keys
wallet-cli new --output ~/keys.json

# 2. Get attestation
curl -X POST https://attestation.orogen.network/v1/attest -d '{"operator_id":"...","tier":"dc-standard",...}'

# 3. Bind stake
wallet-cli register-operator \
    --tier dc-standard \
    --attestation-report-hash 0x... \
    --stake 2000000000000000000000  # 2000 OROG

# 4. Start daemon
docker run -d \
  --name useful-worker \
  --restart=always \
  -v ~/keys.json:/etc/useful/keys.json \
  -p 8000:8000 \
  useful-network/infer-worker-vllm:latest
```

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

Stake is OROG with USD-pegged ratchet via governance every 30 days.
