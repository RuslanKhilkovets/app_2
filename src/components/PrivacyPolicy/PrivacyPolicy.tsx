import React from 'react';

import {ScrollView, StyleSheet, Text, View} from 'react-native';

import ScreenHeader from '../ScreenHeader/ScreenHeader';
import PrivacyPolicyBlock from './PrivacyPolicyBlock';
import CustomButton from '../UI/CustomButton';

import useGoBack from '../../hooks/useGoBack';

import GoBackIcon from '../../../assets/images/back.svg';
import Screen from '../Screen/Screen';

const PrivacyPolicy = () => {
  const goBack = useGoBack();

  return (
    <Screen title="Політика конфіндейційності" backColor="#fff">
      <View style={styles.container}>
        <ScrollView>
          <PrivacyPolicyBlock title="1. ОБЛАСТЬ ЗАСТОСУВАННЯ ТА ЗГОДА">
            <Text style={styles.text}>
              1.1. Персональні дані фізичних осіб - користувачів сервісу OLX.ua
              обробляються ТОВ «ЄМАРКЕТ УКРАЇНА», юридичною особою,
              зареєстрованою за законодавством України, з місцезнаходженням за
              адресою вул. Болсуновська, 13-15, м. Київ, Україна, 01014 (далі -
              Компанія). Компанія є власником Бази персональних даних
              користувачів OLX.ua.
            </Text>
            <Text style={styles.text}>
              1.2. Розпорядником Бази персональних даних користувачів OLX.ua є
              компанія OLX Global BV, яка створена і діє за законодавством
              Королівства Нідерландів (ця країна є учасником Конвенції про
              захист осіб у зв'язку з автоматизованою обробкою персональних
              даних, та членом Європейського економічного простору) і
              знаходиться за адресою: Gustav Mahlerplein 5, 1082 MS, м.
              Амстердам, Нідерланди.
            </Text>
          </PrivacyPolicyBlock>
          <PrivacyPolicyBlock title="2. ІНФОРМАЦІЯ, ЯКУ ЗБИРАЄ, ОТРИМУЄ І РОЗМІЩУЄ КОМПАНІЯ">
            <Text style={styles.text}>
              2.1. Інформація про реєстрацію: При створенні Користувачем
              облікового запису на Сайті, Компанія може вимагати певну
              інформацію, таку як дійсну адресу електронної пошти та пароль.
              Обліковий запис включає в себе таку інформацію про них, як
              географічне розташування, ім'я та прізвище, номер телефону і
              супутню інформацію, в тому числі фотографії, які вони можуть
              завантажувати у свій обліковий запис.
            </Text>
            <Text style={styles.text}>
              2.2. Оголошення та Угоди: В рамках діяльності свого Сайту,
              Компанія може розміщувати інформацію, в тому числі особистого і
              контактного характеру, необхідну для здійснення угод між покупцем
              і продавцем, для надсилання повідомлень і спілкування користувачів
              між собою, та здійснення платежів. Вся інформація, необхідна для
              публікації оголошень, потрібна для створення облікового запису.
              Користувачі несуть відповідальність за всю інформацію, що
              розміщується ними на Сайті. Користувач повинен уважно усвідомити
              всі ризики, пов'язані з тим, що він оприлюднює адресу, або
              інформацію особистого характеру.
            </Text>
          </PrivacyPolicyBlock>
        </ScrollView>

        <View style={styles.btnContainer}>
          <CustomButton
            onPress={goBack}
            type="bordered"
            before={<GoBackIcon />}>
            Повернутися назад
          </CustomButton>
        </View>
      </View>
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerTitle: {
    color: '#000',
    fontSize: 22,
  },

  text: {
    paddingVertical: 10,
    color: '#000',
    fontFamily: 'Raleway-Regular',
    fontSize: 17,
    lineHeight: 20,
  },
  btnContainer: {
    marginTop: 30,
    marginBottom: 10,
  },
});

export default PrivacyPolicy;
