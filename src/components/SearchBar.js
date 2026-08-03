import React, { useState, useCallback } from 'react';
const SearchBar = ({ onSearch, placeholder='Search products...' }) => {
  const [query, setQuery] = useState('');
  const handleChange = useCallback((e) => { setQuery(e.target.value); onSearch(e.target.value); }, [onSearch]);
  return (
    <div style={{position:'relative'}}>
      <span style={{position:'absolute',left:14,top:'50%',transform:'translateY(-50%)',fontSize:14,color:'var(--text4)'}}>🔍</span>
      <input type="text" value={query} onChange={handleChange} placeholder={placeholder} className="input-field" style={{paddingLeft:40,paddingRight:query?40:16}} />
      {query && <button onClick={()=>{setQuery('');onSearch('');}} style={{position:'absolute',right:12,top:'50%',transform:'translateY(-50%)',background:'none',border:'none',color:'var(--text4)',cursor:'pointer',fontSize:16}}>✕</button>}
    </div>
  );
};
export default SearchBar;
