'use client'

import './FilterPanel.css'

export default function FilterPanel({
  shops = [],
  employees = [],
  onFilterChange,
}) {
  const handleChange = (e) => {
    const { name, value } = e.target
    onFilterChange((prev) => ({ ...prev, [name]: value }))
  }

  return (
    <div className="filter-panel">
      <div className="filter-header">
        <h3>Фильтр расписания</h3>
      </div>
      <div className="filter-controls">
        <div className="filter-group">
          <label htmlFor="start">Дата с</label>
          <input id="start" name="start" type="date" onChange={handleChange} />
        </div>
        <div className="filter-group">
          <label htmlFor="end">Дата по</label>
          <input id="end" name="end" type="date" onChange={handleChange} />
        </div>
        <div className="filter-group">
          <label htmlFor="shop">Магазин</label>
          <select id="shop" name="shop" onChange={handleChange}>
            <option value="">Все</option>
            {shops.map((s, i) => (
              <option key={i} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>
        <div className="filter-group">
          <label htmlFor="employee">Сотрудник</label>
          <select id="employee" name="employee" onChange={handleChange}>
            <option value="">Все</option>
            {employees.map((e, i) => (
              <option key={i} value={e}>
                {e}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  )
}
