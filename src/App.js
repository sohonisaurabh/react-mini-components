import { css } from 'emotion';
import styled from 'react-emotion';
import React, { Component } from 'react';
import Pagination from "./Pagination/Pagination";

const PageTab = styled('div')``;
const container = css`
  width: 400px;
  background: aliceblue;
  height: 200px;
  text-align: center;
  margin: 20px 0 0 1em;
`;

class App extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="App">
        <PageTab className={container}>Current page content</PageTab>
        <Pagination numRecords={200}/>
      </div>
    );
  }
}

export default App;
