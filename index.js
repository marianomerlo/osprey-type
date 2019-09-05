const express = require('express');
const osprey = require('osprey');

const app = express();

app.use(
    express.Router().use(
        '/api/v1',
        express
          .Router()
    
          // Osprey middleware
          .use(ospreyMiddleware('./raml/forstoikovitch.raml'))
          
          .post('/myType', (req, res) => {
            res.send('you win\n');
          })
));

app
.listen(8080, '0.0.0.0', () => {
  console.info(
    `listening on 0.0.0.0:8080 ...`
  );
})
.on('clientError', (error, conn) => {
  console.error({
    error
  });

  conn.end(`HTTP/1.1 400 Bad Request\r\nContent-Length: 0\r\n\r\n`);
});

function ospreyMiddleware(pathToRamlFile, options) {
    const ospreyMetadata = {};
    return (req, res, next) =>
      (
        ospreyMetadata[pathToRamlFile] ||
        (ospreyMetadata[pathToRamlFile] = osprey.loadFile(
          pathToRamlFile,
          options
        ))
      )
        .then((middleware) => middleware(req, res, next))
        .catch(next);
  }