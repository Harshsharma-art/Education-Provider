const fs = require('fs');
const path = require('path');

const uiDir = path.join('c:', 'Users', 'HP', 'Desktop', 'b_gZILyozWKf2-1773415668103', 'src', 'components', 'ui');

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

if (fs.existsSync(uiDir)) {
    const files = walk(uiDir);
    files.forEach(file => {
        let content = fs.readFileSync(file, 'utf8');
        let changed = false;
        
        // Use a more generic regex to catch all combinations
        const oldImport1 = /@\/components\/lib\//g;
        const oldImport2 = /@\/components\/ui\/utils/g;
        
        if (oldImport1.test(content)) {
            content = content.replace(oldImport1, '@/lib/');
            changed = true;
        }
        if (oldImport2.test(content)) {
            content = content.replace(oldImport2, '@/lib/utils');
            changed = true;
        }

        if (changed) {
            fs.writeFileSync(file, content, 'utf8');
            console.log('Successfully updated: ' + file);
        }
    });
} else {
    console.error('UI directory not found: ' + uiDir);
}
