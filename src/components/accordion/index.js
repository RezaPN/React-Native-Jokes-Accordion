import React, {useState} from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  Text,
  View,
  Dimensions,
} from 'react-native';

export const Accordion = ({
  childrenComponent,
  index,
  title,
  handleChildPress,
  arrayFirstSwap,
}) => {
  const [expanded, setExpanded] = useState(false);

  const toggleAccordion = () => {
    setExpanded(!expanded);
  };

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
      {expanded && childrenComponent}
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
