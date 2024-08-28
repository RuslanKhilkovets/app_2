import {memo} from 'react';
import {Text} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import {AppIcon, MenuAddItem} from '@/components';
import {
  AddItemTab,
  ChatsTab,
  ProfileTab,
  SearchTab,
  FavouritesItemsTab,
} from '@/screens';
import {useThemeContext} from '@/contexts/Theme/ThemeContext';

const Tab = createBottomTabNavigator<TabsParamList>();

interface ITabBarIcon {
  isFocused: boolean;
  iconName: string;
  activeIconName: string;
}

export interface ITabNavigatorProps {}

const TabNavigator = ({}: ITabNavigatorProps) => {
  const {colorScheme} = useThemeContext();
  const insets = useSafeAreaInsets();

  return (
    <Tab.Navigator
      screenOptions={() => ({
        headerShown: false,
        gestureEnabled: false,
        tabBarHideOnKeyboard: true,
        tabBarStyle: {
          height: insets.bottom + 60,
          paddingHorizontal: 16,
          paddingBottom: insets.bottom,
          backgroundColor: '#fff',
          // backgroundColor:
          //   colorScheme === 'light' ? theme.accent : theme.bgPrimary,
          // borderTopColor: theme.borderTertiary,
        },

        tabBarIconStyle: {maxHeight: 34},
        tabBarItemStyle: {justifyContent: 'center', alignItems: 'center'},
        tabBarLabel: ({focused, children}) => (
          <Text
            style={[
              {fontFamily: focused ? 'Raleway-SemiBold' : 'Raleway-Regular'},
            ]}>
            {children}
          </Text>
        ),
      })}
      initialRouteName="favorite-items-tab">
      <Tab.Screen
        name="search-tab"
        component={SearchTab}
        options={{
          title: 'Пошук',
          tabBarIcon: ({focused}) => (
            <TabBarIcon
              iconName="search_menu"
              isFocused={focused}
              activeIconName="search_bold_menu"
            />
          ),
        }}
      />
      <Tab.Screen
        name="favorite-items-tab"
        component={FavouritesItemsTab}
        options={{
          title: 'Вибране',
          tabBarIcon: ({focused}) => (
            <TabBarIcon
              iconName="favorite_menu"
              isFocused={focused}
              activeIconName="favorite_bold_menu"
            />
          ),
        }}
      />
      <Tab.Screen
        name="add-item-tab"
        component={AddItemTab}
        options={{
          tabBarIcon: () => <MenuAddItem />,
          tabBarLabel: () => null,
        }}
      />
      <Tab.Screen
        name="chats-tab"
        component={ChatsTab}
        options={{
          title: 'Чати',
          tabBarIcon: ({focused}) => (
            <TabBarIcon
              iconName="message_menu"
              isFocused={focused}
              activeIconName="message_bold_menu"
            />
          ),
        }}
      />
      <Tab.Screen
        name="profile-tab"
        component={ProfileTab}
        options={{
          title: 'Профіль',
          tabBarIcon: ({focused}) => (
            <TabBarIcon
              iconName="user_menu"
              isFocused={focused}
              activeIconName="user_bold_menu"
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const TabBarIcon = ({isFocused, iconName, activeIconName}: ITabBarIcon) => {
  return <AppIcon name={isFocused ? activeIconName : iconName} size={25} />;
};

export default memo(TabNavigator);
