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
  Dimensions,
} from 'react-native';

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

export const Accordion = ({
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
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export const styles = StyleSheet.create({
  addButton: {
    backgroundColor: '#CAFFFF',
    padding: windowWidth * 0.02,
    alignItems: 'center',
  },
  childButton: {
    flex: 1,
  },
  childrenContainer: {
    backgroundColor: '#FBF8F8',
    paddingHorizontal: windowWidth * 0.002,
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
