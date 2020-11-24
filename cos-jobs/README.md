# IBM Cloud Code Engine Job with Cloud Object Storage.
IBM Cloud Code Engine allows you to run your application, job or container on a managed serverless platform. With code engine, you can auto-scale your workloads and only pay for the resources you consume. In this tutorial, we'll deploy a job to thumbnail images stored in Cloud Object Storage. We'll see our job run to completion, and view some details about our job run.

## Before You Begin
You will need the following prerequisites to complete this tutorial.

1. IBM Cloud Account
1. (Optional) Completion of the Code Engine Application with Cloud Object Storage tutorial.

## Provision an instance of Cloud Object Storage and create a new bucket
If you have already completed the Code Engine Application with Cloud Object Storage tutorial, you do not need to complete this section as you will already have an instance of Cloud Object Storage created with images uploaded.

1. From the IBM Cloud catalog, select [Object Storage](https://cloud.ibm.com/objectstorage/create).
1. Give your service instance a name.
1. Select your pricing plan, and click Create. Your Object Storage instance page will open.
1. Click `Create Bucket`
1. Select `Quickly Get Started.` This will choose a region close to you for the bucket, as well as automatically select the "Smart Tier" storage option. Finally, this will also automatically create a bucket with credentials.
1. Give your bucket a globally unique name, and then click `Next`.
1. Add a couple of image files to your bucket. You can do this by dragging and dropping to the square area underneath `Upload`. A good resource for free images is [pixabay](https://pixabay.com/)
1. Click `View Bucket Configuration` to finalize the creation of your bucket.
1. Leave this page open - it has the Service Credential information you will need in later steps.

## Create a new IBM Cloud Code Engine job.
The job we're creating will get all the images from your IBM Cloud Object Storage bucket, and then generate thumbnails for each of those images and upload the thumbnails to COS. The code for this job is already on Docker Hub. Let's create the job on Code Engine now.

1. From the IBM Cloud catalog, select [Code Engine](https://cloud.ibm.com/codeengine/overview).
1. Click `Start Creating` under Run your container image.
1. Code Engine can run both Applications and Jobs. Jobs are a run to completion workload - they are designed to run one time and exit. Applications run your code to serve HTTP requests. In this tutorial, we're deploying a `Job,` so select `Job`.
1. You will need a Project for your Application to live in. Projects are used to organize and group together entities like applications, jobs, and builds. If you don't already have one, click `Create Project` under Project. Give your project a name and click `Create.`
1. Give your job a name. Something like `thumbnail-job` would be appropriate.
1. In this case, we have already built the container image for you and stored it on Docker Hub. The container image for this application is at `docker.io/beemarie/cosjob`.
1. Because this job interacts with Cloud Object Storage, there are some required environment variables to give the job access to the service. Let's create the required environment variables now. In the `Environment Variables` section click `Add Environment Variable` to create a new variable.
  1. The first env variable is `APIKEY`. For name, put `APIKEY`, and for Value put your API Key from COS. This can be found on the Bucket configuration page you left open in the `Service credential` section. If you accidentally closed this page, you can navigate back to Cloud Object Storage, and then click `Service Credentials`. You can expand the service credential to see the `apikey` value.
  1. The next is named `ENDPOINT`. This is the public endpoint for your bucket found from the cloud object storage bucket configuration page. It should look something like: `s3.us-east.cloud-object-storage.appdomain.cloud`. If you accidentally closed the page, you can navigate to Cloud Object Storage, then click `Buckets` on the left, select your bucket, and then `Configuration`.
  1. `SERVICE_INSTANCE`. This is the value from the `Bucket instance CRN` value on the Object Storage configuration page.
  1. `BUCKET_NAME`. This is the name of your bucket.
1. Click `Create` to create your job.


## Submit your job
We have created the job definition, but now we would like to run the job.

1. Click `Submit job`. If you would like to run your job more than once, adjust `Array indices` to a higher value, such as 10. This will start 10 jobs numbered from 1 to 10. An environment variable, JOB_INDEX, will be injected for each of the pods running the job. This would be useful in the case that you wanted to run an embarrassingly parallel workload.
1. Click `Submit Job`.
1. You should see that your job has completed. 

## View Thumbnail Images
The job completed, so we should have some thumbnails in our COS bucket. Let's go view those thumbnails now. 
1. Go to the IBM Cloud Object Storage bucket you created earlier.
1. You should see all the images you added to the bucket earlier, but now with additional `-thumbnail` images created as well.
1. You can download one of the thumbnails by clicking the `...` menu, and then selecting `download`. You should see that it is a 200x200 version of the original image that was uploaded.