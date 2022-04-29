import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  Button,
} from 'react-native';
import {StackScreenProps} from '@react-navigation/stack';
import {Picker} from '@react-native-picker/picker';

import {ProductsStackParams} from '../navigator/ProductsNavigator';
import {useCategories} from '../hooks/useCategories';

interface Props
  extends StackScreenProps<ProductsStackParams, 'ProductScreen'> {}
export const ProductScreen = ({route, navigation}: Props) => {
  const {id, name = ''} = route.params;
  const {isLoading, categories} = useCategories();
  const [selectedLanguage, setSelectedLanguage] = useState();

  useEffect(() => {
    navigation.setOptions({
      headerTitle: id ? name : 'Nuevo producto',
    });
  });

  return (
    <View style={styles.container}>
      <ScrollView>
        <Text style={styles.label}>Nombre del producto</Text>
        <TextInput placeholder="Producto" style={styles.textInput} />

        <Text style={styles.label}>Categoría</Text>

        <Picker
          selectedValue={selectedLanguage}
          onValueChange={(itemValue, itemIndex) =>
            setSelectedLanguage(itemValue)
          }>
          {categories.map(c => (
            <Picker.Item label={c.nombre} value={c._id} key={c._id} />
          ))}
        </Picker>

        <Button title="Guardar" onPress={() => {}} color={'#5856D6'} />

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            marginTop: 10,
          }}>
          <Button title="Cámara" onPress={() => {}} color={'#5856D6'} />
          <View style={{width: 10}} />
          <Button title="Galería" onPress={() => {}} color={'#5856D6'} />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 10,
    marginHorizontal: 20,
  },
  label: {
    fontSize: 18,
  },
  textInput: {
    borderWidth: 1,
    paddingHorizontal: 20,
    paddingVertical: 5,
    borderRadius: 10,
    borderColor: 'rgba(0,0,0,0.5)',
    height: 45,
    marginTop: 5,
    marginBottom: 15,
  },
});
