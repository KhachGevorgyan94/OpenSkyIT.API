import { Response, Router } from 'express';

import * as Helpers	 			 					from '../../helpers';
import { UserRole } 								from '../../helpers/enums';
import { IRequest, IResponseObjectViewModel } from '../../helpers/models';
import { isAuthenticated, isAuthenticatedOrGuest } from '../jwt-validation';
import * as MediaServer from '../media-server';
import * as Services 			 					from './services';
import * as Validations 	 										from './services/validations';

class Controller {

  public router: Router;

	 constructor() {
    	this.router = Router();
    	this.routes();
	}

	 private routes = () => {
		this.router.get('/All', isAuthenticatedOrGuest([ UserRole.admin, UserRole.customer, UserRole.guest ]), this.all);
		this.router.put('/UploadBanner', isAuthenticated([ UserRole.admin ]), MediaServer.multyUpload, this.uploadBanner);
		this.router.post('/Info', isAuthenticated([ UserRole.admin ]), Validations.Info, this.info);
	}

	 private uploadBanner = async (req: IRequest, res: Response) => {
		try {
			const data: IResponseObjectViewModel = await Services.uploadImages(req.files, req.body.oldFiles);
			Helpers.responseHandler(res, data);
		} catch (error) {
			Helpers.errorHandler(req, res, { error });
		}
	}

	private all = async (req: IRequest, res: Response) => {
		try {
			const data: IResponseObjectViewModel = await Services.all();
			Helpers.responseHandler(res, data);
		} catch (error) {
			Helpers.errorHandler(req, res, { error });
		}
	}

	private info = async (req: IRequest, res: Response) => {
		try {
			const data: IResponseObjectViewModel = await Services.info(req.body);
			Helpers.responseHandler(res, data);
		} catch (error) {
			Helpers.errorHandler(req, res, { error });
		}
	}

}

export default new Controller().router;