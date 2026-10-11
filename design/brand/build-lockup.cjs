// Builds public/brand/incubatelabs-lockup.svg from public/brand/incubatelabs-logo.svg.
//
//   npm i --no-save opentype.js@1.3.4 && node design/brand/build-lockup.cjs
//
// Layout: the logo at full height, a gap of 0.2 × logo height, then "Incubate Labs" in
// Source Serif 4 SemiBold (the site's self-hosted file), outlined to paths, with a cap
// height of 0.45 × logo height and the cap band centred on the logo. The logo path is
// copied unchanged. Everything fills with currentColor.
const fs = require("fs");
const path = require("path");
const opentype = require("opentype.js");

const root = path.resolve(__dirname, "../..");
const logoSvg = fs.readFileSync(path.join(root, "public/brand/incubatelabs-logo.svg"), "utf8");
const viewBox = logoSvg.match(/viewBox="([^"]+)"/)[1].split(/\s+/).map(Number);
const [, , logoW, logoH] = viewBox;
const logoPath = logoSvg.match(/<path[^>]*\/>/)[0];

const font = opentype.loadSync(
  path.join(root, "node_modules/@fontsource/source-serif-4/files/source-serif-4-latin-600-normal.woff"),
);
const capRatio = font.tables.os2.sCapHeight / font.unitsPerEm;
const capHeight = 0.45 * logoH;
const fontSize = capHeight / capRatio;
const gap = 0.2 * logoH;
const baseline = logoH / 2 + capHeight / 2;

// Place the text so its ink starts exactly at logoW + gap.
const probe = font.getPath("Incubate Labs", 0, baseline, fontSize).getBoundingBox();
const x = logoW + gap - probe.x1;
const text = font.getPath("Incubate Labs", x, baseline, fontSize);
const box = text.getBoundingBox();
const width = Math.ceil(box.x2 * 10) / 10;

const svg =
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${logoH}" role="img" aria-label="Incubate Labs">` +
  `<g id="lockup">${logoPath}<path fill="currentColor" d="${text.toPathData(1)}"/></g></svg>\n`;

fs.writeFileSync(path.join(root, "public/brand/incubatelabs-lockup.svg"), svg);
console.log(
  JSON.stringify({ width, height: logoH, fontSize: +fontSize.toFixed(2), capHeight: +capHeight.toFixed(2), gap: +gap.toFixed(2), textTop: +box.y1.toFixed(1), textBottom: +box.y2.toFixed(1) }),
);
