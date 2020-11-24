# Code Engine Application with Cloud Object Storage

IBM Cloud Code Engine enables you to run your applications, jobs, or containers on a managed serverless platform. Workloads auto-scale and you will only pay for the resources you use. In this quick tutorial, you will create a Code Engine Application that will write an image into Cloud Object Storage. The application will accept a URL to an imgae, download that image, and then store it in your Cloud Object Storage bucket.

## Before You Begin
You will need the following prerequisites to complete this tutorial.

1. IBM Cloud Account

## Provision an instance of Cloud Object Storage and create a new bucket

1. From the IBM Cloud catalog, select [Object Storage](https://cloud.ibm.com/objectstorage/create).
1. Give your service instance a name.
1. Select your pricing plan, and click Create. Your Object Storage instance page will open.
1. Click `Create Bucket`
1. Select `Quickly Get Started.` This will choose a region close to you for the bucket, as well as automatically select the "Smart Tier" storage option. Finally, this will also automatically create a bucket with credentials.
1. Give your bucket a globally unique name, and then click `Next`. Click `Next` to skip adding objects to your bucket. Click `View Bucket Configuration` to finalize the creation of your bucket.
1. Leave this page open - it has the Service Credential information you will need in later steps.


## Create a new IBM Cloud Code Engine application.
1. From the IBM Cloud catalog, select Code Engine.
1. Click `Start Creating` under Run your container image.
1. `Application` should already be selected.
1. You will need a new Project for your Application to live in. Projects are an organizational tool to hold entities like applications and jobs. Click `Create Project` under Project. Give your project a name and click `Create.`
1. Give your application a name. Something like `store-images` would be appropriate.
1. The container image for this application lives at `docker.io/beemarie/saveimages` Put that image name in the `Image Reference` field.
1. Because this application saves images to Cloud Object Storage, there are some required environment variables to give the application access to the service. Let's create the required environment variables now. In the `Environment Variables` section click `Add Environment Variable` to create a new variable.
  1. The first env variable is `APIKEY`. For name, put `APIKEY`, and for Value put your API Key from COS. This can be found on the Bucket configuration page you left open in the `Service credential` section. If you accidentally closed this page, you can navigate back to Cloud Object Storage, and then click `Service Credentials`. You can expand the service credential to see the `apikey` value.
  1. The next is named `ENDPOINT`. This is the public endpoint for your bucket found from the cloud object storage bucket configuration page. It should look something like: `s3.us-east.cloud-object-storage.appdomain.cloud`. If you accidentally closed the page, you can navigate to Cloud Object Storage, then click `Buckets` on the left, select your bucket, and then `Configuration`.
  1. `SERVICE_INSTANCE`. This is the value from the `Bucket instance CRN` value on the Object Storage configuration page.
  1. `BUCKET_NAME`. This is the name of your bucket.
1. Click Deploy.
1. Your application should have been created successfully. Let's try it out!

## Try out your application
1. This application has an `addimages` url that accepts POST requests with an image url to save. The application will download the image at the URL and store it in your Cloud Object Storage bucket created earlier.
1. First, let's get your application URL. You can click `Application URL` to get your application url. It should look something like `https://save-images.2jna87eu6fb.us-south.codeengine.appdomain.cloud`
1. In your terminal window, save the value of application URL by pasting the following command with your own application URL. Ensure there is no trailing slash for the URL.
    ```
    APPLICATION_URL=<your_application_url_here>
    ```
1. Using `curl` from your CLI make a post request to this application with the URL in the body, as follows:
    ```
      curl -X POST --header "Content-Type: application/json" --data '{"url":"https://cdn.pixabay.com/photo/2016/02/18/18/37/puppy-1207816_1280.jpg"}' $APPLICATION_URL/addurl
    ```
1. If you open the cloud object storage bucket, you should be able to see that the image at the URL was stored in the bucket! You can open the bucket by going to the Cloud Object Storage instance in IBM Cloud, and then selecting `Buckets` on the left side, and then selecting your bucket.
1. Feel free to upload images