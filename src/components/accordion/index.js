import React, {useState, useEffect} from 'react';
import {
  TouchableOpacity,
  Text,
  View,
} from 'react-native';
import { styles } from './styles';


export const ChildrenAccordion = ({
  title,
  handleChildPress,
  allJokes,
  addJokes,
}) => {
  const [children, setChildren] = useState([]);

  useEffect(() => {
    const filterJokes = allJokes.filter(val => val.category == title);
    setChildren(filterJokes[0].jokes);
  }, [allJokes]);

  const addMoreData = () => {
    addJokes(title, children.length + 2);
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
              {array.length - 1 == index && array.length < 6 && (
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
  childrenComponent,
  index,
  title,
  arrayFirstSwap,
}) => {
  const [expanded, setExpanded] = useState(false);

  const toggleAccordion = () => {
    setExpanded(!expanded);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.header} onPress={toggleAccordion}>
        <Text style={styles.headerNumber}>{index + 1}</Text>
        <Text adjustsFontSizeToFit numberOfLines={1} style={styles.headerText}>{title}</Text>
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

