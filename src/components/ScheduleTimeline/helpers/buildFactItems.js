export default function buildFactItems(factData, employees, filters) {
  const startTs = filters.start ? new Date(filters.start).getTime() : -Infinity;
  const endTs = filters.end ? new Date(filters.end).getTime() : Infinity;

  const intersects = (a, b) => b >= startTs && a <= endTs;

  return factData
    .map((f, idx) => {
      if (!f.dateTimeFactStart || !f.dateTimeFactEnd) return null;
      const s = new Date(f.dateTimeFactStart).getTime();
      const e = new Date(f.dateTimeFactEnd).getTime();
      if (!intersects(s, e)) return null;

      const group = employees.find(g => g.content === f.employee)?.id;
      if (group === undefined) return null;

      return {
        id: `fact-${idx}`,
        group,
        start: f.dateTimeFactStart,
        end: f.dateTimeFactEnd,
        className: 'fact',
        content: '',
        raw: f
      };
    })
    .filter(Boolean);
}
