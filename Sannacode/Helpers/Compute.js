export default function Compute(lexer, parser) {
  this.lexer = lexer;
  this.parser = parser;
}

Compute.prototype.parse = function(input) {
  this.lexer.setInput(input);
  var tokens = [],
    token;
  while ((token = this.lexer.lex())) tokens.push(token);
  return this.parser.parse(tokens);
};

Compute.prototype.perform = function(parsed) {
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
              throw new Error(1);
            }
          } else {
            throw new Error(1);
          }
        } else {
          if (symbol == ".") {
            if (i + 1 < parsed.length) {
              symbol = "0." + parsed[++i];
            } else {
              symbol = 0;
            }
          }
        }
        stack.push(symbol);
    }
  }

  var output = stack.pop();
  return output;
};