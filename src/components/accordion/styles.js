import {StyleSheet, Dimensions} from 'react-native';

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
    flex: 1,
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
  headerNumber: {
    fontWeight: 'bold',
    width: windowWidth * 0.15, 
  },
  headerText: {
    fontWeight: 'bold',
    width: windowWidth * 0.27, 
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
