// Walks dist/ after build and populates package.json "exports" so consumers
// can import this package's subpaths without a /dist/ segment.
// Adapted from pos-core/scripts/generate-exports.mjs.
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const pkgPath = path.join(root, "package.json");
const distDir = path.join(root, "dist");

if (!fs.existsSync(distDir)) {
  console.error("generate-exports: dist/ missing; run tsc first");
  process.exit(1);
}

const dirsWithJs = new Set();
const dirsWithIndex = new Set();

function walk(absDir, relPosix) {
  let entries;
  try {
    entries = fs.readdirSync(absDir, { withFileTypes: true });
  } catch (err) {
    console.warn(`generate-exports: skipping ${relPosix || "(root)"}: ${err.message}`);
    return;
  }
  const jsFiles = entries.filter((e) => e.isFile() && e.name.endsWith(".js"));
  if (jsFiles.length > 0) {
    dirsWithJs.add(relPosix);
    if (jsFiles.some((e) => e.name === "index.js")) {
      dirsWithIndex.add(relPosix);
    }
  }
  for (const e of entries) {
    if (e.isDirectory()) {
      const next = relPosix ? `${relPosix}/${e.name}` : e.name;
      walk(path.join(absDir, e.name), next);
    }
  }
}

walk(distDir, "");

const exportsMap = {
  ".": "./dist/index.js",
  "./package.json": "./package.json",
  "./*": "./dist/*.js",
};

for (const rel of dirsWithJs) {
  if (rel === "") continue;
  exportsMap[`./${rel}/*`] = `./dist/${rel}/*.js`;
}

for (const rel of dirsWithIndex) {
  if (rel === "") continue;
  exportsMap[`./${rel}`] = `./dist/${rel}/index.js`;
}

const pkg = JSON.parse(fs.readFileSync(pkgPath, "utf8"));
pkg.exports = exportsMap;
fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2) + "\n");
console.log(`generate-exports: wrote ${Object.keys(exportsMap).length} entries to package.json`);
