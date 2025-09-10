import type { TimelineGroup, EmployeePlan } from '@/models/types'

const groupEmployees = (planData: EmployeePlan[]): TimelineGroup[] => {
  return Array.from(new Set(planData.map((p) => p.employee))).map(
    (name, idx) => ({ id: idx, content: name })
  )
}

export default groupEmployees
