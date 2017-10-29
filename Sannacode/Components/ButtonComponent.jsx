import React from "react";

export default class ButtonComponent extends React.Component {
    handleClick (){
        this.props.click(this.props.text);
    }
    render() {
        var classes = "key-button";
        if (this.props.selfWide){
            classes += " self-wide-button"
        }
        return (
            <button onClick={ this.handleClick.bind(this) } className={classes}>
                { this.props.text }
            </button>
        );
    }
}