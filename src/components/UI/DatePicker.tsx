import React from 'react';
import {StyleSheet, View, Modal} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import {AppIcon, Button} from '@/components';
import {formatDate} from '@/helpers';

interface IDatePickerProps {
  isOpen: boolean;
  date: Date | string;
  onChange: (date: Date | undefined) => void;
  onClose: () => void;
  setOpen: () => void;
  maxDate?: Date | null | string;
  minDate?: Date | null | string;
}

const DatePicker = ({
  setOpen,
  isOpen,
  date,
  onChange,
  onClose,
  maxDate,
  minDate,
}: IDatePickerProps) => {
  const currentDate = date || new Date();

  return (
    <View style={{flexDirection: 'row'}}>
      <Button
        onPress={setOpen}
        type="light"
        style={styles.selectDateButton}
        after={<AppIcon name="arrow_down" size={6} />}>
        {date && formatDate(currentDate)}
      </Button>

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
    </View>
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
  selectDateButton: {
    flexShrink: 1,
    borderRadius: 10,
  },
});
