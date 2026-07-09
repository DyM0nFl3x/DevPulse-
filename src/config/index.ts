import dotenv, { configDotenv } from "dotenv"
import type { SignOptions } from "jsonwebtoken";
import path from "path"
configDotenv({ quiet: true });

dotenv.config({
path:path.join(process.cwd(),'.env')
})

const p=process.env

const config={
  port:p.PORT as string,
  db_url:p.DB_URL as string,
  secret:p.JWT_SIGNIN as string,
  tokenExpiresIn: p.EXPIRY as SignOptions["expiresIn"] || "1d"
}


export default config
