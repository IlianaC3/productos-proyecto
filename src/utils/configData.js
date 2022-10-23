const { mode, server_port, dao, session_time, email, mongo_database } = require('../../config')

const dataConfig = {
    mode: mode,
    port: server_port,
    dao: dao,
    session_time: session_time,
    email: email,
    database: mongo_database,
    args: process.argv,
    platform: process.platform,
    version: process.version,
    path: process.execPath,
    id: process.pid,
    folder: process.cwd(),
    rss: process.memoryUsage().rss,
}

module.exports = { dataConfig }