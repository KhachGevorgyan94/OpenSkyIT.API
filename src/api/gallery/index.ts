import { Router, Response } from 'express';

import * as Services 			 										from './services';
import * as Validations 	 										from './services/validations';
import * as MediaServer 											from '../media-server';
import { isAuthenticated } 										from '../jwt-validation';
import * as Helpers	 			 										from '../../helpers';
import { IResponseObjectViewModel, IRequest } from '../../helpers/models';
import { UserRole } 													from '../../helpers/enums';

class Controller {

  public router: Router;

	constructor() {
    this.router = Router();
    this.routes();
	}

	private routes = () => {
		this.router.get('/ForAdmin', isAuthenticated([ UserRole.admin ]), this.categoryListForAdmin);
		this.router.get('/', this.categoryList);
		this.router.post('/Create', isAuthenticated([ UserRole.admin ]), this.create);
		this.router.put('/Upload', isAuthenticated([ UserRole.admin ]), MediaServer.handleUpload, Validations.upload, this.upload);
		this.router.put('/Edit/:id', isAuthenticated([ UserRole.admin ]), MediaServer.handleUpload, this.editCategory);
	}

	private categoryList = async (req: IRequest, res: Response) => {
		try {
			const data: IResponseObjectViewModel = await Services.categoryList();
			Helpers.responseHandler(res, data);
		} catch (error) {
			Helpers.errorHandler(req, res, { error : error });
		}
	}

	private editCategory = async (req: IRequest, res: Response) => {
		try {
			const data: IResponseObjectViewModel = await Services.editCategory(req.user, req.params.id);
			Helpers.responseHandler(res, data);
		} catch (error) {
			Helpers.errorHandler(req, res, { error : error });
		}
	}

	private categoryListForAdmin = async (req: IRequest, res: Response) => {
		try {
			const data: IResponseObjectViewModel = await Services.categoryListForAdmin();
			Helpers.responseHandler(res, data);
		} catch (error) {
			Helpers.errorHandler(req, res, { error : error });
		}
	}

	private create = async (req: IRequest, res: Response) => {
		try {
			const data: IResponseObjectViewModel = await Services.create(req.user, req.body);
			Helpers.responseHandler(res, data);
		} catch (error) {
			Helpers.errorHandler(req, res, { error : error });
		}
	}

	private upload = async (req: IRequest, res: Response) => {
		try {
			const data: IResponseObjectViewModel = await Services.upload(req.query.id as any, req.query.imageType as any, req.files, req.user);
			Helpers.responseHandler(res, data);
		} catch (error) {
			Helpers.errorHandler(req, res, { error : error });
		}
	}

	//#endregion
}

export default new Controller().router;