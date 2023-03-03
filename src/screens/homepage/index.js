/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  TouchableOpacity,
  Text,
  View,
  Modal,
  ScrollView,
  RefreshControl,
} from 'react-native';
import {Accordion, ChildrenAccordion} from '../../components/accordion';

import {styles} from './styles';

function Homepage() {
  const [categories, setCategories] = useState([]);
  const [firstFetch, setFirstFetch] = useState(false);
  const [modalText, setModalText] = useState('');
  const [refreshing, setRefreshing] = useState(false);
  const [allJokes, setAllJokes] = useState([]);

  //ketika componentMounting
  useEffect(() => {
    fetchCategories();
  }, []);

  //after kategori didapatkan
  useEffect(() => {
    fetchAllJokes();
  }, [firstFetch]);

  //onRefresh ketika layar digeser kebawah
  const onRefresh = () => {
    setRefreshing(true);
    fetchCategories();
    setRefreshing(false);
  };

  //jokes yang didapat dari kategori langsung difetch semua
  const fetchAllJokes = async () => {
    const fetchedJokes = await Promise.all(
      categories.map(async category => {
        const jokes = await fetchJokes(category, 2);
        return {category, jokes};
      }),
    );
    await setAllJokes(fetchedJokes);
  };

  //fetch karegori
  const fetchCategories = async () => {
    try {
      const response = await fetch('https://v2.jokeapi.dev/categories');
      const data = await response.json();
      await setCategories(data.categories);
      await setFirstFetch(!firstFetch); //mendandakan firstFetch categories terjadi
    } catch (error) {
      console.error(error);
    }
  };

  //fetch jokes
  const fetchJokes = async (title, amount) => {
    try {
      const response = await fetch(
        `https://v2.jokeapi.dev/joke/${title}?type=single&amount=${amount}`,
      );
      const data = await response.json();
      return data.jokes;
    } catch (error) {
      return null;
    }
  };

  //adding new jokes dengan proses ngereplace jokes di tergantung indexnya
  const addJokes = async (title, amount) => {
    //pertama cari dulu urutan array dengan kategori spesifik;
    const index = allJokes.findIndex(obj => obj.category === title);
    //dapetin jokes dengan upgraded amount
    const jokes = await fetchJokes(title, amount);

    const newArr = [...allJokes];
    newArr.splice(index, 1, {category: title, jokes});
    await setAllJokes(newArr);
  };

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
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        <View style={styles.containerAccordion}>
          {categories &&
            categories.map((val, index) => {
              return (
                <>
                  <Accordion
                    childrenComponent={
                      <ChildrenAccordion
                        handleChildPress={handleChildPress}
                        title={val}
                        allJokes={allJokes}
                        addJokes={addJokes}
                      />
                    }
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
