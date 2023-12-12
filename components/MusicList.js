import React, { useEffect, useState } from "react";
import DocumentPicker from "react-native-document-picker";
import {
  Modal,
  Alert,
  Button,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
} from "react-native";
import TrackPlayer  from "react-native-track-player";

const MusicList = () => {
  const [trackList, setTrackList] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [songTitle, setSongTitle] = useState("");
  const [artistName, setArtistName] = useState("");

  useEffect(() => {
    TrackPlayer.getQueue().then((queue) => {
      setTrackList(queue);
    });
  }, []);

  const playMusic = async ({item, index}) => {
    try {
      await TrackPlayer.skip(index);
      await TrackPlayer.play();
    } catch (error) {
      console.error("Error playing music:", error);
    }
  };

  const addSong = async () => {
    if (selectedFile && songTitle.trim() && artistName.trim()) {
      try {
  
          const newSong = {
            url: selectedFile[0].uri,
            title: songTitle,
            artist: artistName,
            id: `${trackList.length + 2}`,
          };
          console.log(selectedFile)

          await TrackPlayer.add([newSong]);

          const updatedTrackList = [...trackList, newSong];
          setTrackList(updatedTrackList);
          console.log(updatedTrackList)

          setIsModalVisible(false);
          setSelectedFile(null);
          setSongTitle("");
          setArtistName("");

      } catch (error) {
        console.error("Error adding song:", error);
      }
    } else {
      Alert.alert("Missing Information", "Please fill in all fields.");
    }
  };

  const selectFile = async () => {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.audio],
      });
      setSelectedFile(res);
    } catch (error) {
      if (DocumentPicker.isCancel(error)) {
        console.log("User canceled the file selection");
      } else {
        console.error("Error picking the file:", error);
      }
    }
  };

  const onLongPressItem = ({item, index}) => {
    Alert.alert(
      "Delete Song",
      "Are you sure you want to delete this song?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          onPress: () => deleteSong({item, index}),
          style: "destructive",
        },
      ],
      { cancelable: true }
    );
  };
  const deleteSong = async ({item, index}) => {
    try {
      console.log(item)
      // await TrackPlayer.remove(item.id);
      await TrackPlayer.remove(index)
      const updatedTrackList = [...trackList]; 
      updatedTrackList.splice(index, 1)
      setTrackList(updatedTrackList);
    } catch (error) {
      console.error("Error deleting song:", error);
    }
  };

  const renderItem = ({ item, index }) => (
    <View style={styles.itemContainer}>
      <TouchableOpacity
        onPress={() => playMusic({item, index})}
        onLongPress={() => onLongPressItem({item, index})}
      >
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.artist}>artist - {item.artist}</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => setIsModalVisible(true)}
      >
        <Text style={styles.addText}>Add Song</Text>
      </TouchableOpacity>

      <Modal visible={isModalVisible} animationType="slide">
        <View style={styles.modalContainer}>
          <TouchableOpacity onPress={selectFile}>
            <Text style={styles.text}>Select File</Text>
          </TouchableOpacity>
          
          {selectedFile && <Text style={styles.text}>selected</Text>}

          <TextInput
            placeholder="Enter Song Title"
            value={songTitle}
            onChangeText={setSongTitle}
            placeholderTextColor={"white"}
            style={[styles.addText, { color: "white" }]}
          />
          <TextInput
            placeholder="Enter Artist Name"
            value={artistName}
            onChangeText={setArtistName}
            placeholderTextColor={"white"}
            style={[styles.addText, { color: "white" }]}
          />





          <TouchableOpacity style={[styles.addButton]} onPress={addSong}>
            <Text style={styles.addTextButton}>Add Song</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.addButton, { backgroundColor: "red" }]}
            onPress={() => setIsModalVisible(false)}
          >
            <Text style={styles.text}>Close</Text>
          </TouchableOpacity>
        </View>
      </Modal>
      <FlatList
        data={trackList}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

export default MusicList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1e2030",
  },
  itemContainer: {
    borderBottomWidth: 1,
    borderBottomColor: "#91d7e3",
    padding: 10,
  },
  text: {
    color: "white",
    fontSize: 28,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
    color: "#cad3f5",
  },
  artist: {
    color: "#cad3f5",
  },
  addButton: {
    height: 100,
    marginBottom: 5,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#a6da95",
  },
  addText: {
    color: "#24273a",
    fontSize: 18,
  },

  addTextButton: {
    fontSize: 32,
    color: "white"
  },
  textInput: {
    color: "#24273a",
  },
  modalContainer: {
    flex: 1,
    backgroundColor: "#1e2030",
    paddingHorizontal: 20,
    paddingTop: 50,
    justifyContent: "center",
  },
});
