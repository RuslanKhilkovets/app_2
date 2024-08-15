import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  Text,
  TouchableOpacity,
} from 'react-native';
import {TextInputMask} from 'react-native-masked-text';

import ICustomInputProps from '../../types/ICustomInputProps';

import EyeIcon from '../../../assets/images/see.svg';
import {AppIcon} from '../base/AppIcon';

const CustomInput: React.FC<ICustomInputProps> = ({
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
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(secureTextEntry);

  const handleTogglePasswordVisibility = () => {
    setShowPassword(prevState => !prevState);
  };

  return (
    <View style={[style]}>
      {!!label && <Text style={[styles.label, labelStyle]}>{label}</Text>}
      <View style={styles.inputContainer}>
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
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            style={[
              styles.input,
              inputStyle,
              isFocused && styles.activeInput,
              !!error && styles.error,
              disabled && styles.disabled,
            ]}
          />
        ) : (
          <TextInput
            value={value}
            onChangeText={onChangeText}
            placeholder={placeholder}
            secureTextEntry={showPassword}
            editable={!disabled}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            style={[
              styles.input,
              inputStyle,
              isFocused && styles.activeInput,
              !!error && styles.error,
              disabled && styles.disabled,
            ]}
          />
        )}
        {secureTextEntry && !mask && (
          <TouchableOpacity
            style={styles.eyeIcon}
            onPress={handleTogglePasswordVisibility}>
            <AppIcon name="seke" />

            {/* <EyeIcon width={24} height={16} fill={'#ff0000'} /> */}
          </TouchableOpacity>
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
  },
  input: {
    borderWidth: 1,
    borderRadius: 10,
    borderColor: 'transparent',
    paddingHorizontal: 15,
    paddingVertical: 21,
    fontSize: 16,
    backgroundColor: '#fff',
    color: '#757575',
    fontFamily: 'Raleway-Medium',
  },
  activeInput: {
    borderColor: '#ccc',
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
  eyeIcon: {
    position: 'absolute',
    right: 15,
    top: '50%',
    transform: [{translateY: -10}],
  },
});

export default CustomInput;
