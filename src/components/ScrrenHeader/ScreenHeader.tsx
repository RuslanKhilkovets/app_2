import React from 'react';

import { StyleSheet, TouchableOpacity, View } from 'react-native';

import BackIcon from "../../../assets/images/back.svg";

import useGoBack from '../../hooks/useGoBack';


const ScreenHeader = ( {children}: React.PropsWithChildren ) => {
    const goBack = useGoBack();

    return (
        <View style={styles.header}>
            <TouchableOpacity onPress={goBack}>
                <BackIcon/>
            </TouchableOpacity>

            <View style={styles.headerActions}>
                { children }
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    header: {
        paddingVertical: 30,
        flexDirection: "row",
    },
    headerActions: {
        flexDirection: "row",
        gap: 30,
    },
})

export default ScreenHeader;