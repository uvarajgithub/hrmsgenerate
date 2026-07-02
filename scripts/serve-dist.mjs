import { createReadStream, existsSync } from 'node:fs';
import { stat } from 'node:fs/promises';
import { createServer } from 'node:http';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const distDir = path.join(rootDir, 'dist');
const port = Number(process.env.PORT ?? 4177);
const host = process.env.HOST ?? '127.0.0.1';

const contentTypes = new Map([
  ['.css', 'text/css; charset=utf-8'],
  ['.html', 'text/html; charset=utf-8'],
  ['.ico', 'image/x-icon'],
  ['.js', 'text/javascript; charset=utf-8'],
  ['.json', 'application/json; charset=utf-8'],
  ['.map', 'application/json; charset=utf-8'],
  ['.png', 'image/png'],
  ['.svg', 'image/svg+xml; charset=utf-8'],
  ['.webp', 'image/webp'],
]);

if (!existsSync(path.join(distDir, 'index.html'))) {
  throw new Error('Missing dist/index.html. Run npm.cmd run build before npm.cmd run preview.');
}

function resolveRequestPath(url) {
  const pathname = decodeURIComponent(new URL(url ?? '/', `http://${host}:${port}`).pathname);
  const requestedPath = path.normalize(path.join(distDir, pathname));

  if (!requestedPath.startsWith(distDir)) {
    return path.join(distDir, 'index.html');
  }

  return requestedPath;
}

const server = createServer(async (request, response) => {
  let filePath = resolveRequestPath(request.url);

  try {
    const fileStats = await stat(filePath);
    if (fileStats.isDirectory()) {
      filePath = path.join(filePath, 'index.html');
    }
  } catch {
    filePath = path.join(distDir, 'index.html');
  }

  response.setHeader('Cache-Control', 'no-store');
  response.setHeader('Content-Type', contentTypes.get(path.extname(filePath)) ?? 'application/octet-stream');
  createReadStream(filePath)
    .on('error', () => {
      response.writeHead(500);
      response.end('Unable to serve HRMS preview.');
    })
    .pipe(response);
});

server.listen(port, host, () => {
  console.log(`HRMS preview running at http://${host}:${port}/`);
});
