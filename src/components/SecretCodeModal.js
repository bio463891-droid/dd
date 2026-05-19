import React, { useState } from 'react';
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Pressable,
} from 'react-native';
import { BlurView } from 'expo-blur';
import { COLORS } from '../constants/colors';

/**
 * Screen 3 — Secret Code Verification Modal
 * Blurred backdrop + centered deep-navy floating card
 */
export default function SecretCodeModal({ visible, onClose, onVerify }) {
  const [code, setCode] = useState('');
  const [error, setError] = useState('');

  const handleVerify = () => {
    if (!code.trim()) {
      setError('الرجاء إدخال الكود السري');
      return;
    }
    setError('');
    onVerify(code.trim());
    setCode('');
  };

  const handleClose = () => {
    setCode('');
    setError('');
    onClose();
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      statusBarTranslucent
    >
      <BlurView intensity={60} tint="dark" style={styles.blurContainer}>
        <Pressable style={styles.backdrop} onPress={handleClose} />
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.keyboardView}
        >
          <View style={styles.card}>
            {/* Title */}
            <Text style={styles.title}>ادخل الكود السري</Text>

            {/* Input */}
            <View style={styles.inputWrapper}>
              <TextInput
                style={styles.input}
                placeholder="• • • • • • • •"
                placeholderTextColor={COLORS.textMuted}
                value={code}
                onChangeText={(t) => { setCode(t); setError(''); }}
                textAlign="center"
                secureTextEntry
                keyboardType="number-pad"
                maxLength={8}
              />
            </View>

            {/* Error message */}
            {!!error && <Text style={styles.errorText}>{error}</Text>}

            {/* Verify Button */}
            <TouchableOpacity
              style={styles.verifyBtn}
              onPress={handleVerify}
              activeOpacity={0.85}
            >
              <Text style={styles.verifyBtnText}>تحقق</Text>
            </TouchableOpacity>

            {/* Cancel */}
            <TouchableOpacity onPress={handleClose} style={styles.cancelBtn}>
              <Text style={styles.cancelText}>إلغاء</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </BlurView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  blurContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
  },
  keyboardView: {
    width: '100%',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  card: {
    backgroundColor: COLORS.deepNavy,
    borderRadius: 20,
    padding: 32,
    width: '100%',
    maxWidth: 380,
    alignItems: 'center',
    gap: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 24,
    elevation: 20,
  },
  title: {
    color: COLORS.white,
    fontSize: 20,
    fontWeight: '700',
    textAlign: 'center',
  },
  inputWrapper: {
    width: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 6,
    elevation: 4,
  },
  input: {
    backgroundColor: COLORS.white,
    borderRadius: 27,
    height: 54,
    fontSize: 22,
    letterSpacing: 6,
    color: COLORS.textDark,
    paddingHorizontal: 20,
    width: '100%',
  },
  errorText: {
    color: '#FF6B6B',
    fontSize: 13,
    textAlign: 'center',
    marginTop: -12,
  },
  verifyBtn: {
    backgroundColor: COLORS.coral,
    borderRadius: 12,
    height: 50,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  verifyBtnText: {
    color: COLORS.deepNavy,
    fontSize: 18,
    fontWeight: '700',
  },
  cancelBtn: {
    marginTop: -8,
  },
  cancelText: {
    color: COLORS.textMuted,
    fontSize: 14,
  },
});
