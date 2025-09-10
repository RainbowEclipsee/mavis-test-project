import groupEmployees from './helpers/groupEmployees'
import buildPlanItems from './helpers/buildPlanItems'
import buildFactItems from './helpers/buildFactItems'
import buildLateAndEarlyItems from './helpers/buildLateAndEarlyItems'
import type {
  ScheduleData,
  Filters,
  TimelineItem,
  TimelineGroup,
} from '@/models/types'

const useTimelineData = (
  data: ScheduleData | null,
  filters: Filters
): { items: TimelineItem[]; groups: TimelineGroup[] } => {
  if (!data) return { items: [], groups: [] }

  let planFiltered = data.plan.slice()
  let factFiltered = data.fact ? data.fact.slice() : []

  if (filters.shop) {
    planFiltered = planFiltered.filter((p) => p.shop === filters.shop)
    factFiltered = factFiltered.filter((f) => f.shop === filters.shop)
  }
  if (filters.employee) {
    planFiltered = planFiltered.filter((p) => p.employee === filters.employee)
    factFiltered = factFiltered.filter((f) => f.employee === filters.employee)
  }

  const employees: TimelineGroup[] = groupEmployees(planFiltered)

  const plans: TimelineItem[] = buildPlanItems(planFiltered, employees, filters)
  const facts: TimelineItem[] = buildFactItems(factFiltered, employees, filters)
  const { latenesses, earlyLeaves, overTimeJob } = buildLateAndEarlyItems(
    planFiltered,
    facts,
    employees,
  )

  return {
    groups: employees,
    items: [...plans, ...facts, ...latenesses, ...earlyLeaves, ...overTimeJob],
  }
}

export default useTimelineData
