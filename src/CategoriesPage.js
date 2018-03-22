import React, { Component } from 'react';
import Action from './actions';
import uid from 'uid';
import Item from './Item';

class CategoriesPage extends Component {

	constructor(props) {
		super(props);
		this.state = {
			categoriesData: [],
			currentName: "",
			showInput: false
		}
	}

	componentWillMount() {
        this.setState({categoriesData: Action.getData("categories")});
        console.log(this.state.categoriesData);
    }

    showForm(e) {
        this.setState( { showInput: !this.state.showInput } );

        let btn = e.target.textContent;
    
        if (btn === "+ Добавить новую категорию") {
            btn = "- Добавить новую категорию";
            e.target.style.borderRadius = "7px 7px 0 0";
        }
        else {
            btn = "+ Добавить новую категорию";
            e.target.style.borderRadius = "7px";
        }

        e.target.textContent = btn;
    }

    generateInput() {

        return (
            <div className="form-group">
                <b>Наименование:</b>
                <input 
                    type="text" 
                    placeholder="Категория" 
                    className="form-control"
                    value={this.state.currentName}
                    onChange={this.getText.bind(this)}
                /> <br />
                <button 
                    id="addBtn" 
                    className="btn btn-primary"
                    onClick={this.handleClick.bind(this)}>
                    Добавить
                </button>
            </div>
        )
    }

    getText(e) {
    	this.setState( {currentName: e.target.value} );
    }

    handleClick() {
    
        let tempArr = this.state.categoriesData;

        tempArr.push( {
            id: uid(10),
            name: this.state.currentName,
        });

        this.setState( {categoriesData: tempArr, currentName: ""} );

        Action.setData(tempArr, "categories");
    }

    deleteItem(index) {
        let newArr = this.state.categoriesData;
        newArr.splice(index, 1);
        this.setState( {categoriesData: newArr} );
        Action.setData(newArr, "categories");
    }

    render() {

        let output = this.state.categoriesData.map( (item, index) => {
            return (
                <Item 
                    key={item.id} 
                    index={index}
                    deleteItem={this.deleteItem.bind(this)}
                    propName={item.name} 
                />
            )
        });

        let inputField = "";
        if(this.state.showInput) {
            inputField = this.generateInput();
        }

        return (
            <div className="content">

                <div
                    className="showBtn" 
                    onClick={this.showForm.bind(this)}>
                    + Добавить новую категорию
                </div>

                {inputField}

                {output}

            </div>
        );
    }
}

export default CategoriesPage;
