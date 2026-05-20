---
layout: home
title: Orogen Docs — verifiable LLM inference
titleTemplate: false

hero:
  name: "Orogen"
  text: "Verifiable LLM inference, anchored to physical work."
  tagline: "OpenAI-compatible gateway routed to TEE-attested GPU operators, with validator replay, opML challenges, and burn-and-mint settlement on a Substrate-based chain."
  actions:
    - theme: brand
      text: Start here
      link: /start/
    - theme: alt
      text: Protocol RFCs
      link: /protocol/rfcs/
    - theme: alt
      text: orogen.network
      link: https://orogen.network

features:
  - title: Inference customers, operators, and the chain can all check.
    details: Every response ships a signed receipt (RFC-0001). Validators replay ≥10% of jobs on identical hardware (RFC-0006). Slashing extrinsics are on-chain with reason codes (RFC-0005). Verifiability is pallet-enforced, not a marketing claim.
    link: /customers/receipts
    linkText: How receipts work
  - title: Drop-in OpenAI compatibility — your code works unchanged.
    details: '`pip install orogen-sdk` or `npm install @orogen/sdk` and point `base_url` at the gateway. The wire shape is OpenAI Chat Completions plus four optional `useful_*` fields (nonce, tier, region, price cap). A LiteLLM provider ships the same surface inside existing stacks.'
    link: /customers/
    linkText: Customer guide
  - title: USD-denominated payouts via burn-and-mint.
    details: Customers pay USD. The gateway burns OROG at the oracle TWAP (RFC-0008) and credits the customer in non-transferable CUC. Operators serve inference and receive per-job settlement — 75% operator, 15% verification, 5% treasury, 5% governance.
    link: /tokenomics/
    linkText: Tokenomics
  - title: Demand-elastic emission, pallet-enforced — no foundation mint discretion.
    details: 'Per-epoch mint is bounded by a 180-day rolling burn cap with a 5%/year supply ceiling and a 0.5%/year floor. Year 1 bootstrap is 8%, Year 2 4%, Year 3+ demand-elastic. Mint outside the rule is impossible at the runtime layer.'
    link: /tokenomics/emission
    linkText: Emission rule
---

## What lives in these docs

These docs cover the four audiences identified in the marketing brief.
If a section is short, that is intentional — the canonical specs live in the
[RFCs](/protocol/rfcs/) and the per-pallet code under
[`pallet-suite/`](https://github.com/orogen-network/pallet-suite);
prose here exists to orient, not to duplicate.

| Audience | Job to be done | Where to start |
| --- | --- | --- |
| **Customers** — app builders, LLM consumers | Send OpenAI-shaped requests, verify receipts, estimate per-tier price | [/customers/](/customers/) |
| **Operators** — GPU owners across six tiers | Run a node, pass attestation, stake, route to demand | [/operators/](/operators/) |
| **Validators** — replay node operators, stakers | Receive the 15% verification slice by replaying sampled inferences | [/validators/](/validators/) |
| **Researchers and governance participants** | Read the protocol spec, the RFCs, and the tokenomics | [/protocol/](/protocol/) · [/tokenomics/](/tokenomics/) · [/governance/](/governance/) |

## Status

- **Forge is not a public release gate yet.** The split-repo codebase has a
  local test gate, but public RPC, GraphQL, gateway, validator, and operator
  endpoints are not advertised as live production services.
- **SDKs are installable development packages.** Use the package-manager
  instructions on [Downloads](/downloads); endpoint defaults must be configured
  for the environment you are targeting.
- **Mainnet TGE remains gated.** Forge operation, independent validators,
  real audits, live chaos drills, and release CI all need to close before any
  production launch claim.

If something here contradicts the canonical RFC, the RFC wins and this page
is the bug. Open an issue or edit on GitHub.
