"""Sample data: mobile-app projects."""
from common import CITIES, END, daily, days, future_date, past_date, person, rng, ts, weighted, write
from datetime import date, timedelta


def buildbridge():
    r = rng(301)
    trades = ["Electrician", "Plumber", "Mason", "Carpenter", "Painter", "Interior contractor", "Waterproofing"]
    d = daily(r, {
        "requests": dict(base=240, trend=0.5, weekly=-0.1, noise=0.12, weekend_dip=False),
        "quotes": dict(base=610, trend=0.5, weekly=-0.1, noise=0.12, weekend_dip=False),
        "completed": dict(base=150, trend=0.45, weekly=-0.1, noise=0.14, weekend_dip=False),
    })
    contractors = []
    for i in range(28):
        contractors.append({"id": f"CON-{300 + i}", "name": person(r), "trade": r.choice(trades), "city": r.choice(CITIES[:6]),
                            "rating": round(r.uniform(3.6, 4.95), 1), "jobs": r.randint(4, 260), "verified": r.random() > 0.2,
                            "response": r.randint(8, 240), "earnings30": r.randint(15, 180) * 1000})
    jobs = []
    names = {"Electrician": "Rewiring 2BHK", "Plumber": "Bathroom leak repair", "Mason": "Compound wall", "Carpenter": "Modular wardrobe",
             "Painter": "Full home repaint", "Interior contractor": "Kitchen remodel", "Waterproofing": "Terrace waterproofing"}
    for i in range(34):
        t = r.choice(trades)
        con = r.choice([c for c in contractors if c["trade"] == t] or contractors)
        total = r.randint(4, 120) * 1000
        ms = r.randint(2, 4)
        done = r.randint(0, ms)
        jobs.append({"id": f"JOB-{7700 + i}", "title": names[t], "trade": t, "customer": person(r), "contractor": con["name"],
                     "city": con["city"], "value": total, "milestones": ms, "done": done,
                     "escrow": int(total * (ms - done) / ms), "status": "Completed" if done == ms else weighted(r, [("In progress", 5), ("Awaiting approval", 2), ("Disputed", 1)]),
                     "started": past_date(r, 30)})
    trade_jobs = [{"label": t, "value": sum(1 for j in jobs if j["trade"] == t) * r.randint(30, 60)} for t in trades]
    write("buildbridge-contractor-network-app", {"daily": d, "contractors": contractors, "jobs": jobs,
                                                 "tradeJobs": sorted(trade_jobs, key=lambda x: -x["value"]), "trades": trades})


def paynest():
    r = rng(302)
    d = daily(r, {
        "volume": dict(base=48000000, trend=0.45, weekly=0.08, noise=0.08, weekend_dip=False),
        "txns": dict(base=212000, trend=0.4, weekly=0.08, noise=0.08, weekend_dip=False),
        "failed": dict(base=2300, trend=-0.2, weekly=0.1, noise=0.15, weekend_dip=False),
        "newUsers": dict(base=6400, trend=0.3, weekly=0.1, noise=0.12, weekend_dip=False),
    })
    for row in d:
        row["successRate"] = round(100 - row["failed"] / row["txns"] * 100, 2)
    billers = [{"label": b, "value": r.randint(20, 160) * 100000} for b in
               ["Electricity", "Mobile recharge", "Broadband", "DTH", "Gas cylinder", "Water", "FASTag", "Parking"]]
    reasons = ["Bank server timeout", "Insufficient balance", "Incorrect UPI PIN", "Biller unavailable", "Network error", "Daily limit exceeded"]
    failed = []
    for i in range(30):
        failed.append({"id": f"TXN{8800000 + r.randint(0, 99999)}", "user": person(r), "amount": r.randint(50, 12000),
                       "type": r.choice(["Bill pay", "Send money", "Recharge", "Scan & pay"]), "reason": r.choice(reasons),
                       "ts": ts(r, 24), "refund": weighted(r, [("Auto-refunded", 6), ("Refund pending", 3), ("Not applicable", 2)])})
    failed.sort(key=lambda f: f["ts"], reverse=True)
    fraud = []
    signals = ["New device + high value transfer", "5 failed PIN attempts", "Velocity: 12 txns in 3 min", "Mule account pattern",
               "Location jump: 2 cities in 10 min", "Beneficiary added and paid within 1 min"]
    for i in range(14):
        fraud.append({"id": f"FR-{4100 + i}", "user": person(r), "amount": r.randint(2, 95) * 1000, "signal": r.choice(signals),
                      "score": r.randint(62, 99), "ts": ts(r, 12), "status": "Pending"})
    fraud.sort(key=lambda x: -x["score"])
    write("paynest-digital-wallet-app", {"daily": d, "billers": sorted(billers, key=lambda x: -x["value"]), "failed": failed, "fraud": fraud,
                                         "mix": [{"label": "Scan & pay", "value": 41}, {"label": "Send money", "value": 29},
                                                 {"label": "Bill pay", "value": 18}, {"label": "Recharge", "value": 12}]})


def dashdrop():
    r = rng(303)
    d = daily(r, {
        "deliveries": dict(base=1350, trend=0.5, weekly=0.12, noise=0.1),
        "onTime": dict(base=1200, trend=0.52, weekly=0.12, noise=0.1),
        "revenue": dict(base=162000, trend=0.5, weekly=0.12, noise=0.1),
    })
    hours = [{"label": f"{h}:00", "value": int(max(4, 120 * (0.4 + 0.6 * (1 if 11 <= h <= 14 or 17 <= h <= 21 else 0.35)) * r.uniform(0.8, 1.2)))} for h in range(7, 24)]
    # City grid 12x8 blocks; riders follow waypoint routes.
    riders = []
    for i in range(14):
        route = [[r.randint(0, 12), r.randint(0, 8)]]
        for _ in range(5):
            x, y = route[-1]
            if r.random() < 0.5:
                route.append([max(0, min(12, x + r.choice([-3, -2, 2, 3]))), y])
            else:
                route.append([x, max(0, min(8, y + r.choice([-2, -1, 1, 2])))])
        st = weighted(r, [("Delivering", 6), ("To pickup", 3), ("Idle", 2), ("Offline", 1)])
        riders.append({"id": f"R-{110 + i}", "name": person(r), "status": st, "route": route, "vehicle": r.choice(["Bike", "Bike", "Scooter", "EV scooter"]),
                       "trips": r.randint(4, 22), "earnings": r.randint(450, 2200), "rating": round(r.uniform(4.2, 4.98), 2)})
    areas = ["Koramangala", "Indiranagar", "HSR Layout", "Whitefield", "Jayanagar", "Malleshwaram", "Electronic City", "Hebbal"]
    orders = []
    for i in range(18):
        src, dst = r.sample(areas, 2)
        orders.append({"id": f"DD-{51200 + i}", "from": src, "to": dst, "size": r.choice(["Small", "Medium", "Large"]),
                       "fare": r.randint(49, 380), "placed": ts(r, 1), "pickup": [r.randint(0, 12), r.randint(0, 8)],
                       "priority": r.random() < 0.25})
    write("dashdrop-same-day-courier-app", {"daily": d, "hours": hours, "riders": riders, "orders": orders, "grid": [12, 8], "areas": areas})


def nestfinder():
    r = rng(304)
    d = daily(r, {
        "enquiries": dict(base=320, trend=0.4, weekly=-0.15, noise=0.12, weekend_dip=False),
        "visits": dict(base=74, trend=0.4, weekly=-0.2, noise=0.15, weekend_dip=False),
        "rentCollected": dict(base=920000, trend=0.2, weekly=0.0, noise=0.5, weekend_dip=False),
    })
    localities = ["Whitefield", "HSR Layout", "Indiranagar", "Hebbal", "Sarjapur Road", "BTM Layout", "Yelahanka"]
    props = []
    for i in range(24):
        bhk = r.choice([1, 2, 2, 3, 3, 4])
        occ = r.random() > 0.2
        rent = bhk * r.randint(9, 19) * 1000
        props.append({"id": f"P-{1300 + i}", "title": f"{bhk}BHK · {r.choice(['Prestige', 'Sobha', 'Brigade', 'Purva', 'Mantri', 'Godrej'])} {r.choice(['Lakeside', 'Parkview', 'Meadows', 'Heights', 'Greens'])}",
                      "locality": r.choice(localities), "bhk": bhk, "rent": rent, "occupied": occ,
                      "tenant": person(r) if occ else None, "rentStatus": weighted(r, [("Paid", 7), ("Due", 2), ("Overdue", 1)]) if occ else "Vacant",
                      "views": r.randint(40, 900), "leaseEnd": future_date(r, 300, 10) if occ else None})
    tickets = []
    issues = ["Leaking kitchen tap", "AC not cooling", "Geyser repair", "Seepage in bedroom wall", "Door lock jammed", "Pest control", "Power socket burnt"]
    for i in range(16):
        p = r.choice([x for x in props if x["occupied"]])
        tickets.append({"id": f"MT-{600 + i}", "property": p["title"], "issue": r.choice(issues),
                        "status": weighted(r, [("Open", 3), ("Assigned", 3), ("In progress", 2), ("Done", 3)]),
                        "priority": weighted(r, [("Low", 3), ("Medium", 4), ("High", 2)]), "raised": past_date(r, 10)})
    visits = []
    for i in range(20):
        p = r.choice(props)
        dte = (END + timedelta(days=r.randint(0, 6))).isoformat()
        visits.append({"id": f"V-{900 + i}", "property": p["title"], "visitor": person(r), "date": dte,
                       "slot": r.choice(["10:00", "11:30", "13:00", "16:00", "17:30", "19:00"]),
                       "status": weighted(r, [("Confirmed", 5), ("Requested", 3), ("Rescheduled", 1)])})
    loc_rent = [{"label": l, "value": r.randint(18, 52) * 1000} for l in localities]
    write("nestfinder-rental-property-platform", {"daily": d, "properties": props, "tickets": tickets, "visits": sorted(visits, key=lambda v: (v["date"], v["slot"])),
                                                  "localityRent": sorted(loc_rent, key=lambda x: -x["value"])})


def mindmove():
    r = rng(305)
    d = daily(r, {
        "steps": dict(base=7200, trend=0.25, weekly=0.15, noise=0.25),
        "activeMin": dict(base=38, trend=0.3, weekly=0.2, noise=0.3),
        "sleep": dict(base=6.8, trend=0.05, weekly=0.05, noise=0.08, integer=False),
        "mindful": dict(base=8, trend=0.6, weekly=0.1, noise=0.5),
    })
    for i, row in enumerate(d):
        row["mood"] = max(1, min(5, round(3.2 + 0.6 * (row["activeMin"] > 40) + 0.4 * (row["sleep"] > 7) + r.gauss(0, 0.6))))
    habits = [
        {"id": "h1", "name": "Drink 8 glasses of water", "icon": "droplet"},
        {"id": "h2", "name": "Read 20 minutes", "icon": "book"},
        {"id": "h3", "name": "No screens after 10 pm", "icon": "moon"},
        {"id": "h4", "name": "10-minute stretch", "icon": "activity"},
        {"id": "h5", "name": "Gratitude journal", "icon": "heart"},
    ]
    habit_log = {h["id"]: [1 if r.random() < p else 0 for _ in range(35)] for h, p in zip(habits, [0.85, 0.6, 0.45, 0.75, 0.55])}
    workouts = []
    kinds = [("HIIT", 22, 260), ("Yoga flow", 30, 140), ("Strength – upper", 40, 220), ("Run", 35, 320), ("Strength – lower", 40, 240), ("Walk", 45, 180)]
    for i in range(24):
        k, m, cal = r.choice(kinds)
        workouts.append({"id": f"W-{i}", "kind": k, "date": past_date(r, 28), "minutes": int(m * r.uniform(0.8, 1.25)),
                         "calories": int(cal * r.uniform(0.8, 1.25)), "effort": r.randint(4, 9)})
    workouts.sort(key=lambda w: w["date"], reverse=True)
    challenge = [{"name": "You", "value": 52300}] + [{"name": person(r).split()[0], "value": r.randint(30000, 68000)} for _ in range(5)]
    write("mindmove-fitness-mindfulness-app", {"daily": d, "habits": habits, "habitLog": habit_log, "workouts": workouts,
                                               "challenge": sorted(challenge, key=lambda x: -x["value"]), "goals": {"steps": 8000, "activeMin": 45, "sleep": 7.5, "mindful": 10}})


def run():
    buildbridge()
    paynest()
    dashdrop()
    nestfinder()
    mindmove()
