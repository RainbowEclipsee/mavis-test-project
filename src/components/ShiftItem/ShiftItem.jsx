'use client';

import './ShiftItem.css';

export default function ShiftItem({ plan, fact }) {
  const isLate = fact.start > plan.start;
  const leftEarly = fact.end < plan.end;

  const toPercent = minutes => (minutes / 1440) * 100;
  const planLeft  = toPercent(plan.start);
  const planWidth = toPercent(plan.end - plan.start);
  const factLeft  = toPercent(fact.start);
  const factWidth = toPercent(fact.end - fact.start);

  return (
    <div className="shift-item">
      <div
        className="shift-block plan"
        style={{ left: `${planLeft}%`, width: `${planWidth}%` }}
      />
      <div
        className="shift-block fact"
        style={{ left: `${factLeft}%`, width: `${factWidth}%` }}
      />
      {isLate && <span className="badge late">Опоздание</span>}
      {leftEarly && <span className="badge early">Ранний уход</span>}
    </div>
  );
}