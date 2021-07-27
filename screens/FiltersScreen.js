import React, {useState, useEffect, useMemo} from 'react';
import { View, Text, StyleSheet, Switch } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from '../components/HeaderButton';
import { useDispatch } from 'react-redux';
import { setFilters } from '../store/actions/meals'

const FilterSwitch = props => {
    return(
        <View style = {styles.filterContainer}>
            <Text>{props.label}</Text>
            <Switch
                    trackColor = {{true: "#4a148c"}}
                    value={props.state}
                    onValueChange={props.onChange}
                />
        </View>
    )
}

const FiltersScreen = (props) => {
    const {navigation} = props;
    const [isGlutenFree, setIsGlutenFree] = useState(false);
    const [isLactoseFree, setIsLactoseFree] = useState(false);
    const [isVegan, setIsVegan] = useState(false);
    const [isVegetarian, setIsVegetarian] = useState(false);

    const dispatch = useDispatch();

    const saveFilters = useMemo(() => {
        const appliedFilters = {
            glutenFree: isGlutenFree,
            lactoseFree: isLactoseFree,
            vegan: isVegan,
            vegetarian: isVegetarian
        };

        dispatch(setFilters(appliedFilters))
        console.log(appliedFilters)
    }, [isGlutenFree, isLactoseFree, isVegan, isVegetarian, dispatch]);

    useEffect(() => {
        navigation.setParams({save: saveFilters});
    }, [saveFilters]);
    
    return (
        <View style={styles.screen}>
            <Text style={styles.title}>Available Filters / Restriction</Text>
            <FilterSwitch state={isGlutenFree} onChange={newValue => setIsGlutenFree(newValue)} label="Gluten Free"></FilterSwitch>

            <FilterSwitch state={isLactoseFree} onChange={newValue => setIsLactoseFree(newValue)} label="Lactose Free"></FilterSwitch>

            <FilterSwitch state={isVegan} onChange={newValue => setIsVegan(newValue)} label="Vegan"></FilterSwitch>

            <FilterSwitch state={isVegetarian} onChange={newValue => setIsVegetarian(newValue)} label="Vegetarian"></FilterSwitch>
        </View>
    );
};

FiltersScreen.navigationOptions = navigationData => {
    return {
        headerLeft: <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item title="Menu" iconName="ios-menu" onPress={() => {navigationData.navigation.toggleDrawer()}}/>
        </HeaderButtons>,
        headerRight: <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item title="Menu" iconName="ios-save" onPress={navigationData.navigation.getParam('save')}/>
        </HeaderButtons>
    }
    
}



const styles = StyleSheet.create({
    screen: {
        flex: 1,
        alignItems: 'center',
        // justifyContent: 'center',
        marginTop: 20
    },
    title: {
        fontSize:22,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    filterContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '77%',
        marginTop: 10
    }
})

export default FiltersScreen;