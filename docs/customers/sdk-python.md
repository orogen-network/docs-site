# Python SDK

```python
from orogen_sdk import OrogenClient

with OrogenClient(api_key="orog_...", base_url="https://gateway.orogen.network/v1") as client:
    response = client.chat.completions.create(
        model="llama-3.1-70b-instruct@my-adapter",
        messages=[{"role": "user", "content": "Hello!"}],
        useful_verify_receipt=True,
    )
    print(response.choices[0]["message"]["content"])
    print(response.useful_verification.summary)  # "verified"
```

## Verification

```python
from orogen_sdk import verify_receipt
result = verify_receipt(response.useful_receipt, expected_nonce=nonce)
# result.signature_valid / attestation_fresh / nonce_unique / model_in_registry / overall
```

Cryptographic signature verification is best-effort client-side; authoritative verification is on-chain by validators (RFC-0006 sampling).

## Install

```bash
uv add orogen-sdk
# or
pip install orogen-sdk
```
