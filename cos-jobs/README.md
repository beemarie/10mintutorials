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
1. From the IBM Cloud catalog, select [Code Engine](https://cloud.ibm.com/codeengine/overview).
1. Click `Start Creating` under Run your container image.
1. Code Engine can run both Applications and Jobs. Jobs are a run to completion workload - they are designed to run one time and exit. Applications run your code to serve HTTP requests. In this tutorial, we're deploying a `Job,` so select `Job`.
1. You will need a Project for your Application to live in. Projects are used to organize and group together entities like applications, jobs, and builds. If you don't already have one, click `Create Project` under Project. Give your project a name and click `Create.`
1. Give your job a name. Something like `thumbnail-job` would be appropriate.
1. In this case, we have already built the container image for you and stored it on dockerhub. The container image for this application is at `docker.io/beemarie/cosjob`.
1. Because this job interacts with Cloud Object Storage, there are some required environment variables. Let's also created the required environment variables now. In the `Environment Variables` section click `Add Environment Variable` to create a new variable.
1. 
1. Click `Create` to create your job.

1. From the IBM Cloud catalog, select [Code Engine](https://cloud.ibm.com/codeengine/overview).
1. Click `Start Creating` under Run your container image.
1. Code Engine can run both Applications and Jobs. Jobs are a run to completion workload - they are designed to run one time and exit. Applications run your code to serve HTTP requests. In this tutorial, we're deploying a `Job,` so select `Job`.
1. You will need a Project for your Application to live in. Projects are used to organize and group together entities like applications, jobs, and builds. Click `Create Project` under Project if you don't already have one. Give your project a name and click `Create.`
1. Give your application a name. Something like `helloworld-job` would be appropriate.
1. In this case, we have already built the container image and stored it on dockerhub. The container image for this application is at `docker.io/ibmcom/firstjob`. It should already be entered in the `Image Reference` field.
1. It's not required for this job, but you could also add a command for your job or arguments for your jobs. There are additional options for runtime settings, such as how much memory the job has allocated. You could also provide environment variables to your job. 
1. Click `Create` to create your job.

## Submit your job
1. Click `Submit job`. If you would like to run your job more than once, adjust `Array indices` to a higher value, such as 10. This will start 10 jobs numbered from 1 to 10. An environment variable, JOB_INDEX, will be injected for each of the pods running the job.
1. Click `Submit Job`.
1. You should see that your job has completed. 

## View Job Logs
1. Let's view our job logs. First, we will need to add access to the IBM Log Analysis with LogDNA service. Click `Add Logging`.
1. If you do not have a LogDNA service, you will need to create an instance. Click `create an instance`.
1. Back on the Code Engine jobs page, you can now seelct your logging Instance.
1. Once it's selected, click `Launch Logging`.
1. TODO: how can we view job output?