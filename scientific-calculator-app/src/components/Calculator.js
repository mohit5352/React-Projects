import React, { useState } from 'react';
import Display from './Display';
import ButtonsContainer from './ButtonsContainer';
import { factorial, mean, median } from 'mathjs';
import AdvancedFunctionButtons from './AdvancedFunctionButtons';

const Calculator = () => {
  const [displayValue, setDisplayValue] = useState('0');
  let [expression, setExpression] = useState(''); 
  const [showAdvancedPanel, setShowAdvancedPanel] = useState(false); // State for toggling advanced panel visibility
  
  // Function to toggle the visibility of the advanced functions panel
  const toggleAdvancedPanel = () => {
    setShowAdvancedPanel(!showAdvancedPanel);
  };
  
  // Function to calculate variance
  const variance = (numbers) => {
    const mu = mean(numbers);
    const squaredDifferences = numbers.map(x => Math.pow(x - mu, 2));
    return mean(squaredDifferences);
  };

  const standardDeviation = (numbers) => {
    const variance = variance(numbers);
    return Math.sqrt(variance);
  };

  
  // Function to calculate mode
  const mode = (numbers) => {
    const counts = {};
    numbers.forEach(num => {
      counts[num] = (counts[num] || 0) + 1;
    });
    const modeValues = Object.keys(counts).filter(key => counts[key] === Math.max(...Object.values(counts)));
    return modeValues.join(', ');
  };
  
  // Function to calculate range
  const range = (numbers) => {
    return Math.max(...numbers) - Math.min(...numbers);
  };
  
  // Function to calculate correlation
  const correlation = (x, y) => {
    const n = x.length;
    const meanX = mean(x);
    const meanY = mean(y);
    let numerator = 0;
    let denominatorX = 0;
    let denominatorY = 0;
  
    for (let i = 0; i < n; i++) {
      numerator += (x[i] - meanX) * (y[i] - meanY);
      denominatorX += Math.pow(x[i] - meanX, 2);
      denominatorY += Math.pow(y[i] - meanY, 2);
    }
  
    return numerator / Math.sqrt(denominatorX * denominatorY);
  };
  
  // Function to calculate regression (simple linear regression)
  const regression = (x, y) => {
    const n = x.length;
    const sumX = x.reduce((acc, val) => acc + val, 0);
    const sumY = y.reduce((acc, val) => acc + val, 0);
    const sumXY = x.reduce((acc, val, index) => acc + val * y[index], 0);
    const sumX2 = x.reduce((acc, val) => acc + val ** 2, 0);
    const sumY2 = y.reduce((acc, val) => acc + val ** 2, 0);
  
    const slope = (n * sumXY - sumX * sumY) / (n * sumX2 - sumX ** 2);
    const intercept = (sumY * sumX2 - sumX * sumXY) / (n * sumX2 - sumX ** 2);
  
    return { slope, intercept };
  };
  
  // Function to calculate percentile
  const percentile = (numbers, p) => {
    // Step 1: Sort the numbers
    const sortedNumbers = numbers.sort((a, b) => a - b);
  
    // Step 2: Calculate the index
    const index = (p / 100) * (sortedNumbers.length - 1);
  
    // Step 3: Interpolate if needed
    if (Number.isInteger(index)) {
      // If index is an integer, return the value at that index
      return sortedNumbers[index];
    } else {
      // If index is not an integer, interpolate between the values at the integer part of the index and the next value
      const lowerIndex = Math.floor(index);
      const upperIndex = Math.ceil(index);
      const lowerValue = sortedNumbers[lowerIndex];
      const upperValue = sortedNumbers[upperIndex];
      return lowerValue + (index - lowerIndex) * (upperValue - lowerValue);
    }
  };

  const handleButtonClick = (value) => {
    if (value === '=') {
        calculateResult();
    } else if (value === 'C') {
        clearDisplay();
    } else if (value === 'ln') {
        // Natural logarithm
        handleUnaryOperation('Math.log');
    } else if (value === 'log') {
        // Base-10 logarithm
        handleUnaryOperation('Math.log10');
    } else if (value === 'exp') {
        // Exponential
        handleUnaryOperation('Math.exp');
    } else if (value === 'sin') {
        expression = expression * (Math.PI / 180);
        // Sin
        handleUnaryOperation('Math.sin');
    } else if (value === 'cos') {
        expression = expression * (Math.PI / 180);
        // Cos
        handleUnaryOperation('Math.cos');
    } else if (value === 'tan') {
        expression = expression * (Math.PI / 180);
        // Tan
        handleUnaryOperation('Math.tan');
    } else if (value === '!') {
        const number = parseFloat(expression.match(/-?\d*\.?\d+/)[0]);
        const result = factorial(number);
        setDisplayValue(result.toString());
        setExpression(result.toString());
    } else if (value === 'mean') {
        const numbers = expression.split(',').map(parseFloat);
        const result = mean(numbers);
        setDisplayValue(result.toString());
        setExpression(result.toString());
    } else if (value === 'median') {
        const numbers = expression.split(',').map(parseFloat);
        const result = median(numbers);
        setDisplayValue(result.toString());
        setExpression(result.toString());
    } else if (value === 'stddev') {
        const numbers = expression.split(',').map(parseFloat);
        const result = standardDeviation(numbers);
        setDisplayValue(result.toString());
        setExpression(result.toString());
    } else if (value === 'var') {
        const numbers = expression.split(',').map(parseFloat);
        const result = variance(numbers);
        setDisplayValue(result.toString());
        setExpression(result.toString());
      } else if (value === 'mode') {
        const numbers = expression.split(',').map(parseFloat);
        const result = mode(numbers);
        setDisplayValue(result.toString());
        setExpression(result.toString());
      } else if (value === 'range') {
        const numbers = expression.split(',').map(parseFloat);
        const result = range(numbers);
        setDisplayValue(result.toString());
        setExpression(result.toString());
      } else if (value === 'corr') {
        // You need two sets of numbers for correlation
        // For simplicity, let's assume both sets are provided as comma-separated values in the expression
        const [xValues, yValues] = expression.split(';').map(str => str.split(',').map(parseFloat));
        const result = correlation(xValues, yValues);
        setDisplayValue(result.toString());
        setExpression(result.toString());
      } else if (value === 'reg') {
        // Similarly, you need two sets of numbers for regression
        const [xValues, yValues] = expression.split(';').map(str => str.split(',').map(parseFloat));
        const { slope, intercept } = regression(xValues, yValues);
        setDisplayValue(`Slope: ${slope}, Intercept: ${intercept}`);
        setExpression(`Slope: ${slope}, Intercept: ${intercept}`);
      }
      else if (value === 'percentile') {
        const p = expression.split(';')[1];
        // Extract the percentile value from the button value
        // const p = parseFloat(value.split(' ')[1]);
        const numbers = expression.split(',').map(parseFloat);
        const result = percentile(numbers, p);
        setDisplayValue(result.toString());
        setExpression(result.toString());
      } 
      else {
        updateDisplay(value);
    }
      
  };

  const handleUnaryOperation = (operation) => {
    try {
      const result = eval(`${operation}(${expression})`);
      setDisplayValue(result.toString());
      setExpression(result.toString());
    } catch (error) {
      setDisplayValue('Error');
      setExpression('');
    }
  };

  const calculateResult = () => {
    try {
        let result;
        // Extract the number part from the expression
        const number = parseFloat(expression.match(/-?\d*\.?\d+/)[0]);
        // if (expression.includes('sin') || expression.includes('cos') || expression.includes('tan')) {

        //     // Convert degrees to radians for trigonometric functions
        //     const radians = number * (Math.PI / 180);
        //     const formattedExpression = `Math.${expression.split('(')[0]}(${radians})`;
        //     result = eval(formattedExpression);
            
        // } else if (expression.includes('sqrt')) {
        //     const formattedExpression = `Math.${expression.split('(')[0]}(${number})`;
        //     result = eval(formattedExpression);
        // }
        if (expression.includes('^')) {
            const formattedExpression = `Math.pow(${expression.split('^')[0]}, ${expression.split('^')[1]})`;
            result = eval(formattedExpression);
        } else {
            result = eval(expression);
        } 

    //   const result = eval(expression);
      setDisplayValue(result.toString());
      setExpression(result.toString());
    } catch (error) {
      setDisplayValue('Error');
      setExpression('');
    }
  };

  const clearDisplay = () => {
    setDisplayValue('0');
    setExpression('');
  };

  const updateDisplay = (value) => {
    if (displayValue === '0') {
      setDisplayValue(value);
    } else {
      setDisplayValue(prevDisplayValue => prevDisplayValue + value);
    }
    setExpression(prevExpression => prevExpression + value);
  };

  return (
    <div className="calculator">
      <Display value={displayValue} />
      {/* Button to toggle visibility of advanced panel */}
      <button onClick={toggleAdvancedPanel}>
        {showAdvancedPanel ? 'Hide Advanced' : 'Show Advanced'}
      </button>
      <ButtonsContainer handleButtonClick={handleButtonClick} />
      {showAdvancedPanel && <AdvancedFunctionButtons handleButtonClick={handleButtonClick} />}
    </div>
  );
};

export default Calculator;