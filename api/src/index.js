import "dotenv/config"
import express from "express"
import router from "./routes.js"

const app = express()

app.use(express.json())
app.use(router)

app.listen(process.env.PORT, () => console.log(`Server iniciado em http://localhost:${process.env.PORT}`))
