// Post-build: tandakan dist/cjs sebagai CommonJS, dist/esm sebagai ESM
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
console.log('Post-build: markers written');