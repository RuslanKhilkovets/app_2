import React from 'react';
import {StyleSheet, TouchableOpacity, View, Modal, Text} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

interface IDatePickerProps {
  isOpen: boolean;
  date?: Date;
  onChange: (date: Date | undefined) => void;
  onClose: () => void;
  maxDate?: Date | null;
  minDate?: Date | null;
}

const DatePicker = ({
  isOpen,
  date,
  onChange,
  onClose,
  maxDate,
  minDate,
}: IDatePickerProps) => {
  const currentDate = date || new Date();

  return (
    <Modal
      visible={isOpen}
      transparent={true}
      animationType="fade"
      onRequestClose={onClose}>
      <View style={styles.modalOverlay}>
        <View style={styles.dialogContainer}>
          <DateTimePicker
            maximumDate={maxDate}
            minimumDate={minDate}
            value={currentDate}
            mode="date"
            display="inline"
            onChange={(e, selectedDate) => onChange(selectedDate)}
          />
        </View>
      </View>
    </Modal>
  );
};

export default DatePicker;

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    padding: 35,
  },
  dialogContainer: {
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 5,
  },
  closeButton: {
    marginTop: 20,
    backgroundColor: '#007AFF',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});
