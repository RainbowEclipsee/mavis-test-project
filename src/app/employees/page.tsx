'use client';

import React, { FC, useEffect, useState } from 'react';
import type { ScheduleData, EmployeePlan } from '@/models/types';
import './Employees.css';

interface EmployeeListItem {
  name: string;
  shop: string;
  role?: string | null;
}

const EmployeesPage: FC = () => {
  const [employees, setEmployees] = useState<EmployeeListItem[]>([]);

  useEffect(() => {
    let mounted = true;

    fetch('/data/schedule.json')
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json() as Promise<ScheduleData>;
      })
      .then((data) => {
        if (!mounted) return;

        const seen = new Set<string>();
        const list: EmployeeListItem[] = [];

        (data?.plan ?? []).forEach((p: EmployeePlan) => {
          const key = `${p.employee}||${p.shop}||${p.role ?? ''}`;
          if (!seen.has(key)) {
            seen.add(key);
            list.push({
              name: p.employee,
              shop: p.shop,
              role: p.role ?? null,
            });
          }
        });

        setEmployees(list);
      })
      .catch((err) => {
        console.error('Не удалось загрузить /data/schedule.json:', err);
      });

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <div className="employees-page">
      <h2>Список сотрудников</h2>
      <div className="employees-list">
        {employees.length === 0 ? (
          <p>Нет данных сотрудников.</p>
        ) : (
          employees.map((e) => {
            const key = `${e.name}-${e.shop}`;
            return (
              <div className="employee-card" key={key}>
                <div className="employee-name">{e.name}</div>
                <div className="employee-meta">
                  <span className="employee-shop">{e.shop}</span>
                  <span className="employee-role">{e.role ?? ''}</span>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default EmployeesPage;
