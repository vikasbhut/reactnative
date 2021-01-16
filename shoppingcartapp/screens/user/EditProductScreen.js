import React, { useEffect, useCallback, useReducer } from 'react'
import { View, KeyboardAvoidingView, StyleSheet, ScrollView, Alert } from 'react-native'
import HeaderButton from "../../components/UI/HeaderButton";
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useSelector, useDispatch } from 'react-redux'
import * as productsActions from '../../store/actions/products'
import Input from '../../components/UI/Input'


const FORM_INPUT_UPDATE = 'FORM_INPUT_UPDATE'
const formReducer = (state, action) => {
    if (action.type = FORM_INPUT_UPDATE) {
        const updateInputValues = {
            ...state.inputValues,
            [action.input]: action.value
        };
        const updateInputValidities = {
            ...state.inputValidities,
            [action.input]: action.isValid
        }
        let formIsValid = true;
        for (let key in updateInputValidities) {
            formIsValid = formIsValid && updateInputValidities[key];
        }
        return {
            ...state,
            inputValues: updateInputValues,
            inputValidities: updateInputValidities,
            formIsValid: formIsValid
        }
    }
    return state;
}

const EditProductScreen = props => {
    const productId = props.navigation.getParam('productId');
    const editedProduct = useSelector(state => state.product.userProducts.find(prod => prod.id === productId));
    const dispatch = useDispatch();

    const [formState, dispatchFormState] = useReducer(formReducer, {
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




    const submitHandler = useCallback(() => {

        if (!formState.formIsValid) {
            Alert.alert('Wrong Input', 'Please check the errors in the form', [{ text: "OK" }]);
            return;
        }
        if (editedProduct) {
            dispatch(productsActions.updateProduct(productId, formState.inputValues.title, formState.inputValues.description, formState.inputValues.imageUrl));
        }
        else {
            dispatch(productsActions.createProduct(formState.inputValues.title, formState.inputValues.description, formState.inputValues.imageUrl, +formState.inputValues.price));
        }
        props.navigation.goBack();
    }, [formState]);

    useEffect(() => {
        props.navigation.setParams({ 'submit': submitHandler });
    }, [submitHandler])


    const textChangedHandler = useCallback((inputIdentifier, inputValue, inputValidity) => {
        dispatchFormState({ type: FORM_INPUT_UPDATE, value: inputValue, isValid: inputValidity, input: inputIdentifier });
    }, [dispatchFormState]);
    return (
        <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={10} style={{flex:1}}>
            <ScrollView>
                <View style={styles.form}>
                    <Input
                        id="title"
                        label="Title"
                        errorText='Please enter a valid title!'
                        keyboardType='default'
                        autoCapitalize='words'
                        autoCorrect
                        required
                        initialValue={editedProduct ? editedProduct.title : ''}
                        initialValid={!!editedProduct}
                        onInputChange={textChangedHandler}
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
                    />
                    {
                        editedProduct ? null : <Input
                            id='price'
                            label="Price"
                            errorText='Please enter a valid price!'
                            keyboardType='decimal-pad'
                            required
                            min={1}
                            onInputChange={textChangedHandler}
                        />

                    }
                    <Input
                        id='description'
                        label="Description"
                        errorText='Please enter a valid description!'
                        keyboardType='default'
                        required
                        multiline
                        numberOfLines={3}
                        initialValid={!!editedProduct}
                        initialValue={editedProduct ? editedProduct.description : ''}
                        onInputChange={textChangedHandler}
                    />
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
};

EditProductScreen.navigationOptions = ({ navigation }) => {
    const submitFn = navigation.getParam('submit')
    return {
        title: navigation.getParam('productId') ? 'Edit Product' : 'Add Product',
        headerRight: () => (
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
                <Item title="SAVE" iconName='md-checkmark' onPress={submitFn} />
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