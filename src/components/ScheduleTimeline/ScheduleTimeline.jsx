'use client';

import { useRef, useEffect } from 'react';
import { Timeline as VisTimeline, DataSet } from 'vis-timeline/standalone';
import 'vis-timeline/styles/vis-timeline-graph2d.css';
import useTimelineData from './useTimelineData';
  
import './ScheduleTimeline.css';

export default function ScheduleTimeline({ data, filters }) {
  const containerRef = useRef(null);
  const { items, groups } = useTimelineData(data, filters);

  useEffect(() => {
    if (!items.length || !groups.length) return;

    const groupSet = new DataSet(groups);
    const itemSet = new DataSet(items);
 
    const options = {
      stack: false,
      editable: false,
      margin: { item: 4, axis: 2 },
      orientation: { axis: 'top', item: 'top' },
      groupOrder: (a, b) => a.id - b.id,
      showCurrentTime: false
    };

    const timeline = new VisTimeline(containerRef.current, itemSet, groupSet, options);
    return () => timeline.destroy();
  }, [items, groups]);

  return <div ref={containerRef} className="timeline-container" />;
}