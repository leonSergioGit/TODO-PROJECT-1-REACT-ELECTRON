import React, { Component } from 'react'

export default class Todo extends Component {
    constructor(props){
        super(props);
        this.state = {
            isEditing: false,
            isCompleted: false,
            task: ""
        }

        this.remove = this.remove.bind(this);
        this.toggleEdit = this.toggleEdit.bind(this);
        this.handleUpdate = this.handleUpdate.bind(this);
        this.update = this.update.bind(this);
        this.handleCheckBox = this.handleCheckBox.bind(this);
    }

    remove(){
        this.props.delete(this.props.id);
    }

    toggleEdit(){
        this.setState({
            isEditing: !this.state.isEditing
        })
    }

    handleUpdate(evt){
        this.setState({
            [evt.target.name]: evt.target.value
        })
    }

    update(){
        this.props.update(this.props.id, this.state.task);
        this.setState({
            task: ""
        })

        this.toggleEdit();
    }

    handleCheckBox(){
        this.setState({
            isCompleted: !this.state.isCompleted
        })

        console.log(this.state.isCompleted);
    }


    render() {
        let mostrar;
        let isFinished;
        
        if(!this.state.isCompleted){
            isFinished = "unfinished"
        } else {
            isFinished = "finished"
        }
        
        if(!this.state.isEditing){
            mostrar = (
                <div>
                    <h1> Task: </h1>
                    <div className={isFinished}>{this.props.task}</div>
                    <button onClick={this.toggleEdit}>Edit</button>
                    <button onClick={this.remove}>Borrar</button>
                    <input type="checkbox" onChange={this.handleCheckBox} />              
                </div>
            )
        } else {
            mostrar = (
                <div>
                    <h1> Task: </h1>
                    <div>
                        <input 
                          placeholder={this.props.task} 
                          onChange={this.handleUpdate} 
                          value={this.state.task} 
                          name="task"
                        />
                    </div>
                    <button onClick={this.update}>Save</button>         
                </div>
            )

        }
       
        return mostrar
    }
}
