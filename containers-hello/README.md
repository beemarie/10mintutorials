
## Create a new IBM Cloud Code Engine application.
IBM Cloud Code Engine allows you to run your application, job or container on a managed serverless platform. With code engine, you can auto-scale your workloads and only pay for the resources you consume. In this tutorial, we'll deploy an application, see it running, and then watch it scale down to zero when no longer in use.

1. From the IBM Cloud catalog, select [Code Engine](https://cloud.ibm.com/codeengine/overview).
1. Click `Start Creating` under Run your container image.
1. Code Engine can run both Applications and Jobs. Jobs are a run to completion workload - they are designed to run one time and exit. Applications run your code to serve HTTP requests. In this tutorial, we're deploying an `Application,` which should already be selected.
1. You will need a Project for your Application to live in. Projects are used to organize and group together entities like applications, jobs, and builds. Click `Create Project` under Project. Give your project a name and click `Create.`
1. Give your application a name. Something like `helloworld-app` would be appropriate.
1. In this case, we have already built the container image and stored it on dockerhub. The container image for this application is at `docker.io/ibmcom/helloworld`. It should already be entered in the `Image Reference` field.
1. Click Deploy.
1. Your application should have been created successfully. Let's go try it out and see it in action!

## Try out your application
1. Once your application has deployed, you should notice that there is 1 instance of your application created.
1. The helloworld application is an application that prints Hello World as well as some various environment variables for the application. You can visit your application by clicking on the `Application url` button. You should see that it has printed Hello World, as well as the mentioned environment variables.
1. Code Engine Applications will automatically scale up, and then back down to zero as required based on load to the application. Go back to the Code Engine Application overview page. If you wait some time, you should notice that your application instances should go back down to zero due to a lack of traffic to your application. If you go back to the application page and refresh the page - or otherwise send a request to the application - you should see an instance spin up. 

## Update Environment Variables
1. IBM Cloud Code Engine enables you to update various Runtime and Environment Variables for your application. Let's add an Environment Variable to our application.
1. Click the Environment variable tab.
1. Add an environment variable named `test` with a value of `testing`. 
1. Click `Save and deploy`.
1. Once the changes have deployed you can refresh your application URL you should see an environment variable added at the bottom of the environment variables list.

## Update Instance Number
1. For some applications we may want to limit the amount that our application can scale up - or maybe we always want to keep a minimum of one instance of our application up. We can easily modify these settings for our Application by updating our runtime settings. Click the `Runtime` tab.
1. Change `Minimum number of instances` from 0 to 1.
1. Once the changes have deployed, you should notice that your application never scales back down to 0. You can also edit other runtime settings like application memory, concurrency, or timeout.

## Revisions
1. Each time you make a change to your application, Code Engine creates a new Revision. Click the `Revisions and Traffic` Tab. 
1. You can see that you have three revisions, one for each of your changes, and currently 100% of traffic is going to your latest revision.