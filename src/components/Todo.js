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

    finish(){
        this.props.finish(this.props.id, this.state.task, this.state.isCompleted);
    }

    handleCheckBox(){
        this.setState({
            isCompleted: !this.state.isCompleted
        })

        this.finish();
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
                <div className="todoCont">
                    <div className="containerDiv">
                        <div className={isFinished}><h3>{this.props.task}</h3></div>
                        <button className="editBtn" onClick={this.toggleEdit}>Edit</button>
                        <button className="deleteBtn" onClick={this.remove}>Borrar</button>
                    </div>
                    <div id="checkCont">
                        <label className="container">
                            <div id="checkCont"><input type="checkbox" id="checkbox" onChange={this.handleCheckBox} /> </div>
                            <span className="checkmark"></span>
                        </label> 
                    </div>       
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
