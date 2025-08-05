import React from 'react';
import './LegendInfo.css';

const legendItems = [
  { className: 'fact', label: 'Фактическое время' },
  { className: 'overtime', label: 'Переработка' },
  { className: 'late', label: 'Опоздание' },
  { className: 'early', label: 'Ранний уход' },
  { className: 'absent', label: 'Прогул' },
];

export default function LegendInfo() {
  return (
    <div className="legend">
      {legendItems.map(item => (
        <div className="legend-item" key={item.className}>
          <span className={`legend-color ${item.className}`}></span>
          <span className="legend-label">{item.label}</span>
        </div>
      ))}
    </div>
  );
}
