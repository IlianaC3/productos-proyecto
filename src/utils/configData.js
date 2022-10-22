require('dotenv').config();
const os = require('os');

const dataConfig = {
    mode: process.env.MODE,
    port: process.env.PORT,
    dao: process.env.DAO,
    session_time: process.env.SESSION_TIME,
    email: process.env.EMAIL_NODEMAILER,
    args: process.argv,
    platform: process.platform,
    version: process.version,
    path: process.execPath,
    id: process.pid,
    folder: process.cwd(),
    rss: process.memoryUsage().rss,
}

module.exports = { dataConfig }