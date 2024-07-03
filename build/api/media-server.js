"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("path");
const fs = require("fs");
const Chalk = require("chalk");
const multer = require("multer");
const Helpers = require("../helpers");
const config_1 = require("../config");
const chalk = Chalk;
const getFileExtension = name => {
    const arrName = name.split('.');
    return arrName[arrName.length - 1];
};
exports.removeFile = (imagePath) => {
    const mediaPath = config_1.default.mediaPath;
    if (fs.existsSync(mediaPath + '/' + imagePath)) {
        try {
            fs.unlinkSync(mediaPath + '/' + imagePath);
        }
        catch (e) {
            console.log(chalk.blue(imagePath) + ' ' + chalk.red('Error: EBUSY: resource busy or locked, unlink'));
        }
    }
    else {
        console.log(`${chalk.blue(imagePath)} not found`);
    }
};
exports.handleUpload = (req, res, next) => {
    exports.registerUpload(req, res, err => {
        if (err)
            return Helpers.failedResponse(res, { message: 'Not valid key' }); // Not valid key
        return next();
    });
};
exports.registerUpload = multer({
    storage: multer.diskStorage({
        destination: path.resolve(__dirname, '..', '..', 'media'),
        filename: (req, file, next) => next(null, `${file.fieldname}-${Date.now()}.${getFileExtension(file.originalname)}`),
    }),
}).fields([
    { name: 'imagePath', maxCount: 1 }
]);
exports.handleUploadForChat = (req, res, next) => {
    exports.registerUploadForChat(req, res, err => {
        if (err)
            return Helpers.failedResponse(res, { message: 'Not valid key' }); // Not valid key
        return next();
    });
};
exports.registerMultiUpload = multer({
    storage: multer.diskStorage({
        destination: path.resolve(__dirname, '..', '..', 'media'),
        filename: (req, file, next) => next(null, `${file.fieldname}-${Date.now()}.${getFileExtension(file.originalname)}`),
    }),
}).fields([
    { name: 'files' }
]);
exports.multyUpload = (req, res, next) => {
    exports.registerMultiUpload(req, res, err => {
        if (err) {
            return Helpers.failedResponse(res, { message: 'Not valid key' });
        }
        return next();
    });
};
exports.compareAndRemove = (oldPaths, newPaths) => {
    const removedItems = oldPaths.filter(x => !newPaths.includes(x));
    removedItems.forEach(x => exports.removeFile(x));
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
exports.registerUploadForChat = multer({
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
        if (file.fieldname === 'imagePath' && mimeType !== 'image')
            cb(null, false);
        else if (file.fieldname === 'audioPath' && mimeType !== 'audio')
            cb(null, false);
        else
            cb(null, true);
    }
}).fields([
    { name: 'imagePath', maxCount: 1 },
    { name: 'audioPath', maxCount: 1 }
]);
