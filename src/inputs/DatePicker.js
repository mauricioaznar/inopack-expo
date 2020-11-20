import React, { useState } from "react";
import { Button, View } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import {Icon, Input} from 'react-native-elements'
import Spacer from '../components/Spacer'

const DatePicker = ({onChangeText}) => {
  const input = React.createRef();
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [inputDate, setInputDate] = useState(null)

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    setInputDate(String('2020-02-20'))
    if (onChangeText) {
      onChangeText(date)
    }
    hideDatePicker()
  };

  return (
    <View>
      <Spacer>
        <Input
          disabled
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
      </Spacer>
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