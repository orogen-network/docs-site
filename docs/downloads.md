# Downloads

This page lists the current release policy. The only checked-in download artifact in this workspace is the technical whitepaper. SDKs install from package registries, and binary release tarballs are published only from signed GitHub releases once a release is cut.

## Binaries (Linux x64)

| Artifact | Distribution | Use |
|---|---|---|
| `chain-node-linux-x64` | GitHub release artifact after signed release cut | Substrate node binary; boots a dev chain with `chain-node --dev --tmp` |
| `wallet-cli-linux-x64` | GitHub release artifact after signed release cut | Operator/validator CLI wallet with subxt RPC |
| `mining-cli-linux-x64` | GitHub release artifact after signed release cut | Admin CLI: chain-spec generation, RFC validation, slash-receipt verification |

## SDKs

| Artifact | Install |
|---|---|
| Python: `orogen-sdk` | `pip install orogen-sdk` or `uv add orogen-sdk` |
| TypeScript: `@orogen/sdk` | `npm install @orogen/sdk` |
| LiteLLM provider: `litellm-orogen-provider` | `pip install litellm-orogen-provider` |

Source bundles are produced by package registries and GitHub releases; they are not linked here until the corresponding artifact is present under `orogen.network/downloads/` with a checksum.

For the current workspace, use registry installs:

```bash
pip install orogen-sdk
npm install @orogen/sdk
pip install litellm-orogen-provider
```

## Whitepaper

[**orogen-whitepaper.pdf**](https://orogen.network/downloads/orogen-whitepaper.pdf) — full plan + RFCs 1–10 in a single document.

## Integrity verification

Release artifacts ship with `SHA256SUMS` and machine-readable metadata in the same signed GitHub release. The docs link linter rejects `orogen.network/downloads/*` links unless the artifact is present in `landing-site/public/downloads/`.

## Source

Everything is also available at [github.com/orogen-network](https://github.com/orogen-network).
