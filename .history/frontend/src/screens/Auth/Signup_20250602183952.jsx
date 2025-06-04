// screens/SignupScreen.js
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { registerUserAsync } from '../redux/slices/authSlice';
import AuthForm from '../components/AuthForm';
import colors from '../constants/colors';

const SignupScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.auth.loading);
  const error = useSelector((state) => state.auth.error);
  const [formError, setFormError] = useState(null);

  const handleSignup = async (data) => {
    try {
      setFormError(null);
      await dispatch(registerUserAsync(data)).unwrap();
      // On successful signup, navigation is handled by AuthCheck
    } catch (err) {
      setFormError(err);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Create Account</Text>
        <Text style={styles.subtitle}>Join us today</Text>
      </View>

      <AuthForm
        onSubmit={handleSignup}
        isLogin={false}
        loading={loading}
        error={formError || error}
      />

      <View style={styles.footer}>
        <Text style={styles.footerText}>Already have an account?</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={styles.footerLink}>Login</Text>
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

export default SignupScreen;