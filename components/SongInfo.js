import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";

const SongInfo = ({ track }) => {
  console.log(track?.title);
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Image
          source={require("../assets/adaptive-icon.png")}
          style={styles.image}
        />
      </View>
      <View style={styles.content}>
        <Text style={[styles.text, styles.title]}>{track?.title}</Text>
        <Text style={styles.text}>{track?.artist}</Text>
      </View>
    </View>
  );
};

export default SongInfo;

const styles = StyleSheet.create({
  text: {
    color: "white",
  },
  image: {
    marginTop: 20,
    width: 300,
    height: 300,
    resizeMode: "contain",
  },
  content: {
    flexDirection: "column",
    alignItems: "center",
    padding: 10,
  },
  title: {
    fontSize: 28,
    fontWeight: 800,
  },
});
