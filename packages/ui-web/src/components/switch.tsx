import * as React from 'react'
import * as SwitchPrimitives from '@radix-ui/react-switch'
import { cn } from '../lib/utils'

const Switch = React.forwardRef<
  React.ComponentRef<typeof SwitchPrimitives.Root>,
  React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root>
>(({ className, ...props }, ref) => (
  <SwitchPrimitives.Root
    className={cn(
      'peer inline-flex h-8 w-[52px] shrink-0 cursor-pointer items-center rounded-m3-full border-2 border-m3-outline transition-colors duration-200',
      'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-m3-primary',
      'disabled:cursor-not-allowed disabled:opacity-38',
      'data-[state=checked]:bg-m3-primary data-[state=checked]:border-m3-primary',
      'data-[state=unchecked]:bg-m3-surface-container-highest',
      className
    )}
    {...props}
    ref={ref}
  >
    <SwitchPrimitives.Thumb
      className={cn(
        'pointer-events-none block rounded-full transition-all duration-200',
        'data-[state=checked]:translate-x-[22px] data-[state=checked]:bg-m3-on-primary data-[state=checked]:size-6',
        'data-[state=unchecked]:translate-x-[2px] data-[state=unchecked]:bg-m3-outline data-[state=unchecked]:size-4'
      )}
    />
  </SwitchPrimitives.Root>
))
Switch.displayName = 'Switch'

export { Switch }
