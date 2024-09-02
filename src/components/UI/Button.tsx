import React from 'react';
import {StyleSheet, TouchableOpacity, Text, ViewStyle} from 'react-native';

type TButtonType = 'primary' | 'secondary' | 'bordered' | 'light';

interface IButtonProps extends React.PropsWithChildren<{}> {
  type?: TButtonType;
  onPress: (...params: any) => void;
  style?: ViewStyle;
  before?: React.JSX.Element | null;
  after?: React.JSX.Element | null;
  fullWidth?: boolean;
}

const Button = ({
  children,
  type = 'primary',
  onPress,
  style,
  fullWidth,
  after = null,
  before = null,
}: IButtonProps) => {
  const textColor = type === 'primary' ? '#fff' : '#000';

  return (
    <TouchableOpacity
      style={[styles.button, styles[type], style, fullWidth && {width: '100%'}]}
      activeOpacity={0.7}
      onPress={onPress}>
      {before}

      <Text
        style={[
          styles.buttonText,
          {
            color: textColor,
            textDecorationLine: type === 'secondary' ? 'underline' : 'none',
          },
        ]}>
        {children}
      </Text>

      {after}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 10,
    padding: 21,
  },
  primary: {
    backgroundColor: '#000',
  },
  bordered: {
    borderWidth: 1,
    borderColor: '#000',
    borderStyle: 'solid',
  },
  secondary: {
    backgroundColor: 'transparent',
  },
  light: {
    backgroundColor: '#F8F6F6',
  },
  buttonText: {
    fontSize: 16,
    fontFamily: 'Raleway-Medium',
  },
});

export default Button;
