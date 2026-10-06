#!/usr/bin/env python3
"""Generate sample data for every portfolio dashboard.

Usage:  python3 tools/dashboards/generate.py
Writes: src/data/dashboards/<project-slug>.json  (seeded, reproducible)

The data is illustrative sample data for concept projects - it is labelled
"Sample data" in every dashboard and does not describe real customers.
"""
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

import gen_ai  # noqa: E402
import gen_commerce  # noqa: E402
import gen_enterprise  # noqa: E402
import gen_mobile  # noqa: E402
import gen_web_games  # noqa: E402
from common import OUT_DIR  # noqa: E402


def main():
    for mod in (gen_commerce, gen_ai, gen_mobile, gen_enterprise, gen_web_games):
        mod.run()
    files = sorted(OUT_DIR.glob("*.json"))
    total = sum(f.stat().st_size for f in files)
    for f in files:
        print(f"  {f.stat().st_size / 1024:6.1f} KB  {f.name}")
    print(f"{len(files)} files, {total / 1024:.0f} KB total")


if __name__ == "__main__":
    main()
