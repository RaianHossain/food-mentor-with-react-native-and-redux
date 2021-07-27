import React from 'react';
import { View, Text, StyleSheet, Button, FlatList } from 'react-native';
import MealItem from '../components/MealItem';
import { CATEGORIES } from '../data/dummy-data';
import { useSelector } from 'react-redux'

const CategoryMealsScreen = (props) => {
    const catId = props.navigation.getParam('categoryId');

    const availabelMeals = useSelector((state) => state.meals.filteredMeals)
    console.log(availabelMeals)
    
    const displayedMeals = availabelMeals.filter(meal => meal.categoryId.indexOf(catId) >= 0)

    if(displayedMeals.length ===0){
        return (
            <View style = {styles.content}>
                <Text>No meals because of your filters</Text>
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
            <FlatList style={{ width: '100%' }} data={displayedMeals} renderItem={renderMealItem} />
        </View>
    );
};
CategoryMealsScreen.navigationOptions = (navigationData) => {
    const catName = navigationData.navigation.getParam('name')
    return {
        title: catName
    }
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

export default CategoryMealsScreen;