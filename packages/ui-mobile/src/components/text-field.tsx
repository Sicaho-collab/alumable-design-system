import * as React from 'react'
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  type TextInputProps,
  type ViewStyle,
} from 'react-native'
import { m3Colors, m3Radius, m3Spacing } from '@sicaho-collab/design-tokens'

export interface TextFieldProps extends Omit<TextInputProps, 'style'> {
  /** Label text displayed above the field */
  label?: string
  /** Helper text displayed below the field */
  supportingText?: string
  /** Whether the field is in an error state */
  error?: boolean
  /** Error message displayed when error is true */
  errorText?: string
  /** Icon element rendered at the start (left) of the input */
  leadingIcon?: React.ReactNode
  /** Icon element rendered at the end (right) of the input */
  trailingIcon?: React.ReactNode
  /** When true, renders a multiline text input */
  multiline?: boolean
  /** Number of visible lines when multiline */
  numberOfLines?: number
  /** Visual variant */
  variant?: 'filled' | 'outlined'
  /** Whether the field is disabled */
  disabled?: boolean
  /** Custom container style */
  style?: ViewStyle
}

export function TextField({
  label,
  supportingText,
  error = false,
  errorText,
  leadingIcon,
  trailingIcon,
  multiline = false,
  numberOfLines = 4,
  variant = 'filled',
  disabled = false,
  style,
  value,
  defaultValue,
  onFocus,
  onBlur,
  placeholder,
  ...props
}: TextFieldProps) {
  const [isFocused, setIsFocused] = React.useState(false)

  const handleFocus = (e: any) => {
    setIsFocused(true)
    onFocus?.(e)
  }

  const handleBlur = (e: any) => {
    setIsFocused(false)
    onBlur?.(e)
  }

  const borderColor = error
    ? m3Colors.error
    : isFocused
      ? m3Colors.primary
      : disabled
        ? `${m3Colors.onSurface}1F`
        : m3Colors.outline

  const helperText = error ? errorText : supportingText

  return (
    <View style={[styles.root, style]}>
      {label && (
        <Text style={[styles.label, { color: error ? m3Colors.error : m3Colors.onSurfaceVariant }]}>
          {label}
        </Text>
      )}
      <View
        style={[
          styles.container,
          variant === 'filled' && styles.containerFilled,
          variant === 'outlined' && styles.containerOutlined,
          variant === 'outlined' && { borderColor, borderWidth: isFocused ? 2 : 1 },
          variant === 'filled' && { borderBottomColor: borderColor, borderBottomWidth: isFocused ? 2 : 1 },
          disabled && styles.containerDisabled,
        ]}
      >
        {leadingIcon && (
          <View style={[styles.leadingIcon, multiline && { paddingTop: m3Spacing[3] }]}>
            {leadingIcon}
          </View>
        )}
        <TextInput
          value={value}
          defaultValue={defaultValue}
          editable={!disabled}
          multiline={multiline}
          numberOfLines={multiline ? numberOfLines : 1}
          placeholder={placeholder}
          placeholderTextColor={`${m3Colors.onSurfaceVariant}99`}
          onFocus={handleFocus}
          onBlur={handleBlur}
          style={[
            styles.input,
            multiline && styles.inputMultiline,
            disabled && styles.inputDisabled,
            leadingIcon ? { paddingLeft: 0 } : undefined,
            trailingIcon ? { paddingRight: 0 } : undefined,
          ]}
          accessibilityLabel={label}
          accessibilityState={{ disabled }}
          {...props}
        />
        {!multiline && trailingIcon && (
          <View style={styles.trailingIcon}>{trailingIcon}</View>
        )}
      </View>
      {helperText ? (
        <Text style={[styles.helperText, error && styles.helperTextError]}>
          {helperText}
        </Text>
      ) : null}
    </View>
  )
}

const styles = StyleSheet.create({
  root: {
    width: '100%',
  },
  label: {
    fontSize: 14,
    color: m3Colors.onSurfaceVariant,
    marginBottom: 6,
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    minHeight: 56,
  },
  containerFilled: {
    backgroundColor: m3Colors.surfaceContainerHighest,
    borderTopLeftRadius: m3Radius.xs,
    borderTopRightRadius: m3Radius.xs,
    borderBottomWidth: 1,
    borderBottomColor: m3Colors.onSurfaceVariant,
  },
  containerOutlined: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: m3Colors.outline,
    borderRadius: m3Radius.xs,
  },
  containerDisabled: {
    opacity: 0.38,
  },
  leadingIcon: {
    paddingLeft: m3Spacing[3],
    justifyContent: 'center',
  },
  trailingIcon: {
    paddingRight: m3Spacing[3],
    justifyContent: 'center',
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: m3Colors.onSurface,
    paddingHorizontal: m3Spacing[4],
    minHeight: 56,
  },
  inputMultiline: {
    minHeight: 100,
    textAlignVertical: 'top',
    paddingTop: m3Spacing[3],
    paddingBottom: m3Spacing[3],
  },
  inputDisabled: {
    color: `${m3Colors.onSurface}61`,
  },
  helperText: {
    fontSize: 12,
    color: m3Colors.onSurfaceVariant,
    paddingHorizontal: m3Spacing[4],
    marginTop: m3Spacing[1],
  },
  helperTextError: {
    color: m3Colors.error,
  },
})
