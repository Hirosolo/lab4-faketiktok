import React, { useState, useRef, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTv, faSearch, faTimes } from '@fortawesome/free-solid-svg-icons';

const TopNavbar = ({ onSearch }) => {
  const [showInput, setShowInput] = useState(false);
  const [value, setValue] = useState('');
  const inputRef = useRef(null);

  useEffect(() => {
    if (showInput && inputRef.current) inputRef.current.focus();
  }, [showInput]);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      if (onSearch) onSearch(value.trim());
      setShowInput(false);
    } else if (e.key === 'Escape') {
      setShowInput(false);
      setValue('');
      if (onSearch) onSearch('');
    }
  };

  return (
    <div className="top-navbar">
      <FontAwesomeIcon icon={faTv} className='icon' />
      <h2>Following | <span>For You</span> </h2>

      {showInput ? (
        <div className="search-input-wrap">
          <input
            ref={inputRef}
            className="top-search-input"
            placeholder="#hashtag (press Enter)"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <FontAwesomeIcon icon={faTimes} className='icon close' onClick={() => { setShowInput(false); setValue(''); if (onSearch) onSearch(''); }} />
        </div>
      ) : (
        <FontAwesomeIcon icon={faSearch} className='icon' onClick={() => setShowInput(true)} />
      )}
    </div>
  );
};

export default TopNavbar;
