import { CategoriesRepositoryInMemory } from "@modules/cars/repositories/in-memory/CategoriesRepositoryInMemory";
import { AppError } from "@shared/errors/AppError";

import { CreateCategoryUseCase } from "./CreateCategoryUseCase";

let categoriesRepositoryInMemory: CategoriesRepositoryInMemory;
let createCategoryUseCase: CreateCategoryUseCase;

interface IRequest {
  name: string;
  description: string;
}

describe("Create category", () => {
  beforeEach(() => {
    categoriesRepositoryInMemory = new CategoriesRepositoryInMemory();
    createCategoryUseCase = new CreateCategoryUseCase(
      categoriesRepositoryInMemory
    );
  });

  it("Should be able to create a new category", async () => {
    const category: IRequest = {
      name: "Category name",
      description: "Category description",
    };

    await createCategoryUseCase.execute(category);

    const foundUser = await categoriesRepositoryInMemory.findByName(
      category.name
    );

    expect(foundUser).toHaveProperty("id");
  });

  it("Should not be able to create a new category if name already exist", async () => {
    expect(async () => {
      const category: IRequest = {
        name: "Category name",
        description: "Category description",
      };

      await createCategoryUseCase.execute(category);
      await createCategoryUseCase.execute(category);
    }).rejects.toBeInstanceOf(AppError);
  });
});
