import React, { Component } from 'react';
import './App.css';

// NOTES
// * edge cases still not solved: *
// negative powers of two - would require floats
// priority for errors on most recent input?

// * clean up: *
// for loops
// refactor to make better organization
// css
// console logs
// tests
// insecure inputs?
// browser issues with any of the js i'm using?


const errorStyle = {
  border: '2px solid red'
};

class PowersOfTwo extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.clearAll = this.clearAll.bind(this);
    this._isValidPowerOfTwo = this._isValidPowerOfTwo.bind(this);
    this._findAllChainsToCheck = this._findAllChainsToCheck.bind(this);
    this._checkPotentialsForErrors = this._checkPotentialsForErrors.bind(this);
    this.state = {
      // errors - a list of 0s and 1s to indicate which input fields should show error state
      errors: [0, 0, 0, 0, 0],
      // valuesList - a list of the actual contents of all input fields
      valuesList: ['', '', '', '', '']
    };
  }

  _isValidPowerOfTwo(number) {
    if (isNaN(number)) {
      return false;
    }
    // note: 1 is the only positive power of two that doesn't work with the
    // binary chop method below
    if (number == 1) {
      return true;
    }
    // make number binary, chop off the first 1, see if the remaining digits are zero
    const binary = parseInt(number).toString(2);
    const choppedBinary = parseInt(binary.substring(1));
    return choppedBinary === 0;
  }

  _findAllChainsToCheck(valuesList) {
    // create "potential chains" for each non empty valid element
    const potentialChains = [];
    for (var i = 0; i < 5; i++) {
      // if element is non empty and valid power of 2
      if (this._isValidPowerOfTwo(valuesList[i])) {
        const hypotheticalChain = ['', '', '', '', ''];
        // make a list around that item
        hypotheticalChain[i] = valuesList[i];
        // loop to the left, divide by two until i = 0
        for (var j = i - 1; j >= 0; j--) {
          const fullNum = parseInt(hypotheticalChain[j+1]);
          const halfNum = String(fullNum/2);
          hypotheticalChain[j] = halfNum;
        }
        // only move forward if beginning of chain is an integer
        const first = parseInt(hypotheticalChain[0]);
        if (first != 0 && Number.isInteger(first)) {
          // loop to the right, multiply by two until i = 4
          for (var j = i; j < 4; j++) {
            const num = parseInt(hypotheticalChain[j]);
            const doubleNum = num * 2;
            hypotheticalChain[j+1] = String(doubleNum);
          }
          potentialChains.push(hypotheticalChain);          
        }
      }
    }
    return potentialChains;  
  }

  _checkPotentialsForErrors(potentialChains, valuesList) {
    if (potentialChains.length == 0) {
      // if no valid chains, return non-empty inputs as errors
      return valuesList.map(x => (x === '' ? 0 : 1));
    }
    // figure out how many mismatches there are for each chain,
    // figure out which chain has the least mismatches
    let lowestMismatchCount = 5;
    let bestContenderChain = 0;
    let bestContenderErrors;
    for (var i = 0; i < potentialChains.length; i++) {
      // how many mismatches for this chain
      const chain = potentialChains[i];
      let currentErrorCount = 0;
      const currentErrors = [0, 0, 0, 0, 0] ;
      for (var j = 0; j < 5; j++) {
        if (valuesList[j] != chain[j] && valuesList[j] !== '') {
          currentErrorCount += 1;
          currentErrors[j] = 1;
        }
      }
      // console.log('chain', chain);
      // console.log('currentErrors', currentErrors);
      // console.log('currentErrorCount', currentErrorCount);
      if (currentErrorCount < lowestMismatchCount) {
        lowestMismatchCount = currentErrorCount;
        bestContenderChain = i;
        bestContenderErrors = currentErrors;
      }
    }
    // console.log('lowestMismatchCount', lowestMismatchCount);
    // console.log('bestContenderChain', bestContenderChain);
    // console.log('bestContenderErrors', bestContenderErrors);
    // return mismatches for that chain
    return bestContenderErrors;
  }

  handleChange() {
    // todo: security on inputs
    const currentVals = [0, 1, 2, 3, 4].map((i) => {
      return document.getElementById(i).value;
    });
    const potentialChains = this._findAllChainsToCheck(currentVals);
    // console.log(currentVals);
    const errors = this._checkPotentialsForErrors(potentialChains, currentVals);
    this.setState(() => {
      return {errors};
    })
  }

  clearAll() {
    this.setState(() => {
      valuesList: ['', '', '', '', '']
    })
  }

  render() {
    const errors = this.state.errors;
    return (
      <form>
        <h4>My favorite powers of two</h4>
        {[0, 1, 2, 3, 4].map((i) => {
          return <input
            style={errors[i] ? errorStyle : {} }
            type="text"
            id={i}
            key={i}
            onChange={this.handleChange}
          />
        })}
        <button onClick={this.clearAll}>Clear</button>
      </form>
    );
  }
}

export default PowersOfTwo
// ReactDOM.render(<PowersOfTwo />, document.getElementById('app'));
