const server = require("./src/app");
const dbConnect = require("./config/mongo");

server.listen(3001, () => console.log("server listening port 3001"));
dbConnect();
