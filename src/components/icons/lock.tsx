import * as React from 'react'
const SvgLock = props => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    fill="none"
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth={2}
    viewBox="0 0 24 24"
    {...props}>
    <rect width={18} height={11} x={3} y={11} rx={2} ry={2} />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </svg>
)
export default SvgLock

