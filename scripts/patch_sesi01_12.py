import os, re

# Patch Sesi 01
path1 = 'public/slides/sesi-01/index.html'
with open(path1, 'r', encoding='utf-8') as f:
    c1 = f.read()

# Add scratch block styles if missing
scratch_css = '''
    /* Scratch Blocks Authentic Styling */
    .block-stack {
      display: flex;
      flex-direction: column;
      gap: 3px;
      width: 100%;
      margin-top: 8px;
    }
    .scratch-block {
      border-radius: 8px;
      padding: 6px 12px;
      font-family: 'Fredoka', cursive;
      font-size: 13.5px;
      color: #ffffff;
      display: inline-flex;
      align-items: center;
      flex-wrap: wrap;
      gap: 6px;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.35);
      position: relative;
      margin: 2px 0;
      border: 1px solid rgba(255, 255, 255, 0.15);
      font-weight: 600;
    }
    .scratch-block.event {
      background: #ffbf00;
      color: #000000;
      border-top-left-radius: 18px;
      border-top-right-radius: 18px;
      font-weight: 700;
    }
    .scratch-block.motion { background: #4c97ff; color: #ffffff; }
    .scratch-block.looks { background: #9966ff; color: #ffffff; }
    .scratch-block.sound { background: #cf63cf; color: #ffffff; }
    .scratch-block.control { background: #ffab19; color: #ffffff; }
    .scratch-block.sensing { background: #5cb1d6; color: #ffffff; }
    .scratch-block.variable { background: #ff8c1a; color: #ffffff; }
    .block-input {
      background: #ffffff;
      color: #000000;
      border-radius: 999px;
      padding: 1px 8px;
      font-size: 12.5px;
      font-weight: 800;
      display: inline-block;
      margin: 0 2px;
    }
'''

if '.scratch-block {' not in c1:
    c1 = c1.replace('</style>', f'{scratch_css}\n  </style>')

# Add scratch block showcase to slide 4 of Sesi 01
slide4_scratch = '''
            <!-- Scratch 3.0 Real Blocks Equivalent -->
            <div class="block-stack" style="background: rgba(15,23,42,0.85); padding: 14px; border-radius: 14px; border: 1px solid rgba(245,158,11,0.3); margin-top: 12px;">
              <div style="font-size: 12px; font-weight: 800; color: #38bdf8; margin-bottom: 6px;">🧩 Bentuk Balok Asli di Scratch 3.0:</div>
              <div class="scratch-block event">when 🏴 clicked</div>
              <div class="scratch-block motion">move <span class="block-input">10</span> steps</div>
              <div class="scratch-block motion">turn ↻ <span class="block-input">90</span> degrees</div>
              <div class="scratch-block motion">move <span class="block-input">10</span> steps</div>
            </div>
'''
if 'Bentuk Balok Asli di Scratch 3.0' not in c1:
    c1 = re.sub(
        r'(<div class="visual-column">\s*<div style="background: rgba\(30, 41, 59, 0\.8\);[^>]*>.*?</div>\s*)(</div>)',
        r'\1' + slide4_scratch + r'\n          \2',
        c1,
        flags=re.DOTALL
    )

with open(path1, 'w', encoding='utf-8') as f:
    f.write(c1)
print("Updated Sesi 01 with Scratch blocks!")

# Patch Sesi 12
path12 = 'public/slides/sesi-12/index.html'
with open(path12, 'r', encoding='utf-8') as f:
    c12 = f.read()

if '.scratch-block {' not in c12:
    c12 = c12.replace('</style>', f'{scratch_css}\n  </style>')

slide3_master_block = '''
          <div style="margin-top: 20px; background: rgba(15, 23, 42, 0.85); border: 2px solid rgba(245, 158, 11, 0.35); border-radius: 16px; padding: 16px;">
            <div style="font-size: 13.5px; font-weight: 800; color: #fbbf24; margin-bottom: 8px;">🧩 Rangkaian Balok Sakti Juara Level 1 (Master Scratch Logic):</div>
            <div style="display: flex; flex-wrap: wrap; gap: 10px;">
              <div class="scratch-block event">when 🏴 clicked</div>
              <div class="scratch-block variable">set <span class="block-input">Skor ▾</span> to <span class="block-input">0</span></div>
              <div class="scratch-block control">forever</div>
              <div class="scratch-block sensing">if &lt;touching <span class="block-input">Madu ▾</span>?&gt; then</div>
              <div class="scratch-block variable">change <span class="block-input">Skor ▾</span> by <span class="block-input">1</span></div>
              <div class="scratch-block sound">play sound <span class="block-input">"Win ▾"</span></div>
            </div>
          </div>
'''
if 'Rangkaian Balok Sakti Juara Level 1' not in c12:
    # insert before </section> of slide 3
    c12 = re.sub(
        r'(<!-- SLIDE 3:.*?</div>\s*)(</section>)',
        r'\1' + slide3_master_block + r'\n        \2',
        c12,
        flags=re.DOTALL
    )

with open(path12, 'w', encoding='utf-8') as f:
    f.write(c12)
print("Updated Sesi 12 with Scratch blocks!")
