// FilterCheckbox.js
import React from 'react';

const FilterCheckbox = ({ label, options, selectedOptions, onChange }) => {
  const handleCheckboxChange = (option) => {
    const currentIndex = selectedOptions.indexOf(option);
    const newSelectedOptions = [...selectedOptions];

    if (currentIndex === -1) {
      newSelectedOptions.push(option);
    } else {
      newSelectedOptions.splice(currentIndex, 1);
    }

    onChange(newSelectedOptions);
  };

  return (
    <div className="filter-checkbox">
      <h3 className="filter-checkbox-title">{label}</h3>
      <div className="filter-checkbox-options">
        {options.map(option => (
          <div key={option} className="filter-checkbox-option">
            <label>
              <input
                type="checkbox"
                checked={selectedOptions.includes(option)}
                onChange={() => handleCheckboxChange(option)}
              />
              {option}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FilterCheckbox;
