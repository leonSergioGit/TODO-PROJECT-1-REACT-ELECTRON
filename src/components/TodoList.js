import React, { Component } from 'react';
import Form from './Form';
import Todo from './Todo';
import uuid from 'uuid';
import '../css/style.css';
const fs = window.require('fs');


class TodoList extends Component {
    constructor(props){
        super(props);
        this.state = {
            todos: []
        }

        this.create = this.create.bind(this);
        this.delete = this.delete.bind(this);
        this.readFile = this.readFile.bind(this);
        this.update = this.update.bind(this);
    }
/*
   componentWillMount(){
        let currentComponent = this;
        fs.readFile("./src/todos/todos.txt", function(err, data) {
            if(err) throw err;
            let array = data.toString().split("\n");
            currentComponent.setState({
                todos: array
            })
        });

    } */

    create(newTodo){
        /*this.setState({
            todos: [...this.state.todos, newTodo]
        }) */
        
        fs.appendFile("./src/todos/todos.txt", newTodo + ";" + uuid() +"\n", function(err) {
            if(err) {
                return console.log(err);
            }
        }); 

        let currentComponent = this;

        fs.readFile("./src/todos/todos.txt", function(err, data) {
            if(err) throw err;
            let array = data.toString().split("\n");
            const taskAndId = [];
            for(let i = 0; i < array.length - 1; i++){
                let line = array[i];
                let task = line.substring(0, line.indexOf(";"));
                let id = line.substring(line.indexOf(";") + 1, line.length);
                taskAndId.push({
                    task: task,
                    id: id
                })
            }
            
            currentComponent.setState({
                todos: taskAndId
            })
        });
    }

    readFile(){
        let currentComponent = this;
        fs.readFile("./src/todos/todos.txt", function(err, data) {
            if(err) throw err;
            let array = data.toString().split("\n");
            const taskAndId = [];
            for(let i = 0; i < array.length - 1; i++){
                let line = array[i];
                let task = line.substring(0, line.indexOf(";"));
                let id = line.substring(line.indexOf(";") + 1, line.length);
                taskAndId.push({
                    task: task,
                    id: id
                })
            }

            
            currentComponent.setState({
                todos: taskAndId
            })
        });
    }

    update(id, task){
        let currentComponent = this;
        fs.readFile('./src/todos/todos.txt', {encoding: 'utf-8'}, function(err, data) {
            if (err) throw err;
            let dataArray = data.split('\n'); // convert file data in an array
            const searchKeyword = id; // we are looking for a line, contains, key word 'user1' in the file
            let lastIndex = -1; // let say, we have not found the keyword
        
            for (let index=0; index<dataArray.length; index++) {
                if (dataArray[index].includes(searchKeyword)) { // check if a line contains the 'user1' keyword
                    lastIndex = index; // found a line includes a 'user1' keyword
                    break; 
                }
            }
      
        dataArray[lastIndex] = task + ";" + uuid();// remove the keyword 'user1' from the data Array
    
        // UPDATE FILE WITH NEW DATA
        // IN CASE YOU WANT TO UPDATE THE CONTENT IN YOUR FILE
        // THIS WILL REMOVE THE LINE CONTAINS 'user1' IN YOUR shuffle.txt FILE
        const updatedData = dataArray.join('\n');
            fs.writeFile('./src/todos/todos.txt', updatedData, (err) => {
                if (err) throw err;
                console.log ('Successfully updated the file data');
                currentComponent.readFile();
            });

        })

    }

    delete(id){

        let currentComponent = this;
        fs.readFile('./src/todos/todos.txt', {encoding: 'utf-8'}, function(err, data) {
            if (err) throw err;
            let dataArray = data.split('\n'); // convert file data in an array
            const searchKeyword = id; // we are looking for a line, contains, key word 'user1' in the file
            let lastIndex = -1; // let say, we have not found the keyword
        
            for (let index=0; index<dataArray.length; index++) {
                if (dataArray[index].includes(searchKeyword)) { // check if a line contains the 'user1' keyword
                    lastIndex = index; // found a line includes a 'user1' keyword
                    break; 
                }
            }
      
        dataArray.splice(lastIndex, 1); // remove the keyword 'user1' from the data Array
    
        // UPDATE FILE WITH NEW DATA
        // IN CASE YOU WANT TO UPDATE THE CONTENT IN YOUR FILE
        // THIS WILL REMOVE THE LINE CONTAINS 'user1' IN YOUR shuffle.txt FILE
        const updatedData = dataArray.join('\n');
            fs.writeFile('./src/todos/todos.txt', updatedData, (err) => {
                if (err) throw err;
                console.log ('Successfully updated the file data');
                currentComponent.readFile();
            });

        })

       
    }

    componentDidMount(){
        let currentComponent = this;

        fs.readFile("./src/todos/todos.txt", function(err, data) {
            if(err) throw err;
            let array = data.toString().split("\n");
            const taskAndId = [];
            for(let i = 0; i < array.length - 1; i++){
                let line = array[i];
                let task = line.substring(0, line.indexOf(";"));
                let id = line.substring(line.indexOf(";") + 1, line.length);
                taskAndId.push({
                    task: task,
                    id: id
                })
            }

  
            currentComponent.setState({
                todos: taskAndId
            })

        });
    }

    render(){
        const todos = this.state.todos.map(todo => {
            return <Todo 
                     task={todo.task}
                     id={todo.id}
                     delete={this.delete}
                     update={this.update}
                    />
        })
        return(
            <div>
                <Form  
                    createTodo={this.create}
                />
                <div className="todosContainer">
                    {todos}
                </div>
            </div>
        )
    }
}

export default TodoList;