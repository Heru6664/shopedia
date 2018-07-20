import React, { Component } from "react";
import { View } from "react-native";
import Animation from "lottie-react-native";

export default class Loading extends Component {
  componentWillMount() {
    this.initAnimation();
  }

  initAnimation() {
    if (!this.animation) {
      setTimeout(() => {
        this.initAnimation();
      }, 100);
    } else {
      this.animation.play();
    }
  }

  render() {
    return (
      <View>
        <Animation
          ref={animation => {
            this.animation = animation;
          }}
          style={this.props.style}
          loop
          source={require("../images/lottie/data.json")}
        />
      </View>
    );
  }
}
