import { Router, Response } from 'express';

import * as Services 			 				  					from './services';
import * as Validations 	 				  					from './services/validations';
import * as MediaServer 											from '../media-server';
import { isAuthenticated } 				  					from '../jwt-validation';
import * as Helpers	 			 										from '../../helpers';
import { UserRole } 													from '../../helpers/enums';
import { IResponseObjectViewModel, IRequest } from '../../helpers/models';
import { IAdmin } 														from '../../schemas/admin/model';


class Controller {

  public router: Router;

	constructor() {
    this.router = Router();
    this.routes();
	}

	private routes = () => {
		//#region GET
		this.router.get('/Details', isAuthenticated([ UserRole.admin, UserRole.dispatcher, UserRole.operator, UserRole.dispatcherAdmin ]), this.userDetails);
		this.router.get('/List', isAuthenticated([ UserRole.admin, UserRole.dispatcher, UserRole.operator, UserRole.dispatcherAdmin ]), Validations.getList, this.getList);
		//#endregion

    this.router.post('/Create', isAuthenticated([ UserRole.admin ]), Validations.create, this.create);

    //#region PUT
		this.router.put('/Upload/:id', isAuthenticated([ UserRole.admin ]), MediaServer.handleUpload, Validations.upload, this.upload);
		this.router.put('/ChangeProfileImage', isAuthenticated([ UserRole.dispatcher, UserRole.operator, UserRole.admin, UserRole.dispatcherAdmin ]), MediaServer.handleUpload, this.changeProfileImage);
    this.router.put('/ChangePassword', isAuthenticated([ UserRole.admin, UserRole.dispatcher, UserRole.operator, UserRole.dispatcherAdmin ]), Validations.changePassword, this.changePassword);
    this.router.put('/ChangePassword/:id', isAuthenticated([ UserRole.admin ]), Validations.changePasswordForAdmin, this.changePasswordForAdmin);
		this.router.put('/Edit', isAuthenticated([ UserRole.dispatcher, UserRole.operator, UserRole.admin, UserRole.dispatcherAdmin ]), Validations.edit, this.edit);
    this.router.put('/Edit/:id', isAuthenticated([ UserRole.admin ]), Validations.editWithAdmin, this.editWithAdmin);
		//#endregion

    this.router.delete('/Delete/:id', isAuthenticated([ UserRole.admin ]), Validations.deleteAdmin, this.delete);
	}

	private upload = async (req: IRequest, res: Response) => {
		try {
			const data: IResponseObjectViewModel = await Services.upload(req.params.id, req.files);
			Helpers.responseHandler(res, data);
		} catch (error) {
			Helpers.errorHandler(req, res, { error : error });
		}
	}

	private changeProfileImage = async (req: IRequest, res: Response) => {
		try {
			const data: IResponseObjectViewModel = await Services.upload(req.user._id, req.files);
			Helpers.responseHandler(res, data);
		} catch (error) {
			Helpers.errorHandler(req, res, { error : error });
		}
	}

	private userDetails = async (req: IRequest<IAdmin>, res: Response) => {
		console.log(req);
		
		try {
			Helpers.responseHandler(res, {
				success : true,
				data    : req.user.short(),
				message : 'ok'
			});
		} catch (error) {
			Helpers.errorHandler(req, res, { error : error });
		}
	}

	private getList = async (req: IRequest, res: Response) => {
		try {
			const data: IResponseObjectViewModel = await Services.getList(req.query.role as any);
			Helpers.responseHandler(res, data);
		} catch (error) {
			Helpers.errorHandler(req, res, { error : error });
		}
	}

	private changePassword = async (req: IRequest, res: Response) => {
		try {
			const data: IResponseObjectViewModel = await Services.changePassword(req.body.newPassword, req.user);
			Helpers.responseHandler(res, data);
		} catch (error) {
			Helpers.errorHandler(req, res, { error : error });
		}
	}

	private changePasswordForAdmin = async (req: IRequest, res: Response) => {
		try {
			const data: IResponseObjectViewModel = await Services.changePasswordForAdmin(req.body.password, req.params.id);
			Helpers.responseHandler(res, data);
		} catch (error) {
			Helpers.errorHandler(req, res, { error : error });
		}
	}

	private create = async (req: IRequest, res: Response) => {
		try {
			const data: IResponseObjectViewModel = await Services.create(req.body);
			Helpers.responseHandler(res, data);
		} catch (error) {
			Helpers.errorHandler(req, res, { error : error });
		}
	}

	private edit = async (req: IRequest, res: Response) => {
		try {
			const data: IResponseObjectViewModel = await Services.edit(req.body, req.user);
			Helpers.responseHandler(res, data);
		} catch (error) {
			Helpers.errorHandler(req, res, { error : error });
		}
	}

	private editWithAdmin = async (req: IRequest, res: Response) => {
		try {
			const data: IResponseObjectViewModel = await Services.editWithAdmin(req.body, req.params.id);
			Helpers.responseHandler(res, data);
		} catch (error) {
			Helpers.errorHandler(req, res, { error : error });
		}
	}

	private delete = async (req: IRequest, res: Response) => {
		try {
			const data: IResponseObjectViewModel = await Services.deleteAdmin(req.params.id);
			Helpers.responseHandler(res, data);
		} catch (error) {
			Helpers.errorHandler(req, res, { error : error });
		}
	}
}

export default new Controller().router;