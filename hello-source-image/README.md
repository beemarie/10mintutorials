# Hello World on IBM Cloud Code Engine from Source
IBM Cloud Code Engine allows you to run your application, job or container on a managed serverless platform. With code engine, you can auto-scale your workloads and only pay for the resources you consume. In this tutorial, we'll deploy an application from source code, see it running, and then watch it scale down to zero when no longer in use.

## Create an IBM Cloud Container Registry Instance
For this tutorial, you will need to create an IBM Cloud Container Registry so that when you build a container image there will be a place for that image to be stored.

IBM Cloud Container Registry enables you to manage docker container images in a fully managed private registry. The images are checked for security issues as well.

1. From the IBM Cloud Catalog, select [Container Registry](https://cloud.ibm.com/kubernetes/catalog/registry).
1. Click `Create`.
1. From the Registry page, click `Namespaces`, and then `Create`. This will create a namespace for your image to live in. Give your namespace a `Name`, and then click `Create`.

## Setting up IBM Cloud API key
You will also need an IBM Cloud API key so that Code Engine can have access to the Container Registry you just created. Let's set that up now.
1. Launch the [IAM Service](https://cloud.ibm.com/iam/overview).
1. Select API Keys in the left side menu.
1. Click Create an IBM Cloud API Key.
1. Enter a name and optional description for your API key and click Create.
1. Copy the API key or click download to save it. You will need this API Key when creating your IBM Cloud Code Engine application. It will not be available later, so copy or download it now.

## Create a new IBM Cloud Code Engine application.
IBM Cloud Code Engine allows you to run your application, job or container on a managed serverless platform. With code engine, you can auto-scale your workloads and only pay for the resources you consume. In this tutorial, we'll deploy an application from source code, see it running, and then watch it scale down to zero when no longer in use.

1. From the IBM Cloud catalog, select [Code Engine](https://cloud.ibm.com/codeengine/overview).
1. Click `Run your source code` under How to get started.
1. Code Engine can run both Applications and Jobs. Jobs are a run to completion workload - they are designed to run one time and exit. Applications run your code to serve HTTP requests. In this tutorial, we're deploying an `Application,` which should already be selected.
1. You will need a Project for your Application to live in. Projects are used to organize and group together entities like applications, jobs, and builds. If you don't already have one, click `Create Project` under Project. Give your project a name and click `Create.`
1. Give your application a name. Something like `helloworld-app` would be appropriate.
1. Code Engine can run an already built container image, or it can build and run your container image for you from the source code. Let's build the image from source code. Under the Code heading, select `Source code`.
1. The source code repository should already be filled in with `https://github.com/IBM/CodeEngine`.

## Specify Build Details for the application
IBM Cloud Code Engine will go to the source code repository you specified, build a container image for you based on some provided details, and then deploy and run that container image on IBM Cloud. We need to provide Code Engine with some details for it to complete these steps.
1. The code for the helloworld sample actually lives at https://github.com/IBM/CodeEngine/helloworld, so we need to specify the additional `/helloworld` folder location so that code engine knows where to find our code. Click `Specify build details` under the `Build details` heading.
1. Under the `Source` build details, you should see that you can select your branch and the context directory. Set the branch to `master`, and the context directory to `/helloworld`.
1. Click `Next` to go to the Strategy menu. We want to build our source code into a container image, and we can do that either via `Cloud Native Buildpacks` or via `Dockerfile`. For this example, we'll use `Dockerfile`, so ensure that is selected. The value for the name of the Dockerfile should be `Dockerfile`.
1. We won't adjust the default, but you could also modify the `Timeout` for how long before the build and run fails, as well as how much resources are designated for the build. Click `Next`.
1. The output of the build is a container image. That container image needs to be stored in a registry once it's built. Let's add a registry now by clicking `Add` under `Registry name`.
1. Give your registry a name. 
1. The registry server will be based on where the IBM Container Registry was created. If it was created in Dallas, then this will be `us.icr.io`. 
1. Enter your API key from the Setting up IBM Cloud API Key section in the `Password` field.
1. Enter your email in the email field.
1. Click `Add` to add the registry access to IBM Cloud Code Engine.
1. Select your `Namespace` that you created earlier.
1. Give a name to the image you are about to create. It could be something like `helloworld-app`.
1. Let's also tag the image as `latest`. 
1. We're finsihed specifying our build details. Click `Done`.
1. Let's deploy our image! Click `Deploy`

## Try out your application
In the previous step we provided some source code for code engine to build into a container image as well as a container registry location for code engine to store that container image. After building and publishing our container image to the IBM Cloud Container Registry, Code Engine then deployed and ran our application. You should see that your application has 1 running instance.

1. Once your application has deployed, you should notice that there is 1 instance of your application created.
1. The helloworld application is an application that prints Hello World as well as some various environment variables for the application. You can visit your application by clicking on the `Application url` button. You should see that it has printed Hello World, as well as the mentioned environment variables.
1. Code Engine Applications will automatically scale up, and then back down to zero as required based on load to the application. Go back to the Code Engine Application overview page. If you wait some time, you should notice that your application instances should go back down to zero due to a lack of traffic to your application. If you go back to the application page and refresh the page - or otherwise send a request to the application - you should see an instance spin up. 
