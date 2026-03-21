const fs = require('fs');
const path = require('path');

const uiDir = path.join(process.cwd(), 'src', 'components', 'ui');

if (fs.existsSync(uiDir)) {
  const files = fs.readdirSync(uiDir).filter(f => f.endsWith('.tsx'));
  
  files.forEach(file => {
    const filePath = path.join(uiDir, file);
    let content = fs.readFileSync(filePath, 'utf8');
    
    if (content.includes('@/components/lib/utils')) {
      const newContent = content.replace(/@\/components\/lib\/utils/g, '@/lib/utils');
      fs.writeFileSync(filePath, newContent, 'utf8');
      console.log(`Fixed: ${file}`);
    }
  });
} else {
  console.log('UI directory not found');
}
