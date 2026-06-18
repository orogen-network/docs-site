# Legal

This is the documentation site (`docs.orogen.network`). The authoritative
public-facing terms, privacy policy, and cookie notice live on the marketing
site at [orogen.network/legal](https://orogen.network/legal). This page exists
so that links from the docs footer have somewhere honest to land.

## Licences across the project

The project's default licensing posture, per the coordination repo
[`README.md`](https://github.com/orogen-network/orogen-coordination/blob/main/README.md):

| Component | Licence |
| --- | --- |
| Customer SDKs (Python, TypeScript), LiteLLM provider | **Apache-2.0** |
| Documentation (this site + repo markdown) | **MIT** |
| Chain node, FRAME pallets, runtime | **AGPL-3.0-or-later** |

Licence selection is governed by the foundation. Anything not explicitly
licensed in-tree is unlicensed and not yet distributable.

## Data we touch on this site

`docs.orogen.network` is a static site. We do not run analytics, ad networks,
or third-party trackers on the docs surface. The site serves no cookies of its
own. If your browser surfaces any, they originate from the CDN edge
(cache identifiers only, no personalisation).

The local search index ships in the page bundle — search queries never leave
your browser.

## Sanctions and compliance

Operators registering on chain must submit a sanctions screening proof at
registration time (see [RFC-0009](/protocol/rfcs/0009)). The screening uses
multiple providers (Chainalysis, TRM, Elliptic — TBA which combination becomes
mandatory). A `SanctionsHit` is a 100%-slash, no-dispute fault code with a
permanent ban.

These provisions apply to the network, not to readers of this site.

## Informational content

Nothing in these docs, the marketing site, the press kit, or the repository
is an offer to sell or a solicitation of an offer to buy any token. OROG is a
utility token whose on-chain functions are compute settlement, operator and
validator bonding, and governance. Any forward-looking statement (roadmap dates,
supply schedule, validator economics, operator break-even) is a target, not a
guarantee. Schedule slips before security slips — see the [roadmap](/start/roadmap)
and the [governance red lines](/governance/).

This applies in particular to readers in jurisdictions where the legal status
of network-native utility tokens is unsettled.

## How to reach us

- General: [hello@orogen.network](mailto:hello@orogen.network)
- Security disclosures: TBA — pending the formal disclosure programme that
  ships with the audit gate.

Updates to this page are tracked alongside the rest of the docs source on
GitHub.
