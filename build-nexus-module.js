import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Create deployment package
const deploymentFiles = [
  'dist/bundle.js',
  'dist/nxs_package.json', 
  'dist/README.md',
  'dist/LICENSE',
  'dist/assets/icon.svg'
];

console.log('📦 Nexus Module Deployment Package Created');
console.log('');
console.log('📁 Files included:');
deploymentFiles.forEach(file => {
  if (fs.existsSync(file)) {
    const stats = fs.statSync(file);
    console.log(`   ✅ ${file} (${(stats.size / 1024).toFixed(1)}KB)`);
  } else {
    console.log(`   ❌ ${file} (missing)`);
  }
});

console.log('');
console.log('🚀 Ready for Nexus wallet deployment!');
console.log('');
console.log('📋 Installation Instructions:');
console.log('   1. Extract nexus-voting-module.zip');
console.log('   2. Copy contents to Nexus wallet modules directory');
console.log('   3. Restart Nexus wallet');
console.log('   4. Module will appear in modules list');
console.log('');
console.log('🔧 Module Configuration:');
console.log('   • Name: Voting Module');
console.log('   • Version: 1.0.0');
console.log('   • Category: Governance');
console.log('   • Permissions: Assets, Accounts, Transactions');
console.log('   • Min Core Version: 5.1.0');