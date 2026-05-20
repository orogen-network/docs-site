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
- [Roadmap](/start/roadmap) — the seven-phase plan from local implementation
  work through Forge readiness, audits, mainnet TGE, and Phase-3 federated
  post-training.
- [Forge testnet](/start/forge-testnet) — the planned public testnet shape,
  current local-only status, and the checks that must pass before endpoints
  are advertised as live.

## Pick a path by role

| Role | Where to go |
| --- | --- |
| **Customers** — app builders, LLM consumers | [/customers/](/customers/) |
| **Operators** — GPU owners across six tiers | [/operators/](/operators/) |
| **Validators** — replay node operators, stakers | [/validators/](/validators/) |
| **Protocol readers** — engineers, researchers | [/protocol/](/protocol/) and the [RFCs](/protocol/rfcs/) |
| **Token holders, governance** | [/tokenomics/](/tokenomics/) and [/governance/](/governance/) |
| **Adapter authors** (LoRA publishing with royalties) | [/protocol/](/protocol/) — adapter pallet coverage tracks RFC-0011 |

## Current Status

- **Local split-repo gate is green.** The source tree has local unit/lint/build
  coverage, but this is not a production release gate.
- **Forge public endpoints are not advertised as live.** RPC, GraphQL,
  gateway, validator, operator, and explorer surfaces must either serve real
  services or explicit unavailable responses before they are listed here.
- **SDKs are installable development packages.** Configure endpoint URLs
  explicitly for the environment you are targeting. See [Downloads](/downloads).
- **Mainnet TGE is gated.** Forge operation, audits, live chaos drills, release
  CI, and legal/foundation readiness all need to close first.

If something here contradicts the canonical RFC, the RFC wins. Open an issue
on the relevant repo under
[github.com/orogen-network](https://github.com/orogen-network) or use the
"Edit this page" link at the bottom of any docs page.
