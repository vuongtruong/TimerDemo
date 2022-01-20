import React, {useState} from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Item from './src/components/timer-item';

const App = () => {
  const [items, setItems] = useState([]);

  const addItem = () => {
    setItems(itemsState => [...itemsState, {key: new Date().toISOString()}]);
  };

  const removeItem = indexItem => {
    setItems(itemsState => {
      return itemsState.filter((item, index) => index !== indexItem);
    });
  };

  const renderItem = ({item, index}) => {
    return <Item removeItem={removeItem} index={index} />;
  };

  const renderAddTimer = () => {
    return (
      <TouchableOpacity onPress={addItem} style={styles.addNew}>
        <Image
          source={require('./src/assets/add.png')}
          style={styles.addIcon}
        />
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.viewList}>
        <View style={styles.viewTitle}>
          <Text style={styles.title}>Timers</Text>
        </View>
        <FlatList
          data={items}
          renderItem={renderItem}
          keyExtractor={item => item.key}
          ListFooterComponent={renderAddTimer}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  viewTitle: {
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    color: '#000',
    fontWeight: 'bold',
  },
  viewList: {
    backgroundColor: '#F2F2F2',
    paddingTop: 40,
  },
  addNew: {
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#DDD',
    marginBottom: 50,
    alignSelf: 'center',
    justifyContent: 'center',
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  addIcon: {
    width: 18,
    height: 18,
  },
  viewHeaderList: {
    marginTop: 15,
  },
});

export default App;
