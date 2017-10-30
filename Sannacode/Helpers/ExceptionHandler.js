export default function ExceptionHandler() {}

ExceptionHandler.prototype.handle = function(errorMessage) {
  var exception = "Input field contains unsupported symbol.";
  switch (errorMessage) {
    case "0": {
      exception = "Number of opening brackets doesn`t equal number of closing.";
      break;
    }
    case "1":
      exception = "So many dots. Please check it.";
      break;
    case "2":
      exception = "Parsing error. Please check input symbols.";
      break;
  }
  return exception;
};
