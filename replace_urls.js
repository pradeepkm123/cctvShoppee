const fs = require('fs');
const path = require('path');

const targetUrl = 'http://52.66.98.128:5001';
const toReplace = [
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
    // Escape for regex or just use split/join
    newContent = newContent.split(searchStr).join(targetUrl);
  });
  
  if (content !== newContent) {
    fs.writeFileSync(file, newContent, 'utf8');
    replacedCount++;
    console.log(`Updated ${file}`);
  }
});

console.log(`Successfully updated ${replacedCount} files.`);
