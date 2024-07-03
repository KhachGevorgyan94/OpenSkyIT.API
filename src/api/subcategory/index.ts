import { Router, Response } from 'express';

import * as Services 			 					from './services';
import * as Validations 	 					from './services/validations';
import * as MediaServer 					  from '../media-server';
import { isAuthenticated } 					from '../jwt-validation';
import * as Helpers	 			 					from '../../helpers';
import { IResponseObjectViewModel, IRequest } from '../../helpers/models';
import { UserRole } 								from '../../helpers/enums';

class Controller {

  public router: Router;

	constructor() {
    this.router = Router();
    this.routes();
	}

	private routes = () => {
		//#region GET
		this.router.get('/ForAdmin/:mainCategoryId', Validations.getSubcategoriesForAdmin, this.subcategoryListForAdmin);
		this.router.get('/Short/:mainCategoryId', Validations.getSubcategoriesShortList, this.subcategoryShortList);
		this.router.get('/:mainCategoryId', Validations.getSubcategories, this.subcategoryList);
    //#endregion
		//#region POST
		this.router.post('/Create', isAuthenticated([ UserRole.admin ]), Validations.addSubcategory, this.addSubcategory);
    //#endregion
		//#region PUT
		this.router.put('/Position', isAuthenticated([ UserRole.admin ]), Validations.changePosition, this.changePosition);
		this.router.put('/Status/:id', isAuthenticated([ UserRole.admin ]), Validations.changeStatus, this.changeStatus);
		this.router.put('/Edit/:id', isAuthenticated([ UserRole.admin ]), Validations.editSubcategory, this.editSubcategory);
		this.router.put('/Upload/:id', isAuthenticated([ UserRole.admin ]), MediaServer.handleUpload, Validations.upload, this.upload);
		//#endregion
	}

	//#region Only for Admin

	private subcategoryListForAdmin = async (req: IRequest, res: Response) => {
		try {
			const data: IResponseObjectViewModel = await Services.subcategoryListForAdmin(req.params.mainCategoryId);
			Helpers.responseHandler(res, data);
		} catch (error) {
			Helpers.errorHandler(req, res, { error : error });
		}
	}

	private addSubcategory = async (req: IRequest, res: Response) => {
		try {
			const data: IResponseObjectViewModel = await Services.addSubcategory(req.body, req.user);
			Helpers.responseHandler(res, data);
		} catch (error) {
			Helpers.errorHandler(req, res, { error : error });
		}
	}

	private editSubcategory = async (req: IRequest, res: Response) => {
		try {
			const data: IResponseObjectViewModel = await Services.editSubcategory(req.body, req.user, req.params.id);
			Helpers.responseHandler(res, data);
		} catch (error) {
			Helpers.errorHandler(req, res, { error : error });
		}
	}

	/**
	 * This function is edit sub category status
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
	 * This function is add image to sub category position
	 */
	private changePosition = async (req: IRequest, res: Response) => {
		try {
			const data: IResponseObjectViewModel = await Services.changePosition(req.body, req.user);
			Helpers.responseHandler(res, data);
		} catch (error) {
			Helpers.errorHandler(req, res, { error : error });
		}
	}

	//#endregion

	private subcategoryList = async (req: IRequest, res: Response) => {
		try {
			const data: IResponseObjectViewModel = await Services.subcategoryList(req.params.mainCategoryId);
			Helpers.responseHandler(res, data);
		} catch (error) {
			Helpers.errorHandler(req, res, { error : error });
		}
	}

	private subcategoryShortList = async (req: IRequest, res: Response) => {
		try {
			const data: IResponseObjectViewModel = await Services.subcategoryShortList(req.params.mainCategoryId);
			Helpers.responseHandler(res, data);
		} catch (error) {
			Helpers.errorHandler(req, res, { error : error });
		}
	}

	private upload = async (req: IRequest, res: Response) => {
		try {
			const data: IResponseObjectViewModel = await Services.upload(req.params.id, req.files, req.user);
			Helpers.responseHandler(res, data);
		} catch (error) {
			Helpers.errorHandler(req, res, { error : error });
		}
	}
}

export default new Controller().router;