"""Sample data: e-commerce and marketplace projects."""
from common import CITIES, END, daily, past_date, person, rng, ts, weighted, write, future_date


def sparesphere():
    r = rng(101)
    d = daily(r, {
        "revenue": dict(base=420000, trend=0.35, weekly=0.18, noise=0.12),
        "orders": dict(base=46, trend=0.3, weekly=0.18, noise=0.12),
        "rfqs": dict(base=14, trend=0.25, weekly=0.2, noise=0.2),
    })
    categories = ["Hydraulics", "Engine parts", "Undercarriage", "Filters", "Electricals", "Ground engaging tools", "Transmission"]
    brands = ["Caterpillar", "Komatsu", "JCB", "Volvo CE", "Hitachi", "Tata Hitachi", "BEML"]
    machines = ["320D Excavator", "PC210 Excavator", "3DX Backhoe", "EC210 Excavator", "ZX200 Excavator", "D6R Dozer", "BD50 Dozer", "966H Loader"]
    depots = ["Pune", "Chennai", "Nagpur", "Dhanbad", "Ahmedabad"]
    buyers = ["Shree Infra Projects", "Coalfield Movers", "Deccan Earthworks", "Ganga Highways", "Sahyadri Quarry Co.",
              "Western Mining Corp", "Metro Rail Builders", "NorthStar Constructions", "Bharat Road Crafts", "Konkan Ports Ltd"]
    statuses = [("Processing", 3), ("Packed", 2), ("Dispatched", 4), ("Delivered", 8), ("On hold", 1)]
    orders = []
    for i in range(70):
        st = weighted(r, statuses)
        orders.append({
            "id": f"SO-{24100 + i}", "buyer": r.choice(buyers), "depot": r.choice(depots),
            "category": r.choice(categories), "items": r.randint(1, 14),
            "value": r.randint(18, 900) * 1000, "status": st, "date": past_date(r, 20),
            "eta": future_date(r, 6, 1) if st in ("Processing", "Packed", "Dispatched") else None,
        })
    orders.sort(key=lambda o: o["date"], reverse=True)
    rfqs = []
    for i in range(24):
        parts = r.randint(2, 18)
        rfqs.append({
            "id": f"RFQ-{880 + i}", "buyer": r.choice(buyers), "machine": f"{r.choice(brands)} {r.choice(machines)}",
            "parts": parts, "qty": parts * r.randint(1, 6), "estimate": parts * r.randint(8, 60) * 1000,
            "status": weighted(r, [("New", 4), ("Quoted", 3), ("Negotiating", 2), ("Won", 3), ("Lost", 1)]),
            "due": future_date(r, 5, 0), "urgent": r.random() < 0.25,
        })
    stock = [[r.randint(40, 900) if r.random() > 0.08 else r.randint(0, 25) for _ in categories] for _ in depots]
    low = []
    for i in range(14):
        reorder = r.randint(20, 60)
        low.append({
            "id": f"SKU-{5100 + i}", "name": f"{r.choice(['Seal kit', 'Track roller', 'Fuel filter', 'Hydraulic pump', 'Bucket tooth', 'Starter motor', 'Idler', 'Turbocharger'])} · {r.choice(brands)}",
            "depot": r.choice(depots), "qty": r.randint(0, reorder - 1), "reorder": reorder, "leadDays": r.randint(3, 21),
        })
    cat_rev = [{"label": c, "value": r.randint(25, 140) * 100000} for c in categories]
    write("sparesphere-industrial-parts-marketplace", {
        "daily": d, "categories": categories, "depots": depots, "orders": orders, "rfqs": rfqs,
        "stock": stock, "lowStock": low, "categoryRevenue": sorted(cat_rev, key=lambda x: -x["value"]),
    })


def casaloom():
    r = rng(102)
    d = daily(r, {
        "revenue": dict(base=185000, trend=0.4, weekly=-0.15, noise=0.14, weekend_dip=False),
        "orders": dict(base=92, trend=0.35, weekly=-0.15, noise=0.14, weekend_dip=False),
        "sessions": dict(base=5200, trend=0.3, weekly=-0.12, noise=0.1, weekend_dip=False),
    })
    for row in d:
        row["conversion"] = round(row["orders"] / row["sessions"] * 100, 2)
    rooms = ["Living Room", "Bedroom", "Dining", "Kitchen", "Balcony", "Workspace"]
    products = ["Handloom cushion cover", "Jute area rug", "Brass table lamp", "Ceramic dinner set", "Linen bedsheet set",
                "Macramé wall hanging", "Terracotta planter", "Mango wood tray", "Cotton throw", "Glass vase"]
    orders = []
    for i in range(80):
        st = weighted(r, [("New", 3), ("Packed", 2), ("Shipped", 4), ("Delivered", 9), ("Return requested", 1), ("Cancelled", 1)])
        items = r.randint(1, 5)
        orders.append({
            "id": f"CL-{30500 + i}", "customer": person(r), "city": r.choice(CITIES), "items": items,
            "value": items * r.randint(6, 45) * 100, "status": st, "date": past_date(r, 14),
            "payment": weighted(r, [("UPI", 6), ("Card", 3), ("COD", 2), ("Net banking", 1)]),
            "room": r.choice(rooms),
        })
    orders.sort(key=lambda o: o["date"], reverse=True)
    inventory = []
    for i, p in enumerate(products):
        for colour in r.sample(["Indigo", "Rust", "Ivory", "Sage", "Charcoal", "Mustard"], 3):
            stock = r.randint(0, 160)
            inventory.append({"id": f"V-{700 + len(inventory)}", "product": p, "variant": colour, "stock": stock,
                              "sold30": r.randint(5, 140), "price": r.randint(5, 60) * 100})
    coupons = [
        {"id": "FESTIVE20", "type": "20% off", "uses": 842, "revenue": 1460000, "status": "Active", "ends": future_date(r, 20, 5)},
        {"id": "NEWHOME", "type": "₹500 off first order", "uses": 515, "revenue": 905000, "status": "Active", "ends": future_date(r, 40, 10)},
        {"id": "BUNDLE3", "type": "Buy 3 get 10%", "uses": 296, "revenue": 688000, "status": "Active", "ends": future_date(r, 30, 5)},
        {"id": "MONSOON15", "type": "15% off", "uses": 1204, "revenue": 1874000, "status": "Expired", "ends": past_date(r, 30)},
        {"id": "FREESHIP", "type": "Free shipping", "uses": 1588, "revenue": 2210000, "status": "Scheduled", "ends": future_date(r, 60, 30)},
    ]
    funnel = [
        {"label": "Sessions", "value": 158000}, {"label": "Product views", "value": 96400},
        {"label": "Added to cart", "value": 21800}, {"label": "Checkout", "value": 9400}, {"label": "Purchased", "value": 5620},
    ]
    room_rev = [{"label": rm, "value": r.randint(8, 60) * 100000} for rm in rooms]
    write("casaloom-home-decor-store", {
        "daily": d, "orders": orders, "inventory": inventory, "coupons": coupons, "funnel": funnel,
        "roomRevenue": sorted(room_rev, key=lambda x: -x["value"]),
    })


def kalaghar():
    r = rng(103)
    d = daily(r, {
        "revenue": dict(base=62000, trend=0.5, weekly=-0.1, noise=0.18, weekend_dip=False),
        "orders": dict(base=38, trend=0.45, weekly=-0.1, noise=0.18, weekend_dip=False),
    })
    crafts = [("Dhokra brass", "Chhattisgarh"), ("Silver filigree", "Odisha"), ("Terracotta", "West Bengal"),
              ("Lac bangles", "Rajasthan"), ("Thewa gold", "Rajasthan"), ("Bidriware", "Karnataka"), ("Tribal beadwork", "Nagaland")]
    artisans = []
    for i in range(18):
        craft, region = r.choice(crafts)
        sales = r.randint(15, 320) * 1000
        artisans.append({
            "id": f"ART-{200 + i}", "name": person(r), "craft": craft, "region": region,
            "products": r.randint(6, 48), "sales": sales, "pending": int(sales * r.uniform(0.05, 0.35)),
            "rating": round(r.uniform(4.1, 4.95), 1), "lastPayout": past_date(r, 25),
        })
    orders = []
    for i in range(60):
        craft, region = r.choice(crafts)
        st = weighted(r, [("Awaiting pickup", 3), ("In transit", 4), ("Delivered", 8), ("Delayed", 1)])
        orders.append({
            "id": f"KG-{9100 + i}", "customer": person(r), "craft": craft, "artisan": r.choice(artisans)["name"],
            "value": r.randint(8, 90) * 100, "status": st, "courier": r.choice(["Delhivery", "Bluedart", "Ekart", "India Post"]),
            "date": past_date(r, 12), "city": r.choice(CITIES),
        })
    orders.sort(key=lambda o: o["date"], reverse=True)
    craft_sales = {}
    for a in artisans:
        craft_sales[a["craft"]] = craft_sales.get(a["craft"], 0) + a["sales"]
    regions = {}
    for a in artisans:
        regions[a["region"]] = regions.get(a["region"], 0) + a["sales"]
    write("kalaghar-artisan-jewellery-store", {
        "daily": d, "artisans": artisans, "orders": orders,
        "craftSales": sorted([{"label": k, "value": v} for k, v in craft_sales.items()], key=lambda x: -x["value"]),
        "regionSales": sorted([{"label": k, "value": v} for k, v in regions.items()], key=lambda x: -x["value"]),
    })


def bazaarly():
    r = rng(104)
    d = daily(r, {
        "newAds": dict(base=1850, trend=0.45, weekly=-0.12, noise=0.1, weekend_dip=False),
        "chats": dict(base=9600, trend=0.5, weekly=-0.12, noise=0.1, weekend_dip=False),
        "promoRevenue": dict(base=38000, trend=0.6, weekly=-0.1, noise=0.15, weekend_dip=False),
    })
    cats = ["Mobiles", "Cars", "Bikes", "Furniture", "Electronics", "Property rentals", "Jobs", "Fashion"]
    cat_ads = [{"label": c, "value": r.randint(1500, 14000)} for c in cats]
    city_ads = [{"label": c, "value": r.randint(2000, 16000)} for c in CITIES]
    reasons = ["Duplicate photos", "Price too low for category", "Suspicious contact text", "Prohibited item", "Reported by 3 users", "New account, high-value item"]
    items = {"Mobiles": ["iPhone 13, 128GB", "Redmi Note 12 Pro", "Samsung S22", "OnePlus 11R"],
             "Cars": ["Maruti Swift VXI 2019", "Hyundai Creta 2021", "Honda City 2018"],
             "Bikes": ["Royal Enfield Classic 350", "Honda Activa 6G", "Bajaj Pulsar NS200"],
             "Furniture": ["3-seater sofa", "Queen bed with storage", "Study table"],
             "Electronics": ["Sony 55\" 4K TV", "Dell laptop i5", "Canon 200D camera"],
             "Property rentals": ["2BHK near metro", "1RK fully furnished", "3BHK gated society"],
             "Jobs": ["Delivery partner", "Office assistant", "Telecaller"],
             "Fashion": ["Bridal lehenga", "Leather jacket", "Sneakers size 9"]}
    queue = []
    for i in range(26):
        c = r.choice(cats)
        queue.append({
            "id": f"AD-{77100 + i}", "title": r.choice(items[c]), "category": c, "city": r.choice(CITIES),
            "price": r.randint(5, 900) * 1000 if c not in ("Jobs",) else r.randint(12, 30) * 1000,
            "seller": person(r), "reason": r.choice(reasons), "risk": r.randint(35, 97), "posted": ts(r, 20),
        })
    queue.sort(key=lambda x: -x["risk"])
    promos = [{"label": p, "value": v} for p, v in [("Top ad (7 days)", 412000), ("Featured (3 days)", 268000), ("Bump up", 154000), ("Urgent tag", 87000)]]
    write("bazaarly-classifieds-marketplace", {
        "daily": d, "categoryAds": sorted(cat_ads, key=lambda x: -x["value"]), "cityAds": sorted(city_ads, key=lambda x: -x["value"]),
        "queue": queue, "promotions": promos,
    })


def tradelink():
    r = rng(105)
    d = daily(r, {
        "orderValue": dict(base=640000, trend=0.3, weekly=0.2, noise=0.12),
        "orders": dict(base=118, trend=0.32, weekly=0.2, noise=0.12),
        "collections": dict(base=590000, trend=0.28, weekly=0.25, noise=0.18),
    })
    dealers = []
    towns = ["Nashik", "Hubli", "Madurai", "Indore", "Vijayawada", "Ludhiana", "Rajkot", "Guwahati", "Kota", "Salem", "Mysuru", "Bhopal"]
    for i in range(32):
        limit = r.randint(2, 15) * 100000
        outstanding = int(limit * r.uniform(0.1, 1.15))
        b = [r.random() for _ in range(4)]
        s = sum(b)
        dealers.append({
            "id": f"DLR-{400 + i}", "name": f"{r.choice(['Sri', 'New', 'Royal', 'Jai', 'Balaji', 'Om', 'Laxmi'])} {r.choice(['Traders', 'Agencies', 'Distributors', 'Enterprises', 'Stores'])}",
            "town": r.choice(towns), "limit": limit, "outstanding": outstanding,
            "aging": [int(outstanding * x / s) for x in b], "orders30": r.randint(3, 40),
            "lastOrder": past_date(r, 15), "rep": person(r),
        })
    orders = []
    skus = ["Detergent 1kg ×20", "Tea 250g ×40", "Biscuits family pack ×48", "Hair oil 200ml ×36", "Toothpaste 150g ×72", "Instant noodles ×96", "Soap 125g ×144"]
    for i in range(40):
        dl = r.choice(dealers)
        val = r.randint(20, 400) * 1000
        st = "Credit hold" if dl["outstanding"] + val > dl["limit"] else weighted(r, [("Confirmed", 3), ("Packed", 2), ("Dispatched", 3), ("Delivered", 6)])
        orders.append({"id": f"TL-{60200 + i}", "dealer": dl["name"], "dealerId": dl["id"], "town": dl["town"],
                       "lines": r.randint(2, 12), "topSku": r.choice(skus), "value": val, "status": st, "date": past_date(r, 6)})
    orders.sort(key=lambda o: (o["status"] != "Credit hold", o["date"]), reverse=False)
    schemes = [
        {"id": "SCH-01", "name": "Buy 10 cases detergent, get 1 free", "dealers": 214, "uplift": 18.4, "status": "Live"},
        {"id": "SCH-02", "name": "2% cash discount on prepaid orders", "dealers": 389, "uplift": 11.2, "status": "Live"},
        {"id": "SCH-03", "name": "Festive tea combo", "dealers": 156, "uplift": 24.9, "status": "Ended"},
        {"id": "SCH-04", "name": "New outlet launch kit", "dealers": 47, "uplift": 0, "status": "Scheduled"},
    ]
    write("tradelink-distributor-ordering-app", {"daily": d, "dealers": dealers, "orders": orders, "schemes": schemes,
                                                  "agingBuckets": ["0–30 days", "31–60 days", "61–90 days", "90+ days"]})


def run():
    sparesphere()
    casaloom()
    kalaghar()
    bazaarly()
    tradelink()
