import React from "react";
import Flexbox from "flexbox-react";

import Calculator from "./Components/Calculator.jsx";

class App extends React.Component {
  render() {
    return (
      <Flexbox flexDirection="column" minHeight="100vh">
        <Flexbox element="header" height="60px">
          <div className="header" />
        </Flexbox>

        <Flexbox flexGrow={1}><div className="content"><Calculator /></div></Flexbox>

        <Flexbox element="footer" height="60px">
          <div className="footer" />
        </Flexbox>
      </Flexbox>
    );
  }
}

export default App;
