import * as express from "express";
import * as cors from "cors";
import * as path from "path";
import * as cookieParser from "cookie-parser";
import * as morgan from "morgan";

import Routes from "./routes";
import * as Helpers from "./helpers";
import config from "./config";

const ev = require("express-validation");

class Server {
  public app: express.Application;

  constructor() {
    this.app = express();
    this.config();
    this.routes();
  }

  private config = (): void => {
    
    this.app.use((req, res, next) => {
      res.header("Access-Control-Allow-Origin", "*");
      res.header(
        "Access-Control-Allow-Methods",
        "GET, POST, PUT, DELETE, OPTIONS"
      );
      res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization, Access-Control-Allow-Credentials"
      );
      res.header("Access-Control-Allow-Credentials", "true");
      next();
    });

    this.app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
    this.app.use(express.json()); // for parsing application/json
    this.app.use(cookieParser());
    this.app.use(morgan("dev"));
    this.app.use("/", express.static(config.mediaPath));
  };

  public routes(): void {
    Routes(this.app);

    // this.app.get('/removeProducts', async (req: express.Request, res: express.Response) => {
    //   await NataliService.deleteAll();
    //   res.status(200).send('Server is successful working');
    // });

    // Route to check server alive
    this.app.get("/", (req: express.Request, res: express.Response) => {
      res.status(200).send("Server is successful working").end();
    });

    this.app.get(
      "/Files/:fileName",
      (req: express.Request, res: express.Response) => {
        res.download(
          path.resolve(__dirname, "..", "media", "files") +
            `/${req.params.fileName}`
        );
      }
    );

    this.app.use(
      (
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
      ) => {
        const error: any = new Error("Not found");
        error.status = 404;
        next(error);
      }
    );

    this.app.use(
      (error: any, req: express.Request, res: express.Response, next) => {
        if (error instanceof ev.ValidationError) {
          const message: string = error.errors
            .map((item) => item.messages.join(". "))
            .join(" and ");
          return Helpers.failedResponse(res, { message: message });
        }
        res.status(error.status || 500).json({ message: error.message });
      }
    );
  }
}

export default new Server().app;
