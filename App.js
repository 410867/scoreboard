import React, {Component, createContext, useContext, useState} from 'react';
import {
  Button, Modal,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity, useColorScheme,
  View
} from "react-native";
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import RNPickerSelect from 'react-native-picker-select';
import Stopwatch from "react-native-stopwatch-timer/lib/stopwatch";

const Tab = createBottomTabNavigator();
const DataContext = createContext();

const App = () => {
  const [list, setList] = useState([]);
  const [historyMatches, setHistoryMatches] = useState([]);
  const [id, setId] = useState(1);
  const [count, setCount] = useState(0);    //При зміні рендерить екран
  const [numberTimer, setNumberTimer] = useState('7');
  const [modalVisible, setModalVisible] = useState(false);
  const [selectColorId, setSelectColorId] = useState(0);

  if(list.length === 0) {
    setList([...list, {id: 0, name: "Команда", count: "Очки", color: 'lightblue', }]);
  }

  const incrementCount = () => {
    setId(id + 1);
  };

  const addItem = () => {
    incrementCount();
    setList([...list,
      {
        id: id,
        name: `Команда #${id}`,
        count: 0,
        color: 'lightblue',
      }
    ]);
  };

  const removeItem = (id) => {
    setList(list.filter((item) => item.id !== id));
  };

  return (
      <DataContext.Provider value={{
        list,
        historyMatches,
        setHistoryMatches,
        count,
        setCount,
        addItem,
        removeItem,
        numberTimer,
        setNumberTimer,
        modalVisible,
        setModalVisible,
        selectColorId,
        setSelectColorId,
      }} >
        <NavigationContainer>
          <Tab.Navigator>
            <Tab.Screen name="Score" component={ScoreScreen} />
            <Tab.Screen name="Matches" component={MatchesScreen} />
          </Tab.Navigator>
        </NavigationContainer>
      </DataContext.Provider>
  );
}

const ScoreScreen = () => {
  const { list, addItem, removeItem, modalVisible, setModalVisible, selectColorId, setSelectColorId } = useContext(DataContext);

  const buttonColorChoice = (itemId) => {
    setModalVisible(true);
    setSelectColorId(itemId);
  };

  const modalButtonColorChoice = (itemId, color) => {
    list.forEach((item) => {
      if(item.id === itemId) item.color = color;
    });
    setModalVisible(false);
  }

  return (
      <ScrollView  style={useColorScheme() === 'dark' ? [{ backgroundColor: '#3b3a3a' }] : [{ backgroundColor: 'white' }]}>
        <View style={styles.container}>
          <View style={styles.containerList}>
            {
              list.map((item, index) => {
                return(
                    <View style={styles.containerItem} key={index}>
                      <View style={styles.containerText}>
                        {
                          index === 0 ?
                              <Text style={styles.textSize}>{item.name}</Text> :
                              <>
                                <Text style={[styles.textSize, {marginRight: 10}]}>{item.name}</Text>
                                <TouchableOpacity onPress={() => buttonColorChoice(item.id)}>
                                  <View style={{ padding: 15, backgroundColor: `${item.color}`, borderRadius: 10 }}></View>
                                </TouchableOpacity>
                              </>
                        }
                      </View>
                      <View style={styles.containerTextCount}><Text style={styles.textSize}>{item.count}</Text></View>
                      <View style={styles.containerText}>
                        {
                          index === 0 ?
                              <Text style={styles.textDelete}>Видалити</Text> :
                              <TouchableOpacity style={styles.buttonDelete} onPress={() => removeItem(item.id)}>
                                <Text style={styles.buttonText}>+</Text>
                              </TouchableOpacity>
                        }
                      </View>
                    </View>
                );
              })
            }
          </View>
          <View style={styles.containerAddingCommand}>
            <Button color={'green'} title="Добавити команду" onPress={addItem} />
          </View>

          <Modal
              transparent={true}
              visible={modalVisible}
              onRequestClose={() => {
                setModalVisible(false);
              }}
          >
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
              <View style={styles.containerModalColor}>
                <View style={styles.containerColorList}>
                  <TouchableOpacity onPress={() => modalButtonColorChoice(selectColorId, 'red')}>
                    <View style={[styles.containerColorItem, {backgroundColor: 'red'}]}></View>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => modalButtonColorChoice(selectColorId, 'orange')}>
                    <View style={[styles.containerColorItem, {backgroundColor: 'orange'}]}></View>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => modalButtonColorChoice(selectColorId, 'yellow')}>
                    <View style={[styles.containerColorItem, {backgroundColor: 'yellow'}]}></View>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => modalButtonColorChoice(selectColorId, 'green')}>
                    <View style={[styles.containerColorItem, {backgroundColor: 'green'}]}></View>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => modalButtonColorChoice(selectColorId, 'blue')}>
                    <View style={[styles.containerColorItem, {backgroundColor: 'blue'}]}></View>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => modalButtonColorChoice(selectColorId, 'purple')}>
                    <View style={[styles.containerColorItem, {backgroundColor: 'purple'}]}></View>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => modalButtonColorChoice(selectColorId, 'silver')}>
                    <View style={[styles.containerColorItem, {backgroundColor: 'silver'}]}></View>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => modalButtonColorChoice(selectColorId, 'black')}>
                    <View style={[styles.containerColorItem, {backgroundColor: 'black'}]}></View>
                  </TouchableOpacity>
                </View>
                <Button color={'orange'} title="Закрыть" onPress={() => setModalVisible(false)} />
              </View>
            </View>
          </Modal>

        </View>
        <StatusBar style="auto" />
      </ScrollView>
  );
}

const MatchesScreen = () => {
  const { list, historyMatches, setHistoryMatches, count, setCount, numberTimer, setNumberTimer} = useContext(DataContext);
  const [flagButton, setFlagButton] = useState(true);
  const [flagMatches, setFlagMatches] = useState(true);
  const [flagStatusWinButton, setFlagStatusWinButton] = useState(true);

  const [selectedName1, setSelectedName1] = useState("");
  const [selectedName2, setSelectedName2] = useState("");

  const [isStopwatchStart, setIsStopwatchStart] = useState(false);
  const [resetStopwatch, setResetStopwatch] = useState(false);

  const changeFlag = () => {
    setFlagButton(!flagButton);
  }

  const addMatches = () => {
    changeFlag();
  };

  const clearHistory = () => {
    setHistoryMatches([]);
  }

  const handleInputChange = (inputText) => {
    const formattedText = inputText.replace(/[^0-9]/g, '');
    setNumberTimer(formattedText);
  };

  function addScores(numberWin) {
    changeFlag();
    setFlagMatches(true);
    setFlagStatusWinButton(true);
    setNumberTimer('7');

    let id1;
    let id2;
    list.forEach((item) => {
      if(item.name.toLowerCase() === selectedName1.toLowerCase()) {
        id1 = item.id;
      }
      if(item.name.toLowerCase() === selectedName2.toLowerCase()) {
        id2 = item.id;
      }
    });
    setHistoryMatches([...historyMatches, {id1: id1, id2: id2, numberWin: numberWin, }]);

    if(numberWin === 1) {
      list.forEach((item) => {
        if(item.name.toLowerCase() === selectedName1.toLowerCase()) {
          item.count = item.count + 3;
          setCount(count + 1);
        }
      });
    }

    if(numberWin === 2) {
      list.forEach((item) => {
        if(item.name.toLowerCase() === selectedName2.toLowerCase()) {
          item.count = item.count + 3;
          setCount(count + 1);
        }
      });
    }

    if(numberWin === 3) {
      list.forEach((item) => {
        if(item.name.toLowerCase() === selectedName1.toLowerCase()) {
          item.count = item.count + 1;
          setCount(count + 1);
        }

        if(item.name.toLowerCase() === selectedName2.toLowerCase()) {
          item.count = item.count + 1;
          setCount(count + 1);
        }
      });
    }

    setSelectedName1("");
    setSelectedName2("");
  }

  function startMatch() {
    setFlagMatches(false);
    setIsStopwatchStart(!isStopwatchStart);
    setResetStopwatch(false);
  }

  function RenderingHistoryMatches() {
    return historyMatches.map((item) => {
      return(
          <View style={styles.containerHistoryMatchesItem}>
            <Text style={styles.textSize}>Команда #{item.id1}</Text>
            <Text style={styles.textSize}>
              {
                item.numberWin === 1 ?
                    <Text> &gt; </Text> :
                    item.numberWin === 2 ?
                        <Text> &lt; </Text> :
                        <Text> = </Text>
              }
            </Text>
            <Text style={styles.textSize}>Команда #{item.id2}</Text>
          </View>
      );
    });
  }

  function getStatusButton() {
    return !((selectedName1 !== "") && (selectedName2 !== "") && (numberTimer !== ''));
  }

  function getItems() {
    const items = [];

    list.forEach((item) => {
      if(item.id !== 0) {
        items.push({ label: item.name, value: item.name.toLowerCase()});
      }
    });

    return items
  }

  return (
      <ScrollView style={useColorScheme() === 'dark' ? [{ backgroundColor: '#3b3a3a' }] : [{ backgroundColor: 'white' }]}>
        <View style={styles.containerMatchesScreen}>
          <Button color={'red'} title="Очистити історію" onPress={clearHistory} />
          <View style={styles.containerHistoryMatchesList}>
            {RenderingHistoryMatches()}
          </View>
          {
            flagButton ?
                <View style={styles.containerButtonStartGame}>
                  <Button color={'green'} title="Вибрати команди" onPress={addMatches} />
                </View> :
                <View style={styles.containerMatches}>
                  {
                    flagMatches ?
                        <View>
                          <View style={styles.containerSelect}>
                            <View style={styles.containerSelectItem}>
                              <RNPickerSelect
                                  style={styles.selectItem}
                                  onValueChange={(value) => setSelectedName1(value)}
                                  items={getItems()}
                              />
                              <Text style={styles.textNotImportant}>Selected value: {selectedName1}</Text>
                            </View>
                            <View style={styles.containerSelectItem}>
                              <RNPickerSelect
                                  style={styles.selectItem}
                                  onValueChange={(value) => setSelectedName2(value)}
                                  items={getItems()}
                              />
                              <Text style={styles.textNotImportant}>Selected value: {selectedName2}</Text>
                            </View>
                          </View>
                          <View style={styles.containerTimerInput}>
                            <Text style={styles.textSize}>Часу для гри(хв): </Text>
                            <TextInput
                              placeholder="Enter number here"
                              onChangeText={handleInputChange}
                              value={numberTimer}
                              keyboardType="numeric" // Устанавливаем клавиатуру для ввода чисел
                            />
                          </View>
                          <Button color={'green'} disabled={getStatusButton()} title="Почати гру" onPress={() => startMatch()}></Button>
                        </View> :
                        <View style={styles.containerButtons}>
                          <View style={styles.containerTimer}>
                            <ContainerStopwatchTimerComponent
                                numberTimer={numberTimer}
                                setNumberTimer={setNumberTimer}
                                setFlagStatusWinButton={setFlagStatusWinButton}
                                isStopwatchStart={isStopwatchStart}
                                setIsStopwatchStart={setIsStopwatchStart}
                                resetStopwatch={resetStopwatch}
                                setResetStopwatch={setResetStopwatch}
                            />
                          </View>
                          <View style={styles.containerButtonsWin}>
                            <View style={styles.containerButtonWin}>
                              <Text style={styles.textSize}>{selectedName1}</Text>
                              <Button
                                  color={'green'}
                                  disabled={flagStatusWinButton}
                                  title="Перемога(+3)"
                                  onPress={() => addScores(1)}
                              ></Button>
                            </View>
                            <View style={styles.containerButtonWin}>
                              <Text style={styles.textSize}>{selectedName2}</Text>
                              <Button
                                  color={'green'}
                                  disabled={flagStatusWinButton}
                                  title="Перемога(+3)"
                                  onPress={() => addScores(2)}
                              ></Button>
                            </View>
                          </View>
                          <View style={styles.containerButtonDraw}>
                            <Button
                                style={styles.button}
                                color={'blue'}
                                disabled={flagStatusWinButton}
                                title="Нічия(+1 +1)"
                                onPress={() => addScores(3)}
                            ></Button>
                          </View>
                        </View>
                  }
                </View>
          }
        </View>
      </ScrollView>
  );
}

class ContainerStopwatchTimerComponent extends Component {
  render() {
    const numberTimer = this.props.numberTimer;
    const setNumberTimer = this.props.setNumberTimer;
    const setFlagStatusWinButton = this.props.setFlagStatusWinButton;
    const isStopwatchStart = this.props.isStopwatchStart;
    const setIsStopwatchStart = this.props.setIsStopwatchStart;
    const resetStopwatch = this.props.resetStopwatch;
    const setResetStopwatch = this.props.setResetStopwatch;

    const toggleStopwatch = () => {
      setIsStopwatchStart(!isStopwatchStart);
      setResetStopwatch(false);
      setFlagStatusWinButton(true);
    };

    const reset = () => {
      setIsStopwatchStart(false);
      setResetStopwatch(true);
      setFlagStatusWinButton(false);
    };

    const addingTime = () => {
      setIsStopwatchStart(true);
      setFlagStatusWinButton(true);
      setNumberTimer(`${parseInt(numberTimer) + 1}`);
    }

    const finishTimer = () => {
      setIsStopwatchStart(false);
      setFlagStatusWinButton(false);
    }

    return (
        <View style={styles.containerTimerComponent}>
          <Stopwatch
              laps
              msecs
              start={isStopwatchStart}
              reset={resetStopwatch}
              options={options}
              getMsecs={(timeMsecs) => {
                const timeMin = (timeMsecs/1000) / (60);
                if(numberTimer <= timeMin) finishTimer()
              }}
          />
          <View style={styles.containerTimerButton}>
            <Button color={'orange'} title={isStopwatchStart ? 'Stop' : 'Start'} onPress={toggleStopwatch} />
            <Button color={'orange'} title={'+1хв'} onPress={addingTime} />
            <Button color={'orange'} title={'Finish'} onPress={reset} />
          </View>
        </View>
    );
  }
}

const options = {
  container: {
    backgroundColor: 'orange',
    padding: 5,
    borderRadius: 5,
  },
  text: {
    fontSize: 30,
    color: 'black',
    marginLeft: 7,
  },
};

const styles = StyleSheet.create({
  containerList: {
    width: '100%',
    alignItems: 'flex-start',
    gap: 20,
    marginBottom: 20,
  },

  containerItem: {
    width: '100%',
    height: 60,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 10,
    paddingRight: 10,
  },

  containerText: {
    width: 120,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },

  containerTextCount: {
    width: 90,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },

  textDelete: {
    fontSize: 15,
  },

  buttonDelete: {
    alignItems: 'center',
  },

  buttonText: {
    color: "red",
    fontSize: 40,
    transform: "rotate(45deg)",
  },

  containerModalColor: {
    flexDirection: 'column',
    gap: 20,
    width: 250,
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
  },

  containerColorList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 10,
    alignItems: 'center',
  },

  containerColorItem: {
    padding: 22,
    borderRadius: 10,
  },

  container: {
    flex: 1,
    alignItems: 'center',
    marginTop: 10,
    marginLeft: 0,
    marginRight: 0,
  },

  containerAddingCommand: {
    width: '50%',
    marginBottom: 15,
  },

  containerMatchesScreen: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: 0,
    marginBottom: 10,
    paddingTop: 20,
    paddingLeft: 15,
    paddingRight: 15,
  },

  containerButtonStartGame: {
    width: '47%',
  },

  containerButtons: {
    width: '100%',
    gap: 15,
    flexDirection: 'column',
    alignItems: 'center',
  },

  containerButtonsWin: {
    width: '100%',
    gap: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  containerButtonWin: {
    width: '47%',
    gap: 15,
    flexDirection: 'column',
    alignItems: 'center',
  },

  containerButtonDraw: {
    width: '47%',
  },

  containerMatches: {
    width:'100%',
    flex: 1,
    gap: 15,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },

  containerSelect: {
    gap: 15,
    flexDirection: 'row',
  },

  containerSelectItem: {
    width: '50%',
  },

  selectItem: {

  },

  textNotImportant: {
    display: "none",
  },

  containerHistoryMatchesList: {
    width: '100%',
    marginLeft: 15,
    marginRight: 15,
    marginBottom: 30,
    marginTop: 30,
    gap: 20,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  containerHistoryMatchesItem: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  textSize: {
    fontSize: 16,
  },

  containerTimerInput: {
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },

  containerTimer: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  containerTimerComponent: {
    flexDirection: 'column',
    alignItems: 'center',
    gap: 10,
  },

  containerTimerButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
  }

});

export default App;
