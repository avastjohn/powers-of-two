import React from 'react';
import ReactDOM from 'react-dom';
import PowersOfTwo from './App';

const testComponent = new PowersOfTwo();

it('should determine valid powers of two', () => {
  const validNumbers = [1, 2, 8, 64, 1024];
  const invalidNumbers = [0, 3, 7, 640, .5, 'f'];

  const output = testComponent.isValidPowerOfTwo(invalidNumbers[0]);
  expect(output).toEqual(false);
});
