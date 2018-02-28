import React, { Component } from 'react';
import Action from './actions';
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
        let categoriesList = Action.getData("categories").map( (item) => {
            return (
                <option value={item.name}>{item.name}</option>
            )
        });

        return (
            <div>
                <b>Наименование:</b>
                <input 
                    type="text" 
                    placeholder="Товар" 
                    className="nameInp"
                    value={this.state.currentName}
                    onChange={this.getText.bind(this, "name")}
                /> <br />
                <b>Категория:</b>
                <select onChange={this.getText.bind(this, "category")}>
                    <option hidden value={this.state.currentCategory}></option>
                    {categoriesList}
                </select>
                <br />
                <button 
                    id="addBtn" 
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
    
        let tempArr = this.state.goodsData;

        tempArr.push( {
            id: "",
            name: this.state.currentName,
            category: this.state.currentCategory
        });

        this.setState( {goodsData: tempArr, currentName: "", currentCategory: ""} );

        Action.setData(tempArr, "goods");
    }

    render() {

        let output = this.state.goodsData.map( (item, index) => {
            return (
                <Item 
                    key={item.id} 
                    propName={item.name} 
                    propCategory={item.category}
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
                    + Добавить новый товар
                </div>

                {inputField}

                {output}

            </div>
        );
    }
}

export default GoodsPage;
