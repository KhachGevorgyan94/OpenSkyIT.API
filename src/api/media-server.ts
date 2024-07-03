import * as path   from 'path';
import * as fs     from 'fs';
import * as Chalk  from 'chalk';
import * as multer from 'multer';

import * as Helpers from '../helpers';
import config from '../config';

const chalk: any = Chalk;

const getFileExtension = name => {
  const arrName = name.split('.');
  return arrName[arrName.length - 1];
};

export const removeFile = (imagePath: string): void => {
  const mediaPath = config.mediaPath;
  if (fs.existsSync(mediaPath + '/' + imagePath)) {
    try {
      fs.unlinkSync(mediaPath  + '/' + imagePath);
    } catch (e) {
      console.log(chalk.blue(imagePath) + ' ' + chalk.red('Error: EBUSY: resource busy or locked, unlink'));
    }
  } else {
    console.log(`${chalk.blue(imagePath)} not found`);
  }
};

export const handleUpload = (req, res, next) => {
  registerUpload(req, res, err => {
    if (err) return Helpers.failedResponse(res, { message: 'Not valid key' }); // Not valid key
    return next();
  });
};

export const registerUpload = multer({
  storage: multer.diskStorage({
    destination: path.resolve(__dirname, '..', '..', 'media'),
    filename: (req, file, next) => next(null, `${file.fieldname}-${Date.now()}.${getFileExtension(file.originalname)}`),
  }),
}).fields([
  { name: 'imagePath', maxCount: 1 }
]);

export const handleUploadForChat = (req, res, next) => {
  registerUploadForChat(req, res, err => {
    if (err) return Helpers.failedResponse(res, { message: 'Not valid key' }); // Not valid key
    return next();
  });
};

export const registerMultiUpload = multer({
  storage: multer.diskStorage({
    destination: path.resolve(__dirname, '..', '..', 'media'),
    filename: (req, file, next) => next(null, `${file.fieldname}-${Date.now()}.${getFileExtension(file.originalname)}`),
  }),
}).fields([
  { name: 'files' }
]);

export const multyUpload = (req, res, next) => {
  registerMultiUpload(req, res, err => {
    if (err) { return Helpers.failedResponse(res, { message: 'Not valid key' }); }
    return next();
  });
};

export const compareAndRemove = (oldPaths: string[], newPaths: string[]): void => {
  const removedItems = oldPaths.filter(x => !newPaths.includes(x));
  removedItems.forEach(x => removeFile(x));
};

// export const registerUploadForChat = multer({
//   storage: multer.diskStorage({
//     destination: path.resolve(__dirname, '..', '..', 'media'),
//     filename: (req, file, next) => next(null, `${file.fieldname}-${Date.now()}.${getFileExtension(file.originalname)}`),
//   }),
//   fileFilter: function (req, file, cb) {
//     const isValid = /[^\\]*\.(\w+)$/.test(file.originalname);
//     if (!isValid) {
//       return cb(null, false);
//     }
//     const mimeType = file.mimetype.slice(0, 5);
//     console.log(mimeType);
//     if (mimeType === 'audio' || mimeType === 'image') {
//       cb(null, true);
//     } else {
//       cb(null, false);
//     }
//   }
// }).single('file');

export const registerUploadForChat = multer({
  storage: multer.diskStorage({
    destination: path.resolve(__dirname, '..', '..', 'media'),
    filename: (req, file, next) => next(null, `${file.fieldname}-${Date.now()}.${getFileExtension(file.originalname)}`),
  }),
  fileFilter: function (req, file, cb) {
    const isValid = /[^\\]*\.(\w+)$/.test(file.originalname);
    if (!isValid) {
      return cb(null, false);
    }
    const mimeType = file.mimetype.slice(0, 5);
    console.log('mimeType', mimeType);
    if (file.fieldname === 'imagePath' && mimeType !== 'image') cb(null, false);
    else if (file.fieldname === 'audioPath' && mimeType !== 'audio') cb(null, false);
    else cb(null, true);
  }
}).fields([
  { name: 'imagePath', maxCount: 1 },
  { name: 'audioPath', maxCount: 1 }
]);