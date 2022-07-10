import { APIGatewayProxyResult } from "aws-lambda";
import { groceryService } from "../service";
import { createHandlerResponse } from "../utils";

export const getGroceries = async (): Promise<APIGatewayProxyResult> => {
  console.log("Get groceries event received");
  return await createHandlerResponse(async () => {
    const result = await groceryService.getGroceriesList();

    return {
      statusCode: 200,
      body: JSON.stringify(result),
    };
  });
};
