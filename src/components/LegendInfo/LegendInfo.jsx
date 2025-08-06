'use client';

import './LegendInfo.css';

export default function LegendInfo() {
  const items = [
    { key: 'fact',   label: 'Фактическое время' },
    { key: 'overtime', label: 'Переработка' },
    { key: 'late',   label: 'Опоздание' },
    { key: 'early',  label: 'Ранний уход' },,
    { key: 'absent', label: 'Прогул' },
  ];

  return (
    <div className="legend-panel">
      <h4>Легенда</h4>
      <ul>
        {items.map((i) => (
          <li key={i.key}>
            <span className={`legend-color ${i.key}`} />
            {i.label}
          </li>
        ))}
      </ul>
    </div>
  );
}
