const { createServer } = require('http');
const { parse } = require('url');
const next = require('next');

//const nextConfig = require('./next.config');
//const app = next({ dev, hostname, port, dir: __dirname, conf: nextConfig });

//const dev = process.env.NODE_ENV !== 'production';
//const app = next({ dev, dir: __dirname });
const dev = process.env.NODE_ENV !== 'production';
const hostname = 'localhost';
const port = process.env.PORT || 3000;
// when using middleware `hostname` and `port` must be provided below
const app = next({ dev, hostname, port, dir: __dirname });

const handle = app.getRequestHandler();

app.prepare().then(() => {

    createServer(async (req, res) => {
        try {
            handle(req, res, parse(req.url, true).pathname);
        } catch (err) {
            console.error('Error occurred handling', req.url, err);
            res.statusCode = 500;
            res.end('internal server error');
        }
    }).listen(port, (err) => {
        if (err) throw err;
        console.log('> Ready on http://' + hostname + ':' + port);
    });

});