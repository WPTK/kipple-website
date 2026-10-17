// Fails on text that must not appear in the site: third-party reader app names, emails, IPs, hostnames.
// Say "Google Reader compatible" or "any client that speaks the Google Reader API" instead of naming apps.
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join, extname } from 'node:path';

const EXT = new Set(['.html', '.css', '.js', '.json', '.md', '.txt', '.svg']);
const SKIP = new Set(['.git', '.claude', 'node_modules', 'fonts', 'scripts']);
const SKIP_FILES = new Set(['package-lock.json', 'README.md']);

const APPS = ['reeder', 'netnewswire', 'fiery feeds', 'readkit', 'feedme', 'vienna', 'news\\+', 'newsboat', 'feedly', 'inoreader',
  'newsblur', 'freshrss', 'miniflux', 'yarr', 'fever', 'tiny tiny rss', 'ttrss', 'feedbin', 'lire',
  'feedreader', 'readrops', 'fluent reader'];
const rules = [
  ['reader app name (say "Google Reader compatible")', new RegExp(`(^|[^\\w])(${APPS.join('|')})(?![\\w])`, 'i')],
  ['email address', /[\w.+-]+@[\w-]+\.[\w.-]+/],
  ['IPv4 address', /\b(?!127\.0\.0\.1\b)\d{1,3}(\.\d{1,3}){3}\b/],
  ['internal hostname', /\b[\w-]+\.(local|lan|internal|home|ts\.net)\b/i],
];
// Hostnames in URLs must be on this list.
const HOSTS = new Set(['github.com', 'kipple.cc', 'tailscale.com', 'wptk.org', '127.0.0.1', 'localhost', 'www.w3.org']);

function* walk(d) {
  for (const n of readdirSync(d)) {
    if (SKIP.has(n) || SKIP_FILES.has(n)) continue;
    const p = join(d, n);
    if (statSync(p).isDirectory()) yield* walk(p);
    else if (EXT.has(extname(n))) yield p;
  }
}

const errors = [];
for (const f of walk('.')) {
  readFileSync(f, 'utf8').split(/\r?\n/).forEach((line, i) => {
    for (const [name, re] of rules) if (re.test(line)) errors.push(`${f}:${i + 1}: ${name}: ${line.trim().slice(0, 100)}`);
    for (const m of line.matchAll(/https?:\/\/([^/\s"'<>)]+)/g)) {
      const h = m[1].replace(/:\d+$/, '').replace(/[.,;]+$/, '');
      if (!HOSTS.has(h)) errors.push(`${f}:${i + 1}: hostname not on allowlist: ${h}`);
    }
  });
}
if (errors.length) { console.error(errors.join('\n')); process.exit(1); }
console.log('text ok');
