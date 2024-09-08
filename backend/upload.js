const aws = require("aws-sdk");
const multer = require("multer");
const multerS3 = require("multer-s3");
require('dotenv').config();

aws.config.update({
    accessKeyId: process.env.S3_ACCESS_KEY,
    secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
});

const s3 = new aws.S3();
const myBucket = process.env.S3_BUCKET_NAME;
console.log(process.env.S3_ACCESS_KEY)
console.log(process.env.S3_SECRET_ACCESS_KEY)
console.log(myBucket)
console.log("going to upload");
const upload = multer({
    storage: multerS3({
        s3,
        bucket: myBucket,
        contentType: multerS3.AUTO_CONTENT_TYPE,
        key: function (req, file, cb) {
            cb(null, file.originalname);
        },
    }),
});

module.exports = upload;

