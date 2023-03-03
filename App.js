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

function App() {
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


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  addButton: {
    backgroundColor: "#CAFFFF",
    padding: windowWidth * 0.02,
    alignItems: "center",
  },
  childButton: {
    flex: 1,
  },
  childrenContainer: {
    backgroundColor: "#FBF8F8",
    paddingHorizontal: windowWidth * 0.002,
  },
  container: {
    flex: 1,
  },
  containerAccordion: {
    flex: 1,
    margin: windowWidth * 0.04,
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: windowWidth * 0.05,
    marginVertical: windowHeight * 0.02,
    marginHorizontal: windowWidth * 0.05,
  },
  container: {
    backgroundColor: '#fff',
    marginVertical: windowHeight * 0.01,
    borderRadius: windowWidth * 0.02,
    overflow: 'hidden',
  },
  header: {
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    alignItems: 'center',
    padding: windowWidth * 0.05,
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    shadowOffset: {
      width: 0,
      height: windowHeight * 0.01,
    },
  },
  headerText: {
    fontWeight: 'bold',
    flex: 1,
  },
  content: {
    padding: windowWidth * 0.03,
  },
  arrowContainer: {
    width: windowWidth * 0.08,
    height: windowWidth * 0.08,
    borderRadius: windowWidth * 0.04,
    backgroundColor: '#ccc',
    alignItems: 'center',
    justifyContent: 'center',
  },
  arrow: {
    color: '#fff',
    fontSize: windowWidth * 0.045,
    fontWeight: 'bold',
    bottom: 1,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    backgroundColor: '#fff',
    padding: windowWidth * 0.05,
    borderRadius: windowWidth * 0.02,
    margin: windowWidth * 0.05,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  modal: {
    backgroundColor: '#FFFFFF',
    borderRadius: windowWidth * 0.04,
    paddingHorizontal: windowWidth * 0.05,
    paddingVertical: windowHeight * 0.03,
    width: '80%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeModal: {
    color: '#007AFF',
    marginTop: windowHeight * 0.02,
  },
  card: {
    backgroundColor: 'white',
    padding: windowWidth * 0.05,
    marginVertical: windowHeight * 0.001,
    shadowColor: 'black',
  },
  cardText: {
    fontSize: windowWidth * 0.04,
  },
});

export default App;
