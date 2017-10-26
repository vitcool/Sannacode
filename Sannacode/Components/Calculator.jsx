import React from "react";
import Lexer from "lex";
import Parser from "./Parser";

var _tokenizer = require("tokenizer");

export default class Calculator extends React.Component {
  constructor(props) {
    super(props);
    this.state = { result: "", lexer: null, parser: null };
    this.handleSubmit = this.handleSubmit.bind(this);
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
  parse(input) {
      this.state.lexer.setInput(input);
      var tokens = [],
        token;
      while ((token = this.state.lexer.lex())) tokens.push(token);
      return this.state.parser.parse(tokens);
  }
  compute(parsed) {
    var stack = [];

    var operator = {
      "+": function(a, b) {
        return a + b;
      },
      "-": function(a, b) {
        return a - b;
      },
      "*": function(a, b) {
        return a * b;
      },
      "/": function(a, b) {
        return a / b;
      }
    };
    for (var i = 0; i < parsed.length; i++) {
      var symbol = parsed[i];
      switch (symbol) {
        case "+":
        case "-":
        case "*":
        case "/":
          var b = +stack.pop();
          var a = +stack.pop();
          stack.push(operator[symbol](a, b));
          break;
        default:
          if (parsed[i + 1] == ".") {
            if (parsed[i + 2] != ".") {
              symbol = symbol + "." + parsed[i + 2];
              i += 2;
              if (parsed[i + 1] == ".") {
                throw new Error("So much dots.");
              }
            } else {
              throw new Error("So much dots.");
            }
          }
          stack.push(symbol);
      }
    }

    var output = stack.pop();
    this.setState({ result: output });
  }
  handleSubmit(e) {
    e.preventDefault();
    try {
      var parsed = this.parse(this.refs.nameField.value);
      if (parsed) {
        this.compute(parsed);
      }
    } catch (e) {
      alert(e);
    }
  }
  init() {
    this.state.lexer = this.initializeLexer();
    this.state.parser = this.initiaizeParser();
  }
  render() {
    this.init();
    return (
      <div>
        <input type="text" ref="nameField" />
        <button className="calculate-button" onClick={this.handleSubmit}>Calculate</button>
        <div className="calculate-result">{this.state.result}</div>
      </div>
    );
  }
}
