import { Router, Response } from "express";
import * as Helpers from "../../helpers";
import * as Validations from "./services/validations";
import * as Services from "./services";

import { IResponseObjectViewModel, IRequest } from "../../helpers/models";
import { UserRole } from "../../helpers/enums";
import { isAuthenticated } from "../jwt-validation";

class Controller {
  public router: Router;

  constructor() {
    this.router = Router();
    this.routes();
  }

  private routes = () => {
    this.router.post("/Subscribe", Validations.subscribe, this.subscribe);
    this.router.post(
      "/GetListWithPaging",
      isAuthenticated([UserRole.admin]),
      Validations.getListWithPaging,
      this.getListWithPaging
    );
		this.router.post('/DownloadExcel', isAuthenticated([UserRole.admin]), this.downloadExcel);
  };

  private subscribe = async (req: IRequest, res: Response) => {
    try {
      const data: IResponseObjectViewModel = await Services.subscribe(req.body);
      Helpers.responseHandler(res, data);
    } catch (error) {
      Helpers.errorHandler(req, res, { error: error });
    }
  };

  private getListWithPaging = async (req: IRequest, res: Response) => {
    try {
      const data: IResponseObjectViewModel = await Services.getListWithPaging(
        req.body
      );
      Helpers.responseHandler(res, data);
    } catch (error) {
      Helpers.errorHandler(req, res, { error: error });
    }
  };

  private downloadExcel = async (req: IRequest, res: Response) => {
		try {
			const data: IResponseObjectViewModel = await Services.downloadExcelFile(req.body);
			Helpers.responseHandler(res, data);
		} catch (error) {
			Helpers.errorHandler(req, res, { error });
		}
	}
}

export default new Controller().router;
