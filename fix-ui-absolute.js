const fs = require('fs');
const path = require('path');

const rootDir = 'c:\\Users\\HP\\Desktop\\b_gZILyozWKf2-1773415668103';
const uiDir = path.join(rootDir, 'src', 'components', 'ui');
const logFile = path.join(rootDir, 'ui-fix-log.txt');

fs.writeFileSync(logFile, 'Starting UI fix in ' + uiDir + '\n');

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

        if (content.includes('@/components/lib/')) {
            content = content.replace(/@\/components\/lib\//g, '@/lib/');
            changed = true;
        }
        if (content.includes('@/components/ui/utils')) {
            content = content.replace(/@\/components\/ui\/utils/g, '@/lib/utils');
            changed = true;
        }

        if (changed) {
            fs.writeFileSync(file, content, 'utf8');
            fs.appendFileSync(logFile, 'Fixed: ' + file + '\n');
        } else {
            fs.appendFileSync(logFile, 'Checked (no change): ' + file + '\n');
        }
    });
} else {
    fs.appendFileSync(logFile, 'UI directory not found!\n');
}

fs.appendFileSync(logFile, 'UI Fix Done\n');
console.log('Done');
