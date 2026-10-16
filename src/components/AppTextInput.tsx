import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  TouchableOpacity,
  View,
} from "react-native";
import { colors } from "./colors";

type Props = TextInputProps & {
  label: string;
  icon: keyof typeof Ionicons.glyphMap;
  isPassword?: boolean;
  error?: string;
};

export default function AppTextInput({
  label,
  icon,
  isPassword = false,
  error,
  onFocus,
  onBlur,
  style,
  ...rest
}: Props) {
  const [focused, setFocused] = useState(false);
  const [hidden, setHidden] = useState(isPassword);

  return (
    <View style={styles.wrapper}>
      <Text style={[styles.label, focused && styles.labelFocused]}>
        {label.toUpperCase()}
      </Text>

      <View
        style={[
          styles.inputBox,
          focused && styles.inputBoxFocused,
          !!error && styles.inputBoxError,
        ]}
      >
        <Ionicons
          name={icon}
          size={20}
          color={focused ? colors.primary : colors.textSecondary}
        />

        <TextInput
          {...rest}
          style={[styles.input, style]}
          secureTextEntry={hidden}
          placeholderTextColor={colors.textSecondary}
          selectionColor={colors.primary}
          autoCapitalize={isPassword ? "none" : rest.autoCapitalize}
          onFocus={(e) => {
            setFocused(true);
            onFocus?.(e);
          }}
          onBlur={(e) => {
            setFocused(false);
            onBlur?.(e);
          }}
        />

        {isPassword && (
          <TouchableOpacity onPress={() => setHidden((h) => !h)} hitSlop={10}>
            <Ionicons
              name={hidden ? "eye-off-outline" : "eye-outline"}
              size={20}
              color={colors.textSecondary}
            />
          </TouchableOpacity>
        )}
      </View>

      {!!error && <Text style={styles.error}>{error}</Text>}
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
    marginBottom: 8,
  },
  labelFocused: { color: colors.primaryDark },
  inputBox: {
    flexDirection: "row",
    alignItems: "center",
    height: 56,
    paddingHorizontal: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.whiteTint,
    backgroundColor: colors.surface,
    gap: 12,
  },
  inputBoxFocused: { borderColor: colors.primaryDark, borderWidth: 1.5 },
  inputBoxError: { borderColor: colors.danger },
  input: { flex: 1, fontSize: 16, color: colors.textPrimary },
  error: { marginTop: 6, fontSize: 12, color: colors.danger },
});
