import React, { useState } from 'react';
import { View, Button, Text,  } from 'react-native';
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';

interface DatePickerProps {
    date: Date;
    onDateChange: (selectedDate: Date) => void;
}

const DatePicker: React.FC<DatePickerProps> = ({ date, onDateChange }) => {
    const [show, setShow] = useState(false);

    const showDatepicker = () => {
        setShow(true);
    };

    const onChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
        setShow(false);
        if (selectedDate) {
            onDateChange(selectedDate);
        }
    };

    return (
        <View>
            <Button onPress={showDatepicker} title="Select Date of Birth"  />
            {show && (
                <DateTimePicker
                    testID="dateTimePicker"
                    value={date}
                    mode="date"
                    display="default"
                    onChange={onChange}
                />
            )}
            <Text>Selected: {date.toLocaleDateString()}</Text>
        </View>
    );
};


export default DatePicker;
