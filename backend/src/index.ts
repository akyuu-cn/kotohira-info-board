import express from 'express'
import config from './config.js'
import log4js from "log4js"
import api from './api/index.js'
import * as user from './user.js'
import * as post from './post.js'
import cors from 'cors'

const logger = log4js.getLogger("index")

logger.level = "TRACE"

user.init()
post.init()

const app = express()

app.use(express.static("public"))
app.use(express.json())

app.use(cors({
    origin: 'http://localhost:5173',
    methods: 'GET,POST,PUT,DELETE',
    allowedHeaders: ['Content-Type', 'Authorization']
}))

const apiVersion = "/api/v1"

const apiV1 = express.Router()


apiV1.get("/ping", (req, res) => { api.utils.ping(req, res) })
apiV1.post("/auth", (req, res) => { api.user.auth(req, res) })
apiV1.get("/post", (req, res) => { api.post.get(req, res) })
apiV1.post("/newAnnouncement", (req, res) => { api.post.newAnnouncement(req, res) })
apiV1.post("/editAnnouncement", (req, res) => { api.post.editAnnouncement(req, res) })
apiV1.post("/deleteAnnouncement", (req, res) => { api.post.deleteAnnouncement(req, res) })
apiV1.post("/newComment", (req, res) => { api.post.newComment(req, res) })
apiV1.post("/deleteComment", (req, res) => { api.post.deleteComment(req, res) })

app.use(apiVersion, apiV1)

app.listen(config.port, () => {
    logger.info(`kotohira-info-board server started on port ${config.port}.`)
})