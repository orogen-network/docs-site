import { defineConfig } from "vitepress";

// docs.orogen.network — VitePress configuration.
// Brand palette + nav structure track the Orogen brand system.

export default defineConfig({
  title: "Orogen Docs",
  titleTemplate: ":title · Orogen",
  description:
    "Documentation for Orogen — verifiable LLM inference anchored to physical work. " +
    "OpenAI-compatible gateway, TEE-attested operators, validator replay, " +
    "burn-and-mint settlement on a Substrate-based chain.",
  base: "/",
  cleanUrls: true,
  lang: "en-US",
  // Many cross-refs still resolve to source RFCs in sibling repos
  // (chain-tooling-rust, pallet-suite, etc.) rather than docs-internal
  // pages. Treat them as warnings, not build errors.
  ignoreDeadLinks: true,

  head: [
    ["meta", { name: "theme-color", content: "#0b0d10" }],
    ["meta", { name: "color-scheme", content: "dark" }],
    // Content-Security-Policy meta fallback. Mirrors docs/public/_headers so
    // the policy ships even if edge config drifts. NOTE: frame-ancestors,
    // report-uri, and sandbox cannot be set from a meta tag; the hosting-tier
    // `_headers` file is authoritative for those.
    [
      "meta",
      {
        "http-equiv": "Content-Security-Policy",
        content:
          "default-src 'self'; img-src 'self' data:; style-src 'self' 'unsafe-inline'; font-src 'self' data:; script-src 'self'; connect-src 'self'; base-uri 'self'; form-action 'self'; object-src 'none'",
      },
    ],
    ["meta", { "http-equiv": "X-Content-Type-Options", content: "nosniff" }],
    ["meta", { name: "referrer", content: "strict-origin-when-cross-origin" }],
    ["meta", { property: "og:type", content: "website" }],
    ["meta", { property: "og:site_name", content: "Orogen Docs" }],
    ["meta", { property: "og:url", content: "https://docs.orogen.network/" }],
    ["meta", { property: "og:title", content: "Orogen — verifiable LLM inference" }],
    [
      "meta",
      {
        property: "og:description",
        content:
          "OpenAI-compatible inference routed to TEE-attested GPU operators, with validator replay and burn-and-mint settlement.",
      },
    ],
    ["meta", { name: "twitter:card", content: "summary_large_image" }],
    ["link", { rel: "canonical", href: "https://docs.orogen.network/" }],
  ],

  themeConfig: {
    siteTitle: "Orogen Docs",

    // Top nav order: Start · Operators · Validators · Customers · Protocol RFCs · Governance · Tokenomics · Downloads.
    nav: [
      { text: "Start", link: "/start/", activeMatch: "^/start/" },
      { text: "Operators", link: "/operators/", activeMatch: "^/operators/" },
      { text: "Validators", link: "/validators/", activeMatch: "^/validators/" },
      { text: "Customers", link: "/customers/", activeMatch: "^/customers/" },
      {
        text: "Protocol RFCs",
        link: "/protocol/rfcs/",
        activeMatch: "^/protocol/",
      },
      { text: "Governance", link: "/governance/", activeMatch: "^/governance/" },
      { text: "Tokenomics", link: "/tokenomics/", activeMatch: "^/tokenomics/" },
      { text: "Downloads", link: "/downloads" },
      {
        text: "More",
        items: [
          { text: "Architecture", link: "/start/architecture" },
          { text: "Roadmap", link: "/start/roadmap" },
          { text: "Protocol overview", link: "/protocol/" },
          { text: "Status page", link: "https://status.orogen.network" },
          { text: "Explorer", link: "https://explorer.orogen.network" },
          { text: "Legal", link: "/legal" },
        ],
      },
    ],

    sidebar: {
      "/start/": [
        {
          text: "Start",
          items: [
            { text: "Overview", link: "/start/" },
            { text: "Architecture summary", link: "/start/architecture" },
            { text: "Roadmap", link: "/start/roadmap" },
          ],
        },
        {
          text: "Audience entry points",
          items: [
            { text: "Customers", link: "/customers/" },
            { text: "Operators", link: "/operators/" },
            { text: "Validators", link: "/validators/" },
          ],
        },
      ],
      "/operators/": [
        {
          text: "Operators",
          items: [
            { text: "Overview", link: "/operators/" },
            { text: "Tiers + hardware", link: "/operators/tiers" },
            { text: "Onboarding", link: "/operators/onboarding" },
            { text: "Attestation", link: "/operators/attestation" },
            { text: "Stake + slashing", link: "/operators/stake" },
          ],
        },
      ],
      "/customers/": [
        {
          text: "Customers",
          items: [
            { text: "Overview", link: "/customers/" },
            { text: "Python SDK", link: "/customers/sdk-python" },
            { text: "TypeScript SDK", link: "/customers/sdk-typescript" },
            { text: "Receipts (RFC-0001)", link: "/customers/receipts" },
          ],
        },
      ],
      "/validators/": [
        {
          text: "Validators",
          items: [
            { text: "Overview", link: "/validators/" },
            { text: "Replay sampling", link: "/validators/replay" },
            { text: "Yuma scoring", link: "/validators/yuma" },
          ],
        },
      ],
      "/protocol/": [
        {
          text: "Protocol",
          items: [
            { text: "Overview", link: "/protocol/" },
            { text: "Pallets", link: "/protocol/pallets" },
            { text: "Verification stack", link: "/protocol/verification" },
          ],
        },
        {
          text: "RFCs",
          items: [
            { text: "All RFCs", link: "/protocol/rfcs/" },
            { text: "RFC-0001 — Receipt format", link: "/protocol/rfcs/0001" },
            { text: "RFC-0002 — Attestation report", link: "/protocol/rfcs/0002" },
            { text: "RFC-0003 — Heartbeat schema", link: "/protocol/rfcs/0003" },
            { text: "RFC-0004 — Batch settlement", link: "/protocol/rfcs/0004" },
            { text: "RFC-0005 — Slashing ABI", link: "/protocol/rfcs/0005" },
            { text: "RFC-0006 — Sampling randomness", link: "/protocol/rfcs/0006" },
            { text: "RFC-0007 — Nonce protocol", link: "/protocol/rfcs/0007" },
            { text: "RFC-0008 — Oracle feed", link: "/protocol/rfcs/0008" },
            { text: "RFC-0009 — Operator registration", link: "/protocol/rfcs/0009" },
            { text: "RFC-0010 — RPC endpoint contract", link: "/protocol/rfcs/0010" },
          ],
        },
      ],
      "/tokenomics/": [
        {
          text: "Tokenomics",
          items: [
            { text: "Overview", link: "/tokenomics/" },
            { text: "Burn-and-mint loop", link: "/tokenomics/bme" },
            { text: "Emission", link: "/tokenomics/emission" },
            { text: "Slashing economics", link: "/tokenomics/slashing" },
          ],
        },
      ],
      "/governance/": [
        {
          text: "Governance",
          items: [
            { text: "Overview", link: "/governance/" },
            { text: "Multisig + timelock", link: "/governance/multisig" },
            { text: "Disputes + arbitration", link: "/governance/disputes" },
          ],
        },
      ],
    },

    socialLinks: [
      { icon: "github", link: "https://github.com/orogen-network" },
    ],

    outline: { level: [2, 3], label: "On this page" },

    editLink: {
      pattern:
        "https://github.com/orogen-network/docs-site/edit/main/docs/:path",
      text: "Edit this page on GitHub",
    },

    lastUpdated: {
      text: "Updated",
      formatOptions: { dateStyle: "medium" },
    },

    docFooter: { prev: "Previous", next: "Next" },

    search: {
      provider: "local",
      options: {
        detailedView: true,
      },
    },

    footer: {
      message:
        "Apache-2.0 / MIT / AGPL — see <a href=\"/legal\">/legal</a> · " +
        "<a href=\"mailto:hello@orogen.network\">hello@orogen.network</a> · " +
        "<a href=\"https://orogen.network\">orogen.network</a>",
      copyright: "© Orogen Foundation",
    },
  },
});
