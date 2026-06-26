// const JavaScriptObfuscator = require('javascript-obfuscator');
// const fs = require('fs');
// const path = require('path');

// const jsFolder = path.join(__dirname, '../build/static/js');

// fs.readdirSync(jsFolder).forEach(file => {
//   if (file.endsWith('.js')) {
//     const filePath = path.join(jsFolder, file);
//     const code = fs.readFileSync(filePath, 'utf8');

//     const obfuscated = JavaScriptObfuscator.obfuscate(code, {
//       compact: true,
//       controlFlowFlattening: true,
//       stringArray: true,
//       rotateStringArray: true,
//       deadCodeInjection: true,
//     });

//     fs.writeFileSync(filePath, obfuscated.getObfuscatedCode());
//     console.log(`Obfuscated: ${file}`);
//   }
// });

const JavaScriptObfuscator = require("javascript-obfuscator");
const fs = require("fs");
const path = require("path");

const jsFolder = path.join(__dirname, "../build/static/js");

if (!fs.existsSync(jsFolder)) {
  console.error("❌ JS build folder not found. Run: npm run build");
  process.exit(1);
}

fs.readdirSync(jsFolder).forEach((file) => {
  if (file.endsWith(".js")) {
    try {
      const filePath = path.join(jsFolder, file);
      const code = fs.readFileSync(filePath, "utf8");

      const obfuscated = JavaScriptObfuscator.obfuscate(code, {
        compact: true,
        controlFlowFlattening: true,
        controlFlowFlatteningThreshold: 1,
        deadCodeInjection: true,
        deadCodeInjectionThreshold: 0.4,
        stringArray: true,
        stringArrayEncoding: ["base64"],
        stringArrayThreshold: 1,
        rotateStringArray: true,
        disableConsoleOutput: true,
        numbersToExpressions: true,
        simplify: true,
        splitStrings: true,
        splitStringsChunkLength: 5,
      });

      fs.writeFileSync(filePath, obfuscated.getObfuscatedCode());
      console.log(`✔ Obfuscated: ${file}`);
    } catch (err) {
      console.error(`❌ Failed to obfuscate ${file}:`, err);
    }
  }
});
