type TCustomButtonType = "primary" | "secondary";

export default interface ICustomButtonProps extends React.PropsWithChildren<{}> {
    type?: TCustomButtonType;
}
