import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import GetLocation from 'react-native-get-location';

import {
  FilterItem,
  EditButton,
  Button,
  Checkbox,
  DatePicker,
  CategoriesModal,
  LocationModal,
} from '@/components';
import {ICategory, ILocation} from '@/types';
import TABS from '@/constants/Tabs';
import {useAuthMutation} from '@/hooks';
import {Api} from '@/api';

enum FILTER_TYPE {
  WITH_DESCRIPTION = 'withBody',
  WITH_PIC = 'withPhoto',
}

enum STATIC_DATE_TYPE {
  WEEK = 'week',
  MONTH = 'month',
}

interface IFilterItemsFormProps {
  type: TABS;
}

const FilterItemsForm = ({type}: IFilterItemsFormProps) => {
  const [selectedValues, setSelectedValues] = useState<FILTER_TYPE[]>([]);
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();
  const [category, setCategory] = useState<ICategory | null>(null);
  const [staticDateType, setStaticDateType] = useState<STATIC_DATE_TYPE | null>(
    null,
  );
  const [location, setLocation] = useState<ILocation | null>({
    name: 'Невідомо',
  });
  const [error, setError] = useState('');
  const [categoryModalOpen, setCategoryModalOpen] = useState(false);
  const [locationModalOpen, setLocationModalOpen] = useState(false);
  const [openStartDatePicker, setOpenStartDatePicker] = useState(false);
  const [openEndDatePicker, setOpenEndDatePicker] = useState(false);

  const {isLoading, mutate} = useAuthMutation({
    mutationFn: Api.myPosts.getAll,
    onSuccess: res => {
      console.log(res);
    },
    onError: ({errors}) => {
      setError(errors?.message);
    },
  });

  const handleChooseStaticDate = (type: STATIC_DATE_TYPE | null) => {
    setStartDate(undefined);
    setEndDate(undefined);

    setStaticDateType(type);
  };

  const handleValueChange = (value: any) => {
    setSelectedValues(prevValues =>
      prevValues.includes(value)
        ? prevValues.filter(v => v !== value)
        : [...prevValues, value],
    );
  };

  useEffect(() => {
    if (staticDateType !== null) {
      setEndDate(undefined);
      setEndDate(undefined);
    }
  }, [staticDateType]);

  const onFiltersApply = () => {
    const params = {
      type: type,
      action_at_from: startDate || null,
      action_at_to: endDate || null,
      last: staticDateType || null,
      category: category?.id,
      withPhoto: +selectedValues.includes(FILTER_TYPE.WITH_PIC),
      withBody: +selectedValues.includes(FILTER_TYPE.WITH_DESCRIPTION),
    };

    mutate(params);
  };

  useEffect(() => {
    GetLocation.getCurrentPosition({
      enableHighAccuracy: true,
      timeout: 60000,
    })
      .then(location => {
        console.log('Location', location);
      })
      .catch(error => {
        console.log('Error', error);
      });
  }, []);

  useEffect(() => {
    if (startDate || endDate) {
      setStaticDateType(null);
    }

    setOpenEndDatePicker(false);
    setOpenStartDatePicker(false);
  }, [startDate, endDate]);

  useEffect(() => {
    setCategoryModalOpen(false);
  }, [category]);

  useEffect(() => {
    setLocationModalOpen(false);
  }, [location]);

  return (
    <View style={styles.tabContent}>
      <ScrollView>
        <FilterItem title="Категорія">
          <EditButton
            title={category?.name || 'Вибрати категорію'}
            onPress={() => setCategoryModalOpen(true)}
          />
        </FilterItem>
        <FilterItem title="Дата публікації">
          <View style={{flexDirection: 'row', gap: 10}}>
            <TouchableOpacity
              activeOpacity={0.7}
              style={[
                styles.dateButton,
                staticDateType === STATIC_DATE_TYPE.WEEK && {
                  borderColor: '#000',
                },
              ]}
              onPress={() => handleChooseStaticDate(STATIC_DATE_TYPE.WEEK)}>
              <Text
                style={[
                  styles.dateButtonText,
                  staticDateType === STATIC_DATE_TYPE.WEEK && {
                    fontFamily: 'Raleway-SemiBold',
                  },
                ]}>
                За останній тиждень
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.7}
              style={[
                styles.dateButton,
                staticDateType === STATIC_DATE_TYPE.MONTH && {
                  borderColor: '#000',
                },
              ]}
              onPress={() => handleChooseStaticDate(STATIC_DATE_TYPE.MONTH)}>
              <Text
                style={[
                  styles.dateButtonText,
                  staticDateType === STATIC_DATE_TYPE.MONTH && {
                    fontFamily: 'Raleway-SemiBold',
                  },
                ]}>
                Останній місяць
              </Text>
            </TouchableOpacity>
          </View>

          <View
            style={{
              flexDirection: 'row',
              paddingVertical: 14,
              gap: 16,
              alignItems: 'center',
            }}>
            <Text style={styles.selectDateText}>З</Text>

            <DatePicker
              setOpen={() => setOpenStartDatePicker(true)}
              maxDate={endDate || new Date()}
              date={startDate}
              isOpen={openStartDatePicker}
              onClose={() => setOpenStartDatePicker(false)}
              onChange={date => setStartDate(date || undefined)}
            />

            <Text style={styles.selectDateText}>до</Text>

            <DatePicker
              setOpen={() => setOpenEndDatePicker(true)}
              date={endDate}
              maxDate={new Date()}
              minDate={startDate || undefined}
              isOpen={openEndDatePicker}
              onClose={() => setOpenEndDatePicker(false)}
              onChange={date => setEndDate(date || undefined)}
            />
          </View>
        </FilterItem>
        <FilterItem title="Локація">
          <EditButton
            title={location?.name || 'Unknown'}
            onPress={() => setLocationModalOpen(true)}
          />
        </FilterItem>
        <View style={{flexDirection: 'row', gap: 60, marginVertical: 30}}>
          <Checkbox
            label="З описом"
            value={FILTER_TYPE.WITH_DESCRIPTION}
            onValueChange={handleValueChange}
            checked={selectedValues.includes(FILTER_TYPE.WITH_DESCRIPTION)}
          />
          <Checkbox
            label="З фото"
            value={FILTER_TYPE.WITH_PIC}
            onValueChange={handleValueChange}
            checked={selectedValues.includes(FILTER_TYPE.WITH_PIC)}
          />
        </View>
      </ScrollView>

      <Button onPress={onFiltersApply}>Застосувати</Button>

      <CategoriesModal
        visible={categoryModalOpen}
        onClose={() => setCategoryModalOpen(false)}
        setCategory={setCategory}
      />

      <LocationModal
        openFrom="right"
        visible={locationModalOpen}
        onClose={() => setLocationModalOpen(false)}
        location={location}
        setLocation={setLocation}
      />
    </View>
  );
};

export default FilterItemsForm;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tabContent: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  dateButton: {
    paddingHorizontal: 10,
    paddingVertical: 12,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#e4e4e4',
    flexShrink: 1,
  },
  dateButtonText: {
    fontFamily: 'Raleway-Regular',
    color: '#595959',
  },
  selectDateButton: {
    flexShrink: 1,
    borderRadius: 10,
  },
  selectDateText: {
    fontSize: 15,
    fontFamily: 'Raleway-Regular',
  },
});
