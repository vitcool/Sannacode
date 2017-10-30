import React from "react";
import Lexer from "lex";
import ButtonComponent from "./ButtonComponent.jsx";
import Parser from "../Helpers/Parser";
import Compute from "../Helpers/Compute";
import ExceptionHandler from "../Helpers/ExceptionHandler";

var _tokenizer = require("tokenizer");

export default class Calculator extends React.Component {
  constructor(props) {
    super(props);
    this.state = { compute: null, handler: null };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.clickKeyButtonHandler = this.clickKeyButtonHandler.bind(this);
    this.allClean = this.allClean.bind(this);
  }
  initializeLexer() {
    var lexer = new Lexer();
    lexer.addRule(/\s+/, function() {
      /* skip whitespace */
    });
    lexer.addRule(/[0-9]+/, function(lexeme) {
      return lexeme; // symbols
    });
    lexer.addRule(/[\(\+\-\*\/\.\)]/, function(lexeme) {
      return lexeme; // punctuation (i.e. "(", "+", "-", "*", "/", ")")
    });
    return lexer;
  }
  initiaizeParser() {
    var factor = {
      precedence: 2,
      associativity: "left"
    };
    var term = {
      precedence: 1,
      associativity: "left"
    };
    var parser = new Parser({
      "+": term,
      "-": term,
      "*": factor,
      "/": factor
    });
    return parser;
  }
  handleSubmit(e) {
    e.preventDefault();
    this.hideErrorMessage();
    try {
      var parsed = this.state.compute.parse(this.refs.input.value);
      if (parsed) {
        var perform = this.state.compute.perform(parsed);
        if (perform && perform != this.refs.input.value + "undefined") {
          this.refs.input.value = perform;
        } else {
          throw new Error(2);
        }
      }
    } catch (e) {
      this.showErrorMessage(this.state.handler.handle(e.message));
    }
  }
  initialize() {
    var lexer = this.initializeLexer();
    var parser = this.initiaizeParser();
    this.state.compute = new Compute(lexer, parser);
    this.state.handler = new ExceptionHandler();
  }
  clickKeyButtonHandler(symbol) {
    this.hideErrorMessage();
    this.refs.input.value += symbol;
  }
  allClean() {
    this.hideErrorMessage();
    this.refs.input.value = "";
  }
  showErrorMessage(message) {
    this.refs.error.innerHTML = message;
    this.refs.error.classList.add("display");
  }
  hideErrorMessage(){
    this.refs.error.classList.remove("display");
  }
  render() {
    this.initialize();
    return (
      <div className="calculator-form">
        <input className="input-field" type="text" ref="input" />
        <div className="keyboard-form">
          <button className="key-button wide-button" onClick={this.allClean}>
            AC
          </button>
          <div className="top-panel">
            <ButtonComponent
              text="("
              click={this.clickKeyButtonHandler}
              selfWide="true"
            />
            <ButtonComponent
              text=")"
              click={this.clickKeyButtonHandler}
              selfWide="true"
            />
          </div>
          <ButtonComponent text="1" click={this.clickKeyButtonHandler} />
          <ButtonComponent text="2" click={this.clickKeyButtonHandler} />
          <ButtonComponent text="3" click={this.clickKeyButtonHandler} />
          <ButtonComponent text="+" click={this.clickKeyButtonHandler} />
          <ButtonComponent text="4" click={this.clickKeyButtonHandler} />
          <ButtonComponent text="5" click={this.clickKeyButtonHandler} />
          <ButtonComponent text="6" click={this.clickKeyButtonHandler} />
          <ButtonComponent text="-" click={this.clickKeyButtonHandler} />
          <ButtonComponent text="7" click={this.clickKeyButtonHandler} />
          <ButtonComponent text="8" click={this.clickKeyButtonHandler} />
          <ButtonComponent text="9" click={this.clickKeyButtonHandler} />
          <ButtonComponent text="/" click={this.clickKeyButtonHandler} />
          <ButtonComponent text="." click={this.clickKeyButtonHandler} />
          <ButtonComponent text="0" click={this.clickKeyButtonHandler} />
          <button className="key-button" onClick={this.handleSubmit}>
            =
          </button>
          <ButtonComponent text="*" click={this.clickKeyButtonHandler} />
        </div>
        <div className="error-field" ref="error" />
      </div>
    );
  }
}
