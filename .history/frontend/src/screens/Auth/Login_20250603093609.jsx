// screens/LoginScreen.js
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { clearError, loginUserAsync, selectAuthError, selectAuthLoading } from '../../redux/slice/authSlice';
import AuthForm from '../../components/AuthForm';
import colors from '../../theme/colors';
import { CommonActions } from '@react-navigation/native';

const LoginScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const loading = useSelector(selectAuthLoading);
  const error = useSelector(selectAuthError);
  const [formError, setFormError] = useState(null);

  const handleLogin = async (data) => {
    try {
      setFormError(null);
      await dispatch(loginUserAsync(data)).unwrap();
      // On successful login, navigation is handled by AuthCheck
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: "AuthCheck" }],
        })
      );

      dispatch(clearError())
    } catch (err) {
      setFormError(err);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Welcome Back</Text>
        <Text style={styles.subtitle}>Login to your account</Text>
      </View>

      <AuthForm
        onSubmit={handleLogin}
        isLogin={true}
        loading={loading}
        error={error || }
      />

      <View style={styles.footer}>
        <Text style={styles.footerText}>Don't have an account?</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
          <Text style={styles.footerLink}>Sign up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    justifyContent: 'center',
    padding: 24,
  },
  header: {
    marginBottom: 32,
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.textDark,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: colors.textLight,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 24,
  },
  footerText: {
    color: colors.textLight,
    marginRight: 4,
  },
  footerLink: {
    color: colors.primary,
    fontWeight: '600',
  },
});

export default LoginScreen;