"""Shared helpers for generating realistic sample data for portfolio dashboards.

Everything is seeded, so re-running produces identical JSON.
"""
import json
import math
import random
from datetime import date, datetime, timedelta
from pathlib import Path

OUT_DIR = Path(__file__).resolve().parents[2] / "src" / "data" / "dashboards"
END = date(2026, 10, 5)          # last day of the sample period
DAYS = 180                       # history kept so 90-day views have a previous period
NOW = datetime(2026, 10, 5, 17, 30)

FIRST = ["Aarav", "Vivaan", "Aditya", "Vihaan", "Arjun", "Sai", "Reyansh", "Krishna", "Ishaan", "Rohan",
         "Ananya", "Diya", "Aadhya", "Saanvi", "Ira", "Myra", "Kavya", "Meera", "Priya", "Neha",
         "Rahul", "Karthik", "Nikhil", "Pooja", "Sneha", "Farhan", "Zoya", "Imran", "Lakshmi", "Suresh",
         "Deepa", "Manoj", "Tanvi", "Harsh", "Ritu", "Gaurav", "Swati", "Amit", "Divya", "Varun"]
LAST = ["Sharma", "Verma", "Iyer", "Reddy", "Nair", "Gupta", "Patel", "Rao", "Menon", "Singh",
        "Das", "Kulkarni", "Joshi", "Mehta", "Khan", "Pillai", "Bose", "Chopra", "Shetty", "Mishra"]
CITIES = ["Bengaluru", "Mumbai", "Delhi", "Hyderabad", "Chennai", "Pune", "Kolkata", "Ahmedabad", "Jaipur", "Kochi"]


def rng(seed):
    return random.Random(seed)


def person(r):
    return f"{r.choice(FIRST)} {r.choice(LAST)}"


def days(n=DAYS):
    return [(END - timedelta(days=n - 1 - i)).isoformat() for i in range(n)]


def series(r, base, trend=0.0, weekly=0.0, noise=0.08, n=DAYS, floor=0, weekend_dip=True, integer=True):
    """A daily series with growth trend, weekly seasonality and noise."""
    out = []
    for i, d in enumerate(days(n)):
        wd = date.fromisoformat(d).weekday()
        season = 1 + weekly * (math.sin(2 * math.pi * i / 7))
        if weekend_dip and wd >= 5:
            season *= 1 - abs(weekly) * 1.5
        v = base * (1 + trend * i / n) * season * (1 + r.gauss(0, noise))
        v = max(floor, v)
        out.append(int(round(v)) if integer else round(v, 2))
    return out


def daily(r, spec, n=DAYS):
    """spec: {key: dict(base=..., trend=..., ...)} -> [{date, key: value...}]"""
    cols = {k: series(r, n=n, **v) for k, v in spec.items()}
    return [{"date": d, **{k: cols[k][i] for k in cols}} for i, d in enumerate(days(n))]


def ts(r, max_hours=72):
    """A timestamp within the last `max_hours`, ISO format."""
    t = NOW - timedelta(minutes=r.randint(0, max_hours * 60))
    return t.isoformat(timespec="minutes")


def past_date(r, max_days=60):
    return (END - timedelta(days=r.randint(0, max_days))).isoformat()


def future_date(r, max_days=60, min_days=0):
    return (END + timedelta(days=r.randint(min_days, max_days))).isoformat()


def weighted(r, options):
    """options: [(value, weight)]"""
    total = sum(w for _, w in options)
    x = r.uniform(0, total)
    for v, w in options:
        x -= w
        if x <= 0:
            return v
    return options[-1][0]


def write(slug, data):
    OUT_DIR.mkdir(parents=True, exist_ok=True)
    path = OUT_DIR / f"{slug}.json"
    path.write_text(json.dumps(data, separators=(",", ":"), ensure_ascii=False))
    return path
