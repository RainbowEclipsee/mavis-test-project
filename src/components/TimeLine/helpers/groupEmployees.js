export default function groupEmployees(planData) {
  return Array.from(
    new Set(planData.map(p => p.employee))
  ).map((name, idx) => ({ id: idx, content: name }));
}