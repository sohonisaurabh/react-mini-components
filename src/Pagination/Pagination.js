import { css } from 'emotion';
import styled from 'react-emotion';
import React from 'react';

const PageDiv = styled('div')``;
const PageTab = styled('div')`
  width: 50px;
  border-radius: 7px;
  height: 50px;
  text-align: center;
  background: skyblue;
  &:hover {
    background: Aquamarine;
  }
`;
const buttonStyle = css`
  background-color: skyblue;
  color: white;
  border-radius: 5px;
  padding: 0.5rem 1rem;
  font-size: 1rem;
  border: none;
  cursor: pointer;
  margin: 20px 1em;
`;
const disabled = css`
  cursor: default;
  background: #e0cccc;
  pointer-events: none;
`;
const container = css`
  width: 100%;
  background: aliceblue;
  height: 200px;
`;

const styles = {
  root: {
    width: '100%',
    maxWidth: 700,
    margin: '40px',
  },
  content: {
    margin: '0 16px',
  },
  actions: {
    marginTop: 12,
  },
  backButton: {
    marginRight: 12,
  },
};

export const nextPageStateUpdate = currentState => {
  return {
    currentPage: currentState.currentPage + 1,
  };
};
export const prevPageStateUpdate = currentState => {
  return {
    currentPage: currentState.currentPage - 1,
  };
};

export const createPageNumberList = paginationConf => {
  let markupArr = [];
  let {lowerLimit: lLimit, upperLimit: uLimit} = setLowerAndUpperLimits(paginationConf);
  for (let index = 0; index < uLimit; index += 1) {
    const element = <button className={'btn-page-num ' + buttonStyle}>{index + 1}</button>;
    markupArr.push(element);
  }
  return markupArr;
};

export const setLowerAndUpperLimits = pagnConf => {
  const pageSize = pagnConf.pageSize,
        numRecords = pagnConf.numRecords,
        blockSize = pagnConf.blockSize;
  let lowerLimit, upperLimit;
  /*If records are less than pageSize, there is only page. */
  if (numRecords < pageSize) {
    lowerLimit = 1;
    upperLimit = 1;
  } /*If records are greater than pageSize but can be accommodated in block */
    else if (
    numRecords > pageSize &&
    numRecords <= (blockSize * pageSize)){
      lowerLimit = 1;
      upperLimit = blockSize;
  } /*If records are greater than pageSize and cannot be accommodated in block */
    else if (
    numRecords > pageSize &&
    numRecords > (blockSize * pageSize)){
      lowerLimit = 1;
      upperLimit = parseInt(numRecords/pageSize);
  }
  return {lowerLimit, upperLimit};
};

class Pagination extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: 1,
      disablePrev: false,
      disableNext: false
    };
    this.nextPage = this.nextPage.bind(this);
    this.prevPage = this.prevPage.bind(this);
    this.createPageBlocks = this.createPageBlocks.bind(this);
  }

  componentWillMount() {
    const { currentPage } = this.state;
    if (currentPage === 1) {
      this.setState({
        disablePrev: true
      });
    }
  }

  componentWillUpdate(nextProps, nextState) {
    const { currentPage } = nextState;
    if (currentPage === 1) {
      this.setState({
        disablePrev: true
      });
    }
  }

  nextPage() {
    this.setState(nextPageStateUpdate);
  }

  prevPage() {
    this.setState(prevPageStateUpdate);
  }

  createPageBlocks() {
    return createPageNumberList({
      pageSize: this.props.pageSize,
      numRecords: this.props.numRecords,
      blockSize: this.props.blockSize
    });
  }

  render() {

    return (
      <div>
        <div>
          <button onClick={this.prevPage} className={buttonStyle + ' previous ' + 
          (this.state.disablePrev ? disabled + ' disabled' : '')}>Previous</button>
          {this.createPageBlocks()}
          <button onClick={this.nextPage} className={buttonStyle + ' next ' + 
          (this.state.disableNext ? disabled + ' disabled' : '')}>Next</button>
        </div>
        <p>Current page is: {this.state.currentPage}</p>
      </div>
    );
  }
}

Pagination.defaultProps = {
  pageSize: 50,
  blockSize: 7
};

export default Pagination;
