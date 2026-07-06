const fs = require('fs');
const path = require('path');

const routesDir = path.join(__dirname, 'src', 'routes');
const files = fs.readdirSync(routesDir).filter(f => f.endsWith('.tsx'));

for (const file of files) {
  const filePath = path.join(routesDir, file);
  let content = fs.readFileSync(filePath, 'utf-8');
  
  if (content.includes('<Newsletter />')) {
    content = content.replace(/<Newsletter \/>\r?\n?/g, '');
    content = content.replace(/import \{ Newsletter \} from "@\/components\/site\/Newsletter";\r?\n?/g, '');
    fs.writeFileSync(filePath, content);
    console.log('Cleaned', file);
  }
}
