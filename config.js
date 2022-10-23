const secret_key = process.env.SECRET_KEY;
const database_mysql = process.env.DATABASE_MYSQL;
const user_mysql = process.env.USER_MYSQL;
const pass_mysql = process.env.USER_MYSQL_PASS;
const port_mysql = process.env.PORT_MYSQL;
const host_mysql = process.env.HOST_MYSQ
const mongo_user = process.env.MONGO_ATLAS_USER;
const mongo_cluster = process.env.MONGO_ATLAS_CLUSTER;
const mongo_database = process.env.MONGO_DATABASE;
const mongo_port = process.env.MONGO_PORT;
const server_port = process.env.PORT;
const mode = process.env.MODE;
const twilio_sid = process.env.TWILIO_SID;
const twilio_key = process.env.TWILIO_KEY;
const email = process.env.EMAIL_NODEMAILER;
const dao = process.env.DAO;
const session_time = process.env.SESSION_TIME;

module.exports = { secret_key, database_mysql, user_mysql, pass_mysql, port_mysql, host_mysql, mongo_user,
mongo_cluster, mongo_database, mongo_port, server_port, mode, twilio_sid, twilio_key, email, dao, session_time }