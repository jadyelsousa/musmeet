const multer = require('multer');
const path = require('path');


module.exports = {
    dest: path.resolve(__dirname,'..','..','files','uploads'),
    storage: multer.diskStorage({
        destination:path.resolve(__dirname,'..','..','files','uploads'),
        filename: function(req, file, cb){
            cb(null, file.originalname);
        }
    }),
    fileFilter: (req, file, cb) => {
        const allowedMines = [
            'image/jpeg',
            'image/pjpeg',
            'image/png',
            'image/gif'
        ];

        if(allowedMines.includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb(new Error("Inválid file type."));
        }
    }
};