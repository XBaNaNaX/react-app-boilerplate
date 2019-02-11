import React from 'react';

import './TextBox.scss';

const TextBox = ({ ...props }) => {
    let className = "textbox-wrapper " + props.className
    return (
        <div className={className}>
            <input type="text" id={props.id} onChange={props.handleChange} value={props.value}/>
        </div>
    )
}

export default TextBox