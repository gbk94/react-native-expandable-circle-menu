import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  Animated,
  Easing,
} from 'react-native';

class CircleMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpened: false,
      opacity: new Animated.Value(0),
      spinValue: new Animated.Value(0),
      slideUpValue: new Animated.Value(0),
    };
  }

  toggleMenu = () => {
    const { isOpened, opacity, spinValue, slideUpValue } = this.state
    if (!isOpened) {
      Animated.parallel([
        Animated.timing(opacity, {
          toValue: 1,
          duration: 500,
          easing: Easing.in(),
          useNativeDriver: true,
        }),
        Animated.timing(spinValue, {
          toValue: 1,
          duration: 200,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
        Animated.timing(slideUpValue, {
          toValue: 1,
          duration: 500,
          easing: Easing.in(),
          useNativeDriver: true,
        }),
      ]).start();

    } else {
      Animated.parallel([
        Animated.timing(opacity, {
          toValue: 0,
          duration: 200,
          easing: Easing.in(),
          useNativeDriver: true
        }),
        Animated.timing(spinValue, {
          toValue: 0,
          duration: 200,
          easing: Easing.linear,
          useNativeDriver: true
        }),
        Animated.timing(slideUpValue, {
          toValue: 0,
          duration: 500,
          easing: Easing.in(),
          useNativeDriver: true
        })
      ]).start();
    }
    this.setState({ isOpened: !isOpened });
  };

  render() {
    const { opacity, isOpened, spinValue, slideUpValue } = this.state
    const { menuItems, menuButton, openMenuButton, closeMenuButton } = this.props
    const spin = spinValue.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '360deg'],
    });
    const slideUp = slideUpValue.interpolate({
      inputRange: [0, 1],
      outputRange: [70, 0],
    });
    return (
      <View style={styles.container}>
        {menuItems.map((menuItem, index) => (
          <View key={index}>
            <Animated.View
              style={{
                opacity: opacity,
                transform: [
                  {
                    translateY: slideUp,
                  },
                ],
              }}>
              <TouchableOpacity
                style={[styles.menuItem, menuItem.style]}
                onPress={() => menuItem.onClick()}>
                <Image source={menuItem.image} style={styles.menuItemIcon} />
              </TouchableOpacity>
            </Animated.View>
          </View>
        ))}
        <TouchableOpacity
          style={styles.toggleMenu}
          onPress={() => this.toggleMenu()}>
          <Animated.View
            style={{
              transform: [
                {
                  rotate: spin,
                },
              ],
            }}>
            {!isOpened ? (
              <View style={[styles.toggleMenu, openMenuButton.style]}>
                <Image
                  style={styles.toggleMenuIcon}
                  source={openMenuButton.image}
                />
              </View>
            ) : (
                <View style={[styles.toggleMenu, closeMenuButton.style]}>
                  <Image
                    style={styles.toggleMenuIcon}
                    source={closeMenuButton.image}
                  />
                </View>
              )}

          </Animated.View>
        </TouchableOpacity>
      </View >
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },

  toggleMenu: {
    width: 52,
    height: 52,
    borderRadius: 31,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
  },

  toggleMenuIcon: {
    resizeMode: "contain",
    width: 35,
    height: 35,
  },

  menuItem: {
    width: 42,
    height: 42,
    borderRadius: 26,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
    marginVertical: 8,
  },

  menuItemIcon: {
    resizeMode: 'contain',
    width: 22,
    height: 22,
  },
});

export default CircleMenu;
