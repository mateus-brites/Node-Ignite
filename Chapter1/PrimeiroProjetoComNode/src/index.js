const { request, response } = require("express");
const express = require("express");
const { v4: uuidV4 } = require("uuid")
 
const app = express();

app.use(express.json());

const customers = [];

function getBalance(statement){
    const balance = statement.reduce((acc, operation) => {
        if(operation.type === "credit"){
            return acc + operation.amount
        } else {
            return acc - operation.amount
        }
    }, 0);

    return balance;
}

function verifyIfExistAccountCPF(request, response, next){
    const { cpf } = request.headers;

    const customer = customers.find( (customer) => customer.cpf === cpf);

    if(!customer){
        return response.status(400).json({ error: "CPF not found" });
    }

    request.customer = customer;

    return next();
}

app.post("/account", (request, response) => {
    const { cpf, name } = request.body;

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

    const statementOperation = {
        description,
        amount,
        created_at: new Date(),
        type: "credit"
    }

    customer.statement.push(statementOperation);

    return response.status(201).json(statementOperation);
});

app.post("/withdraw", verifyIfExistAccountCPF, (request, response) => {
    const { amount } = request.body;
    const { customer } = request;

    const balance = getBalance(customer.statement);

    if(balance < amount){
        return response.status(400).json({ error: "Insufficient funds" });
    }

    const statementOperation = {
        amount,
        created_at: new Date(),
        type: "debit"
    }

    customer.statement.push(statementOperation);

    return response.status(201).json(statementOperation);
});

app.get("/statement/date", verifyIfExistAccountCPF, (request, response) => {
    const { customer } = request;
    const { date } = request.query;

    const formatDate = new Date(date + " 00:00");

    const statement = customer.statement.filter(
        (statement) => 
            statement.created_at.toDateString() === new Date(formatDate).toDateString());

    return response.json(statement);
});

app.put("/account", verifyIfExistAccountCPF, (request, response) => {
    const { name } = request.body;
    const { customer } = request

    customer.name = name;

    return response.status(200).json({name: customer.name});
});

app.get("/account", verifyIfExistAccountCPF, (request, response) => {
    const { customer } = request

    return response.status(200).json(customer);
});

app.delete("/account", verifyIfExistAccountCPF, (request, reponse) => {
    const { customer } = request;

    customers.splice(customer, 1);

    return reponse.status(200).json(customer);
});

app.get("/balance", verifyIfExistAccountCPF, (request, response) => {
    const { customer } = request;
    
    const balance = getBalance(customer.statement);

    return response.json(balance);
})




app.listen(3333, () => console.log("server started on port 3333"));