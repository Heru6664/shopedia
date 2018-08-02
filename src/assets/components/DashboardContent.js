import accounting from "accounting";
import { Card, CardItem, Text } from "native-base";
import React from "react";
import { Image, StyleSheet, TouchableOpacity } from "react-native";

export default ({ item, pressProduct }) => (
  <TouchableOpacity onPress={() => pressProduct(item)} style={styles.th}>
    <Card>
      <CardItem>
        <Text>{item.name}</Text>
      </CardItem>
      <CardItem cardBody>
        <Image
          source={{ uri: item.img }}
          style={{ height: 200, width: null, flex: 1 }}
        />
      </CardItem>
      <CardItem style={styles.itemContainer}>
        <Text>{accounting.formatMoney(item.price, "IDR ", ",", ".")}</Text>
      </CardItem>
    </Card>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: "column"
  },
  th: {
    width: "50%"
  }
});
