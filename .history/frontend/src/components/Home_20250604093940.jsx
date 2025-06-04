import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Modal,
  SafeAreaView,
  Alert,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useForm, Controller } from 'react-hook-form';
import { getAllJobsAsync, postJobAsync } from '../../redux/slice/pos';
import JobCard from '../../components/JobCard';
import colors from '../../theme/colors';

const Home = () => {
  const dispatch = useDispatch();
  const jobs = useSelector((state) => state.jobs.jobs);
  const loading = useSelector((state) => state.jobs.loading);
  const user = useSelector((state) => state.auth.user);
  const [selectedJob, setSelectedJob] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const {
    control,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      jobName: '',
      jobAddress: '',
      jobDescription: '',
    },
  });

  useEffect(() => {
    dispatch(getAllJobsAsync());
  }, [dispatch]);

  const handleJobPress = (job) => {
    setSelectedJob(job);
    setValue('jobName', job.jobName);
    setModalVisible(true);
  };

  const handleUseMyAddress = () => {
    if (user?.address) {
      setValue('jobAddress', user.address);
    }
  };

  const onSubmit = async (data) => {
    try {
      const jobData = {
        jobName: data.jobName,
        jobAddress: data.jobAddress,
        jobDescription: data.jobDescription,
      };
      
      await dispatch(postJobAsync(jobData)).unwrap();
      setModalVisible(false);
      reset();
      Alert.alert('Success', 'Job posted successfully');
    } catch (error) {
      Alert.alert('Error', error || 'Failed to post job');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Available Jobs</Text>
      </View>

      <FlatList
        data={jobs}
        renderItem={({ item }) => (
          <JobCard job={item} onPress={handleJobPress} />
        )}
        keyExtractor={(item) => item._id}
        contentContainerStyle={styles.listContent}
        refreshing={loading}
        onRefresh={() => dispatch(getAllJobsAsync())}
      />

      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={false}
        onRequestClose={() => {
          setModalVisible(false);
          reset();
        }}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Post a Job</Text>
            <TouchableOpacity onPress={() => {
              setModalVisible(false);
              reset();
            }}>
              <Text style={styles.modalClose}>Close</Text>
            </TouchableOpacity>
          </View>

          <ScrollView contentContainerStyle={styles.formContainer}>
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Job Name</Text>
              <Controller
                control={control}
                rules={{ required: 'Job name is required' }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    style={styles.input}
                    placeholder="Enter job name"
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    editable={false}
                  />
                )}
                name="jobName"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Job Address</Text>
              <Controller
                control={control}
                rules={{ required: 'Job address is required' }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    style={styles.input}
                    placeholder="Enter job address"
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    multiline
                  />
                )}
                name="jobAddress"
              />
              {user?.address && (
                <TouchableOpacity 
                  style={styles.useAddressButton}
                  onPress={handleUseMyAddress}
                >
                  <Text style={styles.useAddressText}>Use My Address</Text>
                </TouchableOpacity>
              )}
              {errors.jobAddress && (
                <Text style={styles.errorText}>{errors.jobAddress.message}</Text>
              )}
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Job Description</Text>
              <Controller
                control={control}
                rules={{ required: 'Job description is required' }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    style={[styles.input, styles.textArea]}
                    placeholder="Enter job description"
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    multiline
                    numberOfLines={4}
                  />
                )}
                name="jobDescription"
              />
              {errors.jobDescription && (
                <Text style={styles.errorText}>{errors.jobDescription.message}</Text>
              )}
            </View>

            <TouchableOpacity
              style={styles.submitButton}
              onPress={handleSubmit(onSubmit)}
              disabled={loading}
            >
              <Text style={styles.submitButtonText}>
                {loading ? 'Posting...' : 'Post Job'}
              </Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.grayLight,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: colors.textDark,
  },
  listContent: {
    padding: 16,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: colors.background,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.grayLight,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.textDark,
  },
  modalClose: {
    fontSize: 16,
    color: colors.primary,
    fontWeight: '600',
  },
  formContainer: {
    padding: 16,
  },
  inputGroup: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 14,
    color: colors.textDark,
    marginBottom: 8,
    fontWeight: '500',
  },
  input: {
    backgroundColor: colors.grayLight,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
    fontSize: 16,
    color: colors.textDark,
    borderWidth: 1,
    borderColor: colors.grayDark,
  },
  textArea: {
    minHeight: 100,
    textAlignVertical: 'top',
  },
  useAddressButton: {
    marginTop: 8,
    alignSelf: 'flex-start',
  },
  useAddressText: {
    color: colors.primary,
    fontSize: 14,
    fontWeight: '500',
  },
  errorText: {
    color: colors.danger,
    fontSize: 14,
    marginTop: 4,
  },
  submitButton: {
    backgroundColor: colors.primary,
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 24,
  },
  submitButtonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: '600',
  },
});

export default Home;