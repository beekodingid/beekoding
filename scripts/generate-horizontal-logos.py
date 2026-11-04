import os
from PIL import Image, ImageDraw, ImageFont

def generate_logos():
    font_path = os.path.join(os.path.dirname(__file__), 'SpaceGrotesk.ttf')
    if not os.path.exists(font_path):
        print('Error: SpaceGrotesk.ttf not found')
        return

    # Load and crop bee icon cleanly
    orig_bee = Image.open('public/beekoding-logo.png').convert('RGBA')
    bbox = orig_bee.getbbox()
    bee_crop = orig_bee.crop(bbox)

    # Canvas dimensions: 740 x 185 (Ratio 4:1)
    canvas_w = 740
    canvas_h = 185

    # Scale bee to height 142px
    bee_h = 142
    bee_w = int(bee_crop.width * (bee_h / bee_crop.height))
    bee_resized = bee_crop.resize((bee_w, bee_h), Image.Resampling.LANCZOS)

    # Font setup: Weight 700 (Bold) + Stroke 2px for Extra Bold / Black feel
    font = ImageFont.truetype(font_path, 98)
    try:
        font.set_variation_by_axes([700])
    except Exception as e:
        print("Note on variation:", e)

    stroke = 2

    # Measure texts accurately
    dummy = Image.new('RGBA', (10, 10))
    draw_d = ImageDraw.Draw(dummy)
    bbox_bee = draw_d.textbbox((0, 0), 'Bee', font=font, stroke_width=stroke)
    bbox_koding = draw_d.textbbox((0, 0), 'koding', font=font, stroke_width=stroke)

    # Width of individual words
    w_bee = bbox_bee[2] - bbox_bee[0]
    w_koding = bbox_koding[2] - bbox_koding[0]

    gap = 22
    total_content_w = bee_w + gap + w_bee + w_koding
    start_x = (canvas_w - total_content_w) // 2
    bee_y = (canvas_h - bee_h) // 2

    text_start_x = start_x + bee_w + gap
    # Align text baseline to match bee center visually
    text_y = (canvas_h - (bbox_koding[3] - bbox_bee[1])) // 2 - bbox_bee[1] + 2

    variants = [
        {
            'name': 'public/beekoding-logo-horizontal.png',
            'bg': (0, 0, 0, 0),
            'bee_color': '#0f172a',    # Very dark slate (near black)
            'koding_color': '#f59e0b', # Rich Amber 500
        },
        {
            'name': 'public/beekoding-logo-horizontal-dark.png',
            'bg': (0, 0, 0, 0),
            'bee_color': '#ffffff',    # Pure white
            'koding_color': '#fbbf24', # High-contrast Amber
        },
        {
            'name': 'public/beekoding-logo-horizontal-white-bg.png',
            'bg': (255, 255, 255, 255),
            'bee_color': '#0f172a',
            'koding_color': '#f59e0b',
        }
    ]

    for v in variants:
        img = Image.new('RGBA', (canvas_w, canvas_h), v['bg'])
        # Paste mascot bee
        img.paste(bee_resized, (start_x, bee_y), bee_resized)

        # Draw extra-bold text with stroke for maximum legibility and thickness
        draw = ImageDraw.Draw(img)
        # Draw "Bee"
        draw.text(
            (text_start_x, text_y),
            'Bee',
            font=font,
            fill=v['bee_color'],
            stroke_width=stroke,
            stroke_fill=v['bee_color']
        )
        # Draw "koding"
        draw.text(
            (text_start_x + w_bee, text_y),
            'koding',
            font=font,
            fill=v['koding_color'],
            stroke_width=stroke,
            stroke_fill=v['koding_color']
        )

        img.save(v['name'], 'PNG', optimize=True)
        print(f"Generated {v['name']} ({canvas_w}x{canvas_h})")

if __name__ == '__main__':
    generate_logos()
