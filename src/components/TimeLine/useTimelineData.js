import groupEmployees from './helpers/groupEmployees';
import buildPlanItems from './helpers/buildPlanItems';
import buildFactItems from './helpers/buildFactItems';
import buildLateAndEarlyItems from './helpers/buildLateAndEarlyItems';

export default function useTimelineData(data, filters) {
  if (!data) return { items: [], groups: [] };

  const employees = groupEmployees(data.plan);
  const plans = buildPlanItems(data.plan, employees, filters);
  const facts = buildFactItems(data.fact, employees, filters);
  const { latenesses, earlyLeaves, overTimeJob, absenteeism } = buildLateAndEarlyItems(data.plan, facts, employees);

  return {
    groups: employees,
    items: [...plans, ...facts, ...latenesses, ...earlyLeaves, ...overTimeJob, ...absenteeism]
  };
}
