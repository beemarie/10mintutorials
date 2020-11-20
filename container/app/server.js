const express = require('express');
const app = express();
app.use(express.json());
var objectStore = require('ibm-cos-sdk');
const apikey = process.env.APIKEY;
const endpoint = process.env.ENDPOINT;
const serviceInstance = process.env.SERVICE_INSTANCE;
const bucketName = process.env.BUCKET_NAME
const bucketLocation = process.env.BUCKET_LOCATION

var config = {
  endpoint: endpoint,
  apiKeyId: apikey,
  serviceInstanceId: serviceInstance,
 };

var cos = new objectStore.S3(config);
const { v4: uuidv4 } = require('uuid');

const axios = require('axios');
const stream = require('stream')

app.get('/', function (req, res) {
  res.send('hello! please make a post request to /addurl endpoint with body {"url":"your_url"}')
})

app.post('/addurl', async (req, res) => {
  const { body } = req;
  const duration = 1;
  console.log('Hello world received a request, with this body: ');
  // console.log(body.url);
  let key = uuidv4()
  const uploadStream = () => {
    const pass = new stream.PassThrough();
    doCreateObject(key, pass)
    return pass;
  }
  axios({
    method: 'get',
    url: body.url,
    responseType: 'stream'
  })
  .then( (response) => {
    if(response.status===200){
      contentType = response.headers['content-type'];
      response.data.pipe(uploadStream());
      console.log("uploading")
      res.send(`Your image has been uploaded to cloud object storage`);
    }
  })
  .catch(function (error) {
    // handle error
    res.status(400).send({
      message: error.code
   });
  });
});

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log('Hello world listening on port', port);
});

function doCreateBucket() {
  console.log('Creating bucket');
  return cos.createBucket({
      Bucket: bucketName,
      CreateBucketConfiguration: {
        LocationConstraint: bucketLocation,
      },
  }).promise();
}

function doCreateObject(key, url) {
  console.log('Creating object');
  return cos.upload({
      Bucket: bucketName,
      Key: key,
      Body: url,
  }).promise();
}