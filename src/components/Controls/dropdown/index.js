import React, { Component } from 'react';
import Select from 'react-select';

import './dropdown.scss';

class DropDownList extends Component {

    render() {
        let props = this.props;
        return (
            <div className="dropdown-wrapper">
                <Select options={props.options} onChange={props.onHandleChange} defaultValue={props.defaultValue} clearable={true} clearValueText={"Clear value"}/>
            </div>
        );
    }
}

export default DropDownList;