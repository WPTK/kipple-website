// Fails on text that must not appear in the site: third-party reader app names, emails, IPs, hostnames.
// Say "Google Reader compatible" or "any client that speaks the Google Reader API" instead of naming apps.
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join, extname } from 'node:path';

const EXT = new Set(['.html', '.css', '.js', '.mjs', '.json', '.md', '.txt', '.svg']);
const SKIP = new Set(['.git', '.claude', 'node_modules', 'fonts']);
const SKIP_FILES = new Set(['package-lock.json']);

// The forbidden app names are written with a "~" in the middle so this file does not trip its own check.
// "Unread" is a Kipple tab name, so it is deliberately not listed.
const APPS = ['ree~der', 'net~newswire', 'fiery~ feeds', 'read~kit', 'feed~me', 'vien~na', 'news~\\+', 'news~boat', 'feed~ly',
  'inore~ader', 'news~blur', 'fresh~rss', 'mini~flux', 'yar~r', 'fev~er', 'tiny~ tiny~ rss', 'tt~rss', 'feed~bin', 'li~re',
  'feed~reader', 'read~rops', 'fluent~ reader', 'news~flash', 'read~ you', 'capy~ reader', 'life~rea', 'rss~ guard',
  'the~ old~ reader', 'baz~qux'].map((s) => s.replaceAll('~', ''));
// Extra private terms (real names, hosts, accounts) come from the FORBIDDEN_TERMS environment variable, a comma
// separated list read at runtime. CI supplies it from the FORBIDDEN_TERMS repository secret; unset means no extras.
const EXTRA = (process.env.FORBIDDEN_TERMS ?? '').split(',').map((s) => s.trim()).filter(Boolean)
  .map((s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
const wordRe = (list) => new RegExp(`(^|[^\\w])(${list.join('|')})(?![\\w])`, 'i');
const ASSET_EXT = new Set(['png', 'jpg', 'jpeg', 'gif', 'webp', 'avif', 'svg', 'ico']);
const rules = [
  ['reader app name (say "Google Reader compatible")', wordRe(APPS)],
  ...(EXTRA.length ? [['forbidden term from FORBIDDEN_TERMS', wordRe(EXTRA)]] : []),
  ['IPv4 address', /\b(?!127\.0\.0\.1\b)\d{1,3}(\.\d{1,3}){3}\b/],
  ['internal hostname', /\b[\w-]+\.(local|lan|internal|home|ts\.net|corp|localdomain|arpa|intranet)\b/i],
];
// Hostnames in URLs must be on this list. On github.com the path must start with /WPTK/.
const HOSTS = new Set(['github.com', 'kipple.cc', 'tailscale.com', 'wptk.org', '127.0.0.1', 'localhost', 'www.w3.org']);

// An email needs a letters-only TLD; names like icon@2x.png are image files, not addresses.
function emails(line) {
  return [...line.matchAll(/[\w.+-]+@[\w-]+(?:\.[\w-]+)*\.([A-Za-z]{2,})(?![\w-])/g)].filter((m) => !ASSET_EXT.has(m[1].toLowerCase()));
}
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
    if (emails(line).length) errors.push(`${f}:${i + 1}: email address: ${line.trim().slice(0, 100)}`);
    for (const m of line.matchAll(/https?:\/\/([^/\s"'<>)]+)(\/[^\s"'<>)]*)?/g)) {
      const h = m[1].replace(/:\d+$/, '').replace(/[.,;]+$/, '');
      if (!HOSTS.has(h)) errors.push(`${f}:${i + 1}: hostname not on allowlist: ${h}`);
      else if (h === 'github.com' && !/^\/WPTK(\/|$)/.test(m[2] ?? '')) errors.push(`${f}:${i + 1}: github.com URL outside /WPTK/: ${m[0]}`);
    }
  });
}
if (errors.length) { console.error(errors.join('\n')); process.exit(1); }
console.log('text ok');
