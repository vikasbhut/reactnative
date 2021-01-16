import React from 'react'
import { StyleSheet, View, Text, TouchableOpacity, TouchableNativeFeedback, Platform } from 'react-native'


const CategoryGridTile = props => {



    let TouchableCmp = TouchableOpacity;
    if (Platform.OS === 'android' && Platform.Version >= 21) {
        TouchableCmp = TouchableNativeFeedback
    }
    return (
        <View style={styles.gridItem}>
            <TouchableCmp
                background={TouchableNativeFeedback.Ripple('#000')}
                onPress={props.onSelect}>
                <View style={{ ...styles.container, backgroundColor: props.color }}>
                    <Text style={styles.title} numberOfLines={2}>{props.title}</Text>
                </View>
            </TouchableCmp>
        </View>
    );
};

const styles = StyleSheet.create({
    gridItem: {
        flex: 1,
        margin: 15,
        height: 150,
        borderRadius: 10,
        overflow: "hidden",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 12,
        },
        shadowOpacity: 0.58,
        shadowRadius: 16.00,
         elevation: 24,
    },
    title: {
        fontFamily: "OpenSans-Bold",
        fontSize: 20,
        textAlign: "right"
    },
    container: {
        flex: 1,
        borderRadius: 10,
        padding: 15,
        alignItems: "flex-end",
        justifyContent: "flex-end"
    }
});
export default CategoryGridTile;