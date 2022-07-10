import { APIGatewayEvent, APIGatewayProxyResult } from "aws-lambda";
import { groceryService } from "../service";
import { createHandlerResponse } from "../utils";

export const getGrocery = async (
  event: APIGatewayEvent
): Promise<APIGatewayProxyResult> => {
  console.log({ event }, "Get grocery event received");
  return await createHandlerResponse(async () => {
    const id = event.pathParameters?.id;

    const result = await groceryService.getGrocery(id);

    return {
      statusCode: 200,
      body: JSON.stringify(result),
    };
  });
};
