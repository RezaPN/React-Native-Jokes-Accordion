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
import { Dimensions } from 'react-native';
import { styles } from './styles';

const ChildrenAccordion = ({handleChildPress, addMoreData, children}) => {
  return (
    <View style={styles.childrenContainer}>
      {children &&
        children?.length !== 0 &&
        children.map((item, index, array) => {
          return (
            <React.Fragment key={index}>
              <TouchableOpacity
                onPress={() => handleChildPress(item.joke)}
                style={styles.childButton}>
                <View style={styles.card}>
                  <Text style={styles.cardText}>{item.joke}</Text>
                </View>
              </TouchableOpacity>
              {array.length - 1 == index && (
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

const Accordion = ({
  index,
  title,
  handleChildPress,
  arrayFirstSwap,
  categories,
}) => {
  const [expanded, setExpanded] = useState(false);
  const [amount, setAmount] = useState(2);
  const [count, setAccount] = useState(0);
  const [children, setChildren] = useState([]);

  const addMoreData = () => {
    setAmount(amount + 1);
    setAccount(count + 1);
  };

  const toggleAccordion = () => {
    setExpanded(!expanded);
  };

  useEffect(() => {
    fetch(`https://v2.jokeapi.dev/joke/${title}?type=single&amount=${amount}`)
      .then(response => response.json())
      .then(data => {
        setChildren(data.jokes);
      })
      .catch(error => console.error(error));
  }, [amount]);

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.header} onPress={toggleAccordion}>
        <Text style={styles.headerText}>{title}</Text>
        <View
          style={{
            marginRight: 20,
            width: 100,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <TouchableOpacity
            onPress={() => {
              arrayFirstSwap(title);
            }}
            style={{
              borderWidth: 1,
              borderRadius: 5,
              padding: 5,
              backgroundColor: index == 0 ? '#C8FEFC' : '#FF979B',
            }}>
            <Text>{index == 0 ? 'Top' : 'Go Top'}</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.arrowContainer}>
          <Text style={styles.arrow}>{expanded ? '-' : '+'}</Text>
        </View>
      </TouchableOpacity>
      {expanded && (
        <ChildrenAccordion
          handleChildPress={handleChildPress}
          addMoreData={addMoreData}
          children={children}
        />
      )}
    </View>
  );
};
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
