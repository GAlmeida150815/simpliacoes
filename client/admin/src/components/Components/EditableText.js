import React, { useEffect, useState } from 'react';

const EditableText = ({ text, onSave, as = 'h5', className, defaultVal }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [inputValue, setInputValue] = useState(text || defaultVal);

    useEffect(() => {
      setInputValue(text || defaultVal);
    }, [text]);

    const handleClick = () => {
      setIsEditing(true);
    };
    
    const handleResize = (e) => {
      const target = e.target;
      target.style.setProperty('height', 'auto'); 
      target.style.setProperty('height', `${target.scrollHeight}px`); 
    }

    const handleChange = (e) => {
      const target = e.target;
      handleResize(e);
      setInputValue(target.value);
    };

    const handleBlurOrEnter = (e) => {
      handleResize(e);
      if (e.type === 'blur' || e.key === 'Enter') {
        setIsEditing(false);
        onSave(inputValue.trim() === '' ? defaultVal : inputValue);
      }
    };

    const Tag = as; 

    return (
      <Tag className={className} onClick={handleClick}>
          {isEditing ? (
              <textarea
                  rows={1}
                  value={inputValue} 
                  onChange={handleChange}
                  onBlur={handleBlurOrEnter}
                  onFocus={handleResize}
                  onKeyPress={(e) => {
                      if (e.key === 'Enter') handleBlurOrEnter(e);
                  }}
                  autoFocus
                  className='selectable-input'
              />
          ) : (
              inputValue 
          )}
      </Tag>
  );
};

export default EditableText;
