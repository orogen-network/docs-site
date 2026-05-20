# TypeScript SDK

```ts
import { OrogenClient } from "@orogen/sdk";

const client = new OrogenClient({
  apiKey: process.env.OROGEN_API_KEY!,
  baseUrl: process.env.OROGEN_GATEWAY_URL!,
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

```bash
npm install @orogen/sdk
```
