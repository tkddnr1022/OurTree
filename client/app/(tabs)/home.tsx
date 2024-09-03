import { Text, View, StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    padding: 15
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#dfdfdf',
    padding: 20
  },
});

export default function Home() {
  return (
    <View style={styles.container}>
      <View style={{ 
        flex: 2, 
        justifyContent: "flex-end",
        marginBottom: 10
         }}>
        <Text style={{
          fontSize: 20,
          fontWeight: "bold"
        }}>학교이름</Text>
      </View>
      <View style={{ flex: 10 }}>
        <View style={styles.card}>
          <Text>학사일정</Text>
          <Text>.</Text>
          <Text>.</Text>
        </View>
      </View>
      <View style={{ flex: 10 }}>

      </View>
      <View style={{ flex: 10 }}>

      </View>
    </View>
  );
}
