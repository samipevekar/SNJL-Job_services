import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import colors from '../theme/colors';
import PostedJobCard from '../components/PostedJobCard';
import { getAllPostedJobsAsync } from '../redux/slices/postedJobSlice';
import StatusFilter from '../components/StatusFilter';

const AdminDashboard = () => {
  const dispatch = useDispatch();
  const { jobs, loading, error } = useSelector((state) => state.postedJobs);
  const [selectedStatus, setSelectedStatus] = useState('pending');
  const [editMode, setEditMode] = useState(null);

  useEffect(() => {
    dispatch(getAllPostedJobsAsync(selectedStatus));
  }, [selectedStatus, dispatch]);

  const handleStatusChange = (status) => {
    setSelectedStatus(status);
  };

  const handleEditClick = (jobId) => {
    setEditMode(editMode === jobId ? null : jobId);
  };

  const statuses = ['pending', 'completed', 'rejected'];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Admin Dashboard</Text>
      
      <StatusFilter 
        statuses={statuses}
        selectedStatus={selectedStatus}
        onStatusChange={handleStatusChange}
      />

      {loading ? (
        <Text style={styles.loading}>Loading jobs...</Text>
      ) : error ? (
        <Text style={styles.error}>{error}</Text>
      ) : (
        <ScrollView style={styles.jobsContainer}>
          {jobs.length === 0 ? (
            <Text style={styles.noJobs}>No jobs found with status: {selectedStatus}</Text>
          ) : (
            jobs.map((job) => (
              <PostedJobCard 
                key={job._id}
                job={job}
                showUserDetails={true}
                isAdmin={true}
                editMode={editMode === job._id}
                onEditClick={() => handleEditClick(job._id)}
                onSave={() => setEditMode(null)}
              />
            ))
          )}
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: colors.grayLight,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.textDark,
    marginBottom: 20,
    textAlign: 'center',
  },
  loading: {
    textAlign: 'center',
    color: colors.textLight,
    marginTop: 20,
  },
  error: {
    textAlign: 'center',
    color: colors.danger,
    marginTop: 20,
  },
  noJobs: {
    textAlign: 'center',
    color: colors.textLight,
    marginTop: 20,
  },
  jobsContainer: {
    marginTop: 10,
  },
});

export default AdminDashboard;