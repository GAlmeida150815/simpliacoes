import React, { useEffect, useState } from 'react';

import { Input } from 'reactstrap';

const RangeSelector = ({ fetch }) => {
  const [range, setRange] = useState('last7days');

  const handleChange = (event) => {
    const selectedRange = event.target.value;
    setRange(selectedRange);
    fetch(selectedRange); 
  };

  useEffect(() => {
    fetch(range); 
  },[]);

  return (
    <div className='w-100'>
      <Input type={"select"} id="intervaloDatas" value={range} onChange={handleChange}>
        <option value="today">Hoje</option>
        <option value="yesterday">Ontem</option>
        <option value="last7days">Últimos 7 Dias</option>
        <option value="last14days">Últimos 14 Dias</option>
        <option value="last28days">Últimos 28 Dias</option>
        <option value="last30days">Últimos 30 Dias</option>
        <option value="last60days">Últimos 60 Dias</option>
        <option value="last90days">Últimos 90 Dias</option>
        <option value="trimester">Últimos 3 Meses</option>
        <option value="12months">Últimos 12 Meses</option>
        <option value="year">Este Ano</option>
        <option value="lastyear">Ano Passado</option>
      </Input>
    </div>
  );
};

export default RangeSelector;
