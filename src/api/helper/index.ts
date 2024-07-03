import { Router, Response } from 'express';
import fetch                from 'node-fetch';

import * as Helpers from '../../helpers';
import { IRequest } from '../../helpers/models';

class Controller {

  public router: Router;

	constructor() {
    this.router = Router();
    this.routes();
	}

	private routes = () => {
		//#region POST
		this.router.post('/MakeRequest', this.request);
    //#endregion
  }

	private request = async (req: IRequest, res: Response) => {
		try {
			const response = await fetch(`${req.body.requestUrl}`, {
				method  : 'Get',
				headers : { 
					'Content-Type' : 'application/json',
				},
			});
			const data = await response.json();
			Helpers.responseHandler(res, {
				success: true,
				data,
				message: 'ok'
			});
		} catch (error) {
			Helpers.failedResponse(res);
		}
	}

}

export default new Controller().router;