import { Router, Response } from 'express';

import * as Services 		   from './services';
import * as Validations    from './services/validations';
import { isAuthenticated } from '../jwt-validation';
import * as Helpers	 		   from '../../helpers';
import * as Models 			   from '../../helpers/models';
import { UserRole }        from '../../helpers/enums';

class Controller {

	public router: Router;

	constructor() {
    this.router = Router();
    this.routes();
	}

	private routes = () => {
		//#region POST
		this.router.post('/NewUsersCount', isAuthenticated([ UserRole.admin ]), Validations.orderCountFilter, this.newUsersCount);
    //#endregion
  }


	private newUsersCount = async (req: Models.IRequest, res: Response) => {
		try {
			const data: Models.IResponseObjectViewModel = await Services.newUsersCount(req.body);
			Helpers.responseHandler(res, data);
		} catch (error) {
			Helpers.errorHandler(req, res, { error : error });
		}
	}

}

export default new Controller().router;