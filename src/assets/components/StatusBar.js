import React from "react";
import { StatusBar, View } from "react-native";
import statusBar from "./styles/StatusBar";

export const DefaultStatusBar = ({ backgroundColor, ...props }) => (
  <View style={[statusBar.statusBar, { backgroundColor }]}>
    <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    <View style={statusBar.appBar} />
  </View>
);
