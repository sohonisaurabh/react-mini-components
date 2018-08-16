import Pagination, { nextPageStateUpdate, 
        prevPageStateUpdate,
        createPageNumberList,
        setLowerAndUpperLimits } from './Pagination';
import React from "react";
import App from './../App';

/*Unit Tests begin*/
describe('Unit tests for Pagination Component', () => {
  it('should increment current page when clicked on next', () => {
    const state = {
      currentPage: 2,
    };
    const newState = nextPageStateUpdate(state);
    expect(newState.currentPage).to.equal(3);
  });
  it('should decrement current page when clicked on previous', () => {
    const state = {
      currentPage: 2,
    };
    const newState = prevPageStateUpdate(state);
    expect(newState.currentPage).to.equal(1);
  });
  it('should return markup array with length equal to block size minus 2', () => {
    const blockSize = 10;
    const markup = createPageNumberList(blockSize);
    expect(markup.length).to.equal(8);
  });
  it('should return the lower limit and upper limit of page blocks', () => {
    const paginationConf = {
      pageSize: 50,
      numRecords: 60,
      blockSize: 7
    };
    const {lowerLimit: l, upperLimit: u} = setLowerAndUpperLimits(paginationConf);
    expect(l).to.not.be.undefined;
    expect(u).to.not.be.undefined;
    expect(l).to.not.be.null;
    expect(u).to.not.be.null;
    expect(l).to.be.finite;
    expect(u).to.be.finite;
  });
  it('should set lower limit and upper limit to 1 if total records are less than page size', () => {
    const paginationConf = {
      pageSize: 50,
      numRecords: 40,
      blockSize: 7
    };
    let {lowerLimit: l, upperLimit: u} = setLowerAndUpperLimits(paginationConf);
    expect(l).to.equal(1);
    expect(u).to.equal(1);
  });
  it('should set lower limit to 1 and upper limit to block size if total records are more than page size but can be accommodated in current block', () => {
    const paginationConf = {
      pageSize: 50,
      numRecords: 60,
      blockSize: 7
    };
    let {lowerLimit: l, upperLimit: u} = setLowerAndUpperLimits(paginationConf);
    expect(l).to.equal(1);
    expect(u).to.equal(paginationConf.blockSize);
  });
  it('should set lower limit to 1 and upper limit to last possible page if total records are more than page size and cannot be accommodated in current block', () => {
    const paginationConf = {
      pageSize: 50,
      numRecords: 400,
      blockSize: 7
    };
    let {lowerLimit: l, upperLimit: u} = setLowerAndUpperLimits(paginationConf);
    expect(l).to.equal(1);
    expect(u).to.be.above(paginationConf.blockSize);
  });
});
/*Unit Tests end*/

/*Integration - Shallow render tests begin*/
describe("Integration - Shallow render tests for Pagination", () => {
  it("should receive all mandatory props", () => {
    const appComp = shallow(<App />);
    expect(appComp.find(Pagination).props().numRecords).to.not.be.undefined;
    expect(appComp.find(Pagination).props().numRecords).to.not.be.null;
    expect(appComp.find(Pagination).props().numRecords).to.be.finite;
  });
  it("should fallback to default props", () => {
    const pageComp = mount(<Pagination />);
    expect(pageComp.props().maxPageBlocks).to.equal(7);
    expect(pageComp.props().pageSize).to.equal(50);
  });
  it("should render blocks equal to number of blocks minus 2 passed as props", () => {
    const maxPageBlocks = 10;
    const pageComp = shallow(<Pagination maxPageBlocks={maxPageBlocks}/>);
    expect(pageComp.find("button.btn-page-num")).to.have.length(8);
  });
  it("should initialize with correct state", () => {
    const pageComp = shallow(<Pagination />);
    expect(pageComp.state().currentPage).to.equal(1);
  });
  it("should have only one page and its page number as 1", () => {
    const pageComp = shallow(<Pagination numRecords={40} maxPageBlocks={5} />);
    expect(pageComp.find("button.btn-page-num")).to.have.length(1);
    //expect(pageComp.find("button.btn-page-num")[0].innerHTML).to.equal(1);
  });
});
/*Integration - Shallow render tests end*/