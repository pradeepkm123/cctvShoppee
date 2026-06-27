const fs = require('fs');
const path = require('path');

const targetUrl = 'https://api.cctvshoppee.com';
const toReplace = [
  'http://52.66.98.128:5001',
  'https://cctvshoppee.onrender.com',
  'http://localhost:5000'
];

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(function(file) {
    file = path.join(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) {
      if (!file.includes('node_modules') && !file.includes('.git') && !file.includes('build')) {
        results = results.concat(walk(file));
      }
    } else {
      if (file.endsWith('.js') || file.endsWith('.jsx') || file.endsWith('.ts') || file.endsWith('.tsx') || file.endsWith('.env')) {
        results.push(file);
      }
    }
  });
  return results;
}

const files = walk(path.join(__dirname, 'frontend'));
let replacedCount = 0;

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let newContent = content;

  toReplace.forEach(searchStr => {
    newContent = newContent.split(searchStr).join(targetUrl);
  });

  if (content !== newContent) {
    fs.writeFileSync(file, newContent, 'utf8');
    replacedCount++;
    console.log(`✅ Updated: ${path.relative(__dirname, file)}`);
  }
});

console.log(`\n🎉 Done! Updated ${replacedCount} files.`);
console.log(`   Old URLs replaced with: ${targetUrl}`);
