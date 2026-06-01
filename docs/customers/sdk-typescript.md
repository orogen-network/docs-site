# TypeScript SDK

```ts
import { OrogenClient } from "@orogen/sdk";

const client = new OrogenClient({
  apiKey: process.env.OROGEN_API_KEY!,
  // Defaults to the live test-mode gateway when omitted:
  baseUrl: process.env.OROGEN_GATEWAY_URL ?? "https://gateway.orogen.network/v1",
});

const response = await client.chat.completions.create({
  model: "llama-3.1-70b-instruct@my-adapter",
  messages: [{ role: "user", content: "Hello!" }],
  useful_verify_receipt: true,
});

console.log(response.choices[0]?.message.content);
console.log(response.useful_verification);
```

## Install

Not on npm yet (coming soon). Install from source:

```bash
npm install github:orogen-network/customer-sdk-ts
```

The gateway is in **test mode** on Forge — see the [Forge testnet](/start/forge-testnet) caveats.
