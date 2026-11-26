// Where the PHP backend lives.
// - Local development (npm start on localhost:3000): the XAMPP copy of the project.
// - Deployed site: the same domain the page is served from.
const isLocal = ['localhost', '127.0.0.1'].includes(window.location.hostname);

export const API_BASE = isLocal ? 'http://localhost/Tawa%20Management%20App' : '';
