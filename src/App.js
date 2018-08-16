import React, { Component } from 'react';
import Pagination from "./Pagination/Pagination";

class App extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="App">
        <Pagination numRecords={this.props.numRecords}/>
      </div>
    );
  }
}
App.defaultProps = {
  numRecords: 305
};

export default App;
