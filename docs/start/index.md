# Start here

Orogen is a decentralized network for verifiable LLM inference. The gateway
exposes an OpenAI-compatible API; requests route to GPU operators whose
hardware and binary are TEE-attested; validators replay a sample of those
inferences on independent hardware and slash mismatches on chain. Customers
pay USD or stablecoin; the gateway burns OROG at the oracle TWAP and credits
the customer in non-transferable Compute Unit Credits (CUC); operators serve
inference and earn freshly-minted OROG, capped by a 180-day rolling burn-cap
and a 5%/year supply ceiling.

That is the whole loop. Every section below drills into one part of it.

## In this section

- [Architecture summary](/start/architecture) — the chain, the off-chain
  services, the verification stack, and the tokenomics in one ASCII diagram
  and a short table.
- [Roadmap](/start/roadmap) — the seven-phase plan from the live Forge
  testnet through Phase-3 federated post-training, with mainnet TGE as the
  next gate after audit.

## Pick a path by role

| Role | Where to go |
| --- | --- |
| **Customers** — app builders, LLM consumers | [/customers/](/customers/) |
| **Operators** — GPU owners across six tiers | [/operators/](/operators/) |
| **Validators** — replay node operators, stakers | [/validators/](/validators/) |
| **Protocol readers** — engineers, researchers | [/protocol/](/protocol/) and the [RFCs](/protocol/rfcs/) |
| **Token holders, governance** | [/tokenomics/](/tokenomics/) and [/governance/](/governance/) |
| **Adapter authors** (LoRA publishing with royalties) | [/protocol/](/protocol/) — adapter pallet coverage tracks RFC-0011 |

## What is live today

- **Forge testnet.** The gateway routes OpenAI-compatible traffic to
  TEE-attested operators; validators replay a stake-weighted sample of jobs
  on identical hardware; settlement batches land on chain with burn-and-mint
  splits at the runtime layer.
- **Permissioned operator set.** Foundation-vetted operators serve the
  testnet today. Permissionless onboarding follows the multi-firm audit and
  the Day-30 KPI gates.
- **SDKs ship today.** The Python SDK (`orogen-sdk`) and the TypeScript SDK
  (`@orogen/sdk`) are drop-in OpenAI clients pointing at
  `gateway.orogen.network`. See [Downloads](/downloads).
- **Mainnet TGE is the next phase.** It follows the multi-firm audit; see the
  [roadmap](/start/roadmap).

## Operator and explorer surfaces

These live alongside the docs site:

- Status page: <https://status.orogen.network>
- Subsidy dashboard: <https://subsidy.orogen.network>
- Attestation explorer: <https://attestation.orogen.network>
- Chain explorer: <https://explorer.orogen.network>

If something here contradicts the canonical RFC, the RFC wins. Open an issue
on the [monorepo](https://github.com/orogen-network) or use the
"Edit this page" link at the bottom of any docs page.
