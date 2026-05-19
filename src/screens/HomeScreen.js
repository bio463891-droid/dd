import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Image,
  FlatList,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { COLORS } from '../constants/colors';
import { TEACHERS, COURSES } from '../constants/data';
import BottomNavBar from '../components/BottomNavBar';
// ─── Teacher Card ─────────────────────────────────────────────────────────────
function TeacherCard({ teacher }) {
  return (
    <View style={styles.teacherCard}>
      <View style={styles.teacherAvatar}>
        <Text style={{ fontSize: 28 }}>{teacher.avatar}</Text>
      </View>
      <Text style={styles.teacherName} numberOfLines={1}>{teacher.name}</Text>
      <Text style={styles.teacherSubject}>{teacher.subject}</Text>
    </View>
  );
}

// ─── Course Card ──────────────────────────────────────────────────────────────
function CourseCard({ course, onPress }) {
  return (
    <TouchableOpacity
      style={[styles.courseCard, { borderLeftColor: course.color }]}
      onPress={onPress}
      activeOpacity={0.88}
    >
      <View style={[styles.courseEmoji, { backgroundColor: course.color + '22' }]}>
        <Text style={{ fontSize: 32 }}>{course.emoji}</Text>
      </View>
      <View style={styles.courseInfo}>
        <Text style={styles.courseTitle}>{course.title}</Text>
        <Text style={styles.courseTeacher}>{course.teacher}</Text>
        <View style={styles.courseMetaRow}>
          <Ionicons name="play-circle-outline" size={14} color={COLORS.textMuted} />
          <Text style={styles.courseMeta}> {course.lectures} محاضرة</Text>
        </View>
      </View>
      <Ionicons name="chevron-back" size={20} color={COLORS.textMuted} />
    </TouchableOpacity>
  );
}

// ─── Home Screen ──────────────────────────────────────────────────────────────
export default function HomeScreen({ navigation }) {
  const insets = useSafeAreaInsets();
  const [notifVisible, setNotifVisible] = useState(false);

  return (
    <View style={styles.screen}>
      {/* ── Top Bar ── */}
      <View style={[styles.topBar, { paddingTop: insets.top + 8 }]}>

  {/* أيقونة الإشعارات — يسار */}
  <TouchableOpacity onPress={() => navigation.navigate('Notifications')}>
    <Ionicons name="notifications-outline" size={26} color={COLORS.textDark} />
  </TouchableOpacity>

  {/* اللوجو المحلي — وسط */}
<Image
  source={require('../../assets/topicon.png')}
  style={styles.logo}
  resizeMode="contain"
/>
  {/* أيقونة القائمة — يمين */}
  <TouchableOpacity>
    <Ionicons name="menu" size={28} color={COLORS.textDark} />
  </TouchableOpacity>

</View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={[styles.scrollContent, { paddingBottom: 110 }]}
        showsVerticalScrollIndicator={false}
      >
        {/* ── Greeting Banner ── */}
        <View style={styles.banner}>
          <Text style={styles.bannerSub}>مرحباً بعودتك 👋</Text>
          <Text style={styles.bannerTitle}>علي حسان</Text>
          <Text style={styles.bannerHint}>ماذا ستتعلم اليوم؟</Text>
        </View>

        {/* ── Teachers Section ── */}
        <Text style={styles.sectionTitle}>الأساتذة</Text>
        <FlatList
          data={TEACHERS}
          keyExtractor={(item) => item.id}
          horizontal
          inverted                          // RTL scroll direction
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.teacherList}
          renderItem={({ item }) => <TeacherCard teacher={item} />}
        />

        {/* ── Courses Section ── */}
        <Text style={styles.sectionTitle}>الكورسات</Text>
        {COURSES.map((course) => (
          <CourseCard
            key={course.id}
            course={course}
            onPress={() => navigation.navigate('CourseDetails', { course })}
          />
        ))}
      </ScrollView>

      {/* ── Bottom Navigation ── */}
      <BottomNavBar navigation={navigation} activeTab="Home" />
    </View>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 12,
    backgroundColor: COLORS.background,
  },
  logo: {
    width: 120,
    height: 36,
  },
  scroll: { flex: 1 },
  scrollContent: { paddingHorizontal: 20, paddingTop: 8 },

  // Banner
  banner: {
    backgroundColor: COLORS.deepNavy,
    borderRadius: 18,
    padding: 24,
    marginBottom: 28,
  },
  bannerSub: {
    color: COLORS.coral,
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'right',
  },
  bannerTitle: {
    color: COLORS.white,
    fontSize: 26,
    fontWeight: '800',
    textAlign: 'right',
    marginTop: 4,
  },
  bannerHint: {
    color: COLORS.textMuted,
    fontSize: 14,
    textAlign: 'right',
    marginTop: 6,
  },

  // Sections
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.textDark,
    textAlign: 'right',
    marginBottom: 14,
  },
  teacherList: {
    gap: 12,
    paddingBottom: 24,
    paddingRight: 4,
  },
  teacherCard: {
    backgroundColor: COLORS.white,
    borderRadius: 16,
    padding: 14,
    alignItems: 'center',
    width: 100,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.07,
    shadowRadius: 6,
    elevation: 3,
    marginLeft: 4,
  },
  teacherAvatar: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: COLORS.background,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  teacherName: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.textDark,
    textAlign: 'center',
  },
  teacherSubject: {
    fontSize: 11,
    color: COLORS.textMuted,
    textAlign: 'center',
    marginTop: 2,
  },

  // Course Cards
  courseCard: {
    backgroundColor: COLORS.white,
    borderRadius: 16,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    borderLeftWidth: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
  },
  courseEmoji: {
    width: 56,
    height: 56,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 14,
  },
  courseInfo: {
    flex: 1,
    alignItems: 'flex-end',
  },
  courseTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.textDark,
    textAlign: 'right',
  },
  courseTeacher: {
    fontSize: 13,
    color: COLORS.textMuted,
    textAlign: 'right',
    marginTop: 2,
  },
  courseMetaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  courseMeta: {
    fontSize: 12,
    color: COLORS.textMuted,
  },
});
