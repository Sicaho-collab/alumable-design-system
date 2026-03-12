import * as React from 'react'
import * as SliderPrimitive from '@radix-ui/react-slider'
import { cn } from '../lib/utils'

const Slider = React.forwardRef<
  React.ComponentRef<typeof SliderPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>
>(({ className, ...props }, ref) => (
  <SliderPrimitive.Root
    ref={ref}
    className={cn(
      'relative flex w-full touch-none select-none items-center',
      className
    )}
    {...props}
  >
    <SliderPrimitive.Track className="relative h-1 w-full grow overflow-hidden rounded-full bg-m3-surface-container-highest">
      <SliderPrimitive.Range className="absolute h-full bg-m3-primary" />
    </SliderPrimitive.Track>
    <SliderPrimitive.Thumb className="block size-5 rounded-full bg-m3-primary shadow-m3-1 transition-all hover:shadow-m3-2 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-m3-primary disabled:pointer-events-none disabled:opacity-38 cursor-pointer" />
  </SliderPrimitive.Root>
))
Slider.displayName = 'Slider'

export { Slider }
