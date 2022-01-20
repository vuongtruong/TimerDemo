import React, {useRef, useState} from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

const TimerItem = props => {
  const {removeItem, index} = props;
  const [isAddItem, setIsAddItem] = useState(true);
  const [isStart, setIsStart] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [time, setTime] = useState(0);
  const [title, setTitle] = useState('');
  const [project, setProject] = useState('');
  const refTitle = useRef('');
  const refProject = useRef('');
  const refInterval = useRef(null);

  const addAndUpdateItem = () => {
    refTitle.current = title;
    refProject.current = project;
    if (isEdit) {
      setIsAddItem(false);
    } else {
      setIsAddItem(false);
      setIsEdit(true);
    }
  };

  const cancelItem = () => {
    if (isEdit) {
      setTitle(refTitle.current);
      setProject(refProject.current);
      setIsAddItem(false);
    } else {
      removeItem && removeItem(index);
    }
  };

  const deleteItem = () => {
    stopUpdateTime();
    removeItem && removeItem(index);
  };

  const editItem = () => {
    setIsAddItem(true);
    setIsStart(false);
    if (isStart) {
      stopUpdateTime();
    }
  };

  const startUpdateTime = () => {
    refInterval.current = setInterval(() => {
      setTime(timeCurrent => timeCurrent + 1);
    }, 1000);
  };

  const stopUpdateTime = () => {
    if (refInterval.current) {
      clearInterval(refInterval.current);
    }
  };

  const updateTimerHandler = () => {
    if (isStart) {
      setIsStart(false);
      stopUpdateTime();
    } else {
      setIsStart(true);
      startUpdateTime();
    }
  };

  if (isAddItem) {
    return (
      <View style={styles.itemContainer}>
        <View style={styles.item}>
          <Text style={styles.textTitle}>Title</Text>
          <View style={styles.viewInput}>
            <TextInput
              value={title}
              onChangeText={setTitle}
              style={styles.input}
            />
          </View>
          <View style={styles.viewSpace} />
          <Text style={styles.textTitle}>Project</Text>
          <View style={styles.viewInput}>
            <TextInput
              value={project}
              onChangeText={setProject}
              style={styles.input}
            />
          </View>
          <View style={styles.viewSpace} />
        </View>
        <View
          style={[styles.viewRow, {paddingHorizontal: 20, paddingBottom: 20}]}>
          <TouchableOpacity
            onPress={addAndUpdateItem}
            style={styles.button}>
            <Text style={styles.btnTxt}>{isEdit ? 'Update' : 'Create'}</Text>
          </TouchableOpacity>
          <View style={styles.viewSpace} />
          <TouchableOpacity
            onPress={cancelItem}
            style={[styles.button, {borderColor: '#FF0000'}]}>
            <Text style={[styles.btnTxt, {color: '#FF0000'}]}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  } else {
    return (
      <View style={styles.itemContainer}>
        <View style={styles.item}>
          <Text style={styles.textTitle}>{title}</Text>
          <View style={styles.viewSpace} />
          <Text style={styles.textTitle}>{project}</Text>
          <View style={styles.viewSpace} />
          <Text style={styles.textTime}>
            {new Date(time * 1000).toISOString().substr(11, 8)}
          </Text>
          <View style={styles.viewSpace} />
          <View style={styles.viewSpace} />
          <View style={styles.viewIcons}>
            <TouchableOpacity onPress={deleteItem} style={{marginRight: 10}}>
              <Image
                source={require('../../assets/delete.png')}
                style={styles.iconSmall}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={editItem}>
              <Image
                source={require('../../assets/edit.png')}
                style={styles.iconSmall}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.viewSpace} />
        </View>
        <TouchableOpacity
          onPress={updateTimerHandler}
          style={[
            styles.button,
            {
              borderRightColor: isStart ? '#FF0000' : '#008000',
              borderBottomColor: isStart ? '#FF0000' : '#008000',
            },
          ]}>
          <Text
            style={[
              styles.textTitle,
              {color: isStart ? '#FF0000' : '#008000'},
            ]}>
            {isStart ? 'Stop' : 'Start'}
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  itemContainer: {
    backgroundColor: '#FFF',
    marginHorizontal: 50,
    marginVertical: 15,
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 5,
  },
  item: {
    padding: 10,
  },
  btnTxt: {
    fontSize: 12,
    color: '#0000FF',
    fontWeight: 'bold',
  },
  textTitle: {
    fontSize: 12,
    color: '#404040',
    fontWeight: 'bold',
  },
  textTime: {
    fontSize: 25,
    color: '#404040',
    alignSelf: 'center',
  },
  viewInput: {
    height: 35,
    borderWidth: 1,
    borderColor: '#DDD',
    marginTop: 4,
  },
  input: {
    flex: 1,
    fontSize: 12,
    color: '#404040',
    padding: 10,
    fontWeight: 'bold',
  },
  viewSpace: {
    height: 5,
  },
  button: {
    height: 40,
    borderWidth: 2,
    borderColor: '#DDD',
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  viewRow: {
    flexDirection: 'row',
  },
  viewIcons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  iconSmall: {
    width: 20,
    height: 20,
  },
});

export default TimerItem;
