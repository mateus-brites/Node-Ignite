const express = require("express");
const { v4: uuidV4 } = require("uuid")
 
const app = express();

app.use(express.json());

const customers = [];

function verifyIfExistAccountCPF(request, response, next){
    const { cpf } = request.headers;

    const customer = customers.find( (customer) => customer.cpf === cpf);

    if(!customer){
        console.log(cpf);
        return response.status(400).json({ error: "CPF not found" });
    }

    request.customer = customer;

    return next();
}

app.post("/account", (request, response) => {
    const { cpf, name } = request.body;
    console.log(cpf);


    const custumerAlreadyExist = customers.some(
        (custumer) => custumer.cpf === cpf
    );

    if(custumerAlreadyExist){
        return response.status(400).json({ error: "cpf already exist"});
    }

    customers.push({
        cpf,
        name,
        id: uuidV4(),
        statement: []
    });

    return response.status(201).send();
});

app.get("/statement", verifyIfExistAccountCPF, (request, response) => {
    const { customer } = request;

    return response.json(customer.statement);
});

app.post("/deposit", verifyIfExistAccountCPF, (request, response) => {

    const { description, amount } = request.body;
    const { customer } = request;
    console.log(description, amount, request.body.body);

    const statementOperation = {
        description,
        amount,
        created_at: new Date(),
        type: "credit"
    }

    customer.statement.push(statementOperation);

    return response.status(201).json(statementOperation);
});

app.post("/teste", verifyIfExistAccountCPF, (request, response) => {
    const { teste } = request.body;
    console.log(teste);

    return response.status(201).send();
});

app.listen(3333, () => console.log("server started on port 3333"));