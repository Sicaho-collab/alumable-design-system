import * as React from 'react'
import { View, Text, Pressable, StyleSheet } from 'react-native'
import { m3Colors, m3Spacing, m3Radius } from '@alumable/design-tokens'

export interface NavBarItem {
  label: string
  icon: React.ReactNode
  activeIcon?: React.ReactNode
  badge?: number | boolean
}

export interface NavigationBarProps {
  items: NavBarItem[]
  activeIndex: number
  onSelect: (index: number) => void
  style?: object
}

export function NavigationBar({ items, activeIndex, onSelect, style }: NavigationBarProps) {
  return (
    <View
      style={[styles.container, style]}
      accessibilityRole="tablist"
      accessibilityLabel="Bottom navigation"
    >
      {items.map((item, i) => {
        const active = i === activeIndex
        return (
          <Pressable
            key={i}
            onPress={() => onSelect(i)}
            accessibilityRole="tab"
            accessibilityState={{ selected: active }}
            accessibilityLabel={item.label}
            style={styles.item}
          >
            {({ pressed }) => (
              <>
                {/* Active indicator pill */}
                <View style={styles.iconContainer}>
                  <View
                    style={[
                      styles.indicator,
                      active && styles.indicatorActive,
                      pressed && !active && styles.indicatorPressed,
                    ]}
                  />
                  <View style={styles.iconWrapper}>
                    {active && item.activeIcon ? item.activeIcon : item.icon}
                  </View>
                  {/* Badge */}
                  {item.badge !== undefined && (
                    <View
                      style={[
                        styles.badge,
                        typeof item.badge === 'boolean'
                          ? styles.badgeDot
                          : styles.badgeCount,
                      ]}
                    >
                      {typeof item.badge === 'number' && (
                        <Text style={styles.badgeText}>
                          {item.badge > 99 ? '99+' : item.badge}
                        </Text>
                      )}
                    </View>
                  )}
                </View>
                {/* Label */}
                <Text
                  style={[
                    styles.label,
                    active ? styles.labelActive : styles.labelInactive,
                  ]}
                  numberOfLines={1}
                >
                  {item.label}
                </Text>
              </>
            )}
          </Pressable>
        )
      })}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-around',
    backgroundColor: m3Colors.surfaceContainer,
    height: 80,
    paddingHorizontal: m3Spacing[2], // 8
    borderTopWidth: 1,
    borderTopColor: m3Colors.outlineVariant,
  },
  item: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: m3Spacing[1], // 4
    paddingVertical: m3Spacing[3], // 12
    minWidth: 64,
    minHeight: 44, // minimum touch target
  },
  iconContainer: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
    width: 64,
    height: 32,
  },
  indicator: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: m3Radius.full,
  },
  indicatorActive: {
    backgroundColor: m3Colors.secondaryContainer,
  },
  indicatorPressed: {
    backgroundColor: `${m3Colors.onSurface}14`, // ~8% opacity
  },
  iconWrapper: {
    zIndex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badge: {
    position: 'absolute',
    zIndex: 2,
    backgroundColor: m3Colors.error,
  },
  badgeDot: {
    top: 2,
    right: 16,
    width: 8,
    height: 8,
    borderRadius: m3Radius.full,
  },
  badgeCount: {
    top: -2,
    right: 10,
    minWidth: 16,
    height: 16,
    borderRadius: m3Radius.full,
    paddingHorizontal: m3Spacing[1], // 4
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeText: {
    color: m3Colors.onError,
    fontSize: 10,
    fontWeight: '500',
    lineHeight: 14,
  },
  label: {
    fontSize: 12,
  },
  labelActive: {
    fontWeight: '500',
    color: m3Colors.onSurface,
  },
  labelInactive: {
    fontWeight: '400',
    color: m3Colors.onSurfaceVariant,
  },
})
