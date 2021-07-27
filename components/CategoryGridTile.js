import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const CategoryGridTile = (props) => {
    return (
        <View style={styles.gridItem}>
            <TouchableOpacity style={{ flex: 1 }} onPress={props.onSelect}>
                <View style={{ ...styles.container, ...{ backgroundColor: props.color } }}>
                    <Text style={{ fontSize: 20, fontWeight: 'bold' }} numberOfLines={2}>{props.dataName}</Text>
                </View>
            </TouchableOpacity>
        </View>

    );
};

const styles = StyleSheet.create({
    gridItem: {
        flex: 1,
        margin: 15,
        height: 150,
        overflow: 'hidden',
        borderRadius: 10,

    },
    container: {
        flex: 1,
        alignItems: 'flex-end',
        justifyContent: 'flex-end',
        shadowColor: 'black',
        shadowOpacity: 0.25,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 10,
        padding: 10
    }
})

export default CategoryGridTile;