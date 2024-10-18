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
import {ICategory, IFilters, ILocation} from '@/types';
import ContentType from '@/constants/ContentType';
import STATIC_DATE_TYPE from '@/constants/StaticDateType';
import FILTER_TYPE from '@/constants/FilterType';

interface IFilterItemsFormProps {
  type: ContentType;
  filters: IFilters;
  setFilters: React.Dispatch<React.SetStateAction<IFilters>>;
  onFormClose: () => void;
}

const FilterItemsForm = ({
  type,
  filters,
  setFilters,
  onFormClose,
}: IFilterItemsFormProps) => {
  const [selectedValues, setSelectedValues] = useState<FILTER_TYPE[]>([]);
  const [startDate, setStartDate] = useState<Date | null>(
    filters.action_at_from,
  );
  const [endDate, setEndDate] = useState<Date | null>(filters.action_at_to);
  const [category, setCategory] = useState<ICategory | null>(filters?.category);
  const [staticDateType, setStaticDateType] = useState<
    STATIC_DATE_TYPE | null | undefined
  >(filters?.last);
  const [location, setLocation] = useState<ILocation | null>(null);
  const [categoryModalOpen, setCategoryModalOpen] = useState(false);
  const [locationModalOpen, setLocationModalOpen] = useState(false);
  const [openStartDatePicker, setOpenStartDatePicker] = useState(false);
  const [openEndDatePicker, setOpenEndDatePicker] = useState(false);

  const handleChooseStaticDate = (type: STATIC_DATE_TYPE | null) => {
    setStartDate(null);
    setEndDate(null);

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
      setEndDate(null);
      setEndDate(null);
    }
  }, [staticDateType]);

  const onFiltersApply = () => {
    const params = {
      q: filters.q,
      type: type,
      action_at_from: startDate || null,
      action_at_to: endDate || null,
      last: staticDateType || null,
      category: category,
      withPhoto: +selectedValues.includes(FILTER_TYPE.WITH_PIC),
      withBody: +selectedValues.includes(FILTER_TYPE.WITH_DESCRIPTION),
      location: location,
    };

    setFilters(params);

    onFormClose();
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
              onChange={date => setStartDate(date || null)}
            />

            <Text style={styles.selectDateText}>до</Text>

            <DatePicker
              setOpen={() => setOpenEndDatePicker(true)}
              date={endDate}
              maxDate={new Date()}
              minDate={startDate || undefined}
              isOpen={openEndDatePicker}
              onClose={() => setOpenEndDatePicker(false)}
              onChange={date => setEndDate(date || null)}
            />
          </View>
        </FilterItem>
        <FilterItem title="Локація">
          <EditButton
            title={location?.name || 'Не визначено'}
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
    color: '#000',
  },
});
