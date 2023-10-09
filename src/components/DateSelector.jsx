import React from 'react';

const DateSelector = ({ selectedDay, selectedMonth, selectedYear, onDayChange, onMonthChange, onYearChange }) => {
  const generateOptions = (count, startValue) => {
    return Array.from({ length: count }, (_, i) => startValue + i);
  };

  return (
    <div className="date-selector-container">
      <select className="date-select" value={selectedDay} onChange={onDayChange}>
        <option value="">Día</option>
        {generateOptions(31, 1).map((day) => (
          <option key={day} value={String(day).padStart(2, '0')}>
            {String(day).padStart(2, '0')}
          </option>
        ))}
      </select>
      <select className="date-select" value={selectedMonth} onChange={onMonthChange}>
        <option value="">Mes</option>
        {generateOptions(12, 1).map((month) => (
          <option key={month} value={String(month).padStart(2, '0')}>
            {String(month).padStart(2, '0')}
          </option>
        ))}
      </select>
      <select className="date-select" value={selectedYear} onChange={onYearChange}>
        <option value="">Año</option>
        {generateOptions(10, new Date().getFullYear()).map((year) => (
          <option key={year} value={String(year)}>
            {String(year)}
          </option>
        ))}
      </select>
    </div>
  );
};

export default DateSelector;