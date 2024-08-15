import React from 'react';

import {ViewStyle} from 'react-native';

type TCustomButtonType = 'primary' | 'secondary' | 'bordered';

export default interface ICustomButtonProps
  extends React.PropsWithChildren<{}> {
  type?: TCustomButtonType;
  onPress: () => void;
  style?: ViewStyle;
  before?: React.JSX.Element | null;
  after?: React.JSX.Element | null;
}
