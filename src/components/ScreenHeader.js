import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { COLORS } from '../constants/colors';

/**
 * Reusable centered screen header with optional left/right icon buttons.
 * RTL-aware: back arrow appears on the right side.
 */
export default function ScreenHeader({
  title,
  onBack,
  rightIcon,
  rightAction,
  leftIcon,
  leftAction,
  dark = false,
}) {
  const insets = useSafeAreaInsets();
  const bg    = dark ? COLORS.deepNavy : COLORS.background;
  const color = dark ? COLORS.white    : COLORS.textDark;

  return (
    <View style={[styles.container, { paddingTop: insets.top + 8, backgroundColor: bg }]}>
      {/* Right side (RTL = back or custom) */}
      <TouchableOpacity
        style={styles.iconBtn}
        onPress={onBack || rightAction}
        disabled={!onBack && !rightAction}
      >
        {onBack ? (
          <Ionicons name="chevron-forward" size={24} color={color} />
        ) : rightIcon ? (
          <Ionicons name={rightIcon} size={24} color={color} />
        ) : (
          <View style={{ width: 24 }} />
        )}
      </TouchableOpacity>

      {/* Centered Title */}
      <Text style={[styles.title, { color }]} numberOfLines={1}>
        {title}
      </Text>

      {/* Left side */}
      <TouchableOpacity
        style={styles.iconBtn}
        onPress={leftAction}
        disabled={!leftAction}
      >
        {leftIcon ? (
          <Ionicons name={leftIcon} size={24} color={color} />
        ) : (
          <View style={{ width: 24 }} />
        )}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingBottom: 12,
  },
  iconBtn: {
    width: 36,
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    textAlign: 'center',
    flex: 1,
  },
});
