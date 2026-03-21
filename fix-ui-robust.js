const fs = require('fs');
const path = require('path');

function walk(dir) {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach(file => {
        file = path.join(dir, file);
        const stat = fs.statSync(file);
        if (stat && stat.isDirectory()) {
            results = results.concat(walk(file));
        } else {
            if (file.endsWith('.tsx') || file.endsWith('.ts')) {
                results.push(file);
            }
        }
    });
    return results;
}

const uiDir = path.join(process.cwd(), 'src', 'components', 'ui');
if (fs.existsSync(uiDir)) {
    const files = walk(uiDir);
    files.forEach(file => {
        let content = fs.readFileSync(file, 'utf8');
        let changed = false;

        if (content.includes('@/components/lib/')) {
            content = content.replace(/@\/components\/lib\//g, '@/lib/');
            changed = true;
        }
        if (content.includes('@/components/ui/utils')) {
            content = content.replace(/@\/components\/ui\/utils/g, '@/lib/utils');
            changed = true;
        }
        if (content.includes('@/lib/utils') && !content.includes("from '@/lib/utils'")) {
             // Just in case there's some weirdness
        }

        if (changed) {
            fs.writeFileSync(file, content, 'utf8');
            console.log('Fixed: ' + file);
        }
    });
}
console.log('UI Fix Done');
