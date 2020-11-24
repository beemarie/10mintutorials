# 10mintutorials

:construction: This repo is under active development. :construction:

This repo contains a set of 10 minute tutorials for IBM Cloud Code Engine. 

## Containers - Hello World
In the hello world [containers tutorial](hello-containers/README.md) you will create a hello world application on IBM Cloud Code Engine. The application will respond to get requests with hello world.

## Src2Image - Hello World
In the hello world [source to image tutorial](hello-source-image/README.md), you will deploy the same application as was deployed in the containers hello world tutorial, but this time you will be deploying from the source code, as opposed to deploying from a pre-built container image.

## Jobs - Hello World
In the hello world [job tutorial](hello-job/README.md), you will deploy a simple job with IBM Cloud Code Engine. The job will run to completion, and you will be able to view details about it.

## Containers - COS
In the Cloud Object Storage [containers tutorial](cos-containers/README.md) you will create an IBM Cloud Object Storage instance and an IBM Cloud Code Engine Application. The application will accept URLs of images, download the image, and then store the image in your COS instance.

## Jobs - COS
In the Cloud Object Storage [jobs tutorial](cos-jobs/README.md), you will create a job that creates thumbnails out of any images stored in your IBM Cloud Object Storage bucket.

## Service Bindings - COS
In the [service binding tutorial](cos-service-bindings/README.md), you will learn to connect your application to a service using service bindings. This will enable your application to automatically have access to the required credentials to connect to this service.

## Events
In the Events tutorial, you will see an event created as a result of a new item created in an IBM Cloud Object Storage bucket. That event will kick off your thumbnail job to run.