import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  Text,
  TouchableOpacity,
  ViewStyle,
  TextStyle,
} from 'react-native';
import {TextInputMask} from 'react-native-masked-text';

import {AppIcon} from '@/components';
import {useTheme} from '@/contexts/Theme/ThemeContext';

interface IInputProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  secureTextEntry?: boolean;
  style?: ViewStyle;
  inputStyle?: TextStyle;
  label?: string;
  labelStyle?: TextStyle;
  error?: string;
  errorStyle?: TextStyle;
  disabled?: boolean;
  mask?: string;
  maskOptions?: Record<string, any>;
  maxLength?: number;
  searchMode?: boolean;
  endAdornment?: React.JSX.Element | null;
  numberOfLines?: number;
  multiline?: boolean;
}

const Input: React.FC<IInputProps> = ({
  value,
  onChangeText,
  placeholder,
  secureTextEntry = false,
  style,
  inputStyle,
  label,
  labelStyle,
  error,
  disabled,
  mask,
  maskOptions,
  maxLength,
  searchMode,
  endAdornment,
  numberOfLines = 1,
  multiline = false,
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(secureTextEntry);

  const {themes, colorScheme} = useTheme();

  const handleTogglePasswordVisibility = () => {
    setShowPassword(prevState => !prevState);
  };

  return (
    <View style={[style]}>
      {!!label && <Text style={[styles.label, labelStyle]}>{label}</Text>}
      <View
        style={[
          styles.inputContainer,
          !!error && styles.error,
          isFocused && styles.activeInput,
          disabled && styles['disabled'],
          multiline && {height: numberOfLines * 25},
        ]}>
        {mask ? (
          <TextInputMask
            type={'custom'}
            options={{
              mask,
              ...maskOptions,
            }}
            value={value}
            onChangeText={onChangeText}
            placeholder={placeholder}
            editable={!disabled}
            maxLength={maxLength}
            numberOfLines={numberOfLines}
            multiline={multiline}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            style={[
              styles.input,
              inputStyle,
              isFocused && styles.activeInput,
              disabled && styles.disabled,
              {color: themes[colorScheme].dark},
            ]}
          />
        ) : (
          <TextInput
            textAlignVertical="top"
            value={value}
            onChangeText={onChangeText}
            placeholder={placeholder}
            secureTextEntry={showPassword}
            editable={!disabled}
            maxLength={maxLength}
            numberOfLines={numberOfLines}
            multiline={multiline}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            style={[
              styles.input,
              inputStyle,
              multiline && {height: numberOfLines * 20},
              {color: themes[colorScheme].dark},
            ]}
          />
        )}
        {endAdornment && (
          <View style={styles.endAdornment}>{endAdornment}</View>
        )}
        {secureTextEntry && !mask && (
          <TouchableOpacity
            style={styles.endAdornment}
            onPress={handleTogglePasswordVisibility}>
            <AppIcon name={!showPassword ? 'hide' : 'see'} />
          </TouchableOpacity>
        )}
        {searchMode && (
          <AppIcon
            style={styles.endAdornment}
            name="search"
            color={'#757575'}
          />
        )}
      </View>
      {!!error && <Text style={[styles.errorText]}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  label: {
    marginBottom: 15,
    fontSize: 16,
    color: '#333',
    fontFamily: 'Raleway-Medium',
  },
  inputContainer: {
    position: 'relative',
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 10,
    paddingHorizontal: 15,
    backgroundColor: '#fff',
    height: 60,
    borderColor: '#e7e7e7',
    borderWidth: 1,
  },
  input: {
    flex: 1,
    fontSize: 16,
    fontFamily: 'Raleway-Regular',
  },
  activeInput: {
    borderColor: '#000',
  },
  error: {
    borderColor: '#FF0000',
  },
  errorText: {
    color: '#ff0000',
    marginVertical: 5,
  },
  disabled: {
    color: '#757575',
    userSelect: 'none',
  },
  endAdornment: {
    marginLeft: 5,
  },
});

export default Input;
