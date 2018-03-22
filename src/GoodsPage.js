import React, { Component } from 'react';
import Action from './actions';
import uid from 'uid';
import Item from './Item';

class GoodsPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            goodsData: [],
            showInput: false,
            currentName: "",
            currentCategory: ""
        }
    }

    componentWillMount() {
        this.setState({goodsData: Action.getData("goods")});
    }

    showForm(e) {
        this.setState( { showInput: !this.state.showInput } );

        let btn = e.target.textContent;
    
        if (btn === "+ Добавить новый товар") {
            btn = "- Добавить новый товар";
            e.target.style.borderRadius = "7px 7px 0 0";
        }
        else {
            btn = "+ Добавить новый товар";
            e.target.style.borderRadius = "7px";
        }

        e.target.textContent = btn;
    }

    generateInput() {
        let categoriesList = Action.getData("categories").map( (item, index) => {
            return (
                <option key={index} value={item.name}>{item.name}</option>
            )
        });

        return (
            <div className="form-group">
                <label htmlFor="goodNameInp"><b>Наименование:</b></label>
                <input 
                    type="text" 
                    placeholder="Товар" 
                    className="form-control"
                    id="goodNameInp"
                    required="required"
                    value={this.state.currentName}
                    onChange={this.getText.bind(this, "name")}
                /> 
                <br />
                <b>Категория:</b>
                <select className="form-control" onChange={this.getText.bind(this, "category")}>
                    <option hidden key={-1} value={this.state.currentCategory}></option>
                    {categoriesList}
                </select>
                <br />
                <button 
                    id="addBtn" 
                    className="btn btn-primary"
                    onClick={this.handleClick.bind(this)}>
                    Добавить
                </button>
            </div>
        )
    }

    getText(flag, e) {
        let text = e.target.value;

        switch(flag) {
            case "name": this.setState( {currentName: text} ); break;
            default: this.setState( {currentCategory: text} );
        }
    }

    handleClick() {
    
        let newArr = this.state.goodsData;

        newArr.push( {
            id: uid(10),
            name: this.state.currentName,
            category: this.state.currentCategory
        });

        this.setState( {goodsData: newArr, currentName: ""} );

        Action.setData(newArr, "goods");
    }

    deleteItem(index) {
        let newArr = this.state.goodsData;
        newArr.splice(index, 1);
        this.setState( {goodsData: newArr} );
        Action.setData(newArr, "goods");
    }

    saveItem(index, newName, newCategory) {
        let newArr = this.state.goodsData;
        newArr[index].name = newName;
        newArr[index].category = newCategory;
        this.setState( {goodsData: newArr} );
        Action.setData(newArr, "goods");
    }

    render() {

        let output = this.state.goodsData.map( (item, index) => {
            return (
                <Item 
                    key={item.id} 
                    index={index}
                    deleteItem={this.deleteItem.bind(this)}
                    saveItem={this.saveItem.bind(this)}
                    propName={item.name} 
                    propCategory={item.category}
                />
            )
        });

        console.log(output);

        let inputField = "";
        if(this.state.showInput) {
            inputField = this.generateInput();
        }

        return (
            <div className="content">

                <div
                    className="showBtn" 
                    onClick={this.showForm.bind(this)}>
                    + Добавить новый товар
                </div>

                {inputField}

                {output}

            </div>
        );
    }
}

export default GoodsPage;
