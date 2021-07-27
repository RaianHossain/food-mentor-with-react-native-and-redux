import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from '../components/HeaderButton';
import { CATEGORIES } from '../data/dummy-data';
import MealItem from '../components/MealItem';
import { useSelector } from 'react-redux'

const FavoritesScreen = (props) => {

    const favMeals = useSelector(state=> state.meals.favoriteMeals)

    if(favMeals.length === 0 || !favMeals){
        return(
            <View style = {styles.content}>
                <Text>No favorite meals found. Start adding some!</Text>
            </View>
        )
    }
    
    const renderMealItem = (itemData) => {
        
        return (
            <MealItem title={itemData.item.title} duration={itemData.item.duration} complexity={itemData.item.complexity} image={itemData.item.imageUrl} affordability={itemData.item.affordability} onSelectMeal={() => props.navigation.navigate({
                routeName: 'MealDetails', params: {
                    mealId: itemData.item.id,
                    name: itemData.item.title
                }
            })} ></MealItem>
        )
    }
    return (
        <View style={styles.screen}>
            <FlatList style={{ width: '100%' }} data={favMeals} renderItem={renderMealItem} />
        </View>
    );
};


const styles = StyleSheet.create({
    screen: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        margin: 10
    },
    content: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
    }
})

export default FavoritesScreen;