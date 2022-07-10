import { AttributeValue } from "@aws-sdk/client-dynamodb";

export const transformDBItem = (
  item: Record<string, AttributeValue>
): Record<string, string | number> => {
  return Object.entries(item).reduce<Record<string, string | number>>(
    (prev, [key, value]) => ({
      ...prev,
      [key]: Object.values(value).pop() as string,
    }),
    {}
  );
};
