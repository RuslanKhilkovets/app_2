import React from 'react';
import {StyleSheet, TouchableOpacity, Text, ViewStyle} from 'react-native';

type TButtonType = 'primary' | 'secondary' | 'bordered';

interface IButtonProps extends React.PropsWithChildren<{}> {
  type?: TButtonType;
  onPress: () => void;
  style?: ViewStyle;
  before?: React.JSX.Element | null;
  after?: React.JSX.Element | null;
}

const Button = ({
  children,
  type = 'primary',
  onPress,
  style,
  after = null,
  before = null,
}: IButtonProps) => {
  const textColor = type === 'primary' ? '#fff' : '#000';

  return (
    <TouchableOpacity
      style={[
        styles.button,
        styles[type],
        style,
        type === 'bordered' && {
          borderWidth: 1,
          borderColor: '#000',
          borderStyle: 'solid',
        },
      ]}
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
    width: '100%',
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
  secondary: {
    backgroundColor: 'transparent',
  },
  buttonText: {
    fontSize: 16,
    fontFamily: 'Raleway-Medium',
  },
});

export default Button;