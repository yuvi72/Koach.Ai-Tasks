const AWS = require('aws-sdk');
const s3 = new AWS.S3();
const bucketName = 'renyzaro'; // replace with your bucket name

const handler = async (event) => {
    try {
        const httpMethod = event.httpMethod;
        console.log("httpMethod ", httpMethod);

        if (httpMethod === 'POST') {

            // Handle POST request
            const requestBody = event.body;
            const fileName = `file_${Date.now()}.json`; // Use a unique name
            const params = {
                Bucket: bucketName,
                Key: fileName,
                Body: JSON.stringify(requestBody),
                ContentType: 'application/json',
            };

            const data = await s3.putObject(params).promise();
            return {
                statusCode: 200,
                body: JSON.stringify({
                    e_tag: data.ETag,
                    url: `https://${bucketName}.s3.amazonaws.com/${fileName}`,
                }),
            };

        } else if (httpMethod === 'GET') {
            // Handle GET request
            const params = {
                Bucket: bucketName,
                MaxKeys: 10 // Limit to 10 files for faster response; adjust as needed
            };

            const data = await s3.listObjectsV2(params).promise();
            const jsonData = await Promise.all(
                data.Contents.map(async (item) => {
                    try {
                        const objectParams = {
                            Bucket: bucketName,
                            Key: item.Key,
                        };
                        const objectData = await s3.getObject(objectParams).promise();
                        return JSON.parse(objectData.Body.toString());
                    } catch (parseError) {
                        console.error(`Error parsing JSON for ${item.Key}:`, parseError);
                        return null; // Skip non-JSON files
                    }
                })
            );

            return {
                statusCode: 200,
                body: JSON.stringify(jsonData.filter((item) => item !== null)),
            };

        } else {
            return {
                statusCode: 405,
                body: JSON.stringify({ error: event }),
            };
        }

    } catch (error) {
        console.error("Error:", error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: error.message }),
        };
    }
};

module.exports.handler = handler;
