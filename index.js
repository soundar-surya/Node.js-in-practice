const http = require('http');
const {aim, amz} = require('./scrape/main');


const server = http.createServer( (req, res) => {
        switch(req.url){
            case '/home':
                let body = [];
                 req.on('data',  chunk => body.push(chunk))
                    .on('end', () => {
                        body = Buffer.concat(body).toString()
                        console.log(JSON.parse(body))
                        
                        res.statusCode = 200;
                        res.setHeader('Content-Type', 'text/plain');
                        res.end('Hello there!');
                    })
                    .on('err', e => console.log(e))
          
                break;

            default:
                res.statusCode = 404;
                res.setHeader('Content-type', 'text/plain');
                res.end('Oops, Page Not Found');
        }
    } );


const PORT = 8000 || process.env.PORT;

server.listen(PORT, () =>
    console.log(`listening on port ${PORT}`)
);

//console.log(aim, amz)   //functions