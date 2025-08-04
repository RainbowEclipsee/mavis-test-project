'use client';

import { useRef, useEffect } from 'react';
import { Timeline as VisTimeline, DataSet } from 'vis-timeline/standalone';
import 'vis-timeline/styles/vis-timeline-graph2d.css';

import './Timeline.css';

export default function Timeline({ data, filters }) {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!data) return;

    // 1) Парсим фильтры в таймстемпы
    const startTs = filters.start
      ? new Date(filters.start).getTime()
      : -Infinity;
    const endTs = filters.end
      ? new Date(filters.end).getTime()
      : Infinity;

    // 2) Функция пересечения интервалов
    const intersects = (aStart, aEnd) => aEnd >= startTs && aStart <= endTs;

    // 3) Подготовим группы (уникальные сотрудники)
    const employees = Array.from(
      new Set(data.plan.map(p => p.employee))
    ).map((name, idx) => ({ id: idx, content: name }));

    // 4) Маппинг плановых смен
    const plans = data.plan
      .map((p, idx) => {
        const s = new Date(p.dateTimePlanStart).getTime();
        const e = new Date(p.dateTimePlanEnd).getTime();
        if (!intersects(s, e)) return null;
        const groupId = employees.find(g => g.content === p.employee).id;
        return {
          id: `plan-${idx}`,
          group: groupId,
          start: p.dateTimePlanStart,
          end: e === s ? undefined : p.dateTimePlanEnd,
          className: 'plan',
          content: ''
        };
      })
      .filter(Boolean);

    // 5) Маппинг фактических смен
    const facts = data.fact
      .map((f, idx) => {
        if (!f.dateTimeFactStart || !f.dateTimeFactEnd) {
          // прогул: ничего штриховать
          return null;
        }
        const s = new Date(f.dateTimeFactStart).getTime();
        const e = new Date(f.dateTimeFactEnd).getTime();
        if (!intersects(s, e)) return null;
        const groupId = employees.find(g => g.content === f.employee).id;
        return {
          id: `fact-${idx}`,
          group: groupId,
          start: f.dateTimeFactStart,
          end: f.dateTimeFactEnd,
          className: 'fact',
          content: ''
        };
      })
      .filter(Boolean);

    // 6) Собираем DataSets
    const groupSet = new DataSet(employees);
    const itemSet  = new DataSet([...plans, ...facts]);

    // 7) Опции Timeline
    const options = {
      stack: false,
      editable: false,
      margin: { item: 4, axis: 2 },
      orientation: { axis: 'top', item: 'top' },
      groupOrder: (a, b) => a.id - b.id,
      showCurrentTime: false,
    };

    // 8) Рендер
    const timeline = new VisTimeline(
      containerRef.current,
      itemSet,
      groupSet,
      options
    );
    return () => timeline.destroy();
  }, [data, filters]);

  return <div ref={containerRef} className="timeline-container" />;
}
