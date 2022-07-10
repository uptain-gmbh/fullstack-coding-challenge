import { APIGatewayProxyResult } from "aws-lambda";
import { BadRequestException, NotFoundException } from "../exceptions";
import { ValidationError } from "yup";

export const createHandlerResponse = async (
  handler: () => Promise<APIGatewayProxyResult>
): Promise<APIGatewayProxyResult> => {
  try {
    const handlerResult = await handler();
    return {
      ...handlerResult,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true,
      },
    };
  } catch (error) {
    if (error instanceof ValidationError) {
      return {
        statusCode: 400,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Credentials": true,
        },
        body: JSON.stringify({
          errors: error.inner.map(({ path, errors }) => ({
            [path]: errors.shift(),
          })),
        }),
      };
    }

    if (error instanceof BadRequestException) {
      console.log({ error }, "Bad request exception ocurred");
      return {
        statusCode: error.statusCode,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Credentials": true,
        },
        body: JSON.stringify({
          errors: error.message,
        }),
      };
    }

    if (error instanceof NotFoundException) {
      console.log({ error }, "Not found exception ocurred");
      return {
        statusCode: error.statusCode,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Credentials": true,
        },
        body: JSON.stringify({
          errors: error.message,
        }),
      };
    }

    console.log({ error }, "Unhandled exception ocurred");
    return {
      statusCode: 500,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true,
      },
      body: JSON.stringify({
        errors: "Internal server error",
      }),
    };
  }
};
