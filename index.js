const http = require('http');
const fs = require('fs').promises;
const host = 'localhost';
const port = 8080;
const routes = ['/index.html', '/about.html', '/contact-me.html', '/404.html'];
let contents = [];

for (let route of routes) {
    fs.readFile(__dirname + route)
        .then((content) => {
            contents.push(content);
            // server.listen(port, host, () => {
            //     console.log(`Server is running on http://${host}:${port}`);
            // });
        })
        .catch((err) => {
            console.error(`Could not read index.html file: ${err}`);
            process.exit(1);
        });
}

const requestListener = function (req, res) {
    res.setHeader('Content-Type', 'text/html');
    switch (req.url) {
        case '/':
            res.writeHead(200);
            res.end(contents[0]);
            break;
        case '/about':
            res.writeHead(200);
            res.end(contents[1]);
            break;
        case '/contact-me':
            res.writeHead(200);
            res.end(contents[2]);
            break;
        default:
            res.writeHead(404);
            res.end(contents[3]);
    }
};

const server = http.createServer(requestListener);

server.listen(8080);
