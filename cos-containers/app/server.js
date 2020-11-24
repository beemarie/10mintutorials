const express = require('express');
const objectStore = require('ibm-cos-sdk');
const { v4: uuidv4 } = require('uuid');
const axios = require('axios');
const stream = require('stream');

const app = express();
const apiKeyId = process.env.APIKEY;
const endpoint = process.env.ENDPOINT;
const serviceInstanceId = process.env.SERVICE_INSTANCE;
const bucketName = process.env.BUCKET_NAME;

const config = {
  endpoint,
  apiKeyId,
  serviceInstanceId,
};

const cos = new objectStore.S3(config);

app.use(express.json());

function uploadObject(key, url) {
  return cos.upload({
    Bucket: bucketName,
    Key: key,
    Body: url,
  }).promise();
}

app.get('/', (_req, res) => {
  res.send('hello! please make a post request to /addurl endpoint with body {"url":"your_url"}');
});

app.post('/addurl', async (req, res) => {
  const { body } = req;
  console.log('Hello world received a request, with this body: ');
  const key = uuidv4();
  const uploadStream = () => {
    const pass = new stream.PassThrough();
    uploadObject(key, pass);
    return pass;
  };
  axios({
    method: 'get',
    url: body.url,
    responseType: 'stream',
  })
    .then((response) => {
      if (response.status === 200) {
        // contentType = response.headers['content-type'];
        response.data.pipe(uploadStream());
        res.send('Your image has been uploaded to cloud object storage');
      }
    })
    .catch((error) => {
      // handle error
      res.status(400).send({
        message: error.code,
      });
    });
});

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log('Hello world listening on port', port);
});
