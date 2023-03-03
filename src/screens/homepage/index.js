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
import {Accordion} from '../../components/accordion';

import {styles} from './styles';

const ChildrenAccordion = ({title, handleChildPress, allJokes, addJokes}) => {
  const [children, setChildren] = useState([]);

  useEffect(() => {
    const filterJokes = allJokes.filter(val => val.category == title);
    console.log(allJokes);
    setChildren(filterJokes[0].jokes);
  }, [allJokes]);

  const addMoreData = () => {
    addJokes(title, children.length + 1);
  };

  return (
    <View style={styles.childrenContainer}>
      {children &&
        children?.length !== 0 &&
        children?.map((item, index, array) => {
          return (
            <React.Fragment key={index}>
              <TouchableOpacity
                onPress={() => handleChildPress(item.joke)}
                style={styles.childButton}>
                <View style={styles.card}>
                  <Text style={styles.cardText}>{item.joke}</Text>
                </View>
              </TouchableOpacity>
              {array.length - 1 == index && array.length < 4 && (
                <TouchableOpacity
                  onPress={() => {
                    addMoreData();
                  }}
                  style={[styles.card, styles.addButton]}>
                  <Text style={[styles.cardText]}>Add More Data</Text>
                </TouchableOpacity>
              )}
            </React.Fragment>
          );
        })}
    </View>
  );
};

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

  useEffect(() => {
    fetchAllJokes();
  }, [firstFetch]);

  const onRefresh = () => {
    setRefreshing(true);
    fetchCategories();
    setRefreshing(false);
  };

  const fetchAllJokes = async () => {
    const fetchedJokes = await Promise.all(
      categories.map(async category => {
        const jokes = await fetchJokes(category, 2);
        return {category, jokes};
      }),
    );
    await setAllJokes(fetchedJokes);
  };

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
