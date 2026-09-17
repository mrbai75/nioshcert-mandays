// Post-build: tandakan dist/cjs sebagai CommonJS, dist/esm sebagai ESM
// + tambah .js / /index.js pada relative imports dalam ESM output
const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');

fs.writeFileSync(
  path.join(root, 'dist/cjs/package.json'),
  JSON.stringify({ type: 'commonjs' }, null, 2)
);
fs.writeFileSync(
  path.join(root, 'dist/esm/package.json'),
  JSON.stringify({ type: 'module' }, null, 2)
);

function fixImports(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      fixImports(full);
      continue;
    }
    if (!entry.name.endsWith('.js')) continue;

    let content = fs.readFileSync(full, 'utf8');
    content = content.replace(
      /(from\s+['"])(\.\.?\/[^'"]+?)(['"])/g,
      (match, prefix, importPath, suffix) => {
        if (importPath.endsWith('.js') || importPath.endsWith('.json')) {
          return match;
        }
        // Resolve relative to current file's directory
        const resolved = path.resolve(path.dirname(full), importPath);
        if (fs.existsSync(resolved + '.js')) {
          return `${prefix}${importPath}.js${suffix}`;
        }
        if (fs.existsSync(path.join(resolved, 'index.js'))) {
          return `${prefix}${importPath}/index.js${suffix}`;
        }
        return `${prefix}${importPath}.js${suffix}`;
      }
    );
    fs.writeFileSync(full, content);
  }
}

const esmDir = path.join(root, 'dist/esm');
if (fs.existsSync(esmDir)) {
  fixImports(esmDir);
  console.log('Post-build: ESM imports fixed');
}

console.log('Post-build: markers written');