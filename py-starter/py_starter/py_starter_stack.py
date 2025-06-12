from aws_cdk import (
    Stack,
    aws_s3 as s3,
    Duration,
    CfnOutput
)
from constructs import Construct


class PyStarterStack(Stack):

    def __init__(self, scope: Construct, construct_id: str, **kwargs) -> None:
        super().__init__(scope, construct_id, **kwargs)

        bucket = s3.Bucket(
            self,
            "PyBucket",
            lifecycle_rules=[
                s3.LifecycleRule(
                    expiration=Duration.days(4),
                )
            ],
        )

        CfnOutput(
            self,
            "PyBucketName",
            value=bucket.bucket_name,
            description="The name of the S3 bucket created by PyStarterStack",
        )

        # print(f"Bucket created with name: {bucket.bucket_name}")

        #                s3.LifecycleRule(
        #         id="DeleteOldVersions",
        #         noncurrent_version_expiration=aws_cdk.Duration.days(30)
        #     )
        # bucket_name="py-starter-bucket",
        # versioned=True,
        # removal_policy=aws_cdk.RemovalPolicy.DESTROY,
        # auto_delete_objects=True
