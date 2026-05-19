import React from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../constants/colors';
import { LECTURES } from '../constants/data';
import ScreenHeader from '../components/ScreenHeader';

export default function LecturesListScreen({ route, navigation }) {
  const { course } = route.params;
  const lectures   = LECTURES(course.id);

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.row}
      activeOpacity={0.85}
      onPress={() => navigation.navigate('LectureContent', { lecture: item, course })}
    >
      {/* Lock / Play */}
      <Ionicons
        name={item.isUnlocked ? 'play-circle' : 'lock-closed-outline'}
        size={24}
        color={item.isUnlocked ? COLORS.coral : COLORS.textMuted}
      />

      {/* Info */}
      <View style={styles.info}>
        <Text style={styles.rowTitle}>{item.title}</Text>
        <Text style={styles.rowDuration}>{item.duration}</Text>
      </View>

      {/* Number */}
      <View style={[styles.badge, item.isUnlocked && styles.badgeActive]}>
        <Text style={[styles.badgeText, item.isUnlocked && styles.badgeTextActive]}>
          {item.number}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.screen}>
      <ScreenHeader
        title="قائمة المحاضرات"
        onBack={() => navigation.goBack()}
      />

      {/* Course tag */}
      <View style={styles.coursePill}>
        <Text style={styles.coursePillText}>{course.emoji}  {course.title}</Text>
      </View>

      <FlatList
        data={lectures}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: COLORS.background },
  coursePill: {
    alignSelf: 'flex-end',
    marginRight: 20,
    marginBottom: 10,
    backgroundColor: COLORS.deepNavy,
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 6,
  },
  coursePillText: { color: COLORS.white, fontSize: 13, fontWeight: '600' },
  list: { paddingHorizontal: 20, paddingBottom: 32 },
  row: {
    backgroundColor: COLORS.white,
    borderRadius: 14,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  info: { flex: 1, alignItems: 'flex-end', marginHorizontal: 12 },
  rowTitle: { fontSize: 15, fontWeight: '600', color: COLORS.textDark },
  rowDuration: { fontSize: 12, color: COLORS.textMuted, marginTop: 3 },
  badge: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: COLORS.background,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeActive: { backgroundColor: COLORS.coral + '20' },
  badgeText: { fontSize: 13, fontWeight: '700', color: COLORS.textMuted },
  badgeTextActive: { color: COLORS.coral },
});
