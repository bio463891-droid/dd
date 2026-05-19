import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../constants/colors';
import BottomNavBar from '../components/BottomNavBar';
import ScreenHeader from '../components/ScreenHeader';

const MENU_ITEMS = [
  { icon: 'person-outline',           label: 'معلوماتي الشخصية' },
  { icon: 'lock-closed-outline',      label: 'تغيير كلمة المرور' },
  { icon: 'notifications-outline',    label: 'الإشعارات' },
  { icon: 'help-circle-outline',      label: 'الدعم الفني' },
  { icon: 'document-text-outline',    label: 'الشروط والأحكام' },
  { icon: 'shield-checkmark-outline', label: 'سياسة الخصوصية' },
];

export default function ProfileScreen({ navigation }) {
  return (
    <View style={styles.screen}>
      <ScreenHeader title="حسابي الشخصي" />

      <ScrollView
        contentContainerStyle={[styles.scrollContent, { paddingBottom: 110 }]}
        showsVerticalScrollIndicator={false}
      >
        {/* ── User Info Card ── */}
        <View style={styles.userCard}>
          {/* Avatar */}
          <View style={styles.avatarRing}>
            <View style={styles.avatar}>
              <Text style={{ fontSize: 36 }}>👤</Text>
            </View>
          </View>

          {/* Details */}
          <View style={styles.userDetails}>
            <Text style={styles.userName}>علي حسان</Text>
            <Text style={styles.userEmail}>ali.hassan@example.com</Text>
            <View style={styles.statRow}>
              <View style={styles.statPill}>
                <Text style={styles.statNum}>3</Text>
                <Text style={styles.statLabel}>كورسات</Text>
              </View>
              <View style={styles.statPill}>
                <Text style={styles.statNum}>18</Text>
                <Text style={styles.statLabel}>محاضرة</Text>
              </View>
            </View>
          </View>
        </View>

        {/* ── Edit Profile Button ── */}
        <TouchableOpacity style={styles.editBtn} activeOpacity={0.85}>
          <Ionicons name="create-outline" size={18} color={COLORS.white} />
          <Text style={styles.editBtnText}>تعديل الملف الشخصي</Text>
        </TouchableOpacity>

        {/* ── Menu Items ── */}
        <View style={styles.menuCard}>
          {MENU_ITEMS.map((item, index) => (
            <React.Fragment key={item.label}>
              <TouchableOpacity style={styles.menuRow} activeOpacity={0.7}>
                <Ionicons name="chevron-back" size={18} color={COLORS.textMuted} />
                <Text style={styles.menuLabel}>{item.label}</Text>
                <View style={styles.menuIconBox}>
                  <Ionicons name={item.icon} size={20} color={COLORS.deepNavy} />
                </View>
              </TouchableOpacity>
              {index < MENU_ITEMS.length - 1 && <View style={styles.divider} />}
            </React.Fragment>
          ))}
        </View>

        {/* ── Logout Button ── */}
        <TouchableOpacity style={styles.logoutBtn} activeOpacity={0.85}>
          <Ionicons name="log-out-outline" size={20} color="#FF6B6B" />
          <Text style={styles.logoutText}>تسجيل الخروج</Text>
        </TouchableOpacity>
      </ScrollView>

      <BottomNavBar navigation={navigation} activeTab="Profile" />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 8,
  },

  // User card
  userCard: {
    backgroundColor: COLORS.deepNavy,
    borderRadius: 20,
    padding: 24,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    marginBottom: 16,
    shadowColor: COLORS.deepNavy,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.25,
    shadowRadius: 12,
    elevation: 8,
  },
  avatarRing: {
    width: 76,
    height: 76,
    borderRadius: 38,
    borderWidth: 3,
    borderColor: COLORS.coral,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatar: {
    width: 66,
    height: 66,
    borderRadius: 33,
    backgroundColor: 'rgba(255,255,255,0.15)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  userDetails: {
    flex: 1,
    alignItems: 'flex-end',
  },
  userName: {
    fontSize: 20,
    fontWeight: '800',
    color: COLORS.white,
    textAlign: 'right',
  },
  userEmail: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.6)',
    textAlign: 'right',
    marginTop: 2,
  },
  statRow: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 10,
  },
  statPill: {
    backgroundColor: 'rgba(255,255,255,0.12)',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 6,
    alignItems: 'center',
  },
  statNum: {
    color: COLORS.coral,
    fontSize: 16,
    fontWeight: '800',
  },
  statLabel: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: 11,
    marginTop: 1,
  },

  // Edit
  editBtn: {
    backgroundColor: COLORS.coral,
    borderRadius: 14,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 14,
    gap: 8,
    marginBottom: 20,
    shadowColor: COLORS.coral,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  editBtnText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: '700',
  },

  // Menu
  menuCard: {
    backgroundColor: COLORS.white,
    borderRadius: 18,
    paddingHorizontal: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },
  menuRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
  },
  menuIconBox: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: COLORS.background,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 12,
  },
  menuLabel: {
    flex: 1,
    fontSize: 15,
    fontWeight: '500',
    color: COLORS.textDark,
    textAlign: 'right',
    marginRight: 4,
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.background,
    marginLeft: 48,
  },

  // Logout
  logoutBtn: {
    backgroundColor: COLORS.white,
    borderRadius: 14,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 16,
    gap: 8,
    borderWidth: 1,
    borderColor: '#FFE0E0',
    marginBottom: 8,
  },
  logoutText: {
    color: '#FF6B6B',
    fontSize: 16,
    fontWeight: '600',
  },
});
