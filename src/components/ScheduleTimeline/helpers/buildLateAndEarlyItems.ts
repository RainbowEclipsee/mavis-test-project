import type { TimelineItem, TimelineGroup, EmployeePlan } from '@/models/types'

interface LateEarlyOvertime {
  latenesses: TimelineItem[]
  earlyLeaves: TimelineItem[]
  overTimeJob: TimelineItem[]
}

const buildLateAndEarlyItems = (
  planData: EmployeePlan[],
  facts: TimelineItem[],
  employees: TimelineGroup[] 
): LateEarlyOvertime => {

  const latenesses: TimelineItem[] = []
  const earlyLeaves: TimelineItem[] = []
  const overTimeJob: TimelineItem[] = []

  facts.forEach((fItem) => {
    const employeeName = employees.find((e) => e.id === fItem.group)?.content
    const factStart = new Date(fItem.start)
    const factEnd = fItem.end ? new Date(fItem.end) : factStart

    const plan = planData.find(
      (p) =>
        p.employee === employeeName &&
        new Date(p.dateTimePlanStart).toDateString() === factStart.toDateString()
    )

    if (!plan) return

    const planStart = new Date(plan.dateTimePlanStart)
    const planEnd = new Date(plan.dateTimePlanEnd)

    // Опоздание
    if (factStart > planStart) {
      latenesses.push({
        id: `late-${fItem.id}`,
        group: fItem.group,
        start: plan.dateTimePlanStart,
        end: fItem.start,
        className: 'late',
        content: '',
      })
    }

    // Ранний уход
    if (factEnd < planEnd) {
      earlyLeaves.push({
        id: `early-${fItem.id}`,
        group: fItem.group,
        start: fItem.end!,
        end: plan.dateTimePlanEnd,
        className: 'early',
        content: '',
      })
    }

    // Переработка до начала смены
    if (factStart < planStart) {
      overTimeJob.push({
        id: `overtime-start-${fItem.id}`,
        group: fItem.group,
        start: fItem.start,
        end: plan.dateTimePlanStart,
        className: 'overtime',
        content: '',
      })
    }

    // Переработка после окончания смены
    if (factEnd > planEnd) {
      overTimeJob.push({
        id: `overtime-end-${fItem.id}`,
        group: fItem.group,
        start: plan.dateTimePlanEnd,
        end: fItem.end,
        className: 'overtime',
        content: '',
      })
    }

    // Прогулы теперь учитываются по другому
    // console.log(factStart)
    // console.log(factEnd)
    // console.log(planStart)
    // console.log(planEnd)
  })


  return { latenesses, earlyLeaves, overTimeJob }
}

export default buildLateAndEarlyItems