import groupEmployees from './helpers/groupEmployees';
import buildPlanItems from './helpers/buildPlanItems';
import buildFactItems from './helpers/buildFactItems';
import buildLateAndEarlyItems from './helpers/buildLateAndEarlyItems';

export default function useTimelineData(data, filters) {
  if (!data) return { items: [], groups: [] };


  let planFiltered = data.plan;
  let factFiltered = data.fact;

  if (filters.shop) {
    planFiltered = planFiltered.filter(p => p.shop === filters.shop);
    factFiltered = factFiltered.filter(f => f.shop === filters.shop);
  }
  if (filters.employee) {
    planFiltered = planFiltered.filter(p => p.employee === filters.employee);
    factFiltered = factFiltered.filter(f => f.employee === filters.employee);
  }

  const employees = groupEmployees(planFiltered);
  
  const plans = buildPlanItems( planFiltered, employees, filters);
  const facts = buildFactItems(factFiltered, employees, filters);
  const { latenesses, earlyLeaves, overTimeJob } =
    buildLateAndEarlyItems(planFiltered, facts, employees, filters.start, filters.end);

  return {
    groups: employees,
    items:  [...plans, ...facts, ...latenesses, ...earlyLeaves, ...overTimeJob]
  };
}
