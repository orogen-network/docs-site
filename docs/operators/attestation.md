# Attestation

Per RFC-0002, operators must produce a multi-vendor TEE attestation quote at registration and refresh it every 7 days.

## What's required per tier

| Tier | Required quotes |
|---|---|
| dc-premium | NVIDIA CC + (TDX OR SEV-SNP) |
| dc-standard | NVIDIA CC + (TDX OR SEV-SNP) |
| cloud-rented | NVIDIA CC + Intel TDX |
| prosumer/edge | none (stake-only) |
| compliance | all three + SOC 2 cert hash |

## How it works

1. Operator daemon boots inside a CVM (Intel TDX or AMD SEV-SNP).
2. GPU runs in CC mode (NVIDIA H100/H200/B200).
3. `attestation-service` produces a combined signed report covering the GPU device cert, the CPU CVM quote, the measured VM bundle hash, and the firmware hashes.
4. `attestation-service` calls `pallet-attestation-registry::submit(report_hash, ...)`.

## Side-channel disclosure

Some side channels are explicitly out of threat model:
- Hopper unencrypted NVLink (mitigation: Blackwell B200/B300 for confidential workloads).
- BAR0 register leakage (arxiv 2507.02770).
- Bimodal timing channels (batch-size leakage).

Operators acknowledge these in ToS. The network does not claim protection against silicon-undisclosed channels.

## CRL response

When a CVE is disclosed:
- Foundation publishes CRL entry within 48h.
- Operators have 7-day grace to re-attest with patched firmware.
- Days 7-14: soft-slash 5%.
- Day 30: full deregistration.

See [RFC-0002](/protocol/rfcs/0002) for the full attestation report ABI.
