import React, { Component } from 'react';
import Action from './actions';

class Item extends Component {

	constructor(props) {
		super(props);
		this.state = {
			
		}
	}

    render() {
        return (
            <div className="item">
                {this.props.propName}
            </div>
        );
    }
}

export default Item;
