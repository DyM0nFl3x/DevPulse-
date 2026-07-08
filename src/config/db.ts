import dotenv from "dotenv"
import path from "path"

dotenv.config({
path:path.join(process.cwd(),'.env')
})

const p=process.env

const config={
  port:p.PORT as string,
  db_url:p.DB_URL as string
}
export default config