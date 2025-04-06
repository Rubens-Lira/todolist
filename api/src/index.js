import "dotenv/config"
import express from "express"
import errorHandlerMidleWare from "./middlewares/errorHandlerMidleware.js"
import routes from "./routes/authRoutes.js"
import publicRoutes from "./routes/publicRoutes.js"

const app = express()

app.use(express.json())

app.use("/api", publicRoutes);       
app.use("/api/auth", routes);         

app.use(errorHandlerMidleWare)

app.listen(process.env.PORT, () => console.log(`Server iniciado em http://localhost:${process.env.PORT}/api`))
