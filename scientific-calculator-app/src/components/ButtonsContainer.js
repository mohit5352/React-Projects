// ButtonsContainer.js
import React from 'react';
import Button from './Button';

const ButtonsContainer = ({ handleButtonClick }) => {
  return (
    <div className="buttons">
      <Button label="7" onClick={() => handleButtonClick('7')} />
      <Button label="8" onClick={() => handleButtonClick('8')} />
      <Button label="9" onClick={() => handleButtonClick('9')} />
      <Button label="+" onClick={() => handleButtonClick('+')} />
      <Button label="4" onClick={() => handleButtonClick('4')} />
      <Button label="5" onClick={() => handleButtonClick('5')} />
      <Button label="6" onClick={() => handleButtonClick('6')} />
      <Button label="-" onClick={() => handleButtonClick('-')} />
      <Button label="1" onClick={() => handleButtonClick('1')} />
      <Button label="2" onClick={() => handleButtonClick('2')} />
      <Button label="3" onClick={() => handleButtonClick('3')} />
      <Button label="*" onClick={() => handleButtonClick('*')} />
      <Button label="0" onClick={() => handleButtonClick('0')} />
      <Button label="." onClick={() => handleButtonClick('.')} />
      <Button label="/" onClick={() => handleButtonClick('/')} />
      <Button label="C" onClick={() => handleButtonClick('C')} />
      <Button label="=" onClick={() => handleButtonClick('=')} />
      {/* <Button label="sin" onClick={() => handleButtonClick('sin')} />
      <Button label="cos" onClick={() => handleButtonClick('cos')} />
      <Button label="tan" onClick={() => handleButtonClick('tan')} />
      <Button label="sqrt" onClick={() => handleButtonClick('sqrt')} /> */}
      <Button label="^" onClick={() => handleButtonClick('^')} />
      <Button label="(" onClick={() => handleButtonClick('(')} />
      <Button label=")" onClick={() => handleButtonClick(')')} />
      <Button label="[" onClick={() => handleButtonClick('[')} />
      <Button label="]" onClick={() => handleButtonClick(']')} />
      {/* <Button label="ln" onClick={() => handleButtonClick('ln')} />
      <Button label="log" onClick={() => handleButtonClick('log')} />
      <Button label="exp" onClick={() => handleButtonClick('exp')} />
      <Button label="!" onClick={() => handleButtonClick('!')} /> */}
      <Button label="," onClick={() => handleButtonClick(',')} />
      <Button label=";" onClick={() => handleButtonClick(';')} />
      {/* <Button label="mean" onClick={() => handleButtonClick('mean')} />
      <Button label="median" onClick={() => handleButtonClick('median')} />
      <Button label="stddev" onClick={() => handleButtonClick('stddev')} />
      <Button label="var" onClick={() => handleButtonClick('var')} />
      <Button label="mode" onClick={() => handleButtonClick('mode')} />
      <Button label="range" onClick={() => handleButtonClick('range')} />
      <Button label="corr" onClick={() => handleButtonClick('corr')} />
      <Button label="reg" onClick={() => handleButtonClick('reg')} />
      <Button label="percentile" onClick={() => handleButtonClick('percentile')} /> */}
    </div>
  );
};

export default ButtonsContainer;
