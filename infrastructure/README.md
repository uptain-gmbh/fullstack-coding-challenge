## Overview

Defines and deploys the required resources using the SST framework.

- [Docs](https://docs.serverless-stack.com)
- [@serverless-stack/cli](https://docs.serverless-stack.com/packages/cli)
- [@serverless-stack/resources](https://docs.serverless-stack.com/packages/resources)

## Requirements

- Configure AWS CLI using this [guide](https://docs.aws.amazon.com/cli/latest/userguide/getting-started-prereqs.html)
- Installing the dependencies.

```bash
$ npm install
```

## Commands

### `npm run build`

Build your app and synthesize your stacks.

Generates a `.build/` directory with the compiled files and a `.build/cdk.out/` directory with the synthesized CloudFormation stacks.

### `npm run deploy`

Deploys all your stacks to AWS.

### `npm run remove`

Removes all your stacks and all of their resources from AWS.
