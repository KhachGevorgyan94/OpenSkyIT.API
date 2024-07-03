import { isAuthenticatedOrGuest } from './../jwt-validation';
import { Router, Response } from 'express';

import * as Services from './services';
import * as Validations from './services/validations';
import * as MediaServer from '../media-server';
import { isAuthenticated } from '../jwt-validation';
import * as Helpers from '../../helpers';
import { UserRole } from '../../helpers/enums';
import * as Models from '../../helpers/models';

class Controller {

	public router: Router;

	constructor() {
		this.router = Router();
		this.routes();
	}

	private routes = () => {
		this.router.post('/Create', isAuthenticatedOrGuest([UserRole.guest, UserRole.customer]), Validations.createCompany, this.create);

		this.router.put('/Upload', isAuthenticatedOrGuest([UserRole.customer, UserRole.guest]), MediaServer.handleUpload, Validations.upload, this.upload);
	}

	private create = async (req: Models.IRequest, res: Response) => {
		try {
			const data: Models.IResponseObjectViewModel = await Services.createCompany(req.body, req.user);
			Helpers.responseHandler(res, data);
		} catch (error) {
			Helpers.errorHandler(req, res, { error: error });
		}
	}

	private upload = async (req: Models.IRequest, res: Response) => {
		try {
			const data: Models.IResponseObjectViewModel = await Services.uploadCompanyImage(req.query.companyId as any, req.query.imageType as any, req.files);
			Helpers.responseHandler(res, data);
		} catch (error) {
			Helpers.errorHandler(req, res, { error: error });
		}
	}
}

export default new Controller().router;