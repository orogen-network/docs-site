# Governance

The chain is governed by a 5-of-7 multisig with a 14-day timelock and a 2-day
public delay that cannot be bypassed even on emergency fast-track. The
foundation cannot mint outside the BME rule, cannot override slashing math,
and cannot buy back tokens. These constraints are pallet-enforced where the
runtime can enforce them, and red-lined where they cannot.

The intent is to make the foundation's role unambiguous: emergency response,
parameter tuning inside bounds, and treasury custody — not discretion over
the economics.

## In this section

- [Multisig + timelock](/governance/multisig) — the 5-of-7 composition, the
  upgrade pipeline (devnet soak → Forge soak → shadowfork → audit → on-chain
  proposal → 14-day timelock → 2-day public delay → execute), and the
  emergency procedure.
- [Disputes + arbitration](/governance/disputes) — the 28-day resolution path
  for slashing disputes, including the sortition panel of three operators
  and the panel's 2-of-3 vote.

## Multisig composition

| # | Role |
| --- | --- |
| 1, 2 | Foundation council |
| 3, 4 | C-corp executives |
| 5 | Independent technical advisor |
| 6 | Independent legal / compliance advisor |
| 7 | Community-elected (held by independent steward until the permissionless phase) |

Hardware wallets are mandatory. Geographic distribution is mandatory (no more
than three signers in one jurisdiction). Rotation drills run quarterly. Each
outgoing signer cools off for one year beyond their token vesting cliff.

## What governance can do

- Approve runtime upgrades, subject to the audit gate.
- Adjust BME parameters inside their pallet-defined bounds (elasticity in
  `[0.8, 1.5]`, ceiling/floor only via runtime upgrade).
- Manage the CRL — the TEE revocation list — with a fast-track 3-of-7 path
  for sanctions-driven and CVE-driven entries.
- Spend treasury funds, each spend timelocked independently.
- Ratify or reject slashing disputes via the 5-of-7 review at T+28d.

## What governance cannot do

- Mint outside the BME rule.
- Bypass the 14-day timelock for non-emergency actions.
- Bypass the 2-day public delay even for emergencies (red line #18).
- Override the slashing math (red line #16).
- Discretionary slashing.
- Foundation buyback of OROG.

## Why a 2-day public delay even in emergencies

A pure-multisig emergency path is socially indistinguishable from a foundation
override. The 2-day public delay gives the network and external auditors time
to observe what the multisig is about to execute. If the proposed code is
itself the exploit, the delay is what makes that observable before execution.
The cost is non-zero — an active exploit may continue for two days — but the
red-team analysis was unambiguous: the alternative is worse.

## What changes at permissionless

The community-elected seat transfers from the steward to a directly-elected
representative. Stake-concentration and IP-diversity rules continue to apply
to all on-chain registration. The multisig composition and the timelock
parameters are runtime parameters, and changing them is itself a runtime
upgrade subject to the audit gate.
