export interface EmployeePlan {
employee: string
shop: string
role?: string
dateTimePlanStart: string
dateTimePlanEnd: string
}


export interface EmployeeFact {
employee: string
shop: string
role?: string
dateTimeFactStart?: string
dateTimeFactEnd?: string
}


export interface Filters {
start: string | null
end: string | null
shop?: string
employee?: string
}


export interface TimelineItem {
id: string | number
group: string | number
start: string
end?: string
content?: string
className?: string
raw?: any
}


export interface TimelineGroup {
id: string | number
content: string
}


export interface ScheduleData {
plan: EmployeePlan[]
fact: EmployeeFact[]
}


export interface LateEarlyOvertime {
latenesses: TimelineItem[]
earlyLeaves: TimelineItem[]
overTimeJob: TimelineItem[]
}