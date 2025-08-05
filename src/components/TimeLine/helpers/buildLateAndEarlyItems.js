export default function buildLateAndEarlyItems(planData, facts, employees) {
  const latenesses = []
  const earlyLeaves = []
  const overTimeJob = []
  const absenteeism = []

  facts.forEach((fItem) => {
    const employeeName = employees.find((e) => e.id === fItem.group)?.content
    const factStart = new Date(fItem.start)
    const factEnd = new Date(fItem.end)

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
        start: fItem.end,
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
  })

  // Прогулы
  planData.forEach((planItem) => {
    const hasFact = facts.some(
      (f) =>
        employees.find((e) => e.id === f.group)?.content ===
          planItem.employee &&
        f.start &&
        f.end &&
        new Date(f.start).toDateString() ===
          new Date(planItem.dateTimePlanStart).toDateString()
    )

    if (!hasFact) {
      const employee = employees.find((e) => e.content === planItem.employee)
      if (!employee) return

      absenteeism.push({
        id: `absent-${planItem.employee}-${planItem.dateTimePlanStart}`,
        group: employee.id,
        start: planItem.dateTimePlanStart,
        end: planItem.dateTimePlanEnd,
        className: 'absent',
        content: '',
      })
    }
  })

  return { latenesses, earlyLeaves, overTimeJob, absenteeism }
}
