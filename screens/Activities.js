import React, { useEffect, useState } from 'react';
import { View, Text, Button, FlatList, StyleSheet } from 'react-native';
import PressableButton from '../component/PressableButton';
import ItemsList from '../component/ItemsList';
import { colors } from '../style/colors';
import { AntDesign, FontAwesome5 } from '@expo/vector-icons';
import { useTheme } from '../theme/ThemeContext';
import { collection, onSnapshot } from 'firebase/firestore'; 
import { database } from '../firebase/firebaseSetup';



const Activities = ({ navigation }) => {
  const [activities, setActivities] = useState([]);
  // the activities from the firsbase database
  useEffect(() => {
    const unsubscribe = onSnapshot(collection(database, 'activities'), (querySnapshot) => {
      const newActivities = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        // Convert Firestore timestamp to JavaScript Date object
        const date = data.date ? new Date(data.date.seconds * 1000) : null;
        newActivities.push({ ...data, id: doc.id, date });
      });
      setActivities(newActivities);
    });

    return () => unsubscribe();
  }, []);

  const { theme } = useTheme();

  const dynamicStyles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      backgroundColor: theme.background, 
      justifyContent: 'center',
    },
    label: {
      marginBottom: 10,
      color: theme.text, 
      fontWeight: "bold",
    },
  });

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <PressableButton pressedFunction={() => navigation.navigate('AddActivity')}>
          <View style={styles.buttonContainer}> 
            <AntDesign name="plus" size={24} color="black" />
            <FontAwesome5 name="running" size={24} color="black" />
          </View>
        </PressableButton>
      ),
    });
  }, [navigation]);

  const handleEdit = (item) => {
    navigation.navigate('AddActivity', { item });
  };
  
  return (
    <View style={dynamicStyles.container}>
      <ItemsList contentType="activity" items={activities} onEdit={handleEdit} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: colors.Background,
    justifyContent: 'center',
  },
  label: {
    marginBottom: 10,
    color: colors.Dark,
    fontWeight: "bold",
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default Activities;