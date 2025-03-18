// Importing necessary React components
import React from 'react';

// Importing components from Reactstrap
import { Label } from 'reactstrap';

const CustomCheckbox = ({ topic, isChecked, onCheckboxChange }) => {
  const handleCheckboxChange = () => {
    onCheckboxChange(topic.ID, !isChecked);
  };

  return (
    <div className={`custom-checkbox ${isChecked ? 'checked' : ''}`} onClick={handleCheckboxChange}>
      <svg className="checkbox-svg" width="24px" height="24px" version="1.1" xmlns="http://www.w3.org/2000/svg">
        <image 
          width="100%" 
          height="100%" 
          href={`${process.env.REACT_APP_API_URL}/public/topics/${topic.ID}.svg`} 
          alt="Checkbox"
        />
      </svg>

      <Label htmlFor={`topic-${topic.ID}`} className="checkbox-label ml-2">
        {topic.Name}
      </Label>
    </div>
  );
};

export default CustomCheckbox;
