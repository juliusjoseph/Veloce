import { useEffect, useRef, useState } from "react";
import {
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { colors } from "./colors"; // adjust to your path, e.g. "@/theme/colors"

type Props = {
  value: string;
  onChange: (code: string) => void;
  onComplete?: (code: string) => void;
  onResend?: () => void;
  length?: number;
  resendSeconds?: number;
  error?: string;
};

const formatTime = (s: number) => {
  const m = Math.floor(s / 60);
  const sec = s % 60;
  return `${String(m).padStart(2, "0")}:${String(sec).padStart(2, "0")}`;
};

export default function OtpInput({
  value,
  onChange,
  onComplete,
  onResend,
  length = 6,
  resendSeconds = 30,
  error,
}: Props) {
  const inputRef = useRef<TextInput>(null);
  const [focused, setFocused] = useState(false);
  const [seconds, setSeconds] = useState(resendSeconds);

  // countdown
  useEffect(() => {
    if (seconds <= 0) return;
    const t = setTimeout(() => setSeconds((s) => s - 1), 1000);
    return () => clearTimeout(t);
  }, [seconds]);

  const handleChange = (text: string) => {
    const digits = text.replace(/\D/g, "").slice(0, length);
    onChange(digits);
    if (digits.length === length) onComplete?.(digits);
  };

  const handleResend = () => {
    if (seconds > 0) return;
    setSeconds(resendSeconds);
    onResend?.();
  };

  const activeIndex = Math.min(value.length, length - 1);

  return (
    <View style={styles.wrapper}>
      <Text style={styles.label}>VERIFICATION CODE</Text>

      <Pressable style={styles.boxes} onPress={() => inputRef.current?.focus()}>
        {Array.from({ length }).map((_, i) => (
          <View
            key={i}
            style={[
              styles.box,
              focused && i === activeIndex && styles.boxActive,
              !!error && styles.boxError,
            ]}
          >
            <Text style={styles.digit}>{value[i] ?? ""}</Text>
          </View>
        ))}

        {/* hidden input that actually receives the typing */}
        <TextInput
          ref={inputRef}
          value={value}
          onChangeText={handleChange}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          maxLength={length}
          keyboardType="number-pad"
          textContentType="oneTimeCode"
          autoComplete="sms-otp"
          caretHidden
          style={styles.hiddenInput}
        />
      </Pressable>

      {!!error && <Text style={styles.error}>{error}</Text>}

      <View style={styles.resendRow}>
        <Text style={styles.resendText}>
          Resend code in <Text style={styles.timer}>{formatTime(seconds)}</Text>
        </Text>

        <TouchableOpacity
          onPress={handleResend}
          disabled={seconds > 0}
          hitSlop={10}
        >
          <Text style={[styles.link, seconds > 0 && styles.linkDisabled]}>
            Resend code
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: { marginBottom: 18 },
  label: {
    fontSize: 12,
    fontWeight: "600",
    letterSpacing: 0.5,
    color: colors.textSecondary,
    marginBottom: 12,
  },
  boxes: { flexDirection: "row", gap: 10 },
  box: {
    flex: 1,
    height: 56,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.whiteTint,
    backgroundColor: colors.surface,
    alignItems: "center",
    justifyContent: "center",
  },
  boxActive: { borderColor: colors.primaryDark, borderWidth: 1.5 },
  boxError: { borderColor: colors.danger },
  digit: { fontSize: 22, fontWeight: "600", color: colors.textPrimary },
  hiddenInput: {
    position: "absolute",
    width: 1,
    height: 1,
    opacity: 0,
  },
  error: { marginTop: 8, fontSize: 12, color: colors.danger },
  resendRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 14,
  },
  resendText: { fontSize: 13, color: colors.textSecondary },
  timer: { fontWeight: "700", color: colors.textPrimary },
  link: { fontSize: 13, fontWeight: "700", color: colors.primaryDark },
  linkDisabled: { opacity: 0.4 },
});
