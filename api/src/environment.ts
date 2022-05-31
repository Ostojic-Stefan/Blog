import { load } from 'ts-dotenv'

export default load({
    PORT: Number,
    DB_CONN: String,
    DB_PASS: String,
    DB_USERNAME: String,
    JWT_SECRET: String
});