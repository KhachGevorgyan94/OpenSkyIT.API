import { UserRole } from './../../helpers/enums/index';
import { isAuthenticated } from './../jwt-validation';
import { Router, Response } from 'express';

import * as Services from './services';

import * as Helpers from '../../helpers';

import { IResponseObjectViewModel, IRequest } from '../../helpers/models';

import * as Validations from './services/validations';

class Controller {

	public router: Router;

	constructor() {
		this.router = Router();
		this.routes();
	}

	private routes = () => {
		this.router.post('/info', this.myApi);
		this.router.post('/apply', Validations.instaServiceApply, this.instaServiceApply);
		this.router.post('/hybrid', Validations.hybrid, this.applyHybrid);
		this.router.post('/fda', Validations.fda, this.fda);

		this.router.post("/Register", Validations.register, this.register);
		this.router.post("/GetListWithPaging",isAuthenticated([UserRole.admin]),Validations.getListWithPaging, this.getListWithPaging);
		this.router.post("/SendEmailToUser", Validations.sendEmailToUser, this.sendEmailToUser);
		this.router.post("/SendResume", this.sendResume);
		this.router.post("/CreateCV", Validations.createCV, this.createCV);
		this.router.post('/DownloadExcel', isAuthenticated([UserRole.admin]), this.downloadExcel);
	}
	
	private createCV = async (req: IRequest, res: Response) => {
		try {
			const data: IResponseObjectViewModel = await Services.createCV(req.body);
			Helpers.responseHandler(res, data);
		} catch (error) {
			Helpers.errorHandler(req, res, { error: error });
		}
	}

	private fda = async (req: IRequest, res: Response) => {
		try {
			const data: IResponseObjectViewModel = await Services.fda(req.body);
			Helpers.responseHandler(res, data);
		} catch (error) {
			Helpers.errorHandler(req, res, { error: error });
		}
	}

	private downloadExcel = async (req: IRequest, res: Response) => {
		try {
			const data: IResponseObjectViewModel = await Services.downloadExcelFile(req.body);
			Helpers.responseHandler(res, data);
		} catch (error) {
			Helpers.errorHandler(req, res, { error });
		}
	}

	private sendEmailToUser = async (req: IRequest, res: Response) => {
		try {
			const data: IResponseObjectViewModel = await Services.sendEmailToUser(req.body);
			Helpers.responseHandler(res, data);
		} catch (error) {
			Helpers.errorHandler(req, res, { error: error });
		}
	}

	private sendResume = async (req: IRequest, res: Response) => {
		try {
			const data: IResponseObjectViewModel = await Services.sendResume(req.files);
			Helpers.responseHandler(res, data);
		} catch (error) {
			Helpers.errorHandler(req, res, { error: error });
		}
	}

	private myApi = async (req: IRequest, res: Response) => {
		try {
			const data: IResponseObjectViewModel = await Services.myApi(req.body);
			Helpers.responseHandler(res, data);
		} catch (error) {
			Helpers.errorHandler(req, res, { error: error });
		}
	}

	private instaServiceApply = async (req: IRequest, res: Response) => {
		try {
			const data: IResponseObjectViewModel = await Services.instaServiceApply(req.body);
			Helpers.responseHandler(res, data);
		} catch (error) {
			Helpers.errorHandler(req, res, { error: error });
		}
	}

	private applyHybrid = async (req: IRequest, res: Response) => {
		try {
			const data: IResponseObjectViewModel = await Services.applyHybrid(req.body);
			Helpers.responseHandler(res, data);
		} catch (error) {
			Helpers.errorHandler(req, res, { error: error });
		}
	}
	
	private register = async (req: IRequest, res: Response) => {
		try {
		  const data: IResponseObjectViewModel = await Services.createUser(
			req.body
		  );
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
}

export default new Controller().router;