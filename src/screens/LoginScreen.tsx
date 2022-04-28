import React, {useContext} from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {StackScreenProps} from '@react-navigation/stack';

import {loginStyles} from '../theme/loginTheme';
import {AuthContext} from '../context/AuthContext';
import {useForm} from '../hooks/useForm';
import {Background} from '../components/Background';
import {WhiteLogo} from '../components/WhiteLogo';

interface Props extends StackScreenProps<any, any> {}

export const LoginScreen = ({navigation}: Props) => {
  const {signIn} = useContext(AuthContext);
  const {email, password, onChange} = useForm({
    email: '',
    password: '',
  });

  const onLogin = () => {
    console.log({email, password});
    Keyboard.dismiss();
    signIn({correo: email, password});
  };

  return (
    <>
      <Background />

      <KeyboardAvoidingView
        style={{flex: 1}}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <View style={loginStyles.formContainer}>
          <WhiteLogo />

          <Text style={loginStyles.title}>Login</Text>

          <Text style={loginStyles.label}>Email</Text>
          <TextInput
            placeholder="Ingrese su email"
            placeholderTextColor={'rgba(255,255,255,0.4)'}
            keyboardType="email-address"
            underlineColorAndroid={'white'}
            style={[
              loginStyles.inputField,
              Platform.OS === 'ios' && loginStyles.inputFieldIOS,
            ]}
            selectionColor="white"
            onChangeText={value => onChange(value, 'email')}
            value={email}
            onSubmitEditing={onLogin}
            autoCapitalize="none"
            autoCorrect={false}
          />

          <Text style={loginStyles.label}>Password</Text>
          <TextInput
            placeholder="******"
            placeholderTextColor={'rgba(255,255,255,0.4)'}
            underlineColorAndroid={'white'}
            secureTextEntry
            style={[
              loginStyles.inputField,
              Platform.OS === 'ios' && loginStyles.inputFieldIOS,
            ]}
            selectionColor="white"
            onChangeText={value => onChange(value, 'password')}
            value={password}
            onSubmitEditing={onLogin}
            autoCapitalize="none"
            autoCorrect={false}
          />

          <View style={loginStyles.btnContainer}>
            <TouchableOpacity
              activeOpacity={0.8}
              style={loginStyles.btn}
              onPress={onLogin}>
              <Text style={loginStyles.btnText}>Login</Text>
            </TouchableOpacity>
          </View>

          <View style={loginStyles.newUserContainer}>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => navigation.replace('RegisterScreen')}>
              <Text style={loginStyles.btnText}>Nueva cuenta</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </>
  );
};
