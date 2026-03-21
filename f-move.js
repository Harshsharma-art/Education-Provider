const fs = require('fs');
const path = require('path');
const r = 'c:\\Users\\HP\\Desktop\\b_gZILyozWKf2-1773415668103';
const s = path.join(r, 'src', 'app', 'public', 'images', 'counsellor.jpeg');
const d = path.join(r, 'public', 'images', 'counsellor.jpeg');
if (fs.existsSync(s)) {
    if (!fs.existsSync(path.dirname(d))) fs.mkdirSync(path.dirname(d), { recursive: true });
    fs.copyFileSync(s, d);
    console.log('Done moving');
} else {
    console.log('Source not found');
}
