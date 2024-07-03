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
		//#region GET
		this.router.get('/Details/:id', Validations.details, this.getDetails);
		this.router.get('/', Validations.getCompanies, isAuthenticatedOrGuest([UserRole.customer, UserRole.guest]), this.getTopCompanies);
		this.router.get('/WithDistance', Validations.getCompaniesWithDistance, isAuthenticatedOrGuest([UserRole.customer, UserRole.guest]), this.getCompaniesWithDistance);
		this.router.post('/GetMore', isAuthenticatedOrGuest([UserRole.customer, UserRole.guest]), this.getMore);
		
		this.router.get('/Sales', this.getSalesCompanies);
		this.router.get('/:companyName', isAuthenticated([UserRole.admin]), this.search);
		//#endregion
		//#region POST
		this.router.post('/GetByFilter', Validations.getCompaniesByFilter, this.getCompaniesByFilter);
		this.router.post('/ForAdmin', isAuthenticated([UserRole.admin]), Validations.getCompaniesForAdmin, this.getCompaniesForAdmin);
		this.router.post('/ShortListByFilter', isAuthenticated([UserRole.admin, UserRole.operator]), Validations.getShortList, this.getShortListByFilter);
		this.router.post('/Create', isAuthenticated([UserRole.admin]), Validations.createCompany, this.create);
		//#endregion
		//#region PUT
		this.router.put('/Upload', isAuthenticated([UserRole.admin]), MediaServer.handleUpload, Validations.upload, this.upload);

		this.router.put('/Edit/:id', isAuthenticated([UserRole.admin]), Validations.editCompany, this.editCompany);
		this.router.put('/Status/:id', isAuthenticated([UserRole.admin]), Validations.changeStatus, this.changeStatus);
		this.router.put('/Position', isAuthenticated([UserRole.admin]), Validations.changePosition, this.changePosition);
		//#endregion
	}

	private create = async (req: Models.IRequest, res: Response) => {
		try {
			const data: Models.IResponseObjectViewModel = await Services.createCourse(req.body, req.user);
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

	private editCompany = async (req: Models.IRequest, res: Response) => {
		try {
			const data: Models.IResponseObjectViewModel = await Services.editCompany(req.body, req.user, req.params.id);
			Helpers.responseHandler(res, data);
		} catch (error) {
			Helpers.errorHandler(req, res, { error: error });
		}
	}

	/**
	 * This function is edit company status
	 */
	private changeStatus = async (req: Models.IRequest, res: Response) => {
		try {
			const data: Models.IResponseObjectViewModel = await Services.changeStatus(req.body, req.user, req.params.id);
			Helpers.responseHandler(res, data);
		} catch (error) {
			Helpers.errorHandler(req, res, { error: error });
		}
	}

	private changePosition = async (req: Models.IRequest, res: Response) => {
		try {
			const data: Models.IResponseObjectViewModel = await Services.changePosition(req.body, req.user);
			Helpers.responseHandler(res, data);
		} catch (error) {
			Helpers.errorHandler(req, res, { error: error });
		}
	}

	private getDetails = async (req: Models.IRequest, res: Response) => {
		try {
			const data: Models.IResponseObjectViewModel = await Services.details(req.params.id);
			Helpers.responseHandler(res, data);
		} catch (error) {
			Helpers.errorHandler(req, res, { error: error });
		}
	}

	private getMore = async (req: Models.IRequest, res: Response) => {
		try {
			req.query.sortBy = +(req.query.sortBy) as any;
			const data = await Services.getMore(req.query as any, req.user, req.body);
			Helpers.responseHandler(res, data);
		} catch (error) {
			Helpers.errorHandler(req, res, { error: error });
		}
	}

	private getCompaniesWithDistance = async (req: Models.IRequest, res: Response) => {
		try {
			req.query.sortBy = +(req.query.sortBy) as any;
			const data = await Services.getCompaniesWithDistance(req.query as any, req.user);
			Helpers.responseHandler(res, data);
		} catch (error) {
			Helpers.errorHandler(req, res, { error: error });
		}
	}

	private getTopCompanies = async (req: Models.IRequest, res: Response) => {
		try {
			req.query.sortBy = +(req.query.sortBy) as any;
			const data: Models.IResponseObjectViewModel = await Services.getTopCompanies(req.query as any, req.user);
			Helpers.responseHandler(res, data);
		} catch (error) {
			Helpers.errorHandler(req, res, { error: error });
		}
	}

	private getCompanies = async (req: Models.IRequest, res: Response) => {
		try {
			req.query.sortBy = +(req.query.sortBy) as any;
			const data: Models.IResponseObjectViewModel = await Services.getCompanies(req.query as any);
			Helpers.responseHandler(res, data);
		} catch (error) {
			Helpers.errorHandler(req, res, { error: error });
		}
	}

	private getSalesCompanies = async (req: Models.IRequest, res: Response) => {
		try {
			req.query.sortBy = +(req.query.sortBy) as any;
			const data: Models.IResponseObjectViewModel = await Services.getSalesCompanies(req.query as any);
			Helpers.responseHandler(res, data);
		} catch (error) {
			Helpers.errorHandler(req, res, { error: error });
		}
	}

	private getCompaniesByFilter = async (req: Models.IRequest, res: Response) => {
		try {
			req.body.sortBy = +(req.body.sortBy);
			const data: Models.IResponseObjectViewModel = await Services.getCompaniesByFilter(req.body);
			Helpers.responseHandler(res, data);
		} catch (error) {
			Helpers.errorHandler(req, res, { error: error });
		}
	}

	private getCompaniesForAdmin = async (req: Models.IRequest, res: Response) => {
		try {
			const data: Models.IResponseObjectViewModel = await Services.getCompaniesForAdmin(req.query as any, req.body);
			Helpers.responseHandler(res, data);
		} catch (error) {
			Helpers.errorHandler(req, res, { error: error });
		}
	}

	private getShortListByFilter = async (req: Models.IRequest, res: Response) => {
		try {
			const data: Models.IResponseObjectViewModel = await Services.getShortListByFilter(req.body);
			Helpers.responseHandler(res, data);
		} catch (error) {
			Helpers.errorHandler(req, res, { error: error });
		}
	}

	private search = async (req: Models.IRequest, res: Response) => {
		try {
			const data: Models.IResponseObjectViewModel = await Services.searchCompany(req.params.companyName);
			Helpers.responseHandler(res, data);
		} catch (error) {
			Helpers.errorHandler(req, res, { error: error });
		}
	}
}

export default new Controller().router;