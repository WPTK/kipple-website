// Every image referenced by index.html and style.css exists, width/height attributes match the file,
// og:image dimensions match og.png, and sizes stay sane.
import { readFileSync, existsSync, statSync, readdirSync } from 'node:fs';

const MAX_WEBP = 300 * 1024;
const MAX_OG = 600 * 1024;
const html = readFileSync('index.html', 'utf8');
const css = readFileSync('style.css', 'utf8');
const errors = [];

function dims(file) {
  const b = readFileSync(file);
  if (b.toString('ascii', 0, 4) === 'RIFF' && b.toString('ascii', 8, 12) === 'WEBP') {
    const t = b.toString('ascii', 12, 16);
    if (t === 'VP8X') return [1 + b.readUIntLE(24, 3), 1 + b.readUIntLE(27, 3)];
    if (t === 'VP8 ') return [b.readUInt16LE(26) & 0x3fff, b.readUInt16LE(28) & 0x3fff];
    if (t === 'VP8L') {
      const v = b.readUInt32LE(21);
      return [(v & 0x3fff) + 1, ((v >> 14) & 0x3fff) + 1];
    }
  }
  if (b.toString('ascii', 1, 4) === 'PNG') return [b.readUInt32BE(16), b.readUInt32BE(20)];
  return null;
}

// <img> tags: file exists, declared size matches, alt present
for (const m of html.matchAll(/<img\b[^>]*>/g)) {
  const tag = m[0];
  const src = /\ssrc="([^"]+)"/.exec(tag)?.[1];
  if (!src || /^https?:/.test(src)) continue;
  if (!existsSync(src)) { errors.push(`missing image: ${src}`); continue; }
  const d = dims(src);
  if (!d) { errors.push(`${src}: unreadable image header`); continue; }
  const w = +/\swidth="(\d+)"/.exec(tag)?.[1];
  const h = +/\sheight="(\d+)"/.exec(tag)?.[1];
  if (!w || !h) errors.push(`${src}: missing width/height attributes`);
  else if (w !== d[0] || h !== d[1]) errors.push(`${src}: attributes ${w}x${h} but file is ${d[0]}x${d[1]}`);
  if (!/\salt="[^"]+"/.test(tag)) errors.push(`${src}: missing or empty alt`);
}

// url(...) in css
for (const m of css.matchAll(/url\(\s*["']?([^"')]+)["']?\s*\)/g)) {
  const u = m[1];
  if (/^(data:|https?:|#)/.test(u)) continue;
  if (!existsSync(u)) errors.push(`style.css: missing file ${u}`);
}

// everything in screenshots/ is referenced and under the size cap
const referenced = new Set([...html.matchAll(/screenshots\/[\w.-]+/g)].map((m) => m[0]));
for (const f of readdirSync('screenshots')) {
  const p = `screenshots/${f}`;
  if (statSync(p).size > MAX_WEBP) errors.push(`${p}: ${statSync(p).size} bytes exceeds ${MAX_WEBP}`);
  if (!referenced.has(p)) errors.push(`${p}: not referenced by index.html`);
}

// og:image
const ogW = +/og:image:width" content="(\d+)"/.exec(html)?.[1];
const ogH = +/og:image:height" content="(\d+)"/.exec(html)?.[1];
const og = dims('og.png');
if (!og) errors.push('og.png unreadable');
else {
  if (og[0] !== ogW || og[1] !== ogH) errors.push(`og.png is ${og[0]}x${og[1]} but meta says ${ogW}x${ogH}`);
  const ratio = og[0] / og[1];
  if (Math.abs(ratio - 1.91) > 0.1 && Math.abs(ratio - 2) > 0.1) errors.push(`og.png ratio ${og[0]}:${og[1]} is not near 1.91:1 or 2:1`);
  if (statSync('og.png').size > MAX_OG) errors.push('og.png is over 600 KB');
}
for (const f of ['favicon.ico', 'favicon.svg', 'apple-touch-icon.png']) if (!existsSync(f)) errors.push(`missing ${f}`);

if (errors.length) { console.error(errors.join('\n')); process.exit(1); }
console.log('images ok');
