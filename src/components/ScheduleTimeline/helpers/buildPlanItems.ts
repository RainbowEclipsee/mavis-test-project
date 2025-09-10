import type {TimelineItem, TimelineGroup, EmployeePlan, Filters } from '@/models/types'

const buildPlanItems = (
  planData: EmployeePlan[],
  employees: TimelineGroup[],
  filters: Filters
): TimelineItem[] => {
  const startTs = filters.start ? new Date(filters.start).getTime() : -Infinity
  const endTs = filters.end ? new Date(filters.end).getTime() : Infinity

  const intersects = (a: number, b: number) => b >= startTs && a <= endTs

  return planData
    .map((p, idx) => {
      const s = new Date(p.dateTimePlanStart).getTime()
      const e = new Date(p.dateTimePlanEnd).getTime()
      if (!intersects(s, e)) return null

      const group = employees.find((g) => g.content === p.employee)?.id
      return {
        id: `plan-${idx}`,
        group,
        start: p.dateTimePlanStart,
        end: p.dateTimePlanEnd,
        className: 'plan',
        content: '',
      } as TimelineItem
    })
    .filter((x): x is TimelineItem => x !== null)
}

export default buildPlanItems
