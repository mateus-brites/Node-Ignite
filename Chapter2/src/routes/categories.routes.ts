import { Router } from "express";

import { CategoriesRepository } from "../repositories/CategoriesRepository";

const categoriesRoutes = Router();

const categoriesRepository = new CategoriesRepository();

categoriesRoutes.post("/", (request, response) => {
    const { name, description } = request.body;

    const categoryAlreadyExist = categoriesRepository.findByName(name);

    if(categoryAlreadyExist){
        return response.status(404).json({ error: "Category already exist" });
    }


    categoriesRepository.create({name, description});

    return response.status(201).send();
})

categoriesRoutes.get("/", (request, response) => {
    const list = categoriesRepository.list();

    return response.json(list);
})

export { categoriesRoutes }