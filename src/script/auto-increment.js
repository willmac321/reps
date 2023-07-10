const fs = require('fs');
const { exec } = require('child_process');

const app = JSON.parse(fs.readFileSync('./app.json', 'utf8'));
const oldV = app.expo.version.split('.');

oldV[2] = parseInt(oldV[2], 10) + 1;

app.expo.version = oldV.join('.');
app.expo.android.versionCode += 1;

fs.writeFileSync('./app.json', JSON.stringify(app));

// :)
exec('npm run pretty -- ./app.json --write');
