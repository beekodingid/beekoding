import re
import os

def fix_sesi_13():
    path = r"c:\Users\devop\Documents\MyWork\Projects\2026\beekoding\public\slides\sesi-13\index.html"
    with open(path, "r", encoding="utf-8") as f:
        content = f.read()

    # 1. Update toolbar actions
    old_toolbar = re.search(r'<div class="toolbar-actions">.*?</div>\s*</div>', content, re.DOTALL)
    new_toolbar = """<div class="toolbar-actions">
      <a href="/slides/sesi-12/index.html" class="btn-nav-sesi">⏪ Sesi 12</a>
      <a href="/slides/sesi-14/index.html" class="btn-nav-sesi">Sesi 14 ⏩</a>
      <button class="btn btn-toggle-notes" onclick="toggleNotes()">
        📝 Catatan Guru (N)
      </button>
      <button class="btn" onclick="toggleFullscreen()">
        ⛶ Layar Penuh (F)
      </button>
    </div>
  </div>"""
    if old_toolbar:
        content = content[:old_toolbar.start()] + new_toolbar + content[old_toolbar.end():]
        print("Updated toolbar actions in Sesi 13")

    # 2. Update CSS for footer and dots
    old_css_part = re.search(r'/\* Bottom Controller & Navigation \*/.*?(?=/\* Teacher Speaker Notes Drawer \*/)', content, re.DOTALL)
    new_css = """/* Footer & Controls */
    .slide-footer {
      background: #0f172a;
      border-top: 1px solid #1e293b;
      padding: 14px 30px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      position: relative;
      z-index: 20;
    }

    .footer-left {
      display: flex;
      align-items: center;
      gap: 16px;
    }

    .slide-progress-dots {
      display: flex;
      gap: 8px;
    }

    .dot {
      width: 10px;
      height: 10px;
      border-radius: 50%;
      background: #334155;
      cursor: pointer;
      transition: all 0.2s;
    }

    .dot.active {
      background: #f59e0b;
      transform: scale(1.3);
      box-shadow: 0 0 10px rgba(245, 158, 11, 0.6);
    }

    .slide-counter {
      font-size: 13px;
      font-weight: 700;
      color: #94a3b8;
    }

    .footer-controls {
      display: flex;
      gap: 10px;
    }

    .btn-nav {
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
    }

    .btn-nav:hover:not(:disabled) {
      background: #334155;
      border-color: #475569;
    }

    .btn-nav:disabled {
      opacity: 0.35;
      cursor: not-allowed;
    }

    .btn-nav.primary {
      background: #d97706;
      border-color: #b45309;
      color: #ffffff;
    }

    .btn-nav.primary:hover:not(:disabled) {
      background: #f59e0b;
      color: #000000;
    }

    .btn-nav-sesi {
      background: #1f2937;
      color: #d1d5db;
      border: 1px solid #374151;
      padding: 6px 14px;
      border-radius: 8px;
      font-size: 13px;
      font-weight: 700;
      text-decoration: none;
      display: inline-flex;
      align-items: center;
      gap: 6px;
      transition: all 0.2s;
    }
    .btn-nav-sesi:hover {
      background: #374151;
      color: #ffffff;
      border-color: #4b5563;
    }

    """
    if old_css_part:
        content = content[:old_css_part.start()] + new_css + content[old_css_part.end():]
        print("Updated footer and dot CSS in Sesi 13")

    # 3. Remove inner slide footers inside each slide
    # Pattern: <div class="slide-footer"> ... </div>
    inner_footer_pattern = re.compile(r'\s*<div class="slide-footer">\s*<div class="footer-hints">.*?</div>\s*<div class="nav-buttons">.*?</div>\s*</div>', re.DOTALL)
    matches = inner_footer_pattern.findall(content)
    print(f"Found {len(matches)} inner slide footers to remove in Sesi 13")
    content = inner_footer_pattern.sub('', content)

    # 4. Ensure outer footer has correct buttons and structure
    outer_footer = """      <!-- Slide Footer Bar -->
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
    
    outer_footer_pattern = re.compile(r'<!-- Slide Footer Bar -->\s*<footer class="slide-footer">.*?</footer>', re.DOTALL)
    if outer_footer_pattern.search(content):
        content = outer_footer_pattern.sub(outer_footer, content)
        print("Updated outer footer bar in Sesi 13")
    else:
        # If not present before </div>\s*</div>\s*<!-- Teacher, add it
        idx = content.find('</div> <!-- /.slide-canvas -->')
        if idx != -1:
            end_canvas = idx + len('</div> <!-- /.slide-canvas -->')
            content = content[:end_canvas] + "\n\n" + outer_footer + content[end_canvas:]
            print("Inserted outer footer bar in Sesi 13")

    # 5. Fix JS for dots
    # Ensure progressDots creates dots cleanly
    js_dots_snippet = """    // Create progress dots
    progressDots.innerHTML = '';
    for (let i = 1; i <= totalSlides; i++) {
      const dot = document.createElement('div');
      dot.className = `dot ${i === 1 ? 'active' : ''}`;
      dot.addEventListener('click', () => goToSlide(i));
      progressDots.appendChild(dot);
    }"""
    content = re.sub(r'// Create progress dots.*?progressDots\.appendChild\(dot\);\s*}', js_dots_snippet, content, flags=re.DOTALL)

    with open(path, "w", encoding="utf-8") as f:
        f.write(content)
    print("Successfully updated Sesi 13")

if __name__ == "__main__":
    fix_sesi_13()
