import { APIGatewayEvent, APIGatewayProxyResult } from "aws-lambda";
import { createHandlerResponse } from "../utils";
import { groceryService } from "../service";

export const deleteGrocery = async (
  event: APIGatewayEvent
): Promise<APIGatewayProxyResult> => {
  console.log({ event }, "Delete grocery event received");
  return await createHandlerResponse(async () => {
    const id = event.pathParameters?.id;

    const result = await groceryService.deleteGrocery(id);

    return {
      statusCode: 200,
      body: JSON.stringify(result),
    };
  });
};
