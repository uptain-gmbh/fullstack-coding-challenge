import { groceryService } from "./../service/grocery.service";
import { APIGatewayEvent, APIGatewayProxyResult } from "aws-lambda";
import { createHandlerResponse } from "../utils";

export const createGrocery = async (
  event: APIGatewayEvent
): Promise<APIGatewayProxyResult> => {
  console.log({ event }, "Create grocery event received");
  return await createHandlerResponse(async () => {
    const input = JSON.parse(event.body);

    const result = await groceryService.createGrocery(input);

    return {
      statusCode: 200,
      body: JSON.stringify(result),
    };
  });
};
