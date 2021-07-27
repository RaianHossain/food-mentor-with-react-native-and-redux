import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createDrawerNavigator } from 'react-navigation-drawer'
import CategoriesScreen from '../screens/CategoriesScreen'
import CategoryMealsScreen from "../screens/CategoryMealsScreen";
import MealDetailsScreen from "../screens/MealDetailsScreen";
import { Colors } from "../constants/Colors";
import React from 'react';
import { Text } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from '../components/HeaderButton';
import FavoritesScreen from '../screens/FavoritesScreen';
import { Ionicons } from "@expo/vector-icons";
import FiltersScreen from '../screens/FiltersScreen';


const MealsNavigator = createStackNavigator({
    MealCategories: {
        screen: CategoriesScreen,
        navigationOptions: {
            title: "Catergories",
            headerStyle: {
                backgroundColor: '#4a148c'
            },
            headerTintColor: '#fff'
        },
        myNewMethod: (route) => { headerRight: route.params.temp }
    },
    CategoryMeals: {
        screen: CategoryMealsScreen,
        navigationOptions: {
            // title: "Meals",
            headerStyle: {
                backgroundColor: '#4a148c'
            },
            headerTintColor: '#fff',
            myMethod: (route) => { title: route.params.name }
        }
    },
    MealDetails: {
        screen: MealDetailsScreen,
        navigationOptions: {
            // title: "Meal Details",
            headerStyle: {
                backgroundColor: '#4a148c'
            },
            headerTintColor: '#fff',
            myMethod: (route) => { title: route.params.name },
            myNewMethod: (route) => { headerRight: route.params.temp }
            
        }
    }
});

const FavMealNav = createStackNavigator({
    Favorites: {
        screen: FavoritesScreen,
        navigationOptions: {
            headerStyle: {
                backgroundColor: '#4a148c'
            },
            headerTintColor: '#fff',
        }
    },
    MealDetails:{
        screen: MealDetailsScreen,
        navigationOptions: {
            // title: "Meal Details",
            headerStyle: {
                backgroundColor: '#4a148c'
            },
            headerTintColor: '#fff',
            myMethod: (route) => { title: route.params.name },
            myNewMethod: (route) => { headerRight: route.params.temp }
            
        }
    }
})

const MealsFavTabNavigator = createBottomTabNavigator({
    Meals: {
        screen: MealsNavigator,
        navigationOptions: {
            tabBarIcon: (tabInfo) => { return <Ionicons name='ios-restaurant' size={25} /> }
        }
    },
    Favorites:
    {   screen: FavMealNav,     
        navigationOptions: {
            tabBarIcon: (tabInfo) => { return <Ionicons name='ios-star' size={25} /> }
        }
    }
}, {
    tabBarOptions: {
        activeTintColor: 'orange'
    }
});

const FiltersNavigator = createStackNavigator({
    Filters: {
        screen: FiltersScreen,
        navigationOptions: {
            title: 'Filters',
            headerStyle: {
                backgroundColor: '#4a148c'
            },
            headerTintColor: '#fff'
        },
        myNewMethod: (route) => { headerLeft: route.params.temp },
        myNewMethodAgain: (route) => { headerRight: route.params.temp }
    },

})

const MainNavigator = createDrawerNavigator({
    MealsFavs: {
        screen: MealsFavTabNavigator
    },
    Filters: {
        screen: FiltersNavigator
    }
});

export default createAppContainer(MainNavigator);