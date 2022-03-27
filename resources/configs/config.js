import { config } from "dotenv";
config();

const SECRETS = {
    PORT : process.env.PORT,
    NODE_ENV : process.env.NODE_ENV,
    MONGODB_CONNECTION_STRING : process.env.MONGODB_CONNECTION_STRING
}

export default SECRETS;