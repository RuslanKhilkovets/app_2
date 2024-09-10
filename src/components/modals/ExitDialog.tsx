import {StyleSheet, Text, View} from 'react-native';
import React, {useContext} from 'react';
import {Button, Dialog} from '@/components';
import {useNavigation} from '@react-navigation/native';
import {SignTypes} from '@/constants';
import {AuthContext} from '@/contexts/Auth/AuthContext';

interface IExitDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

const ExitDialog = ({isOpen, onClose}: IExitDialogProps) => {
  const navigation = useNavigation();
  const {logout} = useContext(AuthContext);

  const onExit = async () => {
    await logout();
    navigation.navigate('SignForms', {action: SignTypes.SIGN_IN});

    onClose();
  };

  const cancel = async () => {
    onClose();
  };

  return (
    <Dialog isOpen={isOpen} onClose={onClose}>
      <View style={styles.container}>
        <Text style={styles.title}>Ви впевнені що хочете вийти?</Text>
        <Button onPress={onExit}>Вийти</Button>
        <Button onPress={cancel} type="bordered">
          Скасувати
        </Button>
      </View>
    </Dialog>
  );
};

export default ExitDialog;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    padding: 10,
    gap: 10,
  },
  title: {
    textAlign: 'center',
    fontFamily: 'Raleway-Regular',
    fontSize: 15,
    marginBottom: 5,
  },
});
