const http = require('http');
const {aim, amz} = require('./scrape/main');

const server = http.createServer( (req, res) => {
        let {url, method} = req;
        if(url === '/home' && method === 'POST'){
            let body = [];
            
                req.on('data', chunk => body.push(chunk))
                .on('end', () => {
                    body = Buffer.concat(body).toString();
                    console.log(JSON.parse(body))
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'text/plain');
                    res.end(body);
                })
                .on('error', e => console.log(e))
        }
        else{
            res.statusCode = 404;
            res.setHeader('Content-type', 'text/plain');
            res.end('Page Not Found');
        }
    } );


const PORT = process.env.PORT ||  8000;

server.listen(PORT, () =>
    console.log(`listening on port ${PORT}`)
);

//console.log(aim, amz)   //functions