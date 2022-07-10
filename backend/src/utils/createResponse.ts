import { APIGatewayProxyResult } from "aws-lambda";
import { BadRequestException, NotFoundException } from "../exceptions";
import { ValidationError } from "yup";

const corsHeaders = {
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Credentials": true,
  },
};

export const createHandlerResponse = async (
  handler: () => Promise<APIGatewayProxyResult>
): Promise<APIGatewayProxyResult> => {
  try {
    const handlerResult = await handler();
    return {
      ...handlerResult,
      ...corsHeaders,
    };
  } catch (error) {
    if (error instanceof ValidationError) {
      return {
        ...corsHeaders,
        statusCode: 400,
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
        ...corsHeaders,
        statusCode: error.statusCode,
        body: JSON.stringify({
          errors: error.message,
        }),
      };
    }

    if (error instanceof NotFoundException) {
      console.log({ error }, "Not found exception ocurred");
      return {
        ...corsHeaders,
        statusCode: error.statusCode,
        body: JSON.stringify({
          errors: error.message,
        }),
      };
    }

    console.log({ error }, "Unhandled exception ocurred");
    return {
      ...corsHeaders,
      statusCode: 500,
      body: JSON.stringify({
        errors: "Internal server error",
      }),
    };
  }
};
