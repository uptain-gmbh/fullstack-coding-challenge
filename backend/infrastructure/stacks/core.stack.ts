import * as sst from '@serverless-stack/resources';
import { CfnOutput } from '@aws-cdk/core';
import * as ec2 from "@aws-cdk/aws-ec2";
import * as rds from '@aws-cdk/aws-rds';
import * as secretsManager from '@aws-cdk/aws-secretsmanager';
import { Duration } from '@aws-cdk/core/lib/duration';

/**
 * This could be a very nice demonstration of how to build RDS, make it open to the world and connect to in from AWS Lambda.
 * However a single deployment could take around 10-15 minutes, so let's just keep this one as an example.
 */
export default class CoreStack extends sst.Stack {
    constructor(app: sst.App, id: string, props?: sst.StackProps) {
        super(app, id, props);

        const dbUser = 'uptain';
        const dbName = 'uptain';

        // prepare credentials to access the database
        const databaseCredentialsSecret = new secretsManager.Secret(this, 'aurora-credentials', {
            secretName: app.logicalPrefixedName('aurora-credentials'),
            generateSecretString: {
                secretStringTemplate: JSON.stringify({
                    username: dbUser,
                }),
                excludePunctuation: true,
                includeSpace: false,
                generateStringKey: 'password'
            }
        });

        // output the credentials arn
        new CfnOutput(this, "aurora-credentials-arn", {
            value: databaseCredentialsSecret.secretArn,
            exportName: app.logicalPrefixedName("aurora-credentials-arn")
        });

        // we will build simple MySQL Aurora database here
        // build the serverless aurora instance

        // it requires VPC as per CDK documentation
        const vpc = new ec2.Vpc(this, 'aurora-vpc', {
            subnetConfiguration: [
                {
                    subnetType: ec2.SubnetType.PUBLIC,
                    cidrMask: 28,
                    name: "Public Ingress"
                }
            ]
        });

        // build the RDS aurora with public IP
        const db = new rds.DatabaseInstance(this, 'aurora-rds', {
            vpc,
            engine: rds.DatabaseInstanceEngine.mysql({ version: rds.MysqlEngineVersion.VER_8_0 }),
            vpcPlacement: { subnetType: ec2.SubnetType.PUBLIC },
            databaseName: dbName,
            instanceType: ec2.InstanceType.of(ec2.InstanceClass.BURSTABLE2, ec2.InstanceSize.MICRO),
            deletionProtection: false,
            publiclyAccessible: true,
            backupRetention: Duration.days(1),
            credentials: rds.Credentials.fromSecret(databaseCredentialsSecret, dbUser)
        });

        // enable firewall rule to connect from any IP
        db.connections.allowDefaultPortFromAnyIpv4();

        // output the vpc id
        new CfnOutput(this, "aurora-rds-arn", {
            value: db.instanceArn,
            exportName: app.logicalPrefixedName("aurora-rds-arn")
        });
        new CfnOutput(this, "aurora-rds-uri", {
            value: `${db.dbInstanceEndpointAddress}:${db.dbInstanceEndpointPort}`,
            exportName: app.logicalPrefixedName("aurora-rds-uri")
        });
    }
}
