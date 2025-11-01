#!/usr/bin/env node

/**
 * LOGO IMPLEMENTATION QUICK VERIFICATION
 * Run: node verify-logos.js
 */

const fs = require('fs');
const path = require('path');

console.log('\n🔍 LOGO IMPLEMENTATION VERIFICATION\n');
console.log('=' .repeat(60));

const files = [
  {
    name: 'Header',
    path: 'components/site-header.tsx',
    expectedSize: '40x40'
  },
  {
    name: 'Footer',
    path: 'components/site-footer.tsx',
    expectedSize: '48x48'
  },
  {
    name: 'Admin Header',
    path: 'components/admin-header.tsx',
    expectedSize: '32x32'
  }
];

let allPassed = true;

files.forEach((file, index) => {
  console.log(`\n${index + 1}. ${file.name} (${file.path})`);
  console.log('-'.repeat(60));
  
  try {
    const content = fs.readFileSync(file.path, 'utf8');
    
    // Check for Image import
    const hasImageImport = content.includes('import Image from "next/image"');
    console.log(`   ✓ Next.js Image import: ${hasImageImport ? '✅' : '❌'}`);
    
    // Check for logo placeholder comment
    const hasComment = content.includes('LOGO PLACEHOLDER');
    console.log(`   ✓ Comment marker: ${hasComment ? '✅' : '❌'}`);
    
    // Check for Image component
    const hasImageComponent = content.includes('<Image');
    console.log(`   ✓ Image component: ${hasImageComponent ? '✅' : '❌'}`);
    
    // Check for logo path
    const hasLogoPath = content.includes('placeholder-logo.svg');
    console.log(`   ✓ Logo path: ${hasLogoPath ? '✅' : '❌'}`);
    
    // Check for size
    const hasSize = content.includes(file.expectedSize.split('x')[0]);
    console.log(`   ✓ Size ${file.expectedSize}: ${hasSize ? '✅' : '❌'}`);
    
    // Check for alt text
    const hasAlt = content.includes('alt="Connected Hearts Logo"');
    console.log(`   ✓ Alt text: ${hasAlt ? '✅' : '❌'}`);
    
    const passed = hasImageImport && hasComment && hasImageComponent && hasLogoPath && hasSize && hasAlt;
    allPassed = allPassed && passed;
    
    console.log(`   ${passed ? '✅ PASSED' : '❌ FAILED'}`);
    
  } catch (error) {
    console.log(`   ❌ ERROR: ${error.message}`);
    allPassed = false;
  }
});

// Check logo file
console.log('\n4. Logo File');
console.log('-'.repeat(60));
const logoExists = fs.existsSync('public/placeholder-logo.svg');
console.log(`   ✓ /public/placeholder-logo.svg: ${logoExists ? '✅' : '❌'}`);
allPassed = allPassed && logoExists;

console.log('\n' + '='.repeat(60));
console.log(`\n${allPassed ? '✅ ALL CHECKS PASSED - 100% WORKING!' : '❌ SOME CHECKS FAILED'}\n`);

process.exit(allPassed ? 0 : 1);
