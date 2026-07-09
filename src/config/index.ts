import dotenv, { configDotenv } from "dotenv"
import path from "path"

dotenv.config({
path:path.join(process.cwd(),'.env')
})

configDotenv({ quiet: true });
const p=process.env

const config={
  port:p.PORT as string,
  db_url:p.DB_URL as string
  // secret,tokenExpiresIn 
}


export default config
