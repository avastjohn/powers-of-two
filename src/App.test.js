import React from 'react';
import ReactDOM from 'react-dom';
import PowersOfTwo from './App';

const testComponent = new PowersOfTwo();

it('should determine valid powers of two', () => {
  const validNumbers = [1, 2, 8, 64, 64, 1024];
  const invalidNumbers = [0, 3, 7, 640, .5, 'f'];

  validNumbers.map((number) => {
    const output = testComponent.isValidPowerOfTwo(String(number));
    expect(output).toEqual(true);
  });
  invalidNumbers.map((number) => {
    const output = testComponent.isValidPowerOfTwo(String(number));
    expect(output).toEqual(false);
  });
});

it('should find all chains to check', () => {
  const testCases = [
    {
      valuesList: ['', '2', '', '', '32'],
      expected: [[ '1', '2', '4', '8', '16' ], [ '2', '4', '8', '16', '32' ]]
    },
    {
      valuesList: ['', '5', '', '', '32'],
      expected: [["2", "4", "8", "16", "32"]]
    },
    {
      valuesList: ['', '', '', '', ''],
      expected: []
    },
    {
      valuesList: ['', '', '2', '', ''],
      expected: []
    },
    {
      valuesList: ['2', '', '32', '64', ''],
      expected: [["2", "4", "8", "16", "32"], ["8", "16", "32", "64", "128"], ["8", "16", "32", "64", "128"]]
    },
  ]
  testCases.map((testCase) => {
    const output = testComponent.findAllChainsToCheck(testCase.valuesList);
    expect(output).toEqual(testCase.expected);
  });
});

it('should check potential chains for errors', () => {

});

