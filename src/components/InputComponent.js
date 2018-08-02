import React from "react";

class InputComponent extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            val: "Default Value"
        };
        this.handleChange = this.handleChange.bind(this);
    }
    handleChange(event) {
        this.setState({
            val: event.target.value
        });
    }
    render () {
        return (
            <input type="text" value={this.state.val} onChange={this.handleChange} />
        );
    }
}

/* const InputComponent = (props) => {
    return (
        <input type="text" value="{props.defaultVal}" onChange={props.handleChange}/>
    );
}; */

export default InputComponent;