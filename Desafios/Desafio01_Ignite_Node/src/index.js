const express = require('express');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');

const app = express();

app.use(cors());
app.use(express.json());

const users = [];

function checksExistsUserAccount(request, response, next) {
  const { username } = request.headers;

  const usernameExist = users.find( user => user.username === username );

  if(!usernameExist){
    return response.status(404).json({ error: "This username does not exist"});
  }

  request.user = usernameExist;

  return next()
}

app.post('/users', (request, response) => {
  const { name, username } = request.body;

  const usernameAlreadyExist = users.find( user => user.username === username );

  if(usernameAlreadyExist){
    return response.status(400).json({ error: "This username Already exist"});
  }

  const id = uuidv4();

  const todos = [];

  const user = {
    id,
    name,
    username,
    todos
  }
  users.push(user);

  return response.status(201).json(user);
});

app.get('/todos', checksExistsUserAccount, (request, response) => {
  const { user } = request;

  const todos = user.todos;

  return response.json(todos);
});

app.post('/todos', checksExistsUserAccount, (request, response) => {
  const { user } = request;
  const { title, deadline } = request.body;
  
  const todo = { 
    id: uuidv4(),
    title,
    done: false, 
    deadline: new Date(deadline), 
    created_at: new Date()
  }

  user.todos.push(todo);

  return response.status(201).json(todo);
});

app.put('/todos/:id', checksExistsUserAccount, (request, response) => {
  const { id } = request.params;
  const { user } = request;
  const { title, deadline } = request.body;

  const todo = user.todos.find( todo => todo.id === id);

  if(!todo){
    return response.status(404).json({ error: "id does not exist" });
  }

  const updatedTodos = user.todos.filter( todo => {
    if(todo.id === id){
      todo.title = title;
      todo.deadline = new Date(deadline);
    }
  })

  user.todos = updatedTodos;



  return response.json(todo);
});

app.patch('/todos/:id/done', checksExistsUserAccount, (request, response) => {
  const { id } = request.params;
  const { user } = request;

  const todo = user.todos.find( todo => todo.id === id);

  if(!todo){
    return response.status(404).json({ error: "id does not exist" });
  }

  const updatedTodos = user.todos.filter( todo => {
    if(todo.id === id){
      todo.done = true;
    }
  })

  user.todos = updatedTodos;



  return response.json(todo);
});

app.delete('/todos/:id', checksExistsUserAccount, (request, response) => {
  const { id } = request.params;
  const { user } = request;

  const todo = user.todos.find( todo => todo.id === id);

  if(!todo){
    return response.status(404).json({ error: "id does not exist" });
  }

  const updatedTodos = user.todos.filter( todo => todo.id !== id);

  user.todos = updatedTodos;

  return response.status(204).json(todo);
});

module.exports = app;