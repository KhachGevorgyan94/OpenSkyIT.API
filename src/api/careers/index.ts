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
		this.router.get('/ForAdmin', isAuthenticated([ UserRole.admin ]), this.careersListForAdmin);
		this.router.get('/Details/:id', Validations.details, this.details);
		this.router.get('/', this.careersList);
    //#endregion
		//#region POST
		this.router.post('/Create', isAuthenticated([ UserRole.admin ]), Validations.create, this.create);
    //#endregion
		//#region PUT
		this.router.put('/Status/:id', isAuthenticated([ UserRole.admin ]), Validations.changeStatus, this.changeStatus);
		this.router.put('/Upload', isAuthenticated([ UserRole.admin ]), MediaServer.handleUpload, Validations.upload, this.upload);
		this.router.put('/Edit/:id', isAuthenticated([ UserRole.admin ]), MediaServer.handleUpload, Validations.editPromotion, this.editCategory);
		//#endregion
	}

	private careersList = async (req: IRequest, res: Response) => {
		try {	
			const data: IResponseObjectViewModel = await Services.careersList();
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

	private careersListForAdmin = async (req: IRequest, res: Response) => {
		try {
			const data: IResponseObjectViewModel = await Services.careersListForAdmin();
			Helpers.responseHandler(res, data);
		} catch (error) {
			Helpers.errorHandler(req, res, { error : error });
		}
	}

	/**
	 * This function is create careers
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
	 * This function is edit careers
	 */
	private editCategory = async (req: IRequest, res: Response) => {
		try {
			const data: IResponseObjectViewModel = await Services.editCareers(req.body, req.user, req.params.id);
			Helpers.responseHandler(res, data);
		} catch (error) {
			Helpers.errorHandler(req, res, { error : error });
		}
	}

	/**
	 * This function is edit main careers status
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
	 * This function is add image to careers
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