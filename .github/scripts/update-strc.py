#!/usr/bin/env python3
"""Refresh the STRC prices, dividends and dividend rates embedded in strc-simulator.html.

Browsers cannot call Yahoo Finance from a page (no CORS headers), so a scheduled workflow runs this
after each market close and rewrites the data block between the markers in the page.
"""

from __future__ import annotations

import calendar
import datetime as dt
import json
import re
import sys
import time
import urllib.request
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
PAGE = ROOT / "strc-simulator.html"
FIRST_TRADE = 1753833600  # 2025-07-30, STRC's first trading day
HOSTS = ("query1", "query2")
URL = "https://{host}.finance.yahoo.com/v8/finance/chart/STRC?period1={start}&period2={end}&interval=1d&events=div"
BLOCK = re.compile(r"(// --- data start[^\n]*\n).*?(\n// --- data end)", re.S)

# Annual rate (% of the $100 stated amount) of each month before daily dividends, from Strategy's 8-K filings.
# From November 2026 the rate of each month is inferred from the daily dividends Yahoo lists.
KNOWN_RATES = {
    "2025-08": 9.00, "2025-09": 10.00, "2025-10": 10.25, "2025-11": 10.50, "2025-12": 10.75,
    "2026-01": 11.00, "2026-02": 11.25, "2026-03": 11.50, "2026-04": 11.50, "2026-05": 11.50,
    "2026-06": 11.50, "2026-07": 12.00, "2026-08": 12.00, "2026-09": 12.00, "2026-10": 12.00,
}
DAILY_FROM = dt.date(2026, 11, 1)  # first record date of the daily dividends


def fetch() -> dict:
    end = int(time.time()) + 86400
    last_error: Exception | None = None
    for host in HOSTS:
        request = urllib.request.Request(URL.format(host=host, start=FIRST_TRADE, end=end), headers={"User-Agent": "Mozilla/5.0"})
        try:
            with urllib.request.urlopen(request, timeout=30) as response:
                return json.load(response)["chart"]["result"][0]
        except Exception as error:  # try the other host
            last_error = error
    raise SystemExit(f"Could not fetch STRC data: {last_error}")


def day(timestamp: int, offset: int) -> dt.date:
    return dt.datetime.fromtimestamp(timestamp + offset, dt.timezone.utc).date()


def daily_amounts(rate: float, year: int, month: int) -> list[float]:
    """Per-share dividend of each day of a month: a twelfth of the annual rate on $100, the running total cut to the cent and the last day taking the rest."""
    days = calendar.monthrange(year, month)[1]
    total = rate / 12  # dollars per share for the month
    cut = lambda k: int(total * k / days * 100 + 1e-6)
    return [(cut(k) - cut(k - 1)) / 100 for k in range(1, days)] + [total - cut(days - 1) / 100]


def next_weekday(d: dt.date) -> dt.date:
    d += dt.timedelta(days=1)
    while d.weekday() >= 5:
        d += dt.timedelta(days=1)
    return d


def infer_rates(divs: list[tuple[dt.date, float]]) -> dict[str, float]:
    """Find, for each month of daily dividends, the rate in 0.25% steps whose daily amounts add up to what was paid."""
    daily = [(d, a) for d, a in divs if next_weekday(d) > DAILY_FROM]
    # Each ex-dividend date covers the record dates up to the next ex-dividend date (weekends and holidays included).
    groups: dict[str, list[tuple[list[dt.date], float]]] = {}
    for n, (ex, amount) in enumerate(daily):
        end = daily[n + 1][0] if n + 1 < len(daily) else next_weekday(ex)
        covered = [ex + dt.timedelta(days=k) for k in range((end - ex).days)]
        covered = [d for d in covered if d >= DAILY_FROM]
        months = {d.strftime("%Y-%m") for d in covered}
        if len(months) == 1:  # a group that spans two months can't pin either rate on its own
            groups.setdefault(months.pop(), []).append((covered, amount))
    rates: dict[str, float] = {}
    previous = KNOWN_RATES[max(KNOWN_RATES)]
    for month in sorted(groups):
        year, mon = map(int, month.split("-"))
        paid = sum(a for _, a in groups[month])
        matches = []
        for step in range(0, 121):  # 0% to 30%
            rate = step / 4
            amounts = daily_amounts(rate, year, mon)
            expected = sum(amounts[d.day - 1] for covered, _ in groups[month] for d in covered)
            if abs(expected - paid) < 0.005:
                matches.append(rate)
        if matches:
            previous = rates[month] = min(matches, key=lambda r: abs(r - previous))
        else:
            print(f"warning: no rate matches the {month} dividends ({paid:.2f} paid)", file=sys.stderr)
    return rates


def main() -> None:
    result = fetch()
    offset = result["meta"].get("gmtoffset", -18000)
    closes = result["indicators"]["quote"][0]["close"]
    prices = [(day(t, offset), round(c, 2)) for t, c in zip(result["timestamp"], closes) if c is not None]
    divs = sorted((day(int(t), offset), round(v["amount"], 4)) for t, v in result.get("events", {}).get("dividends", {}).items())
    rates = {**KNOWN_RATES, **infer_rates(divs)}
    data = {
        "updated": prices[-1][0].isoformat(),
        "dates": [d.isoformat() for d, _ in prices],
        "closes": [c for _, c in prices],
        "divs": [[d.isoformat(), a] for d, a in divs],
        "rates": rates,
    }
    line = "var DATA = " + json.dumps(data, separators=(",", ":")) + ";"
    html = PAGE.read_text(encoding="utf-8")
    updated, count = BLOCK.subn(lambda m: m.group(1) + line + m.group(2), html)
    if count != 1:
        raise SystemExit("The data block markers were not found in strc-simulator.html")
    if updated != html:
        PAGE.write_text(updated, encoding="utf-8", newline="\n")
    print(f"STRC data through {data['updated']}: {len(prices)} closes, {len(divs)} dividends, latest rate {rates[max(rates)]}% ({max(rates)})")


if __name__ == "__main__":
    main()
