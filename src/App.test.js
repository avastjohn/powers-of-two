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

const testCases = [
  {
    valuesList: ['', '2', '', '', '32'],
    potentials: [[ '1', '2', '4', '8', '16' ], [ '2', '4', '8', '16', '32' ]],
    bestErrors: [0, 0, 0, 0, 1]
  },
  {
    valuesList: ['', '5', '', '', '32'],
    potentials: [["2", "4", "8", "16", "32"]],
    bestErrors: [0, 1, 0, 0, 0]
  },
  {
    valuesList: ['', '', '', '', ''],
    potentials: [],
    bestErrors: [0, 0, 0, 0, 0]
  },
  {
    valuesList: ['', '', '2', '', ''],
    potentials: [],
    bestErrors: [0, 0, 1, 0, 0]
  },
  {
    valuesList: ['2', '', '32', '64', ''],
    potentials: [["2", "4", "8", "16", "32"], ["8", "16", "32", "64", "128"], ["8", "16", "32", "64", "128"]],
    bestErrors: [1, 0, 0, 0, 0]
  },
  {
    valuesList: ['5', '', '7', '8', ''],
    potentials: [['1', '2', '4', '8', '16']],
    bestErrors: [1, 0, 1, 0, 0]
  },
]

it('should find all chains to check', () => {
  testCases.map((testCase) => {
    const output = testComponent.findAllChainsToCheck(testCase.valuesList);
    expect(output).toEqual(testCase.potentials);
  });
});

it('should check potential chains for best errors output', () => {
  testCases.map((testCase) => {
    const output = testComponent.checkPotentialsForErrors(testCase.potentials, testCase.valuesList);
    expect(output).toEqual(testCase.bestErrors);
  });
});

