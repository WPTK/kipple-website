// Internal links, assets and #fragments always. External links only with --external (scheduled run).
import { readFileSync, existsSync } from 'node:fs';

const external = process.argv.includes('--external');
const html = readFileSync('index.html', 'utf8');
const ids = new Set([...html.matchAll(/\sid="([^"]+)"/g)].map((m) => m[1]));
const errors = [];
const urls = new Set();

for (const m of html.matchAll(/\s(?:href|src)="([^"]*)"/g)) {
  const u = m[1];
  if (/^https?:\/\//.test(u)) { urls.add(u); continue; }
  if (/^(mailto:|data:)/.test(u)) continue;
  if (u.startsWith('#')) {
    if (u !== '#' && !ids.has(u.slice(1))) errors.push(`no anchor ${u}`);
    continue;
  }
  const [path, frag] = u.split('#');
  const file = path === '/' || path === '' ? 'index.html' : path.replace(/^\//, '');
  if (!existsSync(file)) errors.push(`missing target ${u}`);
  else if (frag && file === 'index.html' && !ids.has(frag)) errors.push(`no anchor #${frag} in ${u}`);
}
const css = readFileSync('style.css', 'utf8');
for (const m of css.matchAll(/url\(\s*["']?([^"')]+)["']?\s*\)/g)) {
  if (!/^(data:|https?:|#)/.test(m[1]) && !existsSync(m[1])) errors.push(`style.css: missing ${m[1]}`);
}

// Retry, and treat 403/429 as alive so rate limits and bot walls do not make CI flaky.
async function probe(u) {
  for (let i = 0; i < 3; i++) {
    try {
      let r = await fetch(u, { method: 'HEAD', redirect: 'follow', signal: AbortSignal.timeout(20000) });
      if (r.status === 405) r = await fetch(u, { redirect: 'follow', signal: AbortSignal.timeout(20000) });
      if (r.ok || r.status === 429 || r.status === 403) return null;
      if (r.status < 500) return `HTTP ${r.status}`;
    } catch (e) {
      if (i === 2) return String(e.cause?.code ?? e.message);
    }
    await new Promise((res) => setTimeout(res, 2000 * (i + 1)));
  }
  return 'HTTP 5xx';
}

if (external) {
  for (const u of urls) {
    if (/127\.0\.0\.1|localhost/.test(u)) continue;
    const e = await probe(u);
    if (e) errors.push(`${u}: ${e}`);
  }
}
if (errors.length) { console.error(errors.join('\n')); process.exit(1); }
console.log(`links ok (${external ? urls.size + ' external urls' : 'internal only'})`);
