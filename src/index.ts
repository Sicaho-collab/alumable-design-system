// Design Tokens (JS/TS)
export {
  m3Colors,
  m3Shadows,
  m3Radius,
  m3Spacing,
  m3Typography,
} from './tokens'
export type { M3Colors, M3Shadows, M3Radius, M3Spacing } from './tokens'

// Utility
export { cn } from './lib/utils'

// Components
export { Button, buttonVariants } from './components/button'
export type { ButtonProps } from './components/button'

export { Badge, badgeVariants } from './components/badge'
export type { BadgeProps } from './components/badge'

export {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  cardVariants,
} from './components/card'
export type { CardProps } from './components/card'

export { Checkbox } from './components/checkbox'

export { Chip, chipVariants } from './components/chip'
export type { ChipProps } from './components/chip'

export {
  Dialog,
  DialogPortal,
  DialogOverlay,
  DialogClose,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
} from './components/dialog'

export { FAB, fabVariants } from './components/fab'
export type { FABProps } from './components/fab'

export { Progress } from './components/progress'
export type { ProgressProps } from './components/progress'

export { RadioGroup, RadioGroupItem } from './components/radio-group'

export { Slider } from './components/slider'

export { Snackbar } from './components/snackbar'
export type { SnackbarProps } from './components/snackbar'

export { Switch } from './components/switch'

export { Tabs, TabsList, TabsTrigger, TabsContent } from './components/tabs'

export { TextField, textFieldVariants } from './components/text-field'
export type { TextFieldProps } from './components/text-field'

export {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
} from './components/tooltip'

// --- New components (synced from m3-design-docs) ---

export { BottomSheet } from './components/bottom-sheet'
export type { BottomSheetProps } from './components/bottom-sheet'

export { ButtonColorful } from './components/button-colorful'

export { ChatInput } from './components/chat-input'
export type { ChatInputProps } from './components/chat-input'

export { Collapsible, CollapsibleTrigger, CollapsibleContent } from './components/collapsible'

export { DataTable } from './components/data-table'
export type { Column, DataTableProps } from './components/data-table'

export { Divider } from './components/divider'
export type { DividerProps } from './components/divider'

export { List, ListItem, ListDivider } from './components/list'
export type { ListItemProps } from './components/list'

export {
  Menu,
  MenuTrigger,
  MenuContent,
  MenuItem,
  MenuSeparator,
  MenuLabel,
  MenuCheckboxItem,
  MenuSub,
  MenuSubTrigger,
  MenuSubContent,
} from './components/menu'

export { NavigationBar } from './components/navigation-bar'
export type { NavigationBarProps, NavBarItem } from './components/navigation-bar'

export { NavigationRail } from './components/navigation-rail'
export type { NavigationRailProps, NavRailItem } from './components/navigation-rail'

export { Pagination } from './components/pagination'
export type { PaginationProps } from './components/pagination'

export { SearchBar } from './components/search-bar'
export type { SearchBarProps } from './components/search-bar'

export { Stepper, Step, useStepper } from './components/stepper'
export type { StepProps, StepperProps, StepItem } from './components/stepper'

export { default as M3Stepper, M3Stepper as M3StepperNamed } from './components/m3-stepper'
export type { M3StepperProps, M3StepperStep } from './components/m3-stepper'

export { Tag, tagVariants } from './components/tag'
export type { TagProps } from './components/tag'

export { TopAppBar } from './components/top-app-bar'
export type { TopAppBarProps } from './components/top-app-bar'

// Hooks
export { useClickOutside } from './lib/use-click-outside'

// --- Custom / Alumable components (converted to M3 tokens) ---

export { Button as ButtonAlt } from './components/button-1'
export type { ButtonProps as ButtonAltProps } from './components/button-1'

export { Calendar } from './components/calendar'
export type { RangeValue } from './components/calendar'

export { Error } from './components/error'

export { Input } from './components/input'

export { Material } from './components/material-1'

export { Select } from './components/select-1'
export type { Option as SelectOption } from './components/select-1'

export { Spinner } from './components/spinner-1'
