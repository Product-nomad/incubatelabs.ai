# Engagement Protocol

How a paid Incubate Labs engagement runs, from first contact to handover. **This file is a public commitment to clients** — readable before buying, binding once an SoW is signed.

For internal technical discipline (TDD, security, scalability, etc.) see [`~/WAYS_OF_WORKING.md`](https://github.com/Product-nomad/vpc-config/blob/main/WAYS_OF_WORKING.md). This document covers what's specifically engagement-shaped: scope, contract, client data, confidentiality, change requests, handover, sign-off, post-mortem.

---

## 1. The signed SoW gate

**No work begins before a signed Statement of Work.** Free triage calls don't require one (those are part of pre-sales — see `/free`). Anything billable does.

The SoW PDF is the contract. It names:

- The package (one of the three published, or a custom Incubate Engagement scope)
- Days and price
- Deliverables, listed by name
- **What's NOT in scope** (explicit list — copied from the relevant `/services/<package>` page)
- Acceptance criteria for each deliverable
- Sign-off authority on the client side (named individual)
- Payment terms (50% on signature, 50% on delivery, unless otherwise agreed)
- Engagement start date and the named gate dates

Drafted within 48 hours of the free triage call. Signed before any deliverable work begins. Stored in the operator's contract folder alongside the post-mortem.

## 2. Client data — handling, retention, deletion

Client data is held to a higher bar than the operator's own data.

- **In transit only by default.** Client documents shared during an engagement are processed in memory or in a temporary working directory; not persisted to long-term storage on the operator's box without explicit written consent.
- **Local-only inference.** When client data is run through an LLM, it goes through the client's preferred path (their existing vendor, a local Ollama, or a sovereign provider named in the SoW). Never our own free-tier API account, never a vendor not named in the SoW.
- **Working directory hygiene.** Client documents live in a per-engagement directory (`~/engagements/<client-slug>/`) outside `~/projects/`. Never committed to any public repo, never synced to public cloud storage.
- **Retention window.** Client data is deleted within 30 days of engagement closure unless the SoW specifies otherwise. The post-mortem (§7) records the deletion date.
- **No incidental retention.** Logs, transcripts, debug artefacts that captured client data are part of the deletion sweep, not exceptions.
- **Credentials.** Any access tokens shared by the client (read-only API keys, repo collaborator invites) are revoked at handover and confirmed in writing.

## 3. Confidentiality

- **Default posture: confidential.** Engagement deliverables, client identity, sub-processors used in the engagement, and any data shared by the client are confidential unless the SoW explicitly says otherwise.
- **No public artefacts without consent.** Case studies, tweets, LinkedIn posts, repo references, and conference talks naming the client require written consent. *Anonymised lessons* may be shared post-engagement under the patterns/learnings rule below.
- **Anonymised lessons are fine.** A pattern observed across engagements ("UK fintechs we worked with all had X gap") is publishable without naming the client, provided the description doesn't trivially identify them.
- **NDA reciprocity.** If the client provides an NDA, the operator signs it within 48 hours or proposes specific edits. No drift to "we'll get to it later."
- **Sub-contractor disclosure.** The operator delivers solo with agent assistance — no sub-contractors brought in without prior written client approval. The agent (Claude or otherwise) is named in the SoW under "tools used" rather than as a sub-contractor.

## 4. Change requests

Mid-engagement, the client may ask for "one more thing." The discipline:

- **In scope** (no charge): clarification of an existing deliverable; minor refinement; correction of work already done.
- **Out of scope** (change request needed): a new deliverable not named in the SoW; a deliverable substantially expanded beyond its acceptance criteria; work that materially extends the engagement timeline.
- **The operator names the line.** When the line is unclear, the operator says so explicitly: *"That's adjacent to deliverable X — happy to include if it's <2 hours; if it's larger, here's the change-request shape."* Don't silently absorb scope creep.
- **Change-request format.** A short written addendum to the SoW: what's added, days, price, new completion date. Signed before the new work begins.

## 5. Handover ritual

Every engagement ends with a handover, not a fade-out.

- **Handover call** (30 to 60 min, included in price). Walk every deliverable. Confirm acceptance criteria are met. Name what the client now owns.
- **Handover pack.** A single delivered folder containing all deliverable artefacts, a one-page README listing them, and the engagement post-mortem (anonymised version if desired).
- **Ownership transfer.** Threat model, decision log, metrics dashboard, scripts — explicitly named as belonging to the client at handover. The client can edit, share, modify; the operator retains no claim.
- **Operator deletes working data.** Confirmed in writing as part of the handover. Any retained client data after this point is by explicit agreement (e.g., for the 90-day review on the AI Governance Pack).
- **One-line follow-on offer.** At the end of the call: *"If anything in here breaks or needs revision in the next 14 days, send me a line — minor revisions are part of this engagement."* No charge for typos and small fixes; everything else is a new SoW.

## 6. Sign-off

- **Per-phase sign-off where applicable.** For multi-phase engagements (Local-LLM Pilot, Incubate Engagement), each phase gate is signed off by the named client authority before the next phase begins.
- **Sign-off is in writing.** Email is sufficient; verbal confirmation in a call is followed by written confirmation in the call notes.
- **No work in advance.** If a phase gate hasn't been signed off, work on the next phase doesn't start. This protects both sides.
- **Disputes go to the SoW.** If client and operator disagree on whether a deliverable meets acceptance criteria, the SoW's wording governs. If the SoW is silent, the operator proposes a written interpretation and the client either accepts or counters.

## 7. Post-mortem

After every paid engagement, within 14 days of handover:

- **What worked.** Specific to this engagement, not generic.
- **What didn't.** Equally specific. Include estimation errors, scope friction, anything that wasted client or operator time.
- **What to bake into the next engagement.** Pattern that generalises — feeds back into this protocol, the package definitions, or the methodology spec.
- **Estimation calibration.** Days estimated vs days actually spent. Drives recalibration of fixed-price packages over time.
- **Client deletion confirmation.** Date by which client data is deleted from the operator's environment.
- **Stored in `~/engagements/<client-slug>/post-mortem.md`**, never published. Anonymised lessons may be lifted into public learnings.

## 8. Engagement registry

Active engagements are tracked privately in [`Product-nomad/vpc-config/CLIENT_ENGAGEMENTS.md`](https://github.com/Product-nomad/vpc-config/blob/main/CLIENT_ENGAGEMENTS.md) — same shape as `~/PROJECTS.md` but for paying clients. Updated at every session-close on a client engagement. NDA-bound; never replicated to a public repo.

The schema:

| Field | Meaning |
|---|---|
| `client-slug` | Short identifier; never the full company name in any public-repo file |
| `engagement` | One of: oss-hardening / governance-pack / llm-pilot / incubate-engagement |
| `phase` | Current phase per §9 of WoW (Frame / Data / Pipeline / Build / Validate / Operate) |
| `gate` | Next sign-off gate, with target date |
| `days-burnt` | Operator hours-converted-to-days against the SoW estimate |
| `last-touched` | ISO date of last work session |
| `data-deletion-date` | When client data must be deleted (typically handover + 30 days, or per SoW) |

## 9. The boundary with `WAYS_OF_WORKING.md`

| Concern | Lives in |
|---|---|
| TDD, code quality, scalability, security technique | `WAYS_OF_WORKING.md` |
| Phase-gated delivery model | `WAYS_OF_WORKING.md` §9 |
| Threat model template / governance scaffold | `WAYS_OF_WORKING.md` §3, §11 |
| Engagement scope, SoW, change requests | **This file** |
| Client data handling | **This file** |
| Confidentiality | **This file** |
| Handover, sign-off, post-mortem | **This file** |
| Engagement registry | **This file** § 8 + `CLIENT_ENGAGEMENTS.md` |

If a rule appears in both files, this one wins for engagement contexts; the WoW one wins for the operator's own projects.

---

Last updated: 2026-04-28.
