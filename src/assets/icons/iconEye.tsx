import { SVGProps, Ref, forwardRef, memo } from 'react'
const SvgComponent = (props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} fill="none" ref={ref} {...props}>
    <g fill="#fff" clipPath="url(#a)">
      <path d="M18.23 9.58c-.54-.92-3.47-5.56-8.45-5.41-4.61.11-7.28 4.16-8 5.41a.83.83 0 0 0 0 .84c.52.9 3.33 5.41 8.24 5.41h.2c4.61-.11 7.29-4.16 8-5.41a.83.83 0 0 0 0-.84Zm-8.05 4.59c-3.59.08-5.93-3-6.66-4.17.83-1.34 3-4.08 6.34-4.17 3.57-.09 5.92 3 6.66 4.17-.85 1.34-3 4.08-6.34 4.17Z" />
      <path d="M10 7.08a2.92 2.92 0 1 0 0 5.84 2.92 2.92 0 0 0 0-5.84Zm0 4.17a1.25 1.25 0 1 1 0-2.5 1.25 1.25 0 0 1 0 2.5Z" />
    </g>
    <defs>
      <clipPath id="a">
        <path fill="#fff" d="M0 0h20v20H0z" />
      </clipPath>
    </defs>
  </svg>
)
const ForwardRef = forwardRef(SvgComponent)

export const IconEye = memo(ForwardRef)
