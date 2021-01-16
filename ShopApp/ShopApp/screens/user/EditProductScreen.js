import React, { useCallback, useEffect, useReducer, useState } from 'react'
import { View, StyleSheet, ScrollView, Text, Alert, ActivityIndicator } from 'react-native'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import HeaderButton from '../../components/UI/HeaderButton'
import { useSelector, useDispatch } from 'react-redux'
import { createProduct, updateProduct } from '../../store/actions/products'
import Input from '../../components/UI/Input'
import Colors from '../../constants/colors'

const FORM_INPUT_UPDATE = "FORM_INPUT_UPDATE"
const formReducer = (state, action) => {
    switch (action.type) {
        case FORM_INPUT_UPDATE:
            const updatedInputs = { ...state.inputValues, [action.input]: action.value };
            const updatedValidities = { ...state.inputValidities, [action.input]: action.isValid };
            let formIsValid = true;
            for (let key in updatedValidities) {
                formIsValid = formIsValid && updatedValidities[key];
            }
            return {
                inputValues: updatedInputs,
                inputValidities: updatedValidities,
                formIsValid: formIsValid
            }
        default:
            return state;
    }
}

const EditProductScreen = props => {
    const editedProductId = props.navigation.getParam("id");
    const editedProduct = useSelector(state => state.product.userProducts.find(prod => prod.id === editedProductId));
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(false);
    const dispatch = useDispatch();

    const [formState, formDispatch] = useReducer(formReducer, {
        inputValues: {
            title: editedProduct ? editedProduct.title : '',
            imageUrl: editedProduct ? editedProduct.imageUrl : '',
            price: '',
            description: editedProduct ? editedProduct.description : ''
        },
        inputValidities: {
            title: editedProduct ? true : false,
            imageUrl: editedProduct ? true : false,
            price: editedProduct ? true : false,
            description: editedProduct ? true : false
        },
        formIsValid: editedProduct ? true : false
    });

    let action;
    const formSubmitHandler = useCallback(
        async () => {

            if (!formState.formIsValid) {
                Alert.alert("Wrong input?", "Please check the errors in the form", [{ text: "Ok", style: "default" }]);
                return;
            }

            if (editedProduct) {
                action = updateProduct(editedProductId, formState.inputValues.title, formState.inputValues.imageUrl, formState.inputValues.description);
            }
            else {
                action = createProduct(formState.inputValues.title, formState.inputValues.imageUrl, formState.inputValues.description, +formState.inputValues.price);
            }
            setError(null);
            setIsLoading(true);
            try {
               await dispatch(action);
               props.navigation.goBack();
            }
            catch (err) {
                setError(err.message);
                setIsLoading(false);
            }
        },
        [formState, editedProductId, dispatch],
    )

    useEffect(()=>{
        if(error)
        {
            Alert.alert('An error occurred!'.concat,error,[{text:"Okay"}])
        }
    },[error])
    useEffect(() => {
        props.navigation.setParams({ submit: formSubmitHandler });
    }, [formSubmitHandler]);

    const textChangedHandler = useCallback(
        (inputIdentifier, text, isValid) => {
            formDispatch({ type: FORM_INPUT_UPDATE, value: text, input: inputIdentifier, isValid: isValid });
        },
        [formDispatch],
    );
        if(isLoading)
        {
            return (
                <View style={{flex:1,alignItems:"center",justifyContent:"center"}}>
                    <ActivityIndicator size="large" color={Colors.primary}/>
                </View>
            );
        }
        else{
            return (
                <ScrollView>
                    <View style={styles.form}>
                        <Input
                            id='title'
                            label="Title"
                            errorText="Please enter a valid title!"
                            keyboardType='default'
                            onInputChange={textChangedHandler}
                            autoCapitalize='sentences'
                            returnKeyType="next"
                            autoCorrect
                            required
                            initialValue={editedProduct ? editedProduct.title : ''}
                            initialValid={!!editedProduct}
                        />
        
                        <Input
                            id="imageUrl"
                            label="Image Url"
                            errorText='Please enter a valid image url!'
                            keyboardType='default'
                            required
                            initialValue={editedProduct ? editedProduct.imageUrl : ''}
                            initialValid={!!editedProduct}
                            onInputChange={textChangedHandler}
                            returnKeyType="next"
                            autoCorrect
                        />
                        {
                            editedProduct ? null : <Input
                                id='price'
                                label="Price"
                                errorText='Please enter a valid price!'
                                keyboardType='decimal-pad'
                                required
                                min={1}
                                returnKeyType="next"
                                onInputChange={textChangedHandler}
                            />
        
                        }
                        <Input
                            id='description'
                            label="Description"
                            errorText='Please enter a valid description!'
                            keyboardType='default'
                            required
                            initialValid={!!editedProduct}
                            initialValue={editedProduct ? editedProduct.description : ''}
                            onInputChange={textChangedHandler}
                            returnKeyType="next"
                            autoCorrect
                        />
                    </View>
                </ScrollView>
            );
        }
};

EditProductScreen.navigationOptions = ({ navigation }) => {

    return {
        title: navigation.getParam("id") ? "Edit Product" : "Add Product",
        headerRight: () => (
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
                <Item title="save" iconName='md-checkmark' onPress={navigation.getParam('submit')} />
            </HeaderButtons>
        )
    }
}
const styles = StyleSheet.create({
    form: {
        margin: 20,
    },
    formControl: {
        width: "100%"
    },
    label: {
        fontFamily: "OpenSans-Bold",
        marginVertical: 6
    },
    input: {
        paddingHorizontal: 2,
        paddingVertical: 5,
        borderBottomColor: "#ccc",
        borderBottomWidth: 1
    },



});
export default EditProductScreen;