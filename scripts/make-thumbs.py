"""为 src/data/site.js 里引用的图片生成缩略图：public/images/thumbs/<名字>.jpg（宽不超过 1200）。
新增图片后运行：python3 scripts/make-thumbs.py"""
import re, pathlib
from PIL import Image, ImageOps

root = pathlib.Path(__file__).resolve().parent.parent
pub = root / 'public'
out = pub / 'images' / 'thumbs'
out.mkdir(parents=True, exist_ok=True)
src = (root / 'src' / 'data' / 'site.js').read_text(encoding='utf-8')
paths = sorted(set(re.findall(r"'(/images/[^']+\.(?:jpg|jpeg|png))'", src)))
for p in paths:
    f = pub / p.lstrip('/')
    if not f.exists():
        print('缺少', p); continue
    dst = out / (f.name.split('.')[0] + '.jpg')
    im = ImageOps.exif_transpose(Image.open(f)).convert('RGB')
    im.thumbnail((1200, 1600), Image.LANCZOS)
    im.save(dst, quality=80, optimize=True, progressive=True)
    print(p, '->', dst.relative_to(pub), im.size)
