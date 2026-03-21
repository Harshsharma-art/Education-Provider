const fs = require('fs');
const path = require('path');

const root = 'c:\\Users\\HP\\Desktop\\b_gZILyozWKf2-1773415668103';
const uiDir = path.join(root, 'src', 'components', 'ui');

function walk(dir) {
    let results = [];
    if (!fs.existsSync(dir)) return results;
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

const files = walk(uiDir);
files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    let changed = false;

    if (content.indexOf('@/components/lib/') !== -1) {
        content = content.split('@/components/lib/').join('@/lib/');
        changed = true;
    }
    if (content.indexOf('@/components/ui/utils') !== -1) {
        content = content.split('@/components/ui/utils').join('@/lib/utils');
        changed = true;
    }

    if (changed) {
        fs.writeFileSync(file, content, 'utf8');
        console.log('Fixed: ' + file);
    }
});
console.log('Done');
