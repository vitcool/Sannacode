export default function ExceptionHandler() {}

ExceptionHandler.prototype.handle = function(errorMessage) {
  var exception = "Sorry, unknown error";
  switch (errorMessage) {
    case "0": {
      exception = "Number of opening brackets doesn`t equal number of closing.";
      break;
    }
    case "1":
      exception = "So many dots. Please check it.";
      break;
    case "2":
      exception = "Input field contains unsupported symbol.";
      break;
  }
  return exception;
};
