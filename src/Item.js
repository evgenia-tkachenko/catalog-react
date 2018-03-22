import React, { Component } from 'react';
// import Action from './actions';

class Item extends Component {

	constructor(props) {
		super(props);
		this.state = {
			currentCategory: this.props.propCategory || ""
		}
	}

    render() {

        return (
            <div className="item">
                <div>
                    {this.props.propName}
                </div>
                <div>
                    {this.state.currentCategory}
                </div>
            </div>
        )
    }
}

export default Item;
