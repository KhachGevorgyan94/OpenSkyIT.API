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
		//#region GET
		this.router.get('/ForAdmin', isAuthenticated([ UserRole.admin ]), this.promotionListForAdmin);
		this.router.get('/Details/:id', Validations.details, this.details);
		this.router.get('/', this.promotionList);
    //#endregion
		//#region POST
		this.router.post('/Create', isAuthenticated([ UserRole.admin ]), Validations.create, this.create);
    //#endregion
		//#region PUT
		this.router.put('/Position', isAuthenticated([ UserRole.admin ]), Validations.changePosition, this.changePosition);
		this.router.put('/Status/:id', isAuthenticated([ UserRole.admin ]), Validations.changeStatus, this.changeStatus);
		this.router.put('/Upload', isAuthenticated([ UserRole.admin ]), MediaServer.handleUpload, Validations.upload, this.upload);
		this.router.put('/Edit/:id', isAuthenticated([ UserRole.admin ]), MediaServer.handleUpload, Validations.editPromotion, this.editCategory);
		//#endregion
	}

	/**
	 * This function is return promotion
	 */
	private promotionList = async (req: IRequest, res: Response) => {
		try {	
			const data: IResponseObjectViewModel = await Services.promotionsList();
			Helpers.responseHandler(res, data);
		} catch (error) {
			Helpers.errorHandler(req, res, { error : error });
		}
	}

	private details = async (req: IRequest, res: Response) => {
		try {
			const data: IResponseObjectViewModel = await Services.details(req.params.id);
			Helpers.responseHandler(res, data);
		} catch (error) {
			Helpers.errorHandler(req, res, { error : error });
		}
	}

	//#region Only for Admin

	private promotionListForAdmin = async (req: IRequest, res: Response) => {
		try {
			const data: IResponseObjectViewModel = await Services.promotionListForAdmin();
			Helpers.responseHandler(res, data);
		} catch (error) {
			Helpers.errorHandler(req, res, { error : error });
		}
	}

	/**
	 * This function is create promotion
	 */
	private create = async (req: IRequest, res: Response) => {
		try {
			const data: IResponseObjectViewModel = await Services.create(req.body, req.user);
			Helpers.responseHandler(res, data);
		} catch (error) {
			Helpers.errorHandler(req, res, { error : error });
		}
	}

	/**
	 * This function is edit promotion
	 */
	private editCategory = async (req: IRequest, res: Response) => {
		try {
			const data: IResponseObjectViewModel = await Services.editPromotion(req.body, req.user, req.params.id);
			Helpers.responseHandler(res, data);
		} catch (error) {
			Helpers.errorHandler(req, res, { error : error });
		}
	}

	/**
	 * This function is edit main promotion status
	 */
	private changeStatus = async (req: IRequest, res: Response) => {
		try {
			const data: IResponseObjectViewModel = await Services.changeStatus(req.body, req.user, req.params.id);
			Helpers.responseHandler(res, data);
		} catch (error) {
			Helpers.errorHandler(req, res, { error : error });
		}
	}

	/**
	 * This function is add image to main promotion position
	 */
	private changePosition = async (req: IRequest, res: Response) => {
		try {
			const data: IResponseObjectViewModel = await Services.changePosition(req.body, req.user);
			Helpers.responseHandler(res, data);
		} catch (error) {
			Helpers.errorHandler(req, res, { error : error });
		}
	}

	/**
	 * This function is add image to promotion
	 */
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