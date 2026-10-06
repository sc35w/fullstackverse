"""Sample data: AI & computer-vision projects."""
import math

from common import daily, past_date, person, rng, ts, weighted, write


def vigilo():
    r = rng(201)
    zones = ["Loading dock", "Aisle A", "Aisle B", "Cold storage", "Packing line", "Yard", "Chemical store", "Exit corridor"]
    cameras = []
    for i, z in enumerate(zones):
        for k in range(r.randint(1, 2)):
            cameras.append({"id": f"CAM-{i + 1:02d}{chr(65 + k)}", "name": f"{z} {k + 1}", "zone": z,
                            "status": weighted(r, [("Online", 12), ("Degraded", 1), ("Offline", 1)]),
                            "fps": r.choice([12, 15, 15, 20, 25]), "model": r.choice(["PPE v3.2", "Vehicle v2.1", "Fire/Smoke v1.4"])})
    types = [("Missing helmet", "serious", 30), ("Missing vest", "warning", 26), ("Forklift proximity", "critical", 12),
             ("Restricted zone entry", "serious", 9), ("Blocked exit", "warning", 8), ("Smoke detected", "critical", 2)]
    d = daily(r, {
        "helmet": dict(base=21, trend=-0.35, weekly=0.2, noise=0.25),
        "vest": dict(base=17, trend=-0.3, weekly=0.2, noise=0.25),
        "proximity": dict(base=7, trend=-0.25, weekly=0.2, noise=0.35),
        "zone": dict(base=5, trend=-0.2, weekly=0.2, noise=0.4),
        "exit": dict(base=4, trend=-0.4, weekly=0.1, noise=0.4),
    })
    for row in d:
        row["compliance"] = round(min(99.5, 88 + (row["date"] > "2026-07-01") * 4 + (100 - row["helmet"] - row["vest"]) * 0.06), 1)
    events = []
    for i in range(60):
        t, sev, _ = r.choices(types, weights=[w for *_, w in types])[0]
        cam = r.choice(cameras)
        events.append({"id": f"EV-{9000 + i}", "ts": ts(r, 48), "type": t, "severity": sev, "camera": cam["id"],
                       "zone": cam["zone"], "confidence": round(r.uniform(0.78, 0.99), 2),
                       "status": weighted(r, [("Open", 3), ("Acknowledged", 3), ("Resolved", 6)])})
    events.sort(key=lambda e: e["ts"], reverse=True)
    shift = [1.4 if 6 <= h < 14 else 1.1 if 14 <= h < 22 else 0.5 for h in range(24)]
    zone_hour = [[max(0, int(r.gauss(3, 1.5) * shift[h] * (1.8 if z in ("Loading dock", "Packing line") else 1))) for h in range(24)] for z in zones]
    write("vigilo-ai-safety-monitoring", {
        "zones": zones, "cameras": cameras, "events": events, "daily": d, "zoneHour": zone_hour,
        "types": [{"type": t, "severity": s} for t, s, _ in types],
    })


def framewise():
    r = rng(202)
    classes = ["person", "car", "truck", "bike", "helmet", "forklift"]
    annotators = [person(r) for _ in range(8)]
    d = daily(r, {
        "labels": dict(base=14200, trend=0.6, weekly=0.2, noise=0.12),
        "frames": dict(base=3100, trend=0.55, weekly=0.2, noise=0.12),
        "rejected": dict(base=420, trend=-0.3, weekly=0.2, noise=0.2),
    })
    clips = []
    datasets = ["Warehouse safety v4", "Traffic junctions BLR", "Retail footfall", "Construction PPE"]
    for i in range(36):
        frames = r.randint(300, 4800)
        done = r.randint(0, frames)
        st = "Approved" if done == frames and r.random() > 0.3 else weighted(r, [("Labelling", 4), ("In review", 3), ("Changes requested", 1), ("Not started", 1)])
        if st == "Not started":
            done = 0
        clips.append({"id": f"CLIP-{1400 + i}", "dataset": r.choice(datasets), "frames": frames, "done": done,
                      "assignee": r.choice(annotators), "status": st, "labels": done * r.randint(3, 9),
                      "agreement": round(r.uniform(0.82, 0.98), 2), "updated": ts(r, 96)})
    per_annotator = [{"label": a, "value": r.randint(9000, 42000), "accuracy": round(r.uniform(0.9, 0.99), 3)} for a in annotators]
    class_counts = [{"label": c, "value": r.randint(5000, 90000)} for c in classes]
    # A short scene with object tracks for the interactive annotator (normalised 0..1 coords).
    tracks = []
    for k, (cls, x, y, w, h, vx) in enumerate([("person", 0.12, 0.42, 0.07, 0.3, 0.012), ("forklift", 0.55, 0.38, 0.22, 0.32, -0.008),
                                                ("person", 0.78, 0.45, 0.06, 0.28, -0.006), ("helmet", 0.13, 0.4, 0.04, 0.06, 0.012)]):
        boxes = []
        for f in range(40):
            boxes.append([round(x + vx * f, 3), round(y + 0.004 * math.sin(f / 4 + k), 3), w, h])
        tracks.append({"id": k + 1, "cls": cls, "boxes": boxes})
    write("framewise-video-annotation-platform", {"daily": d, "clips": clips, "annotators": per_annotator,
                                                  "classes": class_counts, "classNames": classes, "tracks": tracks, "frames": 40})


def respira():
    r = rng(203)
    villages = ["Hosakote PHC", "Malur PHC", "Kolar CHC", "Chintamani PHC", "Bagepalli PHC"]
    d = daily(r, {
        "recordings": dict(base=64, trend=0.5, weekly=0.2, noise=0.15),
        "flagged": dict(base=11, trend=0.4, weekly=0.2, noise=0.25),
        "reviewed": dict(base=58, trend=0.5, weekly=0.2, noise=0.15),
    })
    patients = []
    for i in range(30):
        score = round(min(0.98, max(0.03, r.betavariate(1.6, 4.2))), 2)
        patients.append({
            "id": f"PT-{5600 + i}", "name": person(r), "age": r.randint(4, 82), "sex": r.choice(["F", "M"]),
            "clinic": r.choice(villages), "recorded": ts(r, 72), "site": r.choice(["Left upper lobe", "Right lower lobe", "Trachea", "Left lower lobe"]),
            "score": score, "symptoms": r.sample(["Cough > 2 weeks", "Breathlessness", "Fever", "Wheeze", "Chest pain", "Night sweats"], r.randint(1, 3)),
            "status": weighted(r, [("Awaiting review", 4), ("Reviewed", 6), ("Referred", 1)]), "spo2": r.randint(88, 99),
        })
    patients.sort(key=lambda p: -p["score"])
    # Synthetic breath-sound waveform & spectrogram for three example recordings.
    samples = {}
    for kind, crackle in [("normal", 0.0), ("wheeze", 0.0), ("crackles", 0.6)]:
        wave = []
        for t in range(480):
            breath = math.sin(2 * math.pi * t / 160) ** 2
            v = breath * (r.gauss(0, 0.35) + (0.5 * math.sin(t * 0.9) if kind == "wheeze" else 0))
            if crackle and r.random() < 0.04 * breath:
                v += r.choice([-1, 1]) * crackle * r.uniform(1.2, 2.2)
            wave.append(round(v, 3))
        spec = []
        for f in range(24):
            row = []
            for t in range(60):
                breath = math.sin(2 * math.pi * t / 20) ** 2
                base = breath * math.exp(-f / 7) * r.uniform(0.6, 1.0)
                if kind == "wheeze" and 9 <= f <= 11:
                    base += breath * 0.9
                if kind == "crackles" and r.random() < 0.08 * breath:
                    base += 0.7
                row.append(round(min(1, base), 3))
            spec.append(row)
        samples[kind] = {"wave": wave, "spec": spec}
    clinics = [{"label": v, "value": r.randint(300, 1900)} for v in villages]
    write("respira-ai-respiratory-screening", {"daily": d, "patients": patients, "samples": samples, "clinics": clinics})


def run():
    vigilo()
    framewise()
    respira()
