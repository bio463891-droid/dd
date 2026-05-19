import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../constants/colors';
import ScreenHeader from '../components/ScreenHeader';

// ─── Fake quiz questions ───────────────────────────────────────────────────────
const QUIZ = [
  {
    id: 'q1',
    question: 'ما هو الناتج من تفاضل الدالة f(x) = x²؟',
    options: ['2x', 'x²', 'x/2', '2'],
    correct: 0,
  },
  {
    id: 'q2',
    question: 'أي من التالي يمثل قانون نيوتن الثاني؟',
    options: ['F = ma', 'E = mc²', 'v = d/t', 'P = mv'],
    correct: 0,
  },
];

// ─── Tab: Video Player ─────────────────────────────────────────────────────────
function VideoTab({ lecture }) {
  return (
    <ScrollView contentContainerStyle={styles.tabContent}>
      {/* Video placeholder */}
      <View style={styles.videoBox}>
        <Ionicons name="play-circle" size={64} color={COLORS.white} />
        <Text style={styles.videoLabel}>{lecture.title}</Text>
        <Text style={styles.videoDuration}>{lecture.duration}</Text>
      </View>

      {/* Progress bar */}
      <View style={styles.progressContainer}>
        <View style={styles.progressBar}>
          <View style={styles.progressFill} />
        </View>
        <View style={styles.progressLabels}>
          <Text style={styles.progressTime}>12:30</Text>
          <Text style={styles.progressTime}>{lecture.duration}</Text>
        </View>
      </View>

      {/* Controls */}
      <View style={styles.controls}>
        <TouchableOpacity style={styles.controlBtn}>
          <Ionicons name="play-skip-forward" size={22} color={COLORS.textDark} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.playBtn}>
          <Ionicons name="pause" size={28} color={COLORS.white} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.controlBtn}>
          <Ionicons name="play-skip-back" size={22} color={COLORS.textDark} />
        </TouchableOpacity>
      </View>

      {/* Notes section */}
      <View style={styles.notesCard}>
        <Text style={styles.notesTitle}>ملاحظات المحاضرة</Text>
        <Text style={styles.notesText}>
          في هذه المحاضرة سنتناول المفاهيم الأساسية والتطبيقات العملية. 
          يُنصح بمشاهدة الفيديو بتركيز والرجوع إلى الملخص بعد الانتهاء.
        </Text>
      </View>
    </ScrollView>
  );
}

// ─── Tab: Summary ──────────────────────────────────────────────────────────────
function SummaryTab({ lecture }) {
  return (
    <ScrollView contentContainerStyle={styles.tabContent}>
      {/* PDF-style summary card */}
      <View style={styles.summaryCard}>
        <View style={styles.summaryHeader}>
          <Ionicons name="document-text" size={28} color={COLORS.coral} />
          <Text style={styles.summaryTitle}>ملخص {lecture.title}</Text>
        </View>

        {[
          { heading: 'المفاهيم الأساسية', body: 'شرح مفصل للمحتوى الرئيسي للمحاضرة مع التركيز على النقاط الجوهرية والمصطلحات العلمية الضرورية لفهم الموضوع.' },
          { heading: 'الأمثلة التطبيقية', body: 'تطبيقات عملية توضيحية تساعد في ترسيخ المعلومات النظرية وربطها بالواقع والحياة العملية.' },
          { heading: 'خلاصة الدرس', body: 'النقاط الرئيسية التي يجب حفظها واستيعابها قبل الانتقال إلى المحاضرة التالية.' },
        ].map((sec) => (
          <View key={sec.heading} style={styles.summarySection}>
            <Text style={styles.summaryHeading}>{sec.heading}</Text>
            <Text style={styles.summaryBody}>{sec.body}</Text>
          </View>
        ))}
      </View>

      {/* Download button */}
      <TouchableOpacity style={styles.downloadBtn} activeOpacity={0.85}>
        <Ionicons name="download-outline" size={20} color={COLORS.white} />
        <Text style={styles.downloadText}>تحميل الملخص PDF</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

// ─── Tab: Quiz ─────────────────────────────────────────────────────────────────
function QuizTab() {
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const handleSelect = (qId, idx) => {
    if (submitted) return;
    setAnswers((prev) => ({ ...prev, [qId]: idx }));
  };

  const score = submitted
    ? QUIZ.filter((q) => answers[q.id] === q.correct).length
    : null;

  return (
    <ScrollView contentContainerStyle={styles.tabContent}>
      {QUIZ.map((q, qi) => (
        <View key={q.id} style={styles.questionCard}>
          <Text style={styles.questionText}>
            {qi + 1}. {q.question}
          </Text>
          {q.options.map((opt, oi) => {
            const selected = answers[q.id] === oi;
            const isCorrect = submitted && oi === q.correct;
            const isWrong   = submitted && selected && oi !== q.correct;
            return (
              <TouchableOpacity
                key={oi}
                style={[
                  styles.option,
                  selected  && styles.optionSelected,
                  isCorrect && styles.optionCorrect,
                  isWrong   && styles.optionWrong,
                ]}
                onPress={() => handleSelect(q.id, oi)}
                activeOpacity={0.8}
              >
                <Text
                  style={[
                    styles.optionText,
                    (selected || isCorrect) && styles.optionTextActive,
                  ]}
                >
                  {opt}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      ))}

      {/* Score banner */}
      {submitted && (
        <View style={[styles.scoreBanner, score === QUIZ.length ? styles.scorePerfect : styles.scorePartial]}>
          <Text style={styles.scoreText}>
            النتيجة: {score} / {QUIZ.length} ✓
          </Text>
        </View>
      )}

      {/* Submit / Reset */}
      <TouchableOpacity
        style={styles.submitBtn}
        onPress={() => submitted ? (setSubmitted(false), setAnswers({})) : setSubmitted(true)}
        activeOpacity={0.85}
      >
        <Text style={styles.submitText}>
          {submitted ? 'إعادة الاختبار' : 'تسليم الإجابات'}
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

// ─── Lecture Content Screen ────────────────────────────────────────────────────
const TABS = [
  { key: 'video',   label: 'المحاضرة' },
  { key: 'summary', label: 'ملخص' },
  { key: 'quiz',    label: 'الاختبار' },
];

export default function LectureContentScreen({ route, navigation }) {
  const { lecture, course } = route.params;
  const [activeTab, setActiveTab] = useState('video');

  return (
    <View style={styles.screen}>
      <ScreenHeader
        title={lecture.title}
        onBack={() => navigation.goBack()}
      />

      {/* ── Tab Segmented Control ── */}
      <View style={styles.tabBar}>
        {TABS.map((tab) => (
          <TouchableOpacity
            key={tab.key}
            style={[styles.tabBtn, activeTab === tab.key && styles.tabBtnActive]}
            onPress={() => setActiveTab(tab.key)}
            activeOpacity={0.8}
          >
            <Text
              style={[styles.tabLabel, activeTab === tab.key && styles.tabLabelActive]}
            >
              {tab.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* ── Tab Content ── */}
      {activeTab === 'video'   && <VideoTab   lecture={lecture} />}
      {activeTab === 'summary' && <SummaryTab lecture={lecture} />}
      {activeTab === 'quiz'    && <QuizTab />}
    </View>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: COLORS.background },

  // Tabs
  tabBar: {
    flexDirection: 'row',
    marginHorizontal: 20,
    marginBottom: 12,
    backgroundColor: COLORS.white,
    borderRadius: 14,
    padding: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },
  tabBtn: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  tabBtnActive: { backgroundColor: COLORS.deepNavy },
  tabLabel: { fontSize: 14, fontWeight: '600', color: COLORS.textMuted },
  tabLabelActive: { color: COLORS.white },
  tabContent: { paddingHorizontal: 20, paddingBottom: 40 },

  // Video Tab
  videoBox: {
    backgroundColor: COLORS.deepNavy,
    borderRadius: 20,
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    gap: 8,
  },
  videoLabel: { color: COLORS.white, fontSize: 16, fontWeight: '700' },
  videoDuration: { color: COLORS.textMuted, fontSize: 13 },
  progressContainer: { marginBottom: 16 },
  progressBar: {
    height: 6,
    backgroundColor: COLORS.inputBorder,
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressFill: {
    width: '42%',
    height: '100%',
    backgroundColor: COLORS.coral,
    borderRadius: 3,
  },
  progressLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 6,
  },
  progressTime: { fontSize: 12, color: COLORS.textMuted },
  controls: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 24,
    marginBottom: 24,
  },
  controlBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: COLORS.white,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  playBtn: {
    width: 58,
    height: 58,
    borderRadius: 29,
    backgroundColor: COLORS.coral,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: COLORS.coral,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 8,
    elevation: 5,
  },
  notesCard: {
    backgroundColor: COLORS.white,
    borderRadius: 16,
    padding: 18,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  notesTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: COLORS.textDark,
    textAlign: 'right',
    marginBottom: 8,
  },
  notesText: {
    fontSize: 14,
    color: COLORS.textMuted,
    textAlign: 'right',
    lineHeight: 22,
  },

  // Summary Tab
  summaryCard: {
    backgroundColor: COLORS.white,
    borderRadius: 18,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 2,
  },
  summaryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    gap: 10,
    marginBottom: 20,
  },
  summaryTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: COLORS.textDark,
  },
  summarySection: { marginBottom: 16 },
  summaryHeading: {
    fontSize: 15,
    fontWeight: '700',
    color: COLORS.coral,
    textAlign: 'right',
    marginBottom: 6,
  },
  summaryBody: {
    fontSize: 14,
    color: COLORS.textMuted,
    textAlign: 'right',
    lineHeight: 22,
  },
  downloadBtn: {
    backgroundColor: COLORS.deepNavy,
    borderRadius: 14,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 14,
    gap: 8,
  },
  downloadText: { color: COLORS.white, fontSize: 15, fontWeight: '600' },

  // Quiz Tab
  questionCard: {
    backgroundColor: COLORS.white,
    borderRadius: 16,
    padding: 18,
    marginBottom: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  questionText: {
    fontSize: 15,
    fontWeight: '600',
    color: COLORS.textDark,
    textAlign: 'right',
    marginBottom: 14,
    lineHeight: 24,
  },
  option: {
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: COLORS.inputBorder,
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginBottom: 8,
    alignItems: 'flex-end',
  },
  optionSelected: { borderColor: COLORS.coral, backgroundColor: COLORS.coral + '12' },
  optionCorrect:  { borderColor: '#27AE60', backgroundColor: '#27AE6015' },
  optionWrong:    { borderColor: '#EB5757', backgroundColor: '#EB575715' },
  optionText: { fontSize: 14, color: COLORS.textDark },
  optionTextActive: { fontWeight: '600' },
  scoreBanner: {
    borderRadius: 14,
    padding: 16,
    marginBottom: 16,
    alignItems: 'center',
  },
  scorePerfect: { backgroundColor: '#27AE6020' },
  scorePartial: { backgroundColor: COLORS.coral + '20' },
  scoreText: { fontSize: 18, fontWeight: '800', color: COLORS.textDark },
  submitBtn: {
    backgroundColor: COLORS.coral,
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: 'center',
    shadowColor: COLORS.coral,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  submitText: { color: COLORS.white, fontSize: 17, fontWeight: '700' },
});
