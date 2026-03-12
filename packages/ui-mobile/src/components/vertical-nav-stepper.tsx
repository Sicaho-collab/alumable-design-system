import * as React from 'react'
import { View, Text, Pressable, StyleSheet } from 'react-native'
import { m3Colors, m3Spacing, m3Radius } from '@sicaho-collab/design-tokens'

export interface VerticalNavStep {
  label: string
  description?: string
  count?: number
}

export interface VerticalNavStepperProps {
  steps: VerticalNavStep[]
  activeIndex: number
  onStepClick: (index: number) => void
  style?: object
}

export function VerticalNavStepper({
  steps,
  activeIndex,
  onStepClick,
  style,
}: VerticalNavStepperProps) {
  return (
    <View
      style={[styles.container, style]}
      accessibilityRole="menu"
      accessibilityLabel="Step navigation"
    >
      {steps.map((step, index) => {
        const isActive = index === activeIndex
        const isLast = index === steps.length - 1

        return (
          <View key={index} style={styles.row}>
            {/* Circle + connector column */}
            <View style={styles.circleColumn}>
              <Pressable
                onPress={() => onStepClick(index)}
                accessibilityRole="menuitem"
                accessibilityState={{ selected: isActive }}
                accessibilityLabel={`Step ${index + 1}: ${step.label}`}
                style={[
                  styles.circle,
                  isActive ? styles.circleActive : styles.circleInactive,
                ]}
              >
                <Text
                  style={[
                    styles.circleText,
                    isActive ? styles.circleTextActive : styles.circleTextInactive,
                  ]}
                >
                  {index + 1}
                </Text>
              </Pressable>

              {/* Connecting line */}
              {!isLast && <View style={styles.connector} />}
            </View>

            {/* Label + description column */}
            <Pressable
              onPress={() => onStepClick(index)}
              style={({ pressed }) => [
                styles.labelContainer,
                pressed && styles.labelContainerPressed,
                !isLast && styles.labelContainerSpacing,
              ]}
            >
              <View style={styles.labelRow}>
                <Text
                  style={[
                    styles.label,
                    isActive ? styles.labelActive : styles.labelInactive,
                  ]}
                  numberOfLines={1}
                >
                  {step.label}
                </Text>
                {step.count !== undefined && (
                  <View
                    style={[styles.badge, styles.badgeActive]}
                  >
                    <Text
                      style={[styles.badgeText, styles.badgeTextActive]}
                    >
                      {step.count}
                    </Text>
                  </View>
                )}
              </View>
              {step.description && (
                <Text style={styles.description} numberOfLines={2}>
                  {step.description}
                </Text>
              )}
            </Pressable>
          </View>
        )
      })}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
  },
  row: {
    flexDirection: 'row',
  },
  circleColumn: {
    alignItems: 'center',
  },
  circle: {
    width: 32,
    height: 32,
    borderRadius: m3Radius.full,
    alignItems: 'center',
    justifyContent: 'center',
  },
  circleActive: {
    backgroundColor: m3Colors.primary,
  },
  circleInactive: {
    backgroundColor: m3Colors.surfaceContainerHigh,
  },
  circleText: {
    fontSize: 14,
    fontWeight: '500',
  },
  circleTextActive: {
    color: m3Colors.onPrimary,
  },
  circleTextInactive: {
    color: m3Colors.onSurfaceVariant,
  },
  connector: {
    width: 2,
    flex: 1,
    minHeight: 16,
    backgroundColor: m3Colors.outlineVariant,
  },
  labelContainer: {
    flex: 1,
    marginLeft: m3Spacing[3], // 12
    paddingHorizontal: m3Spacing[2], // 8
    paddingVertical: m3Spacing[1], // 4
    borderRadius: m3Radius.sm,
    justifyContent: 'center',
    minHeight: 32,
  },
  labelContainerPressed: {
    backgroundColor: `${m3Colors.onSurface}14`, // ~8% opacity
  },
  labelContainerSpacing: {
    marginBottom: m3Spacing[2], // 8
  },
  labelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: m3Spacing[2], // 8
  },
  label: {
    fontSize: 14,
  },
  labelActive: {
    color: m3Colors.primary,
    fontWeight: '600',
  },
  labelInactive: {
    color: m3Colors.onSurface,
    fontWeight: '400',
  },
  badge: {
    paddingHorizontal: m3Spacing[2], // 8
    paddingVertical: 2,
    borderRadius: m3Radius.full,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeActive: {
    backgroundColor: '#FFE5C4',
  },
  badgeInactive: {
    backgroundColor: '#FFE5C4',
  },
  badgeText: {
    fontSize: 12,
    fontWeight: '500',
  },
  badgeTextActive: {
    color: '#4D2800',
  },
  badgeTextInactive: {
    color: '#4D2800',
  },
  description: {
    fontSize: 12,
    color: m3Colors.onSurfaceVariant,
    marginTop: 2,
  },
})
