import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  FlatList,
  Alert,
} from "react-native";
import { styles } from "./styles";
import { Participant } from "../../components/Participant";
import moment from "moment";

export default function Home() {
  const time = new Date().toLocaleTimeString();
  const greeting =
    time < "12:00:00"
      ? "Bom dia"
      : time < "18:00:00"
      ? "Boa tarde"
      : "Boa noite";
  const realTime = moment().format("LL");

  const participants = [
    "Rod",
    "Gabriel",
    "Diego",
    "Rafael",
    "Bruna",
    "Jax",
    "Luna",
    "Luiz",
    "Isa",
    "Natan",
  ];

  function handleParticipantAdd() {
    if (participants.includes("Rod")) {
      return Alert.alert("Novo participante", "Rod já está na lista");
    }
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
            Alert.alert("Deletado");
          },
        },
        {
          text: "Não",
          style: "cancel",
        },
      ]
    );
    console.log("Remover participante: " + name);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.eventName}>{greeting}</Text>

      <Text style={styles.eventDate}>{realTime}</Text>

      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Nome"
          placeholderTextColor="#6b6b6b"
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
          <Text style={styles.emptyList}>Nenhum participante adicionado</Text>
        )}
      />
    </View>
  );
}
