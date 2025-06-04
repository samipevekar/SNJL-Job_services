import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Modal,
  ScrollView,
  Alert,
  SafeAreaView,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useForm, Controller } from 'react-hook-form';
import {
  getMeAsync,
  editUserAsync,
  clearUser,
  selectUser,
  selectAuthLoading,
  clearError,
} from '../redux/slices/authSlice';
import { getRecruiterJobsAsync, selectJobs } from '../redux/slices/postedJobSlice';
import colors from '../constants/colors';
import { removeToken } from '../storage/AuthStorage';
import PostedJobCard from '../components/PostedJobCard';

const ProfileScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const loading = useSelector(selectAuthLoading);
  const jobs = useSelector(selectJobs);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [isEditingPassword, setIsEditingPassword] = useState(false);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      address: '',
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    },
  });

  useEffect(() => {
    if (user) {
      reset({
        name: user.name || '',
        email: user.email || '',
        phone: user.phone || '',
        address: user.address || '',
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
      });
      if (user.role === 'recruiter') {
        dispatch(getRecruiterJobsAsync());
      }
    }
  }, [user, reset, dispatch]);

  useEffect(() => {
    dispatch(getMeAsync());
  }, [dispatch]);

  const handleEditProfile = async (data) => {
    try {
      const updateData = {
        name: data.name,
        phone: data.phone,
        address: data.address,
      };

      if (isEditingPassword) {
        if (data.newPassword !== data.confirmPassword) {
          Alert.alert('Error', 'New passwords do not match');
          return;
        }
        updateData.password = data.newPassword;
        updateData.currentPassword = data.currentPassword;
      }

      await dispatch(editUserAsync({ userId: user._id, userData: updateData })).unwrap();
      setEditModalVisible(false);
      setIsEditingPassword(false);
      Alert.alert('Success', 'Profile updated successfully');
    } catch (error) {
      Alert.alert('Error', error || 'Failed to update profile');
    }
  };

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Logout',
          onPress: async () => {
            await removeToken();
            dispatch(clearUser());
            dispatch(clearError());
            navigation.navigate('Login');
          },
        },
      ]
    );
  };

  if (!user) {
    return (
      <View style={styles.container}>
        <Text>Loading profile...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
          <Text style={styles.logoutButtonText}>Logout</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.profileContainer}>
          <View style={styles.profileHeader}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>
                {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
              </Text>
            </View>
            <Text style={styles.name}>{user.name}</Text>
            <Text style={styles.email}>{user.email}</Text>
          </View>

          <View style={styles.infoContainer}>
            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>Phone</Text>
              <Text style={styles.infoValue}>{user.phone || 'Not provided'}</Text>
            </View>

            {user.address && (
              <View style={styles.infoItem}>
                <Text style={styles.infoLabel}>Address</Text>
                <Text style={styles.infoValue}>{user.address}</Text>
              </View>
            )}

            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>Account Type</Text>
              <Text style={styles.infoValue}>{user.role || 'User'}</Text>
            </View>
          </View>

          <TouchableOpacity
            style={styles.editButton}
            onPress={() => setEditModalVisible(true)}
          >
            <Text style={styles.editButtonText}>Edit Profile</Text>
          </TouchableOpacity>

          {user.role === 'recruiter' && jobs.length > 0 && (
            <View style={styles.jobsSection}>
              <Text style={styles.sectionTitle}>Your Posted Jobs</Text>
              {jobs.map((job) => (
                <PostedJobCard key={job._id} job={job} />
              ))}
            </View>
          )}
        </View>

        {/* Edit Profile Modal (keep existing modal code) */}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    padding: 16,
    alignItems: 'flex-end',
  },
  logoutButton: {
    backgroundColor: colors.danger,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  logoutButtonText: {
    color: colors.white,
    fontSize: 14,
    fontWeight: '600',
  },
  scrollContainer: {
    flexGrow: 1,
    paddingBottom: 20,
  },
  profileContainer: {
    padding: 16,
  },
  profileHeader: {
    alignItems: 'center',
    marginBottom: 24,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  avatarText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: colors.white,
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold',
    color: colors.textDark,
    marginBottom: 4,
  },
  email: {
    fontSize: 15,
    color: colors.textLight,
  },
  infoContainer: {
    marginBottom: 24,
  },
  infoItem: {
    marginBottom: 16,
  },
  infoLabel: {
    fontSize: 14,
    color: colors.textLight,
    marginBottom: 6,
  },
  infoValue: {
    fontSize: 16,
    color: colors.textDark,
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: colors.grayLight,
    borderRadius: 8,
  },
  editButton: {
    backgroundColor: colors.primary,
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 24,
  },
  editButtonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: '600',
  },
  jobsSection: {
    marginTop: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.textDark,
    marginBottom: 12,
  },
  // ... (keep all existing modal styles)
});

export default ProfileScreen;