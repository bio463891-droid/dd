import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../constants/colors';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

/**
 * Persistent bottom navigation bar — RTL layout
 * Right: Home | Center: MyCourses | Left: Profile
 */
export default function BottomNavBar({ navigation, activeTab }) {
  const insets = useSafeAreaInsets();

  const tabs = [
    { name: 'Profile',   icon: 'person-circle-outline',  screen: 'Profile'   },  // left
    { name: 'MyCourses', icon: 'play-circle-outline',     screen: 'MyCourses' },  // center
    { name: 'Home',      icon: 'home-outline',            screen: 'Home'      },  // right (RTL)
  ];

  return (
    <View style={[styles.container, { paddingBottom: insets.bottom || 12 }]}>
      <View style={styles.bar}>
        {/* RTL order: Profile (left) → MyCourses (center) → Home (right) */}
        {tabs.map((tab) => {
          const isActive = activeTab === tab.name;
          return (
            <TouchableOpacity
              key={tab.name}
              style={styles.tab}
              onPress={() => navigation.navigate(tab.screen)}
              activeOpacity={0.7}
            >
              <Ionicons
                name={tab.icon}
                size={28}
                color={isActive ? COLORS.coral : COLORS.white}
              />
              {isActive && <View style={styles.activeDot} />}
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 16,
    paddingTop: 8,
    backgroundColor: 'transparent',
  },
  bar: {
    backgroundColor: COLORS.deepNavy,
    borderRadius: 24,
    flexDirection: 'row',          // LTR row; icons placed in RTL order array
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 16,
  },
  tab: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  activeDot: {
    width: 5,
    height: 5,
    borderRadius: 3,
    backgroundColor: COLORS.coral,
    marginTop: 4,
  },
});
