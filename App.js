import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Alert
} from "react-native";
import { Audio } from "expo-av";

const audio = {
  One: require("./assets/one.wav"),
  Two: require("./assets/two.wav"),
  Three: require("./assets/three.wav"),
  Four: require("./assets/four.wav"),
  Five: require("./assets/five.wav"),
  Six: require("./assets/six.wav"),
  Seven: require("./assets/seven.wav"),
  Eight: require("./assets/eight.wav"),
  Nine: require("./assets/nine.wav"),
  Ten: require("./assets/ten.wav"),
};

const getRandomValue = (val) => {
  return Math.floor(Math.random() * 255) - 1;
};

const getRandomColor = (val) => {
  return (
    "rgb(" +
    getRandomValue(val) +
    "," +
    getRandomValue(val) +
    "," +
    getRandomValue(val) +
    ")"
  );
};

const onPress = async (audio) => {
  const soundObject = new Audio.Sound();
  try {
    await soundObject.loadAsync(audio);
    await soundObject
      .playAsync()
      .then(async (playbackAudio) => {
        setTimeout(() => {
          soundObject.unloadAsync();
        }, playbackAudio.playableDurationMillis);
      })
      .catch((err) => {
        Alert.alert(err);
      });
  } catch (err) {
    Alert.alert("Device Error While Playing Audio");
    console.log(err);
  }
};

export default function App() {
  return (
    <ScrollView>
      <SafeAreaView style={[styles.container, { paddingTop: 15 }]}>
        <Image
          style={[styles.container, { marginVertical: 10 }]}
          source={require("./assets/logo.png")}
        />
        <View style={styles.buttonContainer}>
          {Object.keys(audio).map((key, index) => {
            return (
              <TouchableOpacity
                style={[
                  styles.button,
                  { backgroundColor: getRandomColor(index) },
                ]}
                onPress={()=>onPress(audio[key])}
              >
                <Text style={styles.font}>{key}</Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </SafeAreaView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonContainer: {
    flex: 4,
    flexDirection: "row",
    flexWrap: "wrap",
    paddingHorizontal: 8,
  },
  button: {
    justifyContent: "center",
    alignItems: "center",
    width: "48%",
    height: 100,
    marginHorizontal: 3,
    marginVertical: 3,
  },
  font: {
    fontSize: 22,
    fontWeight: "bold",
    color: "white",
  },
});
