'use client';

import { useRef, useEffect, FC } from 'react';
import { Timeline as VisTimeline, DataSet } from 'vis-timeline/standalone';
import 'vis-timeline/styles/vis-timeline-graph2d.css';
import useTimelineData from './useTimelineData';
import type { ScheduleData, Filters, TimelineItem, TimelineGroup } from '@/models/types'
import './ScheduleTimeline.css';

interface ScheduleTimelineProps {
  data: ScheduleData | null
  filters: Filters
}

const ScheduleTimeline = ({ data, filters }: ScheduleTimelineProps) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const { items, groups } = useTimelineData(data, filters);

  useEffect(() => {
    if (!containerRef.current) return
    if (!items.length || !groups.length) return;

    const groupSet = new DataSet<TimelineGroup>(groups);
    const itemSet = new DataSet<TimelineItem>(items);
 
    const options = {
    stack: false,
    editable: false,
    margin: { item: 4, axis: 2 },
    orientation: { axis: 'top', item: 'top' },
    groupOrder: (a: TimelineGroup, b: TimelineGroup) => {
    const aid = typeof a.id === 'number' ? a.id : parseInt(String(a.id), 10) || 0
    const bid = typeof b.id === 'number' ? b.id : parseInt(String(b.id), 10) || 0
    return aid - bid
    },
    showCurrentTime: false
    }

    const timeline = new VisTimeline(containerRef.current, itemSet as unknown as any, groupSet, options);
    return () => timeline.destroy();
  }, [items, groups]);

  return <div ref={containerRef} className="timeline-container" />;
}

export default ScheduleTimeline