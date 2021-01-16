const http = require('http');
const {spawn} = require('child_process');
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
                    res.setHeader('Content-Type', 'application/json');
                    res.end(body);
                })
                .on('error', e => console.log(e))
        }

        else if(url === '/linkpy' && method === 'GET'){

            const logOutput = (name) => (data) => {
                console.log(`[${name}] ${data}`);
                res.statusCode = 200;
                res.setHeader('Content-Type', 'text/plain');
                res.end(data.toString());
                
            }

            function run() {
              return new Promise((resolve, reject) => {
                const process = spawn('python3', ['./pyScripts/script.py', 'my', 'args']);
            
                const out = []
                process.stdout.on(
                  'data',
                    logOutput('stdout')
                );
            
            
                const err = []
                process.stderr.on(
                  'data',
                    logOutput('stderr')
                );
            
                // process.on('exit', (code, signal) => {
                //   logOutput('exit')(`${code} (${signal})`)
                //   resolve();
                // });
              });
            }
            
            (async () => {
              try {
                run()
                // logOutput('main')(output)
                // process.exit(0)
              } catch (e) {
                console.error(e.stack);
                process.exit(1);
              }
            })();
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
