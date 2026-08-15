/**
 * Builds a single self-contained page from the multi-file site.
 *
 *   node tools/build-standalone.js
 *
 * Output: dist/portfolio-standalone.html — one file with the CSS, the content
 * data, the renderer and the avatar all inlined, so it can be opened straight
 * from disk, emailed, or dropped onto any host with no other assets.
 *
 * The output deliberately omits <!doctype>/<html>/<head>/<body>: browsers add
 * them automatically, and leaving them out also makes the file valid input for
 * embedders that supply their own document skeleton.
 */
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const read = p => fs.readFileSync(path.join(ROOT, p), 'utf8');

const html = read('index.html');
const css = read('assets/css/styles.css');
const dataJs = read('assets/js/data.js');
const appJs = read('assets/js/app.js');
const avatar = read('assets/img/avatar.svg');

// Inline the avatar as a data URI so the page needs no sibling files.
const avatarUri = 'data:image/svg+xml;base64,' + Buffer.from(avatar, 'utf8').toString('base64');

const bodyMatch = html.match(/<body>([\s\S]*)<\/body>/);
if (!bodyMatch) throw new Error('index.html: could not find <body>');

// Function replacers keep a literal "$" in the payload from being treated as a
// replacement pattern.
const body = bodyMatch[1]
  .replace('<script src="assets/js/data.js"></script>', () => '<script>\n' + dataJs + '\n</script>')
  .replace('<script src="assets/js/app.js"></script>', () => '<script>\n' + appJs + '\n</script>')
  .replace('src="assets/img/avatar.svg"', () => 'src="' + avatarUri + '"')
  .replace(/\n\s*<link rel="icon"[^>]*>/, () => '');

const title = (html.match(/<title>([^<]*)<\/title>/) || [, 'Portfolio'])[1].split('—')[0].trim();
const page = '<title>' + title + '</title>\n<style>\n' + css + '\n</style>\n' + body.trim() + '\n';

fs.mkdirSync(path.join(ROOT, 'dist'), { recursive: true });
const out = path.join(ROOT, 'dist', 'portfolio-standalone.html');
fs.writeFileSync(out, page);

const checks = {
  'no document-skeleton tags': !/<\/?(html|head|body)[\s>]/i.test(page),
  'no leftover asset refs': !/(src|href)="assets\//.test(page),
  'no remote subresources': !/(src|href)="https?:/.test(page),
  'stylesheet inlined': page.includes('--accent'),
  'content data inlined': page.includes('window.PORTFOLIO'),
  'renderer inlined': page.includes('renderExperience'),
  'avatar inlined': page.includes('data:image/svg+xml;base64,'),
  'light palette on bare :root': /:root \{[\s\S]*?--bg: #f4f2ee/.test(page),
  'dark palette via prefers-color-scheme': page.includes(':root:not([data-theme="light"])'),
  'dark palette via [data-theme]': page.includes(':root[data-theme="dark"]'),
  'body paints its own background': /body \{[\s\S]*?background: var\(--bg\)/.test(page)
};

let failed = 0;
for (const [name, ok] of Object.entries(checks)) {
  if (!ok) failed++;
  console.log((ok ? 'ok   ' : 'FAIL ') + name);
}
console.log('\n' + (Buffer.byteLength(page) / 1024).toFixed(1) + ' KB -> dist/portfolio-standalone.html');
process.exit(failed ? 1 : 0);
