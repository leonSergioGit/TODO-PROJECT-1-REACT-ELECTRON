import React, { Component } from 'react';
import '../css/style.css';
const fs = window.require('fs');




class Form extends Component {
    constructor(props){
        super(props);
        this.state = {
            todo: ""
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(evt){
        this.setState({
            [evt.target.name]: evt.target.value
        })
    }

    handleSubmit(evt){
        evt.preventDefault();
        this.props.createTodo(this.state.todo);


        /*fs.appendFile("./src/todos/todos.txt", this.state.todo + "\n", function(err) {
            if(err) {
                return console.log(err);
            }
        }); */



        this.setState({ todo: "" });
    }

    render() {
        return (
            <div className="formContainer">
                <form onSubmit={this.handleSubmit}>
                    <input value={this.state.todo} name="todo" onChange={this.handleChange} placeholder="FILL IN YOUR TODO" />
                </form>
            </div>
        )
    }
}

export default Form;

