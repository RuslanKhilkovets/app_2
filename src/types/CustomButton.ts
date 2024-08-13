import { ViewStyle } from "react-native";

type TCustomButtonType = "primary" | "secondary";

export default interface ICustomButtonProps extends React.PropsWithChildren<{}> {
    type?: TCustomButtonType;
    onPress: () => void;
    style?: ViewStyle; 
}
