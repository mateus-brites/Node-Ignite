const express = require("express");
const { v4: uuidV4 } = require("uuid")
 
const app = express();

app.use(express.json());

const customers = [];

app.post("/account", (request, response) => {
    const { CPF, name } = request.body;


    const custumerAlreadyExist = customers.some(
        (custumer) => custumer.CPF === CPF
    );

    if(custumerAlreadyExist){
        return response.status(400).json({ error: "CPF already exist"});
    }

    customers.push({
        CPF,
        name,
        id: uuidV4(),
        statement: []
    });

    return response.status(201).send();
})

app.get("/statement", (request, response) => {
    const { cpf: CPF } = request.headers;

    const customer = customers.find( (customer) => customer.CPF === CPF);

    if(!customer){
        console.log(CPF);
        return response.status(400).json({ error: "CPF not found" });
    }

    return response.json(customer.statement);
})

app.listen(3333, () => console.log("server started on port 3333"));