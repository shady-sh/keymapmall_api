module.exports = {
  network: {
    host: '0.0.0.0',
    port: 1200,
  },
  isHttps: false,
  db: {
    host: 'localhost',
    dialect: 'mysql',
    uri: 'mysql://root:urbandb*@dev.urbandigital.com:3306/company_mall',
  },
  log: {
    stdout: 'dev',
    access: {
      directory: 'logs',
      filename: 'access.log',
      format: 'combined',
    },
    useFullLog: true,
  },
  auth: {
    sessionSecret: 'some_secret_token!authentication@protocol@@',
    bcrypt: 10,
    deleteKey: '###',
    defaultCash: 0,
  },
  sms: {
    codeDuration: 300,
    accessKeyId: '',
    secretAccessKey: '',
    region: '',
  },
  mail: {
    service: 'Gmail',
    host: 'localhost',
    port: '465',
    from: '',
    user: '',
    password: '',
  },
  upload: {
    directoryPublic: 'public/',
    directory: 'uploads/',
    url: '0.0.0.0:3000',
    temp: '/tmp/',
  },
  s3: {
    enabled: true,
    bucket: '',
    accessKeyId: '',
    secretAccessKey: '',
    signatureVersion: '',
    region: '',
  },
};
