'use client'

import { FC, useEffect, useState } from 'react'
import FilterPanel from '@/components/FilterPanel/FilterPanel'
import ScheduleTimeline from '@/components/ScheduleTimeline/ScheduleTimeline'
import LegendInfo from '@/components/LegendInfo/LegendInfo'
import type { ScheduleData, Filters } from '@/models/types'

const SchedulesPage: FC = () => {
  const [data, setData] = useState<ScheduleData | null>(null)
  const [filters, setFilters] = useState<Filters>({ start: null, end: null })

  useEffect(() => {
    fetch('/data/schedule.json')
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        return res.json()
      })
      .then(setData)
      .catch((err) => console.error('Не удалось загрузить данные:', err))
  }, [])

  const employeeOptions = data
    ? Array.from(new Set(data.plan.map((p) => p.employee)))
    : []

  const shopOptions = data 
    ? Array.from(new Set(data.plan.map((p) => p.shop))) 
    : []

  return (
    <div className="container">
      <FilterPanel
        shops={shopOptions}
        employees={employeeOptions}
        onFilterChange={setFilters}
      />
      {data ? (
        <div>
          <ScheduleTimeline data={data} filters={filters} />
          <LegendInfo />
        </div>
      ) : (
        <p>Загрузка данных...</p>
      )}
    </div>
  )
}

export default SchedulesPage