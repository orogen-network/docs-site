# Customers

You pay USD or stablecoin. Orogen routes your inference to a TEE-attested
operator on the tier you asked for, returns an OpenAI-shaped response, and
hands you a signed receipt that anyone — including you — can verify. The
integration cost is zero: every SDK is a drop-in OpenAI client plus four
optional fields.

If you want a free chatbot, this is not for you. Orogen is metered compute
priced against real GPU cost.

## In this section

- [Python SDK](/customers/sdk-python) — `orogen-sdk` install, snippet, and the
  client-side `verify_receipt` helper.
- [TypeScript SDK](/customers/sdk-typescript) — `@orogen/sdk` install and
  snippet for browser or Node.
- [Receipts (RFC-0001)](/customers/receipts) — the signed receipt format and
  how the two verification paths (client-side best-effort, on-chain
  authoritative) compose.

## What is OpenAI-shaped, and what is new

The wire format is OpenAI Chat Completions. Existing code that constructs a
`messages` array, sets `model`, and reads `choices[0].message.content` works
unchanged. The four additions are all optional and prefixed `useful_*`:

| Field | Purpose |
| --- | --- |
| `useful_nonce` | Anti-replay nonce (see [RFC-0007](/protocol/rfcs/0007)). The SDKs generate this for you. |
| `useful_tier` | Operator tier preference: `dc-premium`, `dc-standard`, `cloud-rented`, `prosumer`, `edge`, `embed-only`. |
| `useful_region` | Geo region. ISO 3166-1 alpha-2. |
| `useful_max_price_per_million` | Price cap, denominated in CUC per million tokens. |
| `useful_verify_receipt` | Opt-in client-side receipt verification on the response. |

The response carries a `useful_receipt` blob (the RFC-0001 record) and, when
`useful_verify_receipt=true`, a `useful_verification` summary with
`signature_valid`, `attestation_fresh`, `nonce_unique`, `model_in_registry`,
and `overall`.

## LiteLLM provider

For stacks already on LiteLLM, the `litellm-orogen-provider` package plugs in
without code changes:

```yaml
model_list:
  - model_name: llama-3.1-70b
    litellm_params:
      model: orogen/llama-3.1-70b-instruct
      api_base: os.environ/OROGEN_GATEWAY_URL
      api_key: os.environ/OROGEN_API_KEY
```

## What you cannot do today

- Pre-buy CUC beyond the 30-day expiry. CUC is non-transferable and expires;
  pre-buying months in advance defeats the burn-and-mint loop.
- Get a free tier. The lowest tier (`embed-only`) is priced at 0.10× of base —
  cheap, not free.
- Choose a specific operator by hotkey. The router picks; you constrain by
  tier, region, and price cap. The receipt tells you which operator served.

For sustainable economics, see [/tokenomics/](/tokenomics/).
