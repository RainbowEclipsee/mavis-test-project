'use client';

import './FilterPanel.css';

export default function FilterPanel({ onFilterChange }) {
  const handleDateChange = e => {
    const { name, value } = e.target;
    onFilterChange(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="filter-panel">
      <input type="date" name="start" className="filter-input" onChange={handleDateChange} />
      <input type="date" name="end"   className="filter-input" onChange={handleDateChange} />
    </div>
  );
}