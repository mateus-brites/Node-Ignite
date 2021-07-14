import { Category } from "../../model/category";
import { ICategoryRepository } from "../../repositories/IcaregoryRepository";


class ListCategoriesUseCase{
    constructor(private categoriesRepository: ICategoryRepository){}

    execute(): Category[]{
        const categories = this.categoriesRepository.list();
        
        return categories;
    }
}

export { ListCategoriesUseCase }