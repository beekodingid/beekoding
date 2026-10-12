import os
import re

base = r"c:\Users\devop\Documents\MyWork\Projects\2026\beekoding\public\slides"
for i in range(13, 25):
    p = os.path.join(base, f"sesi-{i:02d}", "index.html")
    with open(p, "r", encoding="utf-8") as f:
        html = f.read()
    has_dots = 'id="progressDots"' in html
    has_prev = 'id="prevBtn"' in html
    has_next = 'id="nextBtn"' in html
    has_counter = 'id="slideCounter"' in html
    has_inner_footer = bool(re.search(r'<div class="slide-footer">', html))
    has_glowing_dot = "box-shadow: 0 0 10px rgba(245, 158, 11, 0.6)" in html
    has_emoji_nav = "⏪ Sesi" in html
    print(f"Sesi {i:02d}: dots={has_dots}, prev={has_prev}, next={has_next}, counter={has_counter}, inner_footer={has_inner_footer}, glow={has_glowing_dot}, emoji_nav={has_emoji_nav}")
