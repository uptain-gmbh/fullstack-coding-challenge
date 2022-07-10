import { APIGatewayEvent, APIGatewayProxyResult } from "aws-lambda";
import { groceryService } from "../service";
import { createHandlerResponse } from "../utils";

export const updateGrocery = async (
  event: APIGatewayEvent
): Promise<APIGatewayProxyResult> => {
  console.log({ event }, "Update grocery event received");
  return await createHandlerResponse(async () => {
    const input = JSON.parse(event.body);

    const result = await groceryService.updateGrocery(input);

    return {
      statusCode: 200,
      body: JSON.stringify(result),
    };
  });
};
