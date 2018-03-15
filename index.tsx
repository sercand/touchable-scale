import * as React from "react";
import {
  View,
  TouchableWithoutFeedback,
  Platform,
  StyleSheet,
  ViewStyle,
  Animated,
  Easing,
} from "react-native";

const styles = StyleSheet.create({
  root: {
    ...Platform.select({
      ios: {
        shadowColor: "black",
        shadowOpacity: 0.2,
        shadowRadius: 12,
        shadowOffset: {
          width: 0,
          height: 6,
        },
      } as ViewStyle,
      android: {
        elevation: 4,
      } as ViewStyle,
    }),
  } as ViewStyle,
});

interface Props {
  onPress?: () => void;
  style?: ViewStyle;
}

export default class Touchable extends React.Component<Props> {
  state = {
    anim: new Animated.Value(1),
  };

  handlePressIn = () => {
    Animated.timing(this.state.anim, {
      toValue: 0.96,
      duration: 150,
      easing: Easing.out(Easing.quad),
      useNativeDriver: true,
    }).start();
  };

  handlePresOut = () => {
    Animated.timing(this.state.anim, {
      toValue: 1,
      duration: 300,
      easing: Easing.out(Easing.quad),
      useNativeDriver: true,
    }).start();
  };

  render() {
    return (
      <TouchableWithoutFeedback
        onPress={this.props.onPress}
        onPressIn={this.handlePressIn}
        onPressOut={this.handlePresOut}
      >
        <Animated.View
          style={[
            styles.root,
            this.props.style,
            { transform: [{ scale: this.state.anim }] },
          ]}
        >
          {this.props.children}
        </Animated.View>
      </TouchableWithoutFeedback>
    );
  }
}
