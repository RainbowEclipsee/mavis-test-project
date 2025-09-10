'use client'

import { FC } from 'react'
import './LegendInfo.css'

interface LegendItem {
  key: string
  label: string
}

const LegendInfo: FC = () => {
  const items: LegendItem[] = [
    { key: 'fact', label: 'Фактическое время' },
    { key: 'overtime', label: 'Переработка' },
    { key: 'late', label: 'Опоздание' },
    { key: 'early', label: 'Ранний уход' },
    { key: 'absent', label: 'Прогул' },
  ]

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
  )
}

export default LegendInfo
