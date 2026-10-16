#!/usr/bin/env python3
"""Monthly AI-answer check for incubatelabs.ai (DataForSEO AI Optimization API).

For each tracked question: ChatGPT and Gemini (LLM Scraper, live) and Perplexity (LLM Responses,
sonar, live), plus one LLM Mentions query for the domain. Writes YYYY-MM.md and YYYY-MM.json next to
this file and compares with the previous month's JSON.

Spend cap: before each call the worst-case cost is added to what has been spent; if that would pass
CAP_USD the call is skipped and the report says so. Actual costs come from each response's `cost`.
Credentials: DATAFORSEO_LOGIN / DATAFORSEO_PASSWORD from the environment, else ~/.claude.json
(mcpServers.dataforseo.env).
"""
import base64
import datetime as dt
import json
import os
import re
import sys
import time
import urllib.request
from pathlib import Path

CAP_USD = 0.50
DOMAIN = "incubatelabs.ai"
NAME_RE = re.compile(r"incubate\s*labs|incubatelabs", re.I)
QUESTIONS = [
    "does the EU AI Act apply to UK businesses",
    "is there a UK AI Act",
    "AI policy template for small business",
    "how to automate supplier invoices into Xero",
    "AI receptionist for trades UK",
    "automate quotes for electricians",
    "AI literacy training for staff",
    "how can a small business use AI",
    "AI consultant for small business UK",
    "letting agent repair request automation",
]
API = "https://api.dataforseo.com/v3/"
# Worst-case cost per call, for the cap check (pricing pages, 2026-10-16).
MAX_COST = {"chat_gpt": 0.004, "gemini": 0.004, "perplexity": 0.015, "mentions": 0.1 + 0.001 * 50}
OUT = Path(__file__).resolve().parent


def creds():
    login, pw = os.environ.get("DATAFORSEO_LOGIN"), os.environ.get("DATAFORSEO_PASSWORD")
    if not (login and pw):
        env = json.load(open(Path.home() / ".claude.json"))["mcpServers"]["dataforseo"]["env"]
        login, pw = env["DATAFORSEO_LOGIN"], env["DATAFORSEO_PASSWORD"]
    return base64.b64encode(f"{login}:{pw}".encode()).decode()


AUTH = creds()
spent = 0.0
skipped = []


def post(path, task, kind, label):
    """One live task. Returns the task dict, or None if skipped by the cap or failed."""
    global spent
    if spent + MAX_COST[kind] > CAP_USD:
        skipped.append(f"{kind}: {label}")
        return None
    for attempt in range(3):
        req = urllib.request.Request(
            API + path,
            data=json.dumps([task]).encode(),
            headers={"Authorization": f"Basic {AUTH}", "Content-Type": "application/json"},
        )
        try:
            with urllib.request.urlopen(req, timeout=180) as r:
                body = json.load(r)
        except Exception as e:  # network or HTTP error: retry
            err = str(e)
            time.sleep(5)
            continue
        spent += float(body.get("cost") or 0)
        t = (body.get("tasks") or [{}])[0]
        if t.get("status_code") == 20000:
            return t
        err = f"{t.get('status_code')} {t.get('status_message')}"
        if t.get("status_code") != 40101:  # only "Internal SE Server Error" is worth retrying
            break
        time.sleep(5)
    print(f"[warn] {kind} '{label}': {err}", file=sys.stderr)
    return {"error": err}


def domain_of(url):
    m = re.match(r"https?://(?:www\.)?([^/]+)", url or "")
    return m.group(1).lower() if m else ""


def summarise_scraper(t):
    if not t or "error" in t:
        return {"error": (t or {}).get("error", "skipped by spend cap")}
    res = (t.get("result") or [{}])[0] or {}
    urls = [s.get("url") for s in (res.get("sources") or []) if s.get("url")]
    for item in res.get("items") or []:
        urls += [s.get("url") for s in (item.get("sources") or []) if s.get("url")]
    text = res.get("markdown") or ""
    return answer_summary(urls, text)


def summarise_perplexity(t):
    if not t or "error" in t:
        return {"error": (t or {}).get("error", "skipped by spend cap")}
    res = (t.get("result") or [{}])[0] or {}
    urls, text = [], ""
    for item in res.get("items") or []:
        for sec in item.get("sections") or []:
            text += sec.get("text") or ""
            urls += [a.get("url") for a in (sec.get("annotations") or []) if a.get("url")]
    return answer_summary(urls, text)


def answer_summary(urls, text):
    domains = list(dict.fromkeys(d for d in map(domain_of, urls) if d))
    return {
        "cited": any(d == DOMAIN or d.endswith("." + DOMAIN) for d in domains),
        "mentioned": bool(NAME_RE.search(text)),
        "sources": domains,
    }


def main():
    month = dt.date.today().strftime("%Y-%m")
    raw_dir = OUT / "raw" / month
    raw_dir.mkdir(parents=True, exist_ok=True)
    loc = {"location_name": "United Kingdom", "language_code": "en"}
    results = {}
    for i, q in enumerate(QUESTIONS):
        row = {}
        for kind, path, task, fn in [
            ("chat_gpt", "ai_optimization/chat_gpt/llm_scraper/live/advanced", {**loc, "keyword": q, "force_web_search": True}, summarise_scraper),
            ("gemini", "ai_optimization/gemini/llm_scraper/live/advanced", {**loc, "keyword": q}, summarise_scraper),
            ("perplexity", "ai_optimization/perplexity/llm_responses/live", {"user_prompt": q, "model_name": "sonar", "max_output_tokens": 1024, "web_search_country_iso_code": "GB"}, summarise_perplexity),
        ]:
            t = post(path, task, kind, q)
            (raw_dir / f"{i:02d}-{kind}.json").write_text(json.dumps(t, indent=1))
            row[kind] = fn(t)
        results[q] = row

    m = post(
        "ai_optimization/llm_mentions/search/live",
        {"location_code": 2826, "language_code": "en", "platform": "google", "target": [{"domain": DOMAIN}], "limit": 50},
        "mentions",
        DOMAIN,
    )
    (raw_dir / "mentions.json").write_text(json.dumps(m, indent=1))
    if m and "error" not in m:
        r = (m.get("result") or [{}])[0] or {}
        mentions = {"total": r.get("total_count") or 0, "questions": [x.get("question") for x in (r.get("items") or [])][:20]}
    else:
        mentions = {"error": (m or {}).get("error", "skipped by spend cap")}

    data = {"month": month, "run_at": dt.datetime.now(dt.timezone.utc).isoformat(timespec="seconds"), "spent_usd": round(spent, 4), "cap_usd": CAP_USD, "skipped": skipped, "results": results, "mentions": mentions}
    (OUT / f"{month}.json").write_text(json.dumps(data, indent=1) + "\n")
    prev = sorted(p for p in OUT.glob("20??-??.json") if p.stem < month)
    previous = json.load(open(prev[-1])) if prev else None
    (OUT / f"{month}.md").write_text(report(data, previous))
    print(f"{month}: spent ${spent:.4f}; cited in {cited_count(data)}/{len(QUESTIONS)} questions")


def cited_count(data):
    return sum(any(v.get("cited") or v.get("mentioned") for v in row.values()) for row in data["results"].values())


ENGINES = [("chat_gpt", "ChatGPT"), ("gemini", "Gemini"), ("perplexity", "Perplexity")]


def cell(v):
    if "error" in v:
        return "error"
    return "cited" if v["cited"] else "mentioned" if v["mentioned"] else "no"


def report(d, prev):
    L = [
        f"# AI answer tracking: {d['month']}",
        "",
        f"Run {d['run_at']} (UTC). ChatGPT and Gemini via the DataForSEO LLM Scraper (live, United Kingdom, English); Perplexity via LLM Responses (`sonar`, web search localised to GB). "
        f"\"Cited\" means {DOMAIN} is among the sources; \"mentioned\" means the answer names Incubate Labs. Spend ${d['spent_usd']:.4f} of a ${d['cap_usd']:.2f} cap.",
        "",
        f"**Headline: {cited_count(d)} of {len(d['results'])} questions cite or mention us.**"
        + (f" Last month: {cited_count(prev)} of {len(prev['results'])} ({prev['month']})." if prev else " Baseline month."),
        "",
    ]
    if d["skipped"]:
        L += [f"Skipped by the spend cap: {', '.join(d['skipped'])}.", ""]
    L += ["| Question | ChatGPT | Gemini | Perplexity | Change from last month |", "|---|---|---|---|---|"]
    for q, row in d["results"].items():
        change = []
        if prev and q in prev["results"]:
            for k, name in ENGINES:
                a, b = prev["results"][q].get(k, {}), row.get(k, {})
                if "error" not in a and "error" not in b and cell(a) != cell(b):
                    change.append(f"{name}: {cell(a)} → {cell(b)}")
        else:
            change = ["baseline" if not prev else "new question"]
        L.append(f"| {q} | {cell(row['chat_gpt'])} | {cell(row['gemini'])} | {cell(row['perplexity'])} | {'; '.join(change) or 'no change'} |")
    L += ["", "## Sources cited", ""]
    for q, row in d["results"].items():
        L += [f"### {q}", ""]
        for k, name in ENGINES:
            v = row[k]
            if "error" in v:
                L.append(f"- **{name}**: {v['error']}")
                continue
            src = ", ".join(v["sources"]) or "none"
            new = ""
            if prev and q in prev["results"] and "sources" in prev["results"][q].get(k, {}):
                added = [s for s in v["sources"] if s not in prev["results"][q][k]["sources"]]
                gone = [s for s in prev["results"][q][k]["sources"] if s not in v["sources"]]
                if added or gone:
                    new = f" (new: {', '.join(added) or 'none'}; dropped: {', '.join(gone) or 'none'})"
            L.append(f"- **{name}**: {src}{new}")
        L.append("")
    m = d["mentions"]
    L += ["## LLM Mentions (Google AI answers, United Kingdom)", ""]
    if "error" in m:
        L.append(f"Error: {m['error']}")
    else:
        L.append(f"{m['total']} AI answers cite or mention {DOMAIN}" + (f" (last month: {prev['mentions'].get('total', 'n/a')})." if prev else "."))
        L += [f"- {x}" for x in m["questions"]]
    return "\n".join(L) + "\n"


if __name__ == "__main__":
    main()
