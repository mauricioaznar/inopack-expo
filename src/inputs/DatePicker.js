import React, { useState } from "react";
import { View } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import {Icon, Input} from 'react-native-elements'
import moment from 'moment'

const DatePicker = ({onChangeDate, label = ''}) => {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [inputDate, setInputDate] = useState(null)

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    const formattedDate = moment(date).format('YYYY-MM-DD')
    setInputDate(formattedDate)
    if (onChangeDate) {
      onChangeDate(formattedDate)
    }
    hideDatePicker()
  };

  return (
    <View>
      <Input
        disabled
        label={label}
        value={inputDate}
        rightIcon={() => {
          return <Icon
            onPress={() => {
              showDatePicker()
            }}
            name="calendar"
            type="font-awesome-5"
          />
        }}
      />
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
    </View>
  );
};

export default DatePicker