import React from 'react';
import './App.css';

// NOTES
// * edge cases still not solved: *
// negative powers of two - would require floats
// priority for errors on most recent input?

// * future improvements *
// timer on inputs so that it doesn't check until user is done typing
// get rid of duplicates in potential chains

// * clean up now: *
// insecure inputs?
// browser issues with any of the js i'm using?

class PowersOfTwo extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.clearAll = this.clearAll.bind(this);
    this.isValidPowerOfTwo = this.isValidPowerOfTwo.bind(this);
    this.findAllChainsToCheck = this.findAllChainsToCheck.bind(this);
    this.checkPotentialsForErrors = this.checkPotentialsForErrors.bind(this);
    this.state = {
      // errors - a list of 0s and 1s to indicate which input fields should show error state
      errors: [0, 0, 0, 0, 0],
      // valuesList - a list of the actual contents of all input fields
      valuesList: ['', '', '', '', '']
    };
  }

  isValidPowerOfTwo(number) {
    if (isNaN(number)) {
      return false;
    }
    // note: 1 is the only positive power of two that doesn't work with the
    // binary chop method below
    if (number === '1') {
      return true;
    }
    // make number binary, chop off the first 1, see if the remaining digits are zero
    const binary = parseInt(number).toString(2);
    const choppedBinary = parseInt(binary.substring(1));
    return choppedBinary === 0;
  }

  findAllChainsToCheck(valuesList) {
    // create "potential chains" for each non empty valid element
    const potentialChains = [];
    
    valuesList.map((value, idx) => {
      if (this.isValidPowerOfTwo(value)) {
        // make a list around that item
        const hypotheticalChain = ['', '', '', '', ''];
        hypotheticalChain[idx] = value;
        // loop to the left, divide by two until idx = 0
        for (var j = idx - 1; j >= 0; j--) {
          const fullNum = parseInt(hypotheticalChain[j+1]);
          const halfNum = String(fullNum/2);
          hypotheticalChain[j] = halfNum;
        }
        // only move forward if beginning of chain is an integer
        const first = parseInt(hypotheticalChain[0]);
        if (first !== 0 && Number.isInteger(first)) {
          // loop to the right, multiply by two until idx = 4
          for (var j = idx; j < 4; j++) {
            const num = parseInt(hypotheticalChain[j]);
            const doubleNum = num * 2;
            hypotheticalChain[j+1] = String(doubleNum);
          }
          potentialChains.push(hypotheticalChain);
        }
      }
    });
    return potentialChains;  
  }

  checkPotentialsForErrors(potentialChains, valuesList) {
    if (potentialChains.length === 0) {
      // if no valid chains, return non-empty inputs as errors
      return valuesList.map(x => (x === '' ? 0 : 1));
    }
    // figure out how many mismatches there are for each chain,
    // figure out which chain has the least mismatches
    let lowestMismatchCount = 5;
    let bestContenderErrors;
    
    potentialChains.map((chain) => {
      let currentErrorCount = 0;
      // how many mismatches for this chain
      const currentErrors = chain.map((item, idx) => {
        return (valuesList[idx] != item && valuesList[idx] !== '') ? 1 : 0;
      });
      currentErrorCount = currentErrors.filter((x) => {return x === 1}).length;
      // is this chain better than any previous ones?
      if (currentErrorCount < lowestMismatchCount) {
        lowestMismatchCount = currentErrorCount;
        bestContenderErrors = currentErrors;
      }
    });
    // return mismatches for best chain
    return bestContenderErrors;
  }

  handleChange() {
    const currentVals = [0, 1, 2, 3, 4].map((i) => {
      return document.getElementById(i).value;
    });
    const potentialChains = this.findAllChainsToCheck(currentVals);
    const errors = this.checkPotentialsForErrors(potentialChains, currentVals);
    this.setState(() => {
      return {errors};
    })
  }

  clearAll() {
    this.setState({
      valuesList: ['', '', '', '', '']
    })
  }

  render() {
    const errors = this.state.errors;
    return (
      <form>
        <h1 className="header-title">My favorite powers of two</h1>
        <div className="main-content">
          {[0, 1, 2, 3, 4].map((i) => {
            return <input
              className={errors[i] ? 'errored' : null }
              type="text"
              id={i}
              key={i}
              onChange={this.handleChange}
            />
          })}
          <button className='clear-btn' onClick={this.clearAll}>Clear All</button>
        </div>
      </form>
    );
  }
}

export default PowersOfTwo
