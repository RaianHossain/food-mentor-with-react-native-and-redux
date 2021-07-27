import React from 'react';
import { View, Text, StyleSheet, Button, FlatList, TouchableOpacity } from 'react-native';
import { CATEGORIES } from '../data/dummy-data';
import Colors from '../constants/Colors';
import CategoryGridTile from '../components/CategoryGridTile';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from '../components/HeaderButton';





const CategoriesScreen = (props) => {
    const renderGridItem = (itemData) => {
        return (

            <CategoryGridTile dataName={itemData.item.title} color={itemData.item.color} onSelect={() => {
                props.navigation.navigate({ routeName: 'CategoryMeals', params: { categoryId: itemData.item.id, name: itemData.item.title } })
            }
            }></CategoryGridTile >
        )
    }

    console.log(props);
    return (
        <FlatList data={CATEGORIES} renderItem={renderGridItem} numColumns={2} />
    );
};

// // CategoriesScreen.navigationOptions = {
// //     headerStyle: {
// //         backgroundColor: Colors.primaryColor
// //     }
// }



CategoriesScreen.navigationOptions = navigationData => {
    return {
        headerLeft: <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item title="Menu" iconName="ios-menu" onPress={() => {navigationData.navigation.toggleDrawer()}}/>
        </HeaderButtons>
    }
    
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },

})

export default CategoriesScreen;