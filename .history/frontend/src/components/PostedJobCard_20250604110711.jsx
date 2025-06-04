import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import colors from '../theme/colors';

const PostedJobCard = ({ 
  job, 
  showUserDetails = false, 
  isAdmin = false, 
  editMode = false, 
  onEditClick, 
  onSave 
}) => {
  const [phone, setPhone] = useState(job.phone || '');
  const [status, setStatus] = useState(job.jobStatus);

  const getStatusColor = () => {
    switch(status) {
      case 'completed': return colors.success;
      case 'rejected': return colors.danger;
      default: return colors.warning;
    }
  };

  const handleSave = () => {
    // Here you would dispatch an action to update the job
    // For now, we'll just call onSave
    onSave();
  };

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.jobName}>{job.jobName}</Text>
        {isAdmin ? (
          editMode ? (
            <View style={styles.statusSelector}>
              <TouchableOpacity
                style={[
                  styles.statusOption,
                  status === 'pending' && styles.selectedOption,
                ]}
                onPress={() => setStatus('pending')}
              >
                <Text style={status === 'pending' && styles.selectedOptionText}>
                  Pending
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.statusOption,
                  status === 'completed' && styles.selectedOption,
                ]}
                onPress={() => setStatus('completed')}
              >
                <Text style={status === 'completed' && styles.selectedOptionText}>
                  Completed
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.statusOption,
                  status === 'rejected' && styles.selectedOption,
                ]}
                onPress={() => setStatus('rejected')}
              >
                <Text style={status === 'rejected' && styles.selectedOptionText}>
                  Rejected
                </Text>
              </TouchableOpacity>
            </View>
          ) : (
            <TouchableOpacity 
              style={[styles.statusBadge, { backgroundColor: getStatusColor() }]}
              onPress={onEditClick}
            >
              <Text style={styles.statusText}>{status}</Text>
            </TouchableOpacity>
          )
        ) : (
          <View style={[styles.statusBadge, { backgroundColor: getStatusColor() }]}>
            <Text style={styles.statusText}>{status}</Text>
          </View>
        )}
      </View>
      
      <Text style={styles.description}>{job.jobDescription}</Text>
      <Text style={styles.address}>{job.jobAddress}</Text>
      
      {isAdmin && editMode ? (
        <View style={styles.editSection}>
          <TextInput
            style={styles.phoneInput}
            value={phone}
            onChangeText={setPhone}
            placeholder="Add/Update phone number"
            keyboardType="phone-pad"
          />
          <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
            <Text style={styles.saveButtonText}>Save Changes</Text>
          </TouchableOpacity>
        </View>
      ) : (
        job.phone && <Text style={styles.phone}>Phone: {job.phone}</Text>
      )}

      {showUserDetails && job.user && (
        <View style={styles.userSection}>
          <Text style={styles.userLabel}>Posted by:</Text>
          <Text style={styles.userName}>{job.user.name}</Text>
          <Text style={styles.userEmail}>{job.user.email}</Text>
          {job.user.phone && (
            <Text style={styles.userPhone}>{job.user.phone}</Text>
          )}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.white,
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: colors.grayLight,
    shadowColor: colors.grayDark,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  jobName: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.textDark,
    flex: 1,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginLeft: 8,
    minWidth: 80,
    alignItems: 'center',
  },
  statusText: {
    color: colors.white,
    fontSize: 12,
    fontWeight: '500',
    textTransform: 'capitalize',
  },
  statusSelector: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: 8,
  },
  statusOption: {
    paddingHorizontal: 6,
    paddingVertical: 4,
    borderRadius: 6,
    marginHorizontal: 2,
    borderWidth: 1,
    borderColor: colors.grayLight,
  },
  selectedOption: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  selectedOptionText: {
    color: colors.white,
  },
  description: {
    fontSize: 14,
    color: colors.textDark,
    marginBottom: 8,
    lineHeight: 20,
  },
  address: {
    fontSize: 14,
    color: colors.textLight,
    marginBottom: 8,
  },
  phone: {
    fontSize: 14,
    color: colors.primary,
    fontWeight: '500',
  },
  editSection: {
    marginTop: 8,
    marginBottom: 8,
  },
  phoneInput: {
    borderWidth: 1,
    borderColor: colors.grayLight,
    borderRadius: 4,
    padding: 8,
    marginBottom: 8,
  },
  saveButton: {
    backgroundColor: colors.primary,
    padding: 10,
    borderRadius: 4,
    alignItems: 'center',
  },
  saveButtonText: {
    color: colors.white,
    fontWeight: '500',
  },
  userSection: {
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: colors.grayLight,
  },
  userLabel: {
    fontSize: 12,
    color: colors.textLight,
    marginBottom: 4,
  },
  userName: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.textDark,
  },
  userEmail: {
    fontSize: 13,
    color: colors.textLight,
  },
  userPhone: {
    fontSize: 13,
    color: colors.primary,
  },
});

export default PostedJobCard;