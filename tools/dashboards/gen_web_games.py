"""Sample data: website projects and game concepts."""
import math
from datetime import timedelta

from common import CITIES, END, NOW, daily, future_date, past_date, person, rng, ts, weighted, write


def _web_traffic(r, base):
    d = daily(r, {
        "organic": dict(base=base * 0.48, trend=0.6, weekly=0.18, noise=0.1),
        "direct": dict(base=base * 0.2, trend=0.2, weekly=0.18, noise=0.1),
        "referral": dict(base=base * 0.12, trend=0.3, weekly=0.18, noise=0.18),
        "paid": dict(base=base * 0.14, trend=0.1, weekly=0.18, noise=0.15),
        "social": dict(base=base * 0.06, trend=0.4, weekly=0.1, noise=0.25),
    })
    for row in d:
        row["sessions"] = row["organic"] + row["direct"] + row["referral"] + row["paid"] + row["social"]
    return d


def gridmind():
    r = rng(501)
    d = _web_traffic(r, 2600)
    for row in d:
        row["leads"] = max(0, int(row["sessions"] * r.uniform(0.006, 0.012)))
    pages = [("/products/scada-suite", "SCADA Suite"), ("/industries/solar", "Solar plants"), ("/products/energy-analytics", "Energy Analytics"),
             ("/resources/datasheets", "Datasheets"), ("/industries/utilities", "Utilities"), ("/about", "About"), ("/blog/predictive-maintenance-solar", "Blog: predictive maintenance"),
             ("/request-demo", "Request a demo")]
    top_pages = [{"path": p, "title": t, "views": r.randint(1800, 26000), "avgTime": r.randint(35, 260), "bounce": round(r.uniform(28, 71), 1)} for p, t in pages]
    top_pages.sort(key=lambda x: -x["views"])
    stages = ["New", "Contacted", "Demo scheduled", "Proposal", "Won"]
    leads = []
    for i in range(26):
        leads.append({"id": f"LD-{510 + i}", "name": person(r), "company": r.choice(["SunPeak Renewables", "Greenfield Power", "KSEB Division", "Adarsh Solar Parks", "WindHarbor Energy", "Tata Power Ren. (Plant 4)", "Mahagenco Unit", "Azure Fields"]),
                      "role": r.choice(["Plant manager", "O&M lead", "Procurement head", "CTO", "Asset manager"]), "source": r.choice(["Organic search", "LinkedIn", "Referral", "Datasheet download", "Webinar"]),
                      "interest": r.choice(["SCADA Suite", "Energy Analytics", "Remote monitoring"]), "stage": weighted(r, [(s, w) for s, w in zip(stages, [5, 4, 3, 2, 1])]),
                      "date": past_date(r, 25), "country": r.choice(["India", "India", "India", "UAE", "Kenya", "Vietnam"])})
    leads.sort(key=lambda x: x["date"], reverse=True)
    content = [
        {"id": "C1", "title": "Predictive maintenance for solar inverters", "type": "Blog", "status": "Published", "author": person(r), "updated": past_date(r, 20)},
        {"id": "C2", "title": "SCADA Suite 5.2 datasheet", "type": "Datasheet", "status": "Published", "author": person(r), "updated": past_date(r, 40)},
        {"id": "C3", "title": "Case study: 120 MW solar park monitoring", "type": "Case study", "status": "In review", "author": person(r), "updated": past_date(r, 5)},
        {"id": "C4", "title": "Webinar: Grid compliance in 2027", "type": "Event", "status": "Draft", "author": person(r), "updated": past_date(r, 3)},
        {"id": "C5", "title": "Energy Analytics pricing page", "type": "Page", "status": "Draft", "author": person(r), "updated": past_date(r, 2)},
        {"id": "C6", "title": "Hindi product overview", "type": "Page", "status": "In review", "author": person(r), "updated": past_date(r, 7)},
    ]
    countries = [{"label": c, "value": v} for c, v in [("India", 61), ("UAE", 9), ("Vietnam", 7), ("Kenya", 6), ("Germany", 5), ("Other", 12)]]
    write("gridmind-energy-automation-website", {"daily": d, "pages": top_pages, "leads": leads, "stages": stages, "content": content, "countries": countries,
                                                 "vitals": {"lcp": 1.6, "cls": 0.03, "inp": 120, "score": 96}})


def portlane():
    r = rng(502)
    ports = {"Nhava Sheva": [0.22, 0.52], "Mundra": [0.18, 0.44], "Chennai": [0.3, 0.66], "Jebel Ali": [0.12, 0.38], "Singapore": [0.52, 0.78],
             "Rotterdam": [0.04, 0.08], "Shanghai": [0.72, 0.34], "Hamburg": [0.06, 0.06], "Los Angeles": [0.96, 0.36], "Colombo": [0.33, 0.74]}
    milestones = ["Booking confirmed", "Cargo received", "Customs cleared (export)", "Loaded on vessel", "Departed", "Transhipment", "Arrived POD", "Customs cleared (import)", "Delivered"]
    shipments = []
    vessels = ["MSC Aurora", "Maersk Kensington", "CMA CGM Tage", "ONE Harmony", "Ever Gentle", "Hapag Bremen"]
    for i in range(30):
        # Exports from Indian ports to overseas destinations.
        pol = r.choice(["Nhava Sheva", "Mundra", "Chennai"])
        pod = r.choice([p for p in ports if p not in ("Nhava Sheva", "Mundra", "Chennai")])
        step = r.randint(1, len(milestones) - 1)
        eta = future_date(r, 30, -3)
        delay = r.random() < 0.2 and step < len(milestones) - 1
        shipments.append({"id": f"PLN{24000 + i}", "container": f"{r.choice(['MSCU', 'MAEU', 'CMAU', 'ONEU', 'HLXU'])}{r.randint(1000000, 9999999)}",
                          "customer": r.choice(["Sundaram Auto", "Arvind Exports", "Cipla Logistics", "Bajaj Electricals", "Titan Watches", "Welspun Home"]),
                          "mode": weighted(r, [("Sea FCL", 6), ("Sea LCL", 2), ("Air", 2)]), "pol": pol, "pod": pod, "vessel": r.choice(vessels),
                          "step": step, "eta": eta, "delayed": delay, "teu": r.choice([1, 2, 2, 4]), "updated": ts(r, 30)})
    d = daily(r, {"teu": dict(base=86, trend=0.25, weekly=0.2, noise=0.15), "quotes": dict(base=34, trend=0.35, weekly=0.2, noise=0.2),
                  "portalLogins": dict(base=420, trend=0.6, weekly=0.2, noise=0.12)})
    lanes = [{"label": f"{a} → {b}", "value": r.randint(60, 900)} for a, b in [("Nhava Sheva", "Rotterdam"), ("Chennai", "Singapore"), ("Mundra", "Jebel Ali"),
                                                                                ("Nhava Sheva", "Los Angeles"), ("Chennai", "Hamburg"), ("Mundra", "Shanghai")]]
    write("portlane-freight-forwarding-website", {"daily": d, "shipments": shipments, "milestones": milestones, "ports": ports,
                                                  "lanes": sorted(lanes, key=lambda x: -x["value"])})


def atelier_nine():
    r = rng(503)
    d = _web_traffic(r, 720)
    for row in d:
        row["enquiries"] = max(0, int(row["sessions"] * r.uniform(0.008, 0.02)))
    projects = [("The Banyan Residence", "Residential"), ("Kora Café", "Hospitality"), ("Fintech HQ, Level 9", "Workplace"), ("Monsoon Villa", "Residential"),
                ("Saffron Boutique Hotel", "Hospitality"), ("Studio Loft 4B", "Residential"), ("Courtyard Clinic", "Workplace")]
    project_views = [{"label": p, "value": r.randint(900, 9800), "type": t} for p, t in projects]
    enquiries = []
    for i in range(22):
        t = weighted(r, [("Residential", 6), ("Hospitality", 2), ("Workplace", 2)])
        size = r.randint(900, 9000)
        budget = r.choice(["₹25–50L", "₹50L–1Cr", "₹1–2Cr", "₹2Cr+"])
        timeline = r.choice(["Immediately", "In 3 months", "In 6 months", "Exploring"])
        fit = (40 if budget in ("₹1–2Cr", "₹2Cr+") else 20) + (30 if size > 2500 else 10) + (30 if timeline != "Exploring" else 5)
        enquiries.append({"id": f"EN-{300 + i}", "name": person(r), "type": t, "size": size, "city": r.choice(["Bengaluru", "Mumbai", "Goa", "Hyderabad", "Pune"]),
                          "budget": budget, "timeline": timeline, "fit": fit, "status": weighted(r, [("New", 4), ("Call booked", 3), ("Site visit", 2), ("Proposal sent", 1), ("Declined", 1)]),
                          "date": past_date(r, 30), "source": r.choice(["Instagram", "Google", "Referral", "Houzz", "Architect partner"])})
    enquiries.sort(key=lambda e: -e["fit"])
    write("atelier-nine-interior-studio-website", {"daily": d, "projectViews": sorted(project_views, key=lambda x: -x["value"]), "enquiries": enquiries,
                                                   "sources": [{"label": s, "value": v} for s, v in [("Instagram", 38), ("Google", 27), ("Referral", 18), ("Architect partner", 11), ("Houzz", 6)]]})


def rangoli_rush():
    r = rng(601)
    d = daily(r, {
        "dau": dict(base=42000, trend=0.7, weekly=-0.12, noise=0.06, weekend_dip=False),
        "installs": dict(base=6800, trend=0.4, weekly=-0.12, noise=0.15, weekend_dip=False),
        "iapRevenue": dict(base=58000, trend=0.8, weekly=-0.15, noise=0.18, weekend_dip=False),
        "adRevenue": dict(base=41000, trend=0.6, weekly=-0.12, noise=0.12, weekend_dip=False),
    })
    # Diwali spike near the end of the period
    for i, row in enumerate(d[-20:-8]):
        for k in ("dau", "installs", "iapRevenue"):
            row[k] = int(row[k] * (1.25 + 0.04 * i))
    cohorts = []
    for w in range(8):
        base = r.uniform(0.38, 0.46)
        row = [100.0]
        for k in range(1, 8 - w):
            row.append(round(100 * base * math.exp(-0.18 * (k - 1)) * r.uniform(0.92, 1.08), 1))
        cohorts.append({"cohort": (END - timedelta(weeks=8 - w)).isoformat(), "users": r.randint(30000, 52000), "retention": row})
    levels = []
    players = 100000
    for lv in range(1, 41):
        hard = lv in (12, 19, 27, 33, 38)
        win = round(r.uniform(0.32, 0.45) if hard else r.uniform(0.58, 0.86), 2)
        drop = round((0.09 if hard else 0.018) * r.uniform(0.7, 1.3), 3)
        levels.append({"level": lv, "players": int(players), "winRate": win, "avgAttempts": round(1 / win, 1), "boosterUse": round(r.uniform(0.05, 0.4) + (0.2 if hard else 0), 2)})
        players *= 1 - drop
    events = [{"name": "Diwali Diya Dash", "start": future_date(r, 0), "status": "Live", "participants": 61400},
              {"name": "Navratri Garba Glow", "start": past_date(r, 20), "status": "Ended", "participants": 54200},
              {"name": "Children's Day Doodles", "start": future_date(r, 40, 30), "status": "Scheduled", "participants": 0}]
    write("rangoli-rush-puzzle-game", {"daily": d, "cohorts": cohorts, "levels": levels, "events": events})


def gully_strikers():
    r = rng(602)
    d = daily(r, {
        "matches": dict(base=88000, trend=0.6, weekly=-0.15, noise=0.08, weekend_dip=False),
        "dau": dict(base=61000, trend=0.55, weekly=-0.15, noise=0.07, weekend_dip=False),
        "avgWait": dict(base=11, trend=-0.35, weekly=0.1, noise=0.15, integer=False, weekend_dip=False),
    })
    ccu = [{"label": f"{h:02d}:00", "value": int(max(800, 14000 * (0.15 + 0.85 * math.exp(-((h - 21) / 3.2) ** 2) + 0.35 * math.exp(-((h - 13) / 2) ** 2)) * r.uniform(0.92, 1.08)))} for h in range(24)]
    regions = [{"label": c, "value": r.randint(4000, 26000)} for c in CITIES]
    league = []
    teams = ["Dharavi Dashers", "Chandni Chowk Chargers", "Koramangala Kings", "Park Street Panthers", "Banjara Blasters", "Marina Mavericks",
             "Kothrud Comets", "Salt Lake Strikers", "Bandra Bulls", "Indiranagar Ignite"]
    for t in teams:
        w = r.randint(12, 34)
        l = r.randint(8, 26)
        league.append({"team": t, "played": w + l, "won": w, "lost": l, "nrr": round(r.uniform(-1.2, 1.6), 2), "points": w * 2})
    league.sort(key=lambda x: (-x["points"], -x["nrr"]))
    flags = []
    signals = ["Impossible reaction time (38 ms)", "Score submitted without match session", "Modified client signature", "Win streak 47 vs top-1% opponents",
               "Multiple accounts on one device", "Packet timing manipulation"]
    for i in range(12):
        flags.append({"id": f"FLG-{900 + i}", "player": f"{r.choice(['Sixer', 'Yorker', 'Googly', 'Dhoom', 'Bouncer', 'Paaji'])}{r.randint(10, 9999)}",
                      "signal": r.choice(signals), "confidence": r.randint(61, 99), "matches": r.randint(3, 140), "ts": ts(r, 20), "status": "Open"})
    flags.sort(key=lambda f: -f["confidence"])
    write("gully-strikers-cricket-game", {"daily": d, "ccu": ccu, "regions": sorted(regions, key=lambda x: -x["value"]), "league": league, "flags": flags, "teams": teams})


def lexiquest():
    r = rng(603)
    skills = ["Phonics", "Sight words", "Vocabulary", "Spelling", "Comprehension", "Rhyming"]
    students = []
    for i in range(28):
        level = r.randint(1, 6)
        students.append({"id": f"KID-{100 + i}", "name": person(r).split()[0], "grade": r.choice([2, 3, 4]), "level": level,
                         "words": r.randint(40, 420), "minutesWeek": r.randint(25, 160), "streak": r.randint(0, 21),
                         "skills": {s: max(20, min(100, int(r.gauss(55 + level * 6, 12)))) for s in skills},
                         "lastActive": ts(r, 96)})
    d = daily(r, {"minutes": dict(base=880, trend=0.3, weekly=0.35, noise=0.12), "wordsLearned": dict(base=190, trend=0.35, weekly=0.35, noise=0.15),
                  "accuracy": dict(base=78, trend=0.06, weekly=0.02, noise=0.03, integer=False)})
    lists = [{"id": "WL1", "name": "Long vowel sounds", "words": 24, "assigned": False}, {"id": "WL2", "name": "Animals and habitats", "words": 30, "assigned": True},
             {"id": "WL3", "name": "Silent letters", "words": 18, "assigned": False}, {"id": "WL4", "name": "Science words: plants", "words": 22, "assigned": False}]
    write("lexiquest-learning-game", {"daily": d, "students": students, "skills": skills, "lists": lists, "dailyLimit": 30})


def run():
    gridmind()
    portlane()
    atelier_nine()
    rangoli_rush()
    gully_strikers()
    lexiquest()
