import { IAddSettingsInfoBodyModel } from './../models/index';
//#region Models

import { IResponseObjectViewModel } from '../../../helpers/models';

//#endregion

//#region Schemas

import Settings from '../../../schemas/settings';

//#endregion



export const uploadImages = async(files: any, oldFiles: string[]) => {
  try {
    oldFiles = oldFiles || [];
    const data = await Settings.findOne();
    const newFiles = (files.files || []).map(x => x.filename);
    // MediaServer.compareAndRemove(data.homeBanner, oldFiles || []);
    data.homeBanner = newFiles;

    await data.save();
    return {
      success : true,
      data    : null,
      message : 'ok'
    };
  } catch (error) { throw error; }
};


export const all = async (): Promise<IResponseObjectViewModel> => {
  try {
    const data = await Settings.findOne();
    return {
      success : true,
      data,
      message : 'ok'
    };
  } catch (error) { throw error; }
};

export const info = async (body: IAddSettingsInfoBodyModel): Promise<IResponseObjectViewModel> => {
  try {
    const data = await Settings.findOne();
    data.title = body.title;
    data.description = body.description;
    await data.save();

    return {
      success : true,
      data,
      message : 'ok'
    };
  } catch (error) { throw error; }
};