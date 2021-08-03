import { Category } from "@modules/cars/infra/typeorm/entities/category";

import {
  ICategoryRepository,
  ICreateCategoryDTO,
} from "../IcaregoryRepository";

class CategoriesRepositoryInMemory implements ICategoryRepository {
  Categories: Category[] = [];

  async findByName(name: string): Promise<Category> {
    const category = this.Categories.find((category) => category.name === name);

    return category;
  }
  async list(): Promise<Category[]> {
    const allCategories = this.Categories;

    return allCategories;
  }
  async create({ name, description }: ICreateCategoryDTO): Promise<void> {
    const category = new Category();

    Object.assign(category, { name, description });

    this.Categories.push(category);
  }
}

export { CategoriesRepositoryInMemory };
