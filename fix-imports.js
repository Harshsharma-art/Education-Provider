const fs = require('fs');
const path = require('path');

function walk(dir) {
    fs.readdirSync(dir).forEach(file => {
        const fullPath = path.join(dir, file);
        if (fs.lstatSync(fullPath).isDirectory()) {
            walk(fullPath);
        } else if (file.endsWith('.ts') || file.endsWith('.tsx')) {
            let content = fs.readFileSync(fullPath, 'utf8');
            let original = content;
            
            // Fix @/src/components/lib/ -> @/lib/
            content = content.split('@/src/components/lib/').join('@/lib/');
            // Fix @/src/components/ui/ -> @/components/ui/
            content = content.split('@/src/components/ui/').join('@/components/ui/');
            // Fix @/src/components/ -> @/components/
            content = content.split('@/src/components/').join('@/components/');
            // Fix @/src/hooks/ -> @/hooks/
            content = content.split('@/src/hooks/').join('@/hooks/');
            // Fix @/src/lib/ -> @/lib/
            content = content.split('@/src/lib/').join('@/lib/');
            // Fix @/src/app/ -> @/app/
            content = content.split('@/src/app/').join('@/app/');
            // Fix any remaining @/src/ -> @/
            content = content.split('@/src/').join('@/');
            
            if (content !== original) {
                console.log(`Fixed ${fullPath}`);
                fs.writeFileSync(fullPath, content, 'utf8');
            }
        }
    });
}

walk('src');
console.log('Done!');
