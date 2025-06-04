import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import colors from '../theme/colors';

const StatusFilter = ({ statuses, selectedStatus, onStatusChange }) => {
  return (
    <View style={styles.container}>
      {statuses.map((status) => (
        <TouchableOpacity
          key={status}
          style={[
            styles.filterButton,
            selectedStatus === status && styles.activeFilter,
          ]}
          onPress={() => onStatusChange(status)}
        >
          <Text
            style={[
              styles.filterText,
              selectedStatus === status && styles.activeFilterText,
            ]}
          >
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 15,
  },
  filterButton: {
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 20,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.grayLight,
  },
  activeFilter: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  filterText: {
    color: colors.textLight,
    textTransform: 'capitalize',
  },
  activeFilterText: {
    color: colors.white,
  },
});

export default StatusFilter;