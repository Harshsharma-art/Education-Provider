const fs = require('fs');
const path = require('path');
const root = 'c:\\Users\\HP\\Desktop\\b_gZILyozWKf2-1773415668103';
const src = path.join(root, 'src', 'app', 'public', 'images', 'counsellor.jpeg');
const dest = path.join(root, 'public', 'images', 'counsellor.jpeg');

try {
    if (fs.existsSync(src)) {
        if (!fs.existsSync(path.dirname(dest))) {
            fs.mkdirSync(path.dirname(dest), { recursive: true });
        }
        fs.renameSync(src, dest);
        console.log('Moved to: ' + dest);
    } else {
        console.log('Source not found: ' + src);
    }
} catch (err) {
    console.error('Error: ' + err.message);
}
