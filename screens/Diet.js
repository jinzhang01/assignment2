import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import PressableButton from "../component/PressableButton";
import ItemsList from "../component/ItemsList";
import { colors } from "../style/colors";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import { useTheme } from "../theme/ThemeContext";
import { collection, onSnapshot } from "firebase/firestore";
import { database } from "../firebase/firebaseSetup";

const Diet = ({ navigation }) => {
  const [diet, setDiet] = useState([]);
  useEffect(() => {

    const unsubscribe = onSnapshot(
      collection(database, "diet"),
      (querySnapshot) => {
        const newDiet = [];
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          newDiet.push({ ...data, id: doc.id });
        });
        setDiet(newDiet);
      }
    );
    return () => unsubscribe();
  }, []);

  console.log(diet);

  const { theme } = useTheme();
  // mock Diet data name, date, calories

  const dynamicStyles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      backgroundColor: theme.background, // Use theme background color
      justifyContent: "center",
    },
    label: {
      marginBottom: 10,
      color: theme.text, // Use theme text color
      fontWeight: "bold",
    },
  });

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <PressableButton pressedFunction={() => navigation.navigate("AddDiet")}>
          <View style={styles.buttonContainer}>
            <AntDesign name="plus" size={24} color="black" />
            <MaterialIcons name="fastfood" size={24} color="black" />
          </View>
        </PressableButton>
      ),
    });
  }, [navigation]);

  const handleEdit = (item) => {
    navigation.navigate("AddDiet", { item });
  }

  return (
    <View style={dynamicStyles.container}>
      <ItemsList contentType="diet" items={diet} onEdit={handleEdit}/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: colors.Background,
    justifyContent: "center",
  },
  label: {
    marginBottom: 10,
    color: colors.Dark,
    fontWeight: "bold",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

export default Diet;
