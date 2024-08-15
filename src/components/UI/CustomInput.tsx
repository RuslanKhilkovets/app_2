import React, {useState} from 'react';

import {
  StyleSheet,
  View,
  TextInput,
  Text,
  TouchableOpacity,
} from 'react-native';

import ICustomInputProps from '../../types/ICustomInputProps';

import EyeIcon from '../../../assets/images/see.svg';

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
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(secureTextEntry);

  const handleTogglePasswordVisibility = () => {
    setShowPassword(prevState => !prevState);
  };
  console.log(error);

  return (
    <View style={[style]}>
      {!!label && <Text style={[styles.label, labelStyle]}>{label}</Text>}
      <View style={styles.inputContainer}>
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
        {secureTextEntry && (
          <TouchableOpacity
            style={styles.eyeIcon}
            onPress={handleTogglePasswordVisibility}>
            <EyeIcon width={24} height={16} />
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
    fontFamily: 'Releway-Medium',
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
    fontFamily: 'Releway-Medium',
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
