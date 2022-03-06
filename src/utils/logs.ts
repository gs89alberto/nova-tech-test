import fs from 'fs';

const createWriteStream = (): fs.WriteStream => {
  let logDir: fs.PathLike = __dirname + '/../logs/';
  if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir, { recursive: true });
  }
  return fs.createWriteStream(logDir + 'access.log', { flags: 'a' });
};

export { createWriteStream };
