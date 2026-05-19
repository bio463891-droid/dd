import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { COLORS } from '../constants/colors';
import BottomNavBar from '../components/BottomNavBar';
import ScreenHeader from '../components/ScreenHeader';

/**
 * Screen 4 — Empty "My Courses" state.
 * In a real app you would check a user's enrolled courses list;
 * here we render the empty-state placeholder from the design spec.
 */
export default function MyCoursesScreen({ navigation }) {
  return (
    <View style={styles.screen}>
      <ScreenHeader title="كورساتي" />

      {/* Empty State — centered */}
      <View style={styles.emptyContainer}>
        {/* Placeholder graphic: large gray square with "G1" label */}
        <View style={styles.placeholder}>
          <Text style={styles.placeholderLabel}>G1</Text>
          <Ionicons
            name="school-outline"
            size={48}
            color="#A0A0A0"
            style={styles.placeholderIcon}
          />
        </View>

        <Text style={styles.emptyMessage}>لا يوجد لديك كورسات</Text>

        <TouchableOpacity
          style={styles.browseBtn}
          onPress={() => navigation.navigate('Home')}
          activeOpacity={0.85}
        >
          <Text style={styles.browseBtnText}>تصفح الكورسات</Text>
        </TouchableOpacity>
      </View>

      <BottomNavBar navigation={navigation} activeTab="MyCourses" />
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
  },
  placeholder: {
    width: 160,
    height: 160,
    backgroundColor: COLORS.placeholder,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 28,
  },
  placeholderLabel: {
    fontSize: 40,
    fontWeight: '900',
    color: '#555',
    position: 'absolute',
    top: 10,
    right: 16,
  },
  placeholderIcon: {
    marginTop: 20,
  },
  emptyMessage: {
    fontSize: 17,
    fontWeight: '600',
    color: COLORS.textDark,
    textAlign: 'center',
    marginBottom: 24,
  },
  browseBtn: {
    backgroundColor: COLORS.coral,
    borderRadius: 14,
    paddingHorizontal: 32,
    paddingVertical: 14,
  },
  browseBtnText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: '700',
  },
});
