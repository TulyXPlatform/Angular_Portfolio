const fs = require('fs');
const path = require('path');

const folders = [
  'backend/src/config',
  'backend/src/middlewares',
  'backend/src/utils',
  'backend/src/validators',
  'backend/src/common',
  'backend/src/modules/auth',
  'backend/src/modules/settings',
  'backend/src/modules/hero',
  'backend/src/modules/about',
  'backend/src/modules/projects',
  'backend/src/modules/experience',
  'backend/src/modules/blog',
  'backend/src/modules/contact',
  'backend/src/modules/inquiry',
  'backend/src/modules/media',
  'portfolio/src/app/core/services',
  'portfolio/src/app/core/models',
  'portfolio/src/app/core/interceptors',
  'portfolio/src/app/shared/components',
  'portfolio/src/app/features/home',
  'portfolio/src/app/features/about',
  'portfolio/src/app/features/projects',
  'portfolio/src/app/features/blog',
  'portfolio/src/app/features/contact',
  'admin-panel/src/app/core/services',
  'admin-panel/src/app/core/guards',
  'admin-panel/src/app/features/auth',
  'admin-panel/src/app/features/dashboard',
  'admin-panel/src/app/features/settings',
  'admin-panel/src/app/features/projects',
];

folders.forEach(f => {
  fs.mkdirSync(path.join(__dirname, f), { recursive: true });
});

console.log("Directories created successfully.");
