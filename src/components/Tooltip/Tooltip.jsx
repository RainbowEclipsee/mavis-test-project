'use client';
import ReactTooltip from 'react-tooltip';
import './Tooltip.css';

export default function Tooltip({ id, children }) {
  return (
    <ReactTooltip id={id} place="top" effect="solid">
      {children}
    </ReactTooltip>
  );
}