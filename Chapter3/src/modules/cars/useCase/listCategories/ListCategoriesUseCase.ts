import { inject, injectable } from "tsyringe";

import { Category } from "../../entities/category";
import { ICategoryRepository } from "../../repositories/IcaregoryRepository";

@injectable()
class ListCategoriesUseCase {
  constructor(
    @inject("CategoriesRepository")
    private categoriesRepository: ICategoryRepository
  ) {}

  async execute(): Promise<Category[]> {
    const categories = await this.categoriesRepository.list();

    return categories;
  }
}

export { ListCategoriesUseCase };
