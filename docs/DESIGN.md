# Design document
I'll provide a list of design decision I did for this task.

## The Storage
NoSQL database is used if consistency isn't the primary requirement and availability is what businesses want.
In my implementation, I will consider that consistency is more important than availability 
to go forward with **MySQL**. Generally, high-available data stores are used only when business accepts that there 
could be a situation where data is available but not in the actual state.
Extra point for MySQL storage selection is that it can be used with Lambda's without VPC, and this is very important, 
as VPC setup could take extra time.

## The VPC
VPC is usually a pain point for AWS Lambdas, as it applies extra limitations (VPC IP Pool)
and decreases the startup time of AWS Lambda (not so much in the latest AWS Lambda versions).

Unfortunately, many AWS services aren't capable of working outside of VPC, so the option is to join a
AWS Lambdas to specific VPC, or make Reverse-Proxy of traffic at Gateway and open service to the world.

Many AWS services aren't open to the world. For example if a Lambda-based code needs to write to DocumentDB 
the AWS Lambda should be inside VPC.

## The Structure
I've used `yarn workspaces` to handle possible packages and microservices writing in the future.
Also, I've added a CDK as an extra layer to set up the basic infrastructure of the project, just as an example.

Code in solution is wrapped with services for better extensibility in the future. Such abstractions will help you 
to migrate to Kubernetes for example.

## The Gateway
Of course, the gateway will utilize an AWS Gateway. My main dislike for AWS Gateway is that it doesn't come with 
an OpenAPI UI (Swagger) by default. I will skip this part for this project, however with real API
it's a terrible idea to ignore API documentation.
