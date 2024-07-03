import { Router, Response } from 'express';

import * as Services 		   from './services';
import * as Validations    from './services/validations';
import { isAuthenticated, checkAuthenticated } from '../jwt-validation';
import * as Helpers	 		   from '../../helpers';
import * as Models 			   from '../../helpers/models';
import { UserRole } 			 from '../../helpers/enums';

class Controller {

	public router: Router;

	constructor() {
    this.router = Router();
    this.routes();
	}

	private routes = () => {
    //#region POST
		this.router.post('/Token', Validations.token, this.token);
		this.router.post('/Token/ByVC', checkAuthenticated(), Validations.tokenByVC, this.tokenByVC);
		this.router.post('/Token/Admin', Validations.adminToken, this.adminToken);
		this.router.post('/SendForgotKey', Validations.forgotKey, this.sendForgotKey);
		this.router.post('/CheckForgotKey', Validations.checkForgotKey, this.checkForgotKey);
		this.router.post('/ResetPassword', Validations.resetPassword, this.resetPassword);
		this.router.post('/Logout', isAuthenticated([ UserRole.customer, UserRole.driver ]), Validations.logout, this.logout);
    //#endregion
	}

	private token = async (req: Models.IRequest, res: Response) => {
		try {
			const data: Models.IResponseObjectViewModel = await Services.token(req.body);
			Helpers.responseHandler(res, data);
		} catch (error) {
			Helpers.errorHandler(req, res, { error : error });
		}
	}

	private tokenByVC = async (req: Models.IRequest, res: Response) => {
		try {
			const data: Models.IResponseObjectViewModel = await Services.tokenByVC(req.body, req.user);
			Helpers.responseHandler(res, data);
		} catch (error) {
			Helpers.errorHandler(req, res, { error : error });
		}
	}

	private adminToken = async (req: Models.IRequest, res: Response) => {
		try {
			const data: Models.IResponseObjectViewModel = await Services.adminToken(req.body);
			Helpers.responseHandler(res, data);
		} catch (error) {
			Helpers.errorHandler(req, res, { error : error });
		}
	}

	private sendForgotKey = async (req: Models.IRequest, res: Response) => {
		try {
			await Services.forgotKey(res, req.body.email);
		} catch (error) {
			Helpers.errorHandler(req, res, { error : error });
		}
	}

	private checkForgotKey = async (req: Models.IRequest, res: Response) => {
		try {
			const data: Models.IResponseObjectViewModel = await Services.checkForgotKey(req.body);
			Helpers.responseHandler(res, data);
		} catch (error) {
			Helpers.errorHandler(req, res, { error : error });
		}
	}

	private resetPassword = async (req: Models.IRequest, res: Response) => {
		try {
			const data: Models.IResponseObjectViewModel = await Services.resetPassword(req.body);
			Helpers.responseHandler(res, data);
		} catch (error) {
			Helpers.errorHandler(req, res, { error : error });
		}
	}

	private logout = async (req: Models.IRequest, res: Response) => {
		try {
			const data: Models.IResponseObjectViewModel = await Services.logout(req.body);
			Helpers.responseHandler(res, data);
		} catch (error) {
			Helpers.errorHandler(req, res, { error : error });
		}
	}
}

export default new Controller().router;