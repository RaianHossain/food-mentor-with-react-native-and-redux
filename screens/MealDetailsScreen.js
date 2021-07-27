import React, { useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
// import { MEALS } from '../data/dummy-data';
import { useSelector, useDispatch } from 'react-redux'
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from '../components/HeaderButton';
import { toggleFavorite } from '../store/actions/meals'

const ListItem = props => {
    return(
        <View style = {styles.listItem}>
            <Text>{props.children}</Text>
        </View>
    )
}

const MealDetailsScreen = (props) => {

    const availableMeals = useSelector(state => state.meals.meals)
    const mealId = props.navigation.getParam('mealId');
    const selectedMeal = availableMeals.find(meal => meal.id === mealId)

    const dispatch = useDispatch();

    const toggleFavoriteHandler = useCallback(() => {
        dispatch(toggleFavorite(mealId))
    }, [dispatch, mealId]);

    useEffect(() => {
        props.navigation.setParams({toggleFav: toggleFavoriteHandler})
    }, [toggleFavoriteHandler]);

    const isCurrentMealFavorite = useSelector(state => state.meals.favoriteMeals.some(meal => meal.id === mealId));

    useEffect(() => {
        props.navigation.setParams({isFav: isCurrentMealFavorite});
    }, [isCurrentMealFavorite]);
    

    return (
        <ScrollView>
            <Image source={{uri: selectedMeal.imageUrl}} style={styles.image} />
            <View style={styles.details}>
                <Text>{selectedMeal.duration} mins</Text>
                <Text>{selectedMeal.complexity.toUpperCase()}</Text>
                <Text>{selectedMeal.affordability.toUpperCase()}</Text>
            </View>
            <Text style = {styles.title}>Ingredients</Text>
            {
                selectedMeal.ingredients.map(ingr => <ListItem key={ingr}>{ingr}</ListItem>)
            }
            <Text style={styles.title}>Steps</Text>
            {
                selectedMeal.steps.map(stp => <ListItem key={stp}>{stp}</ListItem>)
            }
        
        </ScrollView>
    );
};



MealDetailsScreen.navigationOptions = (navigationData) => {
    const toggleFavorite = navigationData.navigation.getParam('toggleFav');
    const name = navigationData.navigation.getParam('name');
    const isFavorite = navigationData.navigation.getParam('isFav');
    return {
        title: name,
        headerRight: <HeaderButtons HeaderButtonComponent={HeaderButton}>
                        <Item title='Favorite' iconName={isFavorite ? 'ios-star' : 'ios-star-outline'} onPress={toggleFavorite} />
                    </HeaderButtons>
        
    }
};

const styles = StyleSheet.create({
    image: {
        width: '100%',
        height: 200
    },
    details: {
        flexDirection: 'row',
        padding: 15,
        justifyContent: 'space-around'
    },
    title: {
        fontSize:22,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    listItem: {
        marginVertical: 10,
        marginHorizontal: 20, 
        borderColor: '#ccc',
        borderWidth: 1,
        padding: 10
    }
})

export default MealDetailsScreen;