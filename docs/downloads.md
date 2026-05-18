# Downloads

Pre-built artifacts and source bundles. Each artifact ships with a SHA-256 entry in [`SHA256SUMS`](https://orogen.network/downloads/SHA256SUMS).

## Binaries (Linux x64)

| Artifact | Size | Use |
|---|---|---|
| [chain-node-linux-x64-0.1.0.tar.gz](https://orogen.network/downloads/chain-node-linux-x64-0.1.0.tar.gz) | ~26 MB | Substrate node binary; boots a dev chain with `chain-node --dev --tmp` |
| [wallet-cli-linux-x64-0.1.0.tar.gz](https://orogen.network/downloads/wallet-cli-linux-x64-0.1.0.tar.gz) | ~3 MB | Operator/validator CLI wallet with subxt RPC |
| [mining-cli-linux-x64-0.1.0.tar.gz](https://orogen.network/downloads/mining-cli-linux-x64-0.1.0.tar.gz) | ~900 KB | Admin CLI: chain-spec generation, RFC validation, slash-receipt verification |

## SDKs

| Artifact | Install |
|---|---|
| Python: `orogen-sdk` | `pip install orogen-sdk` or `uv add orogen-sdk` |
| TypeScript: `@orogen/sdk` | `npm install @orogen/sdk` |
| LiteLLM provider: `litellm-orogen-provider` | `pip install litellm-orogen-provider` |

Source bundles:

| Artifact | Size |
|---|---|
| [orogen_sdk-0.1.0.tar.gz](https://orogen.network/downloads/orogen_sdk-0.1.0.tar.gz) | 7 KB |
| [orogen_sdk-0.1.0-py3-none-any.whl](https://orogen.network/downloads/orogen_sdk-0.1.0-py3-none-any.whl) | 8 KB |
| [orogen-sdk-0.1.0.tgz](https://orogen.network/downloads/orogen-sdk-0.1.0.tgz) | 5 KB |
| [litellm_orogen_provider-0.1.0.tar.gz](https://orogen.network/downloads/litellm_orogen_provider-0.1.0.tar.gz) | 4 KB |
| [litellm_orogen_provider-0.1.0-py3-none-any.whl](https://orogen.network/downloads/litellm_orogen_provider-0.1.0-py3-none-any.whl) | 4 KB |

## Whitepaper

[**orogen-whitepaper.pdf**](https://orogen.network/downloads/orogen-whitepaper.pdf) (~320 KB) — full plan + RFCs 1–10 in a single document.

## Integrity verification

```bash
curl -O https://orogen.network/downloads/SHA256SUMS
sha256sum -c SHA256SUMS
```

The [`manifest.json`](https://orogen.network/downloads/manifest.json) provides machine-readable artifact metadata.

## Source

Everything is also available at [github.com/orogen-network](https://github.com/orogen-network).
