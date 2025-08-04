'use client';

import { useEffect, useState } from 'react';
import FilterPanel from '../components/FilterPanel/FilterPanel';
import Timeline    from '../components/Timeline/Timeline';

export default function Home() {
  const [data, setData] = useState(null);
  const [filters, setFilters] = useState({ start: null, end: null });

  useEffect(() => {
    fetch('/data/schedule.json')
      .then(res => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then(setData)
      .catch(err => console.error('Не удалось загрузить данные:', err));
  }, []);

  return (
    <div className="container">
      <FilterPanel onFilterChange={setFilters} />
      {data
        ? <Timeline data={data} filters={filters} />
        : <p>Загрузка данных...</p>
      }
    </div>
  );
}
