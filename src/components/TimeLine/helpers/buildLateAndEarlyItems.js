export default function buildLateAndEarlyItems(planData, facts, employees ) {
  const latenesses = []
  const earlyLeaves = []
  const overTimeJob = []

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

    // Прогулы теперь учитываются по другому
    console.log(factStart)
    console.log(factEnd)
    console.log(planStart)
    console.log(planEnd)
  })


  return { latenesses, earlyLeaves, overTimeJob }
}
