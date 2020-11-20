# Code Engine Application with Secret

IBM Cloud Code Engine enables you to run your applications, jobs, or containers on a managed serverless platform. Workloads auto-scale and you will only pay for the resources you use. In this quick tutorial, you will create a Code Engine Application that will write a URL into Cloud Object Storage.

## Before You Begin
You will need the following prerequisites to complete this tutorial.

1. IBM Cloud Account
1. IBM Cloud CLI
1. IBM Cloud Code Engine CLI Plugin

## Provision an Instance of Cloud Object Storage and create a new bucket

1. From the IBM Cloud catalog, select [Object Storage](https://cloud.ibm.com/objectstorage/create).
1. Give your service instance a name.
1. Select your pricing plan, and click Create. Your Object Storage instance page will open.
1. Click `Create Bucket`
1. Select `Quickly Get Started.` This will choose a region close to you for the bucket, as well as automatically select the "Smart Tier" storage option. Finally, this will also automatically create a bucket with credentials.
1. Give your bucket a globally unique name, and then click `Next`. Click `Next` to skip adding objects to your bucket. Click `View Bucket Configuration` to finalize the creation of your bucket.
1. Leave this page open - it has the Service Credential information you will need in later steps.


## Create a new IBM Cloud Code Engine Application.
1. From the IBM Cloud catalog, select Code Engine.
1. Click `Start Creating` under Run your container image.
1. `Application` should already be selected.
1. You will need a new Project for your Application to live in. Projects are an organizational tool to hold entities like applications and jobs. Click `Create Project` under Project. Give your project a name and click `Create.`
1. Give your application a name. Something like `store-images` would be appropriate.
1. The container image for this application lives at `docker.io/beemarie/saveimages` Put that image name in the `Image Reference` field.
1. Under Environment Variables, you will need to add a few values from the COS Instance and Bucket you created earlier.
  1. The first env variable is APIKEY. For name, put `APIKEY`, and for Value put your APIKEY from COS.
  1. The next is named `ENDPOINT`. This is the public endpoint for your bucket found from the cloud object storage page. It should look something like: `s3.us-east.cloud-object-storage.appdomain.cloud`.
  1. `SERVICE_INSTANCE`. This value needs to be in quotes. TODO: can we put bucket instance for this? Or do we need service instance.
  1. `BUCKET_NAME`. This is the name of your bucket.
  1. `BUCKET_LOCATION`. This is the location of your bucket, and can be found next to `Location` on the COS information page.
1. Click Deploy.
1. Your application should have been created successfully. Let's try it out!

## Try out your application
1. This application has an `addimages` url that accepts POST requests with an image url to save. The application will download the image at the URL and store it in your Cloud Object Storage bucket created earlier.
1. First, let's get your application URL. You can click `Application URL` to get your application url. It should look something like `https://save-images.2jna87eu6fb.us-south.codeengine.appdomain.cloud/`
1. Using `curl` from your CLI or a tool like Postman, make a post request to this application with the URL in the body, as follows:
  ```
    curl --header "Content-Type: application\json" --request POST --data '{"url":"https://cdn.pixabay.com/photo/2016/02/18/18/37/puppy-1207816_1280.jpg"}' https://save-images.2jna87eu6fb.us-south.codeengine.appdomain.cloud/
  ```
1. If you open the cloud object storage bucket, you should be able to see that the image at the URL was stored in the bucket!