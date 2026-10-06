"""Sample data: enterprise software projects."""
import math
from datetime import timedelta

from common import END, NOW, daily, future_date, past_date, person, rng, ts, weighted, write


def pipetrack():
    r = rng(401)
    reps = [person(r) for _ in range(8)]
    stages = ["Lead", "Qualified", "Demo", "Proposal", "Negotiation", "Won"]
    d = daily(r, {
        "calls": dict(base=120, trend=0.2, weekly=0.3, noise=0.15),
        "meetings": dict(base=26, trend=0.25, weekly=0.3, noise=0.2),
        "demos": dict(base=9, trend=0.3, weekly=0.3, noise=0.3),
        "proposals": dict(base=4, trend=0.3, weekly=0.3, noise=0.35),
    })
    companies = ["Apex Pharma", "Zenith Steels", "BlueOcean Logistics", "Nimbus Retail", "Orbit Telecom", "Crest Hospitals", "Vertex Auto",
                 "Prism Foods", "Summit Textiles", "Harbor Insurance", "Aurora Schools", "Quantum Labs", "Evergreen Agro", "Pinnacle Realty"]
    deals = []
    for i in range(40):
        st = weighted(r, [(s, w) for s, w in zip(stages, [6, 5, 4, 3, 2, 2])])
        deals.append({"id": f"D-{3300 + i}", "company": r.choice(companies), "value": r.randint(3, 80) * 100000, "stage": st,
                      "owner": r.choice(reps), "nextStep": r.choice(["Send proposal", "Schedule demo", "Pricing call", "Security review", "Contract redlines", "Intro call"]),
                      "due": future_date(r, 14, -3), "probability": [10, 25, 40, 60, 80, 100][stages.index(st)]})
    rep_stats = []
    for rep in reps:
        target = r.randint(40, 90) * 100000
        rep_stats.append({"name": rep, "target": target, "achieved": int(target * r.uniform(0.35, 1.15)),
                          "calls": r.randint(180, 520), "meetings": r.randint(30, 110), "demos": r.randint(8, 40), "proposals": r.randint(3, 22)})
    write("pipetrack-sales-activity-tracker", {"daily": d, "deals": deals, "reps": rep_stats, "stages": stages})


def gatepass():
    r = rng(402)
    types = ["Guest", "Delivery", "Domestic staff", "Cab", "Service"]
    d = daily(r, {
        "guest": dict(base=140, trend=0.1, weekly=-0.25, noise=0.15, weekend_dip=False),
        "delivery": dict(base=310, trend=0.25, weekly=0.1, noise=0.12),
        "staff": dict(base=180, trend=0.05, weekly=0.05, noise=0.06),
        "cab": dict(base=95, trend=0.15, weekly=0.1, noise=0.15),
        "service": dict(base=28, trend=0.1, weekly=0.2, noise=0.3),
    })
    towers = ["A", "B", "C", "D"]
    log = []
    companies = ["Swiggy", "Zomato", "Amazon", "Flipkart", "Blinkit", "BigBasket", "Urban Company", "Uber", "Ola", "Rapido"]
    for i in range(50):
        t = weighted(r, [("Delivery", 5), ("Guest", 3), ("Domestic staff", 2), ("Cab", 2), ("Service", 1)])
        log.append({"id": f"GP-{60000 + i}", "name": r.choice(companies) if t in ("Delivery", "Cab") else person(r), "type": t,
                    "flat": f"{r.choice(towers)}-{r.randint(1, 18)}{r.randint(0, 1)}{r.randint(1, 4)}", "in": ts(r, 10),
                    "out": None if r.random() < 0.3 else "done", "approvedBy": weighted(r, [("Resident app", 6), ("Pre-approved pass", 3), ("Guard call", 1)]),
                    "gate": r.choice(["Main gate", "Gate 2"])})
    log.sort(key=lambda x: x["in"], reverse=True)
    pending = []
    for i in range(5):
        t = r.choice(["Guest", "Delivery", "Service"])
        pending.append({"id": f"REQ-{i}", "name": person(r) if t != "Delivery" else r.choice(companies), "type": t,
                        "flat": f"{r.choice(towers)}-{r.randint(1, 18)}0{r.randint(1, 4)}", "waiting": r.randint(10, 240)})
    staff = []
    roles = ["Housekeeping", "Cook", "Driver", "Nanny", "Gardener"]
    for i in range(16):
        staff.append({"id": f"ST-{100 + i}", "name": person(r), "role": r.choice(roles), "flats": r.randint(1, 6),
                      "attendance": [1 if r.random() < 0.88 else 0 for _ in range(28)], "lastIn": ts(r, 30)})
    heat = [[int(max(0, (60 if 7 <= h <= 10 else 45 if 18 <= h <= 21 else 25 if 11 <= h <= 17 else 6) * (1.25 if wd >= 5 else 1) * r.uniform(0.7, 1.3))) for h in range(24)] for wd in range(7)]
    write("gatepass-visitor-management", {"daily": d, "log": log, "pending": pending, "staff": staff, "heat": heat, "types": types})


def fieldpro():
    r = rng(403)
    techs = [{"name": person(r), "skill": s, "zone": z} for s, z in
             [("HVAC", "North"), ("HVAC", "South"), ("Generators", "East"), ("Chillers", "West"), ("HVAC", "Central"), ("Electrical", "North"), ("Generators", "South"), ("Chillers", "Central")]]
    d = daily(r, {
        "opened": dict(base=46, trend=0.2, weekly=0.2, noise=0.15),
        "closed": dict(base=44, trend=0.25, weekly=0.2, noise=0.15),
        "pm": dict(base=30, trend=0.1, weekly=0.3, noise=0.15),
    })
    clients = ["Phoenix Mall", "Manipal Hospital", "TCS Campus", "Hotel Grand Residency", "City Data Centre", "Lulu Hypermarket", "Infosys DC", "Apollo Clinic"]
    tickets = []
    for i in range(30):
        pr = weighted(r, [("P1", 1), ("P2", 3), ("P3", 5)])
        sla_h = {"P1": 4, "P2": 12, "P3": 48}[pr]
        age = r.uniform(0.2, sla_h * 1.4)
        tickets.append({"id": f"TK-{12000 + i}", "client": r.choice(clients), "asset": r.choice(["Split AC 2T", "VRF outdoor unit", "500 kVA DG set", "Air-cooled chiller", "AHU-3", "Cassette AC"]),
                        "issue": r.choice(["Not cooling", "Unusual noise", "Water leakage", "Fails to start", "High discharge pressure", "Error code E4", "Scheduled PM"]),
                        "priority": pr, "slaHours": sla_h, "ageHours": round(age, 1),
                        "tech": r.choice([t["name"] for t in techs] + [None, None]), "status": weighted(r, [("Open", 3), ("Assigned", 3), ("On site", 2), ("Parts awaited", 1)])})
    tickets.sort(key=lambda t: t["ageHours"] / t["slaHours"], reverse=True)
    schedule = []
    for t in techs:
        row = []
        for day in range(6):
            row.append([{"client": r.choice(clients), "type": r.choice(["PM", "Breakdown", "Install"]), "slot": s}
                        for s in sorted(r.sample(["09:00", "11:00", "14:00", "16:30"], r.randint(1, 3)))])
        schedule.append({"tech": t["name"], "skill": t["skill"], "days": row})
    contracts = []
    for i in range(20):
        contracts.append({"id": f"AMC-{700 + i}", "client": r.choice(clients), "assets": r.randint(4, 120), "value": r.randint(2, 40) * 50000,
                          "expires": future_date(r, 120, -10), "visitsDone": r.randint(1, 4), "visitsTotal": 4, "renewal": "Not contacted"})
    contracts.sort(key=lambda c: c["expires"])
    write("fieldpro-service-operations", {"daily": d, "tickets": tickets, "techs": techs, "schedule": schedule, "contracts": contracts,
                                          "days": [(END + timedelta(days=i)).isoformat() for i in range(6)]})


def campusly():
    r = rng(404)
    classes = [f"{g}{s}" for g in range(5, 11) for s in "AB"]
    subjects = ["Maths", "Science", "English", "Social", "Hindi", "Computer"]
    att = [[round(min(100, r.gauss(93 - (2 if c.endswith("B") else 0), 3.5)), 1) for _ in range(20)] for c in classes]
    d = daily(r, {
        "feesCollected": dict(base=310000, trend=-0.2, weekly=0.3, noise=0.6, floor=0),
        "attendance": dict(base=92.5, trend=0.0, weekly=0.01, noise=0.02, integer=False),
    })
    students = []
    for i in range(60):
        due = r.choice([0, 0, 0, 12500, 25000, 37500])
        students.append({"id": f"STU-{2000 + i}", "name": person(r), "class": r.choice(classes), "attendance": round(min(100, r.gauss(91, 6)), 1),
                         "feeDue": due, "dueDays": r.randint(5, 75) if due else 0, "parent": person(r).split()[0] + " (parent)",
                         "phone": f"98{r.randint(10000000, 99999999)}", "reminded": False,
                         "scores": {s: max(28, min(100, int(r.gauss(72, 13)))) for s in subjects}})
    timetable = {}
    periods = ["8:30", "9:20", "10:10", "11:15", "12:05", "1:30", "2:20"]
    teachers = {s: person(r) for s in subjects}
    for c in classes[:4]:
        timetable[c] = [[r.choice(subjects + ["PT", "Library"]) for _ in periods] for _ in range(6)]
    write("campusly-school-erp", {"daily": d, "classes": classes, "subjects": subjects, "attendance": att, "students": students,
                                  "timetable": timetable, "periods": periods, "teachers": teachers,
                                  "feePlan": {"total": 18600000, "collected": 15240000}})


def floodwatch():
    r = rng(405)
    stations = []
    names = ["Hemavathi Bridge", "Kabini Dam Inflow", "Lakshmana Tirtha", "Cauvery @ Srirangapatna", "Shimsha Weir", "Arkavathi Gauge",
             "Harangi Outflow", "Kumaradhara", "Netravati @ Bantwal", "Tunga @ Shivamogga", "Bhadra Inflow", "Varada @ Hangal"]
    for i, n in enumerate(names):
        danger = round(r.uniform(6, 14), 1)
        stations.append({"id": f"ST-{i + 1:02d}", "name": n, "x": round(r.uniform(0.08, 0.92), 2), "y": round(r.uniform(0.1, 0.9), 2),
                         "danger": danger, "warning": round(danger * 0.8, 1), "kind": "River gauge" if i % 3 else "Rain gauge",
                         "online": r.random() > 0.08})
    hours = [(NOW - timedelta(hours=47 - h)).isoformat(timespec="minutes") for h in range(48)]
    readings = {}
    rain = {}
    for s in stations:
        peak = r.randint(20, 44)
        intensity = r.uniform(0.55, 1.12)
        readings[s["id"]] = [round(max(0.5, s["danger"] * intensity * (0.45 + 0.55 * math.exp(-((h - peak) / 9) ** 2)) + r.gauss(0, 0.15)), 2) for h in range(48)]
        rain[s["id"]] = [round(max(0, 22 * intensity * math.exp(-((h - peak + 6) / 6) ** 2) + r.gauss(0, 1.2)), 1) for h in range(48)]
    alerts = []
    for s in stations:
        lvl = readings[s["id"]]
        for h, v in enumerate(lvl):
            if v >= s["warning"] and (h == 0 or lvl[h - 1] < s["warning"]):
                alerts.append({"id": f"AL-{s['id']}-{h}", "station": s["name"], "hour": h, "ts": hours[h],
                               "level": "Danger" if v >= s["danger"] else "Warning", "value": v})
    alerts.sort(key=lambda a: a["hour"], reverse=True)
    d = daily(r, {"rainfall": dict(base=18, trend=0.2, weekly=0.0, noise=0.9, weekend_dip=False, integer=False)})
    write("floodwatch-rainfall-monitoring-dashboard", {"stations": stations, "hours": hours, "readings": readings, "rain": rain, "alerts": alerts, "daily": d})


def run():
    pipetrack()
    gatepass()
    fieldpro()
    campusly()
    floodwatch()
