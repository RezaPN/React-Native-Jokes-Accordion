import { Dimensions, StyleSheet } from 'react-native';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export const styles = StyleSheet.create({
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