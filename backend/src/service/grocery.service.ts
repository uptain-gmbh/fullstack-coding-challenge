import { BadRequestException } from "./../exceptions/badRequest.exception";
import { groceryRepository } from "../repository";
import { GroceryModel } from "../models";
import { createGrocerySchema, updateGrocerySchema } from "../validations";

class GroceryService {
  async getGroceriesList() {
    const data = await groceryRepository.getItems();

    return data;
  }

  async getGrocery(id: string) {
    if (!id) throw new BadRequestException("Id is required");

    const data = await groceryRepository.getItem(id);

    return data;
  }

  async createGrocery(input: Omit<GroceryModel, "id">) {
    if (!input) throw new BadRequestException("Body required");

    await createGrocerySchema.validate(input, { abortEarly: false });

    const data = await groceryRepository.addItem(input);

    return data;
  }

  async updateGrocery(input: GroceryModel) {
    if (!input) throw new BadRequestException("Body required");

    await updateGrocerySchema.validate(input, { abortEarly: false });

    const data = await groceryRepository.updateItem(input);

    return data;
  }

  async deleteGrocery(id: string) {
    if (!id) throw new BadRequestException("Id is required");

    const data = await groceryRepository.deleteItem(id);

    return data;
  }
}

export const groceryService = Object.freeze(new GroceryService());
