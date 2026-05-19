import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../constants/colors';
import ScreenHeader from '../components/ScreenHeader';
import BottomNavBar from '../components/BottomNavBar';

/**
 * Screen 9 — Notifications (empty state per design spec)
 */
export default function NotificationsScreen({ navigation }) {
  return (
    <View style={styles.screen}>
      <ScreenHeader
        title="الاشعارات"
        onBack={() => navigation.goBack()}
      />

      {/* Empty state — centered on canvas */}
      <View style={styles.emptyContainer}>
        <View style={styles.iconCircle}>
          <Ionicons name="notifications-off-outline" size={48} color={COLORS.textMuted} />
        </View>
        <Text style={styles.emptyTitle}>لا توجد اشعارات</Text>
        <Text style={styles.emptySubtitle}>
          سيظهر هنا أي إشعار جديد يخص كورساتك أو رسائل الأساتذة
        </Text>
      </View>

      <BottomNavBar navigation={navigation} activeTab="" />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
    paddingBottom: 80,
    gap: 16,
  },
  iconCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: COLORS.white,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.07,
    shadowRadius: 8,
    elevation: 3,
    marginBottom: 8,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.textDark,
    textAlign: 'center',
  },
  emptySubtitle: {
    fontSize: 14,
    color: COLORS.textMuted,
    textAlign: 'center',
    lineHeight: 22,
  },
});
