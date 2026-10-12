import re
import os

def patch_sesi_14():
    script_path = r"c:\Users\devop\Documents\MyWork\Projects\2026\beekoding\scripts\generate_sesi14.py"
    with open(script_path, "r", encoding="utf-8") as f:
        content = f.read()

    # 1. Update toolbar
    content = content.replace('← Sesi 13', '⏪ Sesi 13')
    content = content.replace('Sesi 15 →', 'Sesi 15 ⏩')
    content = content.replace('📋 Catatan Guru (N)', '📝 Catatan Guru (N)')

    # 2. Update CSS for footer & dots
    old_css_pattern = re.compile(r'\.slide-footer \{\{.*?\.btn-nav:disabled \{\{.*?\}\}\s*', re.DOTALL)
    new_css = """/* Footer & Controls */
    .slide-footer {{
      background: #0f172a;
      border-top: 1px solid #1e293b;
      padding: 14px 30px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      position: relative;
      z-index: 20;
    }}

    .footer-left {{
      display: flex;
      align-items: center;
      gap: 16px;
    }}

    .slide-progress-dots {{
      display: flex;
      gap: 8px;
    }}

    .dot {{
      width: 10px;
      height: 10px;
      border-radius: 50%;
      background: #334155;
      cursor: pointer;
      transition: all 0.2s;
    }}

    .dot.active {{
      background: #f59e0b;
      transform: scale(1.3);
      box-shadow: 0 0 10px rgba(245, 158, 11, 0.6);
    }}

    .slide-counter {{
      font-size: 13px;
      font-weight: 700;
      color: #94a3b8;
    }}

    .footer-controls {{
      display: flex;
      gap: 10px;
    }}

    .btn-nav {{
      background: #1e293b;
      color: #ffffff;
      border: 1px solid #334155;
      padding: 8px 18px;
      border-radius: 10px;
      font-weight: 700;
      font-size: 13px;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 6px;
      transition: all 0.2s;
    }}

    .btn-nav:hover:not(:disabled) {{
      background: #334155;
      border-color: #475569;
    }}

    .btn-nav:disabled {{
      opacity: 0.35;
      cursor: not-allowed;
    }}

    .btn-nav.primary {{
      background: #d97706;
      border-color: #b45309;
      color: #ffffff;
    }}

    .btn-nav.primary:hover:not(:disabled) {{
      background: #f59e0b;
      color: #000000;
    }}
"""
    content = old_css_pattern.sub(new_css, content, count=1)

    # 3. Remove inner slide footers
    inner_footer_pattern = re.compile(r'\s*<div class="slide-footer">\s*<div class="footer-hints">.*?</div>\s*<div class="nav-buttons">.*?</div>\s*</div>', re.DOTALL)
    matches = inner_footer_pattern.findall(content)
    print(f"Found {len(matches)} inner slide footers in generate_sesi14.py to remove")
    content = inner_footer_pattern.sub('', content)

    # 4. Insert outer footer before </div><!-- .slide-canvas -->
    outer_footer = """
      </div><!-- .slide-canvas -->

      <!-- Slide Footer Bar -->
      <footer class="slide-footer">
        <div class="footer-left">
          <div class="slide-progress-dots" id="progressDots"></div>
          <span class="slide-counter" id="slideCounter">Slide 1 / 10</span>
        </div>
        <div class="footer-controls">
          <button class="btn-nav" id="prevBtn" disabled>◀ Sebelumnya</button>
          <button class="btn-nav primary" id="nextBtn">Selanjutnya ▶</button>
        </div>
      </footer>"""
    content = content.replace("</div><!-- .slide-canvas -->", outer_footer, 1)

    # 5. Fix JS in generate_sesi14.py
    js_old = """    // Slide Navigation
    function goToSlide(n) {{
      if (n < 1 || n > totalSlides) return;
      currentSlide = n;
      updateSlide();
    }}

    function prevSlide() {{
      if (currentSlide > 1) goToSlide(currentSlide - 1);
    }}

    function nextSlide() {{
      if (currentSlide < totalSlides) goToSlide(currentSlide + 1);
    }}

    function updateSlide() {{
      const slides = document.querySelectorAll('.slide');
      slides.forEach((sl, idx) => {{
        if (idx + 1 === currentSlide) {{
          sl.classList.add('active');
        }} else {{
          sl.classList.remove('active');
        }}
      }});

      // Update counters
      document.querySelectorAll('.slide-counter span').forEach(el => {{
        el.innerText = currentSlide;
      }});

      // Update teacher notes
      const note = notesData[currentSlide - 1];
      if (note) {{
        document.getElementById('notesBadge').innerText = `Slide ${{currentSlide}} • ${{note.time}}`;
        document.getElementById('notesInstructions').innerHTML = `<strong>Instruksi Guru:</strong> ${{note.instructions}}`;
        document.getElementById('notesScript').innerText = `"${{note.script}}"`;
      }}
    }}"""

    js_new = """    const slides = document.querySelectorAll('.slide');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const slideCounter = document.getElementById('slideCounter');
    const progressDots = document.getElementById('progressDots');

    // Create progress dots
    progressDots.innerHTML = '';
    for (let i = 1; i <= totalSlides; i++) {{
      const dot = document.createElement('div');
      dot.className = `dot ${{i === 1 ? 'active' : ''}}`;
      dot.addEventListener('click', () => goToSlide(i));
      progressDots.appendChild(dot);
    }}

    const dots = document.querySelectorAll('.dot');

    // Slide Navigation
    function goToSlide(n) {{
      currentSlide = Math.max(1, Math.min(totalSlides, n));
      updateSlide();
    }}

    function updateSlide() {{
      slides.forEach((sl, idx) => {{
        sl.classList.toggle('active', idx + 1 === currentSlide);
      }});

      dots.forEach((dot, idx) => {{
        dot.classList.toggle('active', idx + 1 === currentSlide);
      }});

      if (slideCounter) {{
        slideCounter.textContent = `Slide ${{currentSlide}} / ${{totalSlides}}`;
      }}
      if (prevBtn) prevBtn.disabled = currentSlide === 1;
      if (nextBtn) nextBtn.disabled = currentSlide === totalSlides;

      // Update teacher notes
      const note = notesData[currentSlide - 1];
      if (note) {{
        const b = document.getElementById('notesBadge');
        if (b) b.innerText = `Slide ${{currentSlide}} • ${{note.time}}`;
        const inst = document.getElementById('notesInstructions');
        if (inst) inst.innerHTML = `<strong>Instruksi Guru:</strong> ${{note.instructions}}`;
        const sc = document.getElementById('notesScript');
        if (sc) sc.innerText = `"${{note.script}}"`;
      }}
    }}

    if (prevBtn) prevBtn.addEventListener('click', () => goToSlide(currentSlide - 1));
    if (nextBtn) nextBtn.addEventListener('click', () => goToSlide(currentSlide + 1));"""

    if js_old in content:
        content = content.replace(js_old, js_new, 1)
        print("Replaced JS slide logic in generate_sesi14.py")
    else:
        print("Warning: js_old exact match not found, checking with regex")

    with open(script_path, "w", encoding="utf-8") as f:
        f.write(content)
    print("Saved patched generate_sesi14.py")

if __name__ == "__main__":
    patch_sesi_14()
