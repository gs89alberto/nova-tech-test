import dotenv from 'dotenv';

const envFound = dotenv.config();
if (envFound.error) {
  throw new Error("⚠️  Couldn't find .env file  ⚠️");
}

const { NODE_ENV = 'development', MONGO_DB_URL_DEVELOPMENT, MONGO_DB_URL_TESTING, HOST, PORT, MAIL_USER, MAIL_PASS } = process.env;

const config = {
  development: {
    app: {
      host: HOST,
      port: PORT,
    },
    db: {
      url: MONGO_DB_URL_DEVELOPMENT,
    },
    mail: {
      user: MAIL_USER,
      password: MAIL_PASS,
    },
    api: {
      prefix: '/api',
    },
  },
  testing: {
    app: {
      host: HOST,
      port: PORT,
    },
    db: {
      url: MONGO_DB_URL_TESTING,
    },
    mail: {
      user: MAIL_USER,
      password: MAIL_PASS,
    },
    api: {
      prefix: '/api',
    },
  },
};
const serverConfig = config[NODE_ENV];

export { serverConfig };
