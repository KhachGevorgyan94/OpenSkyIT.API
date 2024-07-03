"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const routes_1 = require("./routes");
const Helpers = require("./helpers");
const config_1 = require("./config");
const ev = require("express-validation");
class Server {
    constructor() {
        this.config = () => {
            this.app.use((req, res, next) => {
                res.header("Access-Control-Allow-Origin", "*");
                res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
                res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization, Access-Control-Allow-Credentials");
                res.header("Access-Control-Allow-Credentials", "true");
                next();
            });
            this.app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
            this.app.use(express.json()); // for parsing application/json
            this.app.use(cookieParser());
            this.app.use(morgan("dev"));
            this.app.use("/", express.static(config_1.default.mediaPath));
        };
        this.app = express();
        this.config();
        this.routes();
    }
    routes() {
        routes_1.default(this.app);
        // this.app.get('/removeProducts', async (req: express.Request, res: express.Response) => {
        //   await NataliService.deleteAll();
        //   res.status(200).send('Server is successful working');
        // });
        // Route to check server alive
        this.app.get("/", (req, res) => {
            res.status(200).send("Server is successful working").end();
        });
        this.app.get("/Files/:fileName", (req, res) => {
            res.download(path.resolve(__dirname, "..", "media", "files") +
                `/${req.params.fileName}`);
        });
        this.app.use((req, res, next) => {
            const error = new Error("Not found");
            error.status = 404;
            next(error);
        });
        this.app.use((error, req, res, next) => {
            if (error instanceof ev.ValidationError) {
                const message = error.errors
                    .map((item) => item.messages.join(". "))
                    .join(" and ");
                return Helpers.failedResponse(res, { message: message });
            }
            res.status(error.status || 500).json({ message: error.message });
        });
    }
}
exports.default = new Server().app;
