/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useState, useEffect} from 'react';
import {
  FlatList,
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
  Text,
  View,
  Modal,
  ScrollView,
} from 'react-native';
import {Accordion} from '../../components/accordion';

import {styles} from './styles';

function Homepage() {
  const [expanded, setExpanded] = useState(false);
  const [categories, setCategories] = useState([]);
  const [modalText, setModalText] = useState('');

  useEffect(() => {
    fetch('https://v2.jokeapi.dev/categories')
      .then(response => response.json())
      .then(data => setCategories(data.categories))
      .catch(error => console.error(error));
  }, []);

  function arrayFirstSwap(value) {
    //Cari di arraynya index ke berapa kategori yang diteken
    const index = categories.indexOf(value);

    // Kalo valuenya gak ketemu, balikin array orinya
    if (index === -1) {
      return categories;
    }

    // Bikin array baru, swap item pertama dengan item di index
    const newArray = [...categories];
    const temp = newArray[0];
    newArray[0] = newArray[index];
    newArray[index] = temp;

    setCategories(newArray);
  }

  const handleChildPress = text => {
    setModalText(text);
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <ScrollView>
        <View style={styles.containerAccordion}>
          {categories &&
            categories.map((val, index) => {
              return (
                <>
                  <Accordion
                    key={val}
                    index={index}
                    title={val}
                    handleChildPress={handleChildPress}
                    arrayFirstSwap={arrayFirstSwap}
                    categories={categories}
                  />
                </>
              );
            })}
        </View>
        <Modal
          visible={!!modalText}
          animationType="fade"
          transparent={true}
          onRequestClose={() => setModalText('')}>
          <View style={styles.modalOverlay}>
            <View style={styles.modal}>
              <Text>{modalText}</Text>
              <TouchableOpacity onPress={() => setModalText('')}>
                <Text style={styles.closeModal}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </ScrollView>
    </SafeAreaView>
  );
}

export default Homepage;
