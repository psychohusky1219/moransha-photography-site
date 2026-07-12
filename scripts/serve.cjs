const http = require("http");
const fs = require("fs");
const path = require("path");
const sanityContent = require("../api/sanity-content.js");

const root = path.resolve(__dirname, "..");
const port = Number(process.argv[2] || process.env.PORT || 3000);

const types = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp"
};

const server = http.createServer((request, response) => {
  const url = new URL(request.url, `http://${request.headers.host || "localhost"}`);

  if (url.pathname === "/api/sanity-content") {
    sanityContent(request, response);
    return;
  }

  const requested = decodeURIComponent(url.pathname.replace(/^\/+/, "")) || "index.html";
  let filePath = path.resolve(root, requested);

  if (!filePath.startsWith(root)) {
    response.writeHead(403);
    response.end("Forbidden");
    return;
  }

  fs.stat(filePath, (statError, stats) => {
    if (!statError && stats.isDirectory()) {
      filePath = path.join(filePath, "index.html");
    }

    fs.readFile(filePath, (readError, contents) => {
      if (readError) {
        response.writeHead(404);
        response.end("Not found");
        return;
      }

      response.writeHead(200, {
        "content-type": types[path.extname(filePath)] || "application/octet-stream"
      });
      response.end(contents);
    });
  });
});

server.listen(port, "127.0.0.1", () => {
  console.log(`MoranSha Photography site running at http://127.0.0.1:${port}/`);
});
