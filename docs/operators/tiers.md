# Tiers + hardware

| Tier | Hardware floor | Verification matrix | Pricing |
|---|---|---|---|
| `dc-premium` | 8×B200 / 8×H200 / NVL72 | L1+L2+L3+L4 (10% sample) + opt L5/L6/L7/L8 | 1.0× base |
| `dc-standard` | 8×H100 SXM | L1+L2+L3+L4 (10%) | 0.6× base |
| `cloud-rented` | 1–2× H100 PCIe / H200 | L1+L2+L3+L4 (15%) | 0.4× base |
| `prosumer` | 1–2× RTX 5090 / PRO 6000 | L1 stake + L4 (25%) + best-effort L3 | 0.25× base |
| `edge` | Mac Studio Ultra / dual 3090 | Stake-only | 0.15× base |
| `embed-only` | CPU AVX-512 / Apple M-series | Stake-only + opt L6 zkML | 0.10× base |

Tier is self-declared at registration; verified by validators via 7-day uptime + latency + verification SLA probe. Misclassification → slash + auto-downgrade.

## Upgrade / downgrade

- **Upgrade** requires SLA pass on lower tier first.
- **Downgrade** automatic on breach (>5% outside latency, >0.5% failed replay over 7 days).
