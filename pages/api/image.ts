

const AWS = require("aws-sdk");
const sts = new AWS.STS();
const s3 = new AWS.S3();

export default (_, res) => {

    AWS.config.getCredentials(function (err) {
        if (err) console.log(err.stack);
        // credentials not loaded
        else {


            // s3.putObject({
            //     Bucket: "images.eurekacycling.com.au",
            //     Key: "Test",
            //     ContentType: "text/plain",
            //     ACL: "public-read",
            //     Body:
            // })
            // res.json({
            //     "Access key:": AWS.config.credentials.accessKeyId,
            //     "Secret access key:": AWS.config.credentials.secretAccessKey
            // })
            // console.log("Access key:", AWS.config.credentials.accessKeyId);
            // console.log("Secret access key:", AWS.config.credentials.secretAccessKey);
        }
    });
}
