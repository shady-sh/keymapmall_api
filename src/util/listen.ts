import https from 'https';
import http from 'http';
import fs from 'fs';
import path from 'path';

const { network: networkConfig } = require('../../config');
const { isHttps } = require('../../config');

const options = {
  key: fs.readFileSync(path.resolve('keys/private.key')),
  cert: fs.readFileSync(path.resolve('keys/certificate.crt')),
  ca: fs.readFileSync(path.resolve('keys/ca_bundle.crt')),
};

export default function listen(handler?: http.RequestListener) {
  const { https: httpsConfig, port, host } = networkConfig;
  let server;
  if (isHttps) {
    server = https.createServer(options, handler);
  } else {
    server = http.createServer(handler);
  }

  server.listen(port, host, () => {
    if (isHttps) {
      console.log(`HTTPS Server Listening on port ${port}`);
    } else {
      console.log(`HTTP Server Listening on port ${port}`);
    }
  });
}
