const fs = require('fs');
const path = require('path');
const src = 'C:\\Users\\HP\\.gemini\\antigravity\\brain\\a4d512c4-7619-4cd6-8dfa-030fc32c77c7\\rajesh_kumar_counsellor_portrait_1774022902377.png';
const dest = path.join(process.cwd(), 'public', 'images', 'counsellor.jpeg');

try {
    if (!fs.existsSync(path.dirname(dest))) {
        fs.mkdirSync(path.dirname(dest), { recursive: true });
    }
    fs.copyFileSync(src, dest);
    console.log('Successfully copied to ' + dest);
} catch (err) {
    console.error('Error: ' + err.message);
}
