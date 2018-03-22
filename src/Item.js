import React, { Component } from 'react';
import Action from './actions';

class Item extends Component {

	constructor(props) {
		super(props);
		this.state = {
			currentName: this.props.propName,
            currentCategory: this.props.propCategory || "",
            showForm: false
		}
	}

    editItem() {

        let categoriesList = Action.getData("categories").map( (item, index) => {
            return (
                <option key={index} value={item.name}>{item.name}</option>
            )
        });

        return (
            <div className="form-group">
                <label htmlFor="goodNameEdit"><b>Наименование:</b></label>
                <input 
                    type="text" 
                    placeholder="Редактировать наименование" 
                    className="form-control"
                    id="goodNameEdit"
                    value={this.state.currentName}
                    onChange={ (e) => this.setState( {currentName: e.target.value} ) }
                /> 
                <br />
                <b>Категория:</b>
                <select 
                    className="form-control" 
                    value={this.state.currentCategory}
                    onChange={ (e) => this.setState({currentCategory: e.target.value}) }
                >
                        {categoriesList}
                </select>
                <br />
                <button 
                    id="addBtn" 
                    className="btn btn-primary"
                    onClick={ this.saveItem.bind(this) }>
                    Сохранить
                </button>
            </div>
        )
    }

    saveItem() {
        this.setState({showForm: false});
        this.props.saveItem(this.props.index, this.state.currentName, this.state.currentCategory);
    }

    render() {

        let inputField = "";
        if(this.state.showForm) {
            inputField = this.editItem();
        }

        return (
            <div className="item">
                <div>
                    {this.state.currentName}
                </div>
                <div>
                    {this.state.currentCategory}
                </div>
                <div className="bin" onClick={ () => this.props.deleteItem(this.props.index) }>Удалить</div>
                <div className="edit" onClick={ () => this.setState({showForm: !this.state.showForm}) }>Редактировать</div>
                {inputField}
            </div>
        )
    }
}

export default Item;
