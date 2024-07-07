// AdvancedFunctionButtons.js
import React from 'react';
import Button from './Button';

const AdvancedFunctionButtons = ({ handleButtonClick }) => {
  return (
    <div className="buttons">
      <Button label="sin" onClick={() => handleButtonClick('sin')} />
      <Button label="cos" onClick={() => handleButtonClick('cos')} />
      <Button label="tan" onClick={() => handleButtonClick('tan')} />
      <Button label="sqrt" onClick={() => handleButtonClick('sqrt')} />
      <Button label="ln" onClick={() => handleButtonClick('ln')} />
      <Button label="log" onClick={() => handleButtonClick('log')} />
      <Button label="exp" onClick={() => handleButtonClick('exp')} />
      <Button label="!" onClick={() => handleButtonClick('!')} />
      <Button label="mean" onClick={() => handleButtonClick('mean')} />
      <Button label="median" onClick={() => handleButtonClick('median')} />
      <Button label="stddev" onClick={() => handleButtonClick('stddev')} />
      <Button label="var" onClick={() => handleButtonClick('var')} />
      <Button label="mode" onClick={() => handleButtonClick('mode')} />
      <Button label="range" onClick={() => handleButtonClick('range')} />
      <Button label="corr" onClick={() => handleButtonClick('corr')} />
      <Button label="reg" onClick={() => handleButtonClick('reg')} />
      <Button label="percentile" onClick={() => handleButtonClick('percentile')} />
    </div>
  );
};

export default AdvancedFunctionButtons;
