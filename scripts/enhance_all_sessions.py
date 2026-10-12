import os, re

def enhance_session(s):
    folder = f'public/slides/sesi-{s:02d}'
    filepath = f'{folder}/index.html'
    if not os.path.exists(filepath):
        print(f"Skipping Sesi {s:02d}: file not found")
        return

    with open(filepath, 'r', encoding='utf-8') as f:
        html = f.read()

    # 1. Ensure CSS has .beeby-hero-card styling
    beeby_hero_css = '''
    /* Beeby Uniform Mascot Card Styling */
    .beeby-hero-card {
      background: linear-gradient(145deg, rgba(30, 41, 59, 0.85), rgba(15, 23, 42, 0.95));
      border: 2px solid rgba(245, 158, 11, 0.35);
      border-radius: 24px;
      padding: 24px 20px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      position: relative;
      overflow: hidden;
      box-shadow: 0 20px 40px rgba(0, 0, 0, 0.5), 0 0 30px rgba(245, 158, 11, 0.15);
      max-width: 440px;
      margin: 0 auto;
      width: 100%;
    }
    .beeby-glow-ring {
      position: absolute;
      top: 45%;
      left: 50%;
      width: 260px;
      height: 260px;
      background: radial-gradient(circle, rgba(245, 158, 11, 0.25) 0%, rgba(217, 119, 6, 0.08) 50%, transparent 75%);
      transform: translate(-50%, -50%);
      pointer-events: none;
      animation: beebyPulse 3s ease-in-out infinite;
    }
    .beeby-mascot-img {
      width: 220px;
      height: 220px;
      object-fit: contain;
      filter: drop-shadow(0 12px 24px rgba(0, 0, 0, 0.6));
      position: relative;
      z-index: 2;
      transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
    }
    .beeby-hero-card:hover .beeby-mascot-img {
      transform: scale(1.08) translateY(-4px);
    }
    .beeby-mascot-label {
      position: relative;
      z-index: 2;
      margin-top: 14px;
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
      gap: 3px;
    }
    .beeby-name {
      font-family: 'Fredoka', cursive;
      font-size: 14px;
      font-weight: 700;
      color: #fbbf24;
      background: rgba(15, 23, 42, 0.85);
      border: 1px solid rgba(245, 158, 11, 0.4);
      border-radius: 999px;
      padding: 4px 14px;
    }
    .beeby-sub {
      font-size: 11px;
      color: #94a3b8;
      font-weight: 600;
    }
    @keyframes beebyPulse {
      0%, 100% { transform: translate(-50%, -50%) scale(1); opacity: 0.8; }
      50% { transform: translate(-50%, -50%) scale(1.15); opacity: 1; }
    }
'''

    if '.beeby-hero-card' not in html:
        html = html.replace('</style>', f'{beeby_hero_css}\n  </style>')

    # 2. Add '🗂️ Semua Sesi' button to toolbar if not already present
    all_sessions_btn = '<a href="/slides/index.html" class="btn-nav-sesi" style="background: rgba(245, 158, 11, 0.15); border-color: rgba(245, 158, 11, 0.4); color: #fbbf24; font-weight: 800;" title="Buka Portal Semua Sesi & Stage">🗂️ Semua Sesi</a>'
    if 'href="/slides/index.html"' not in html:
        # insert at the beginning of toolbar-actions
        html = re.sub(
            r'(<div\s+class=[\'"]toolbar-actions[\'"][^>]*>)',
            r'\1\n      ' + all_sessions_btn,
            html,
            count=1
        )

    # 3. Replace hero image on Slide 1 with uniform beeby-hero-card
    # Replace <img src="beeby-....jpg" ...> on slide 1
    mascot_card_html = '''<div class="beeby-hero-card">
              <div class="beeby-glow-ring"></div>
              <img src="beeby-mascot.png" alt="Beeby Maskot Resmi Beekoding" class="beeby-mascot-img" />
              <div class="beeby-mascot-label">
                <span class="beeby-name">🐝 Karakter: Beeby si Lebah Cerdas</span>
                <span class="beeby-sub">Maskot Resmi Pembelajaran Beekoding 2026</span>
              </div>
            </div>'''

    # Pattern for slide 1 hero image inside visual-column or slide-media-wrap
    pattern1 = r'<div class=[\'"]visual-column[\'"]>\s*<img\s+src=[\'"][^\'"]*beeby-[^\'"]*[\'"][^>]*>\s*</div>'
    if re.search(pattern1, html):
        html = re.sub(
            pattern1,
            f'<div class="visual-column">\n            {mascot_card_html}\n          </div>',
            html,
            count=1
        )
    else:
        # Check pattern with slide-media-wrap
        pattern2 = r'<div class=[\'"]slide-media-wrap[\'"]>\s*<img\s+src=[\'"][^\'"]*beeby-[^\'"]*[\'"][^>]*>\s*</div>'
        if re.search(pattern2, html):
            html = re.sub(
                pattern2,
                f'<div class="slide-media-wrap">\n            {mascot_card_html}\n          </div>',
                html,
                count=1
            )

    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(html)
    print(f"Enhanced Sesi {s:02d}: Mascot & Toolbar updated.")

for s in range(1, 25):
    enhance_session(s)
print("Finished updating all 24 sessions with uniform mascot and portal link!")
