import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  FlatList,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { styles } from "./styles";
import { Participant } from "../../components/Participant";
import moment from "moment";

export default function Home() {
  const [participants, setParticipants] = useState<string[]>([]);
  const [participantName, setParticipantName] = useState("");

  const time = new Date().toLocaleTimeString();
  const greeting =
    time < "12:00:00"
      ? "Good Morning"
      : time < "18:00:00"
      ? "Good Afternoon"
      : "Good Night";
  const realTime = moment().format("LL");

  function handleParticipantAdd() {
    if (participants.includes(participantName)) {
      return Alert.alert(
        "Novo participante",
        `${participantName} já está na lista`
      );
    }

    setParticipants([...participants, participantName]);
    setParticipantName("");
  }

  function handleParticipantRemove(name: string) {
    Alert;
    Alert.alert(
      "Remover participante",
      `Tem certeza que deseja remover ${name}?`,
      [
        {
          text: "Sim",
          onPress: () => {
            setParticipants((prevState) =>
              prevState.filter((participant) => participant !== name)
            );
          },
        },
        {
          text: "Não",
          style: "cancel",
        },
      ]
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.eventName}>{greeting}</Text>

      <Text style={styles.eventDate}>{realTime}</Text>

      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Name"
          placeholderTextColor="#6b6b6b"
          onChangeText={setParticipantName}
          value={participantName}
        />

        <TouchableOpacity style={styles.button} onPress={handleParticipantAdd}>
          <Text style={styles.buttonText}>+</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={participants}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <Participant
            key={item}
            name={item}
            onRemove={() => handleParticipantRemove(item)}
          />
        )}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={() => (
          <Text style={styles.emptyList}>0 participants here</Text>
        )}
      />
    </View>
  );
}
