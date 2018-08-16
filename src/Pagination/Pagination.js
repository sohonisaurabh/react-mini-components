import React from 'react';

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

export const createPageNumberList = maxPageBlocks => {
  let markupArr = [];
  let {lowerLimit: lLimit, upperLimit: uLimit} = setLowerAndUpperLimits({
    pageSize: this.props.pageSize,
    numRecords: this.props.numRecords,
    blockSize: this.props.blockSize
  });
  for (let index = 0; index < uLimit; index++) {
    const element = <button className="btn-page-num">index</button>;
    markupArr.push(element);
  }
  /* for (let index = 0; index < maxPageBlocks - 2; index++) {
    const element = <button className="btn-page-num">index</button>;
    markupArr.push(element);
  } */
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
    };
    this.nextPage = this.nextPage.bind(this);
    this.prevPage = this.prevPage.bind(this);
  }

  nextPage() {
    this.setState(nextPageStateUpdate);
  }

  prevPage() {
    this.setState(prevPageStateUpdate);
  }

  render() {

    return (
      <div>
        <div>Content for page: {this.state.currentPage}</div>
        <div>
          <button onClick={this.prevPage}>Previous</button>
          {createPageNumberList(this.props.maxPageBlocks)}
          <button onClick={this.nextPage}>Next</button>
        </div>
      </div>
    );
  }
}

Pagination.defaultProps = {
  maxPageBlocks: 7,
  pageSize: 50
};

export default Pagination;
