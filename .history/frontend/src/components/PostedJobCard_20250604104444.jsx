import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import colors from '../theme/colors';

const PostedJobCard = ({ job, showUserDetails = false }) => {
  const getStatusColor = () => {
    switch(job.jobStatus) {
      case 'completed': return colors.success;
      case 'rejected': return colors.danger;
      default: return colors.warning;
    }
  };

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.jobName}>{job.jobName}</Text>
        <View style={[styles.statusBadge, { backgroundColor: getStatusColor() }]}>
          <Text style={styles.statusText}>{job.jobStatus}</Text>
        </View>
      </View>
      
      <Text style={styles.description}>{job.jobDescription}</Text>
      <Text style={styles.address}>{job.jobAddress}</Text>
      
      {job.phone && (
        <Text style={styles.phone}>Worker Phone: {job.phone}</Text>
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
  },
  statusText: {
    color: colors.white,
    fontSize: 12,
    fontWeight: '500',
    textTransform: 'capitalize',
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