export default function buildPlanItems(planData, employees, filters) {
  const startTs = filters.start ? new Date(filters.start).getTime() : -Infinity;
  const endTs = filters.end ? new Date(filters.end).getTime() : Infinity;

  const intersects = (a, b) => b >= startTs && a <= endTs;

  return planData
    .map((p, idx) => {
      const s = new Date(p.dateTimePlanStart).getTime();
      const e = new Date(p.dateTimePlanEnd).getTime();
      if (!intersects(s, e)) return null;

      const group = employees.find(g => g.content === p.employee).id;
      return {
        id: `plan-${idx}`,
        group,
        start: p.dateTimePlanStart,
        end: p.dateTimePlanEnd,
        className: 'plan',
        content: ''
      };
    })
    .filter(Boolean);
}
