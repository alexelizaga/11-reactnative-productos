/* eslint-disable curly */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-hooks/exhaustive-deps */
import React, {useContext, useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  Button,
  Image,
} from 'react-native';
import {StackScreenProps} from '@react-navigation/stack';
import {Picker} from '@react-native-picker/picker';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

import {ProductsStackParams} from '../navigator/ProductsNavigator';
import {useCategories} from '../hooks/useCategories';
import {useForm} from '../hooks/useForm';
import {ProductsContext} from '../context/ProductsContext';

interface Props
  extends StackScreenProps<ProductsStackParams, 'ProductScreen'> {}
export const ProductScreen = ({route, navigation}: Props) => {
  const {id, name = ''} = route.params;

  const [tempUri, setTempUri] = useState<string>();

  const {categories} = useCategories();

  const {loadProductById, addProduct, updateProduct, deleteProduct} =
    useContext(ProductsContext);

  const {_id, categoriaId, nombre, img, onChange, setFormValue} = useForm({
    _id: id,
    categoriaId: '',
    nombre: name,
    img: '',
  });

  useEffect(() => {
    navigation.setOptions({
      title: nombre ? nombre : 'Sin nombre del producto',
    });
  }, [nombre]);

  useEffect(() => {
    loadProduct();
  }, []);

  const loadProduct = async () => {
    if (!id || id.length === 0) {
      return;
    }
    const product = await loadProductById(id);
    setFormValue({
      _id: id,
      categoriaId: product.categoria._id,
      img: product.img || '',
      nombre,
    });
  };

  const saveOrUpdate = async () => {
    if (id && id.length > 0) {
      updateProduct(categoriaId, nombre, id);
    } else {
      const tempCategoriaId = categoriaId || categories[0]._id;
      const newProduct = await addProduct(tempCategoriaId, nombre);
      onChange(newProduct._id, '_id');
    }
  };

  const errase = async () => {
    if (id && id.length > 0) {
      deleteProduct(id);
    }
  };

  const takePhoto = () => {
    // const result = await launchCamera(options?);
    launchCamera({mediaType: 'photo'}, resp => {
      if (resp.didCancel) return;
      if (!resp.assets || !resp.assets[0].uri) return;
      setTempUri(resp.assets[0].uri);
    });
  };

  const getPhoto = () => {
    // const result = await launchImageLibrary(options?);
    launchImageLibrary({mediaType: 'photo'}, resp => console.log(resp));
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <Text style={styles.label}>Nombre del producto</Text>
        <TextInput
          placeholder="Producto"
          value={nombre}
          onChangeText={value => onChange(value, 'nombre')}
          style={styles.textInput}
        />

        <Text style={styles.label}>Categoría</Text>

        <Picker
          selectedValue={categoriaId}
          onValueChange={value => onChange(value, 'categoriaId')}>
          {categories.map(c => (
            <Picker.Item label={c.nombre} value={c._id} key={c._id} />
          ))}
        </Picker>

        <Button
          title={_id && _id.length > 0 ? 'Actualizar' : 'Guardar'}
          onPress={saveOrUpdate}
          color={'#5856D6'}
        />

        {_id && _id.length > 0 && (
          <View style={{marginTop: 10}}>
            <Button title="Borrar" onPress={errase} color={'#5856D6'} />
          </View>
        )}

        {_id && _id.length > 0 && (
          <View style={styles.btnContainer}>
            <View style={{flex: 1}}>
              <Button title="Cámara" onPress={takePhoto} color={'#5856D6'} />
            </View>
            <View style={{width: 10}} />
            <View style={{flex: 1}}>
              <Button title="Galería" onPress={getPhoto} color={'#5856D6'} />
            </View>
          </View>
        )}

        {img.length > 0 && !tempUri && (
          <Image source={{uri: img}} style={styles.productImg} />
        )}

        {tempUri && <Image source={{uri: tempUri}} style={styles.productImg} />}
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
  btnContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
  },
  productImg: {
    marginTop: 20,
    width: '100%',
    height: 300,
  },
});
