import React, { Component } from 'react';
import Action from './actions';
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
            <div>
                <b>Наименование:</b>
                <input 
                    type="text" 
                    placeholder="Товар" 
                    className="nameInp"
                    value={this.state.currentName}
                    onChange={this.getText.bind(this)}
                /> <br />
                <button 
                    id="addBtn" 
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
            id: "",
            name: this.state.currentName,
        });

        this.setState( {categoriesData: tempArr, currentName: ""} );

        Action.setData(tempArr, "categories");
    }

    render() {

        let output = this.state.categoriesData.map( (item, index) => {
            return (
                <Item 
                    key={item.id} 
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
