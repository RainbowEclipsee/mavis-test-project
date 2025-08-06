'use client'

import { useEffect, useState } from 'react'
import './Employees.css'

export default function EmployeesPage() {
  const [employees, setEmployees] = useState([])

  useEffect(() => {
    fetch('/data/schedule.json')
      .then((res) => res.json())
      .then((data) => {
        const seen = new Set()
        const list = []
        data.plan.forEach((p) => {
          const key = `${p.employee}||${p.shop}||${p.role}`
          if (!seen.has(key)) {
            seen.add(key)
            list.push({
              name: p.employee,
              shop: p.shop,
              role: p.role,
            })
          }
        })
        setEmployees(list)
      })
      .catch(console.error)
  }, [])

  return (
    <div className="employees-page">
      <h2>Список сотрудников</h2>
      <div className="employees-list">
        {employees.map((e, idx) => (
          <div className="employee-card" key={idx}>
            <div className="employee-name">{e.name}</div>
            <div className="employee-meta">
              <span className="employee-shop">{e.shop}</span>
              <span className="employee-role">{e.role}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
