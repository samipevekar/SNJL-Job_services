import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import colors from '../theme/colors';

const JobCard = ({ job, onPress }) => {
  return (
    <TouchableOpacity onPress={() => onPress(job)} style={styles.card}>
      <Image 
        source={{ uri: job.image }} 
        style={styles.image}
        resizeMode="cover"
        
      />
      <View style={styles.content}>
        <Text style={styles.jobName}>{job.jobName}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.white,
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 16,
    shadowColor: colors.grayDark,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  image: {
    width: '100%',
    height: 150,
  },
  content: {
    padding: 16,
  },
  jobName: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.textDark,
  },
});

export default JobCard;