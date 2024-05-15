import React, {Component, createContext, Fragment, useContext, useEffect, useState} from 'react';
import {
  Alert,
  AppState,
  Button,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import RenderingList from "./Screen/Components/RenderingList";

import RNPickerSelect from 'react-native-picker-select';
import TimerExample from "./Screen/Components/TimerExample";
import TimeExample1 from "./Screen/Components/TimeExample1";
import Stopwatch from "react-native-stopwatch-timer/lib/stopwatch";
/*import ColorsScreen from "./Screen/Components/ColorsScreen";
import ColorPickerExample from "./Screen/Components/ColorPickerExample";

import {PaperProvider} from "react-native-paper";*/

//import { ColorPicker, fromHsv } from 'react-native-color-picker';

const Tab = createBottomTabNavigator();
const DataContext = createContext();

const App = () => {
  const [list, setList] = useState([]);
  const [historyMatches, setHistoryMatches] = useState([]);
  const [id, setId] = useState(1);
  const [time, setTime] = useState(0);
  const [count, setCount] = useState(0);    //При зміні рендерить екран
  const [numberTimer, setNumberTimer] = useState('');

  //const [color, setColor] = useState('#000000'); // Устанавливаем начальный цвет

  if(list.length === 0) {
    setList([...list, {id: 0, name: "Команда", count: "Рахунок", time: "Час", }]);
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
        time: 0,
      }
    ]);
  };

  const editItem = (editedItem) => {
    //setList(list);
    /*    const newList = list.map((item) => {
          item.id === editedItem.id ? { ...item, count: editedItem.count } : item
        });*/

    //setList(newList);

    /*    const newPosts = posts.map((post) => (
            post.id === 1
                ? { ...post, text: 'other text' }
                : post
        ));*/
  }

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
      }}>
        <NavigationContainer>
          <Tab.Navigator>
            <Tab.Screen name="Score" component={ScoreScreen} />
            {/*          {<Tab.Screen name="Score" element={<ScoreScreen list={list} addItem={addItem} removeItem={removeItem} />} />}*/}
            <Tab.Screen name="Matches" component={MatchesScreen} />
          </Tab.Navigator>
        </NavigationContainer>
      </DataContext.Provider>
  );
}

const ScoreScreen = () => {
  /*    const list = props.list;
      const addItem = props.addItem;
      const removeItem = props.removeItem;*/
  const { list, addItem, removeItem, color, setColor } = useContext(DataContext);

  return (
      <ScrollView>
        <View style={styles.container}>
          {/*        <Text style={styles.textName}>{data}</Text>
          <Text style={styles.textName}>1111111111111</Text>
          <Text style={styles.textName}>1111111111111</Text>
          <Text style={styles.textName}>1111111111111</Text>
          <Text style={styles.textName}>1111111111111</Text>
          <Text style={styles.textName}>1111111111111</Text>*/}
          <RenderingList list={list} removeItem={removeItem}/>
          <View style={styles.containerAddingCommand}>
            <Button color={'green'} title="Добавити команду" onPress={addItem} />
          </View>
          <StatusBar style="auto" />



{/*          <PaperProvider>
            <ColorPickerExample />
          </PaperProvider>*/}


        </View>
      </ScrollView>
  );
}

const MatchesScreen = () => {
  const { list, historyMatches, setHistoryMatches, count, setCount} = useContext(DataContext);
  const [flagButton, setFlagButton] = useState(true);
  const [flagMatches, setFlagMatches] = useState(true);
  const [flagStatusWinButton, setFlagStatusWinButton] = useState(true);

  const [selectedName1, setSelectedName1] = useState("");
  const [selectedName2, setSelectedName2] = useState("");

  const [numberTimer, setNumberTimer] = useState('');
  const [time, setTime] = useState(new Date());
  const [timeStartMatch, setTimeStartMatch] = useState(0);
  const [timeFinishMatch, setTimeFinishMatch] = useState(0);

  const [isStopwatchStart, setIsStopwatchStart] = useState(false);
  const [resetStopwatch, setResetStopwatch] = useState(false);

/*  if((selectedName1 !== "") && (selectedName2 !== "")) {
    setButtonDisabled(false);
  }*/

/*  useEffect(() => {
    const handleAppStateChange = (nextAppState) => {
      // ваш код обработки изменения состояния приложения
    };

    AppState.addEventListener('change', handleAppStateChange);

    return () => {
      AppState.removeEventListener('change', handleAppStateChange);
    };
  }, []);*/

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

  const handleFinishTimer = () => {
    //setFlagStatusWinButton(false);
  };

  function addScores(numberWin) {
    changeFlag();
    setFlagMatches(true);
    setFlagStatusWinButton(true);

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
          item.count = item.count + 2;
          setCount(count + 1);
        }
      });
    }

    if(numberWin === 2) {
      list.forEach((item) => {
        if(item.name.toLowerCase() === selectedName2.toLowerCase()) {
          item.count = item.count + 2;
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
/*    const currentTime = new Date();
    const epochTime = currentTime.getTime() / 1000; // Делим на 1000, чтобы получить время в секундах*/

    setFlagMatches(false);

    setIsStopwatchStart(!isStopwatchStart);
    setResetStopwatch(false);
/*    setTimeStartMatch(epochTime);
    setTimeFinishMatch(epochTime + (numberTimer * 60));*/
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

/*  function getStatusWinButton() {
    return !((selectedName1 !== "") && (selectedName2 !== "") && (numberTimer !== ''));
  }*/

  function getItems() {
    const items = [];

    list.forEach((item) => {
      if(item.id !== 0) {
        items.push({ label: item.name, value: item.name.toLowerCase()});
      }
    });

    return items
  }

  function setTimeFunction() {
    setTime(new Date());
  }

  const getTimer = () => {
    setInterval(setTimeFunction, 1000);

    const currentTime = time;
    const getEpochTime = currentTime.getTime() / 1000; // Делим на 1000, чтобы получить время в секундах

    // Получаем текущее время в формате часы:минуты:секунды
    const minutes = currentTime.getMinutes();
    const seconds = currentTime.getSeconds();

    return <Text style={styles.time}>
      {minutes < 10 ? '0' : ''}{minutes}:{seconds < 10 ? '0' : ''}{seconds}
    </Text>
  }

  return (
      <ScrollView>
        <View style={styles.containerMatchesScreen}>
{/*          <Text style={styles.timer}>{seconds}</Text>
          <View style={styles.buttonContainer}>
            <Button title={isActive ? 'Pause' : 'Start'} onPress={handleStartStop} />
            <Button title="Reset" onPress={handleReset} />
          </View>*/}


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
                            {/*<Text>{number}</Text>*/}
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
                                  title="Перемога(+2)"
                                  onPress={() => addScores(1)}
                              ></Button>
                            </View>
                            <View style={styles.containerButtonWin}>
                              <Text style={styles.textSize}>{selectedName2}</Text>
                              <Button
                                  color={'green'}
                                  disabled={flagStatusWinButton}
                                  title="Перемога(+2)"
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
    const setFlagStatusWinButton = this.props.setFlagStatusWinButton;
    const isStopwatchStart = this.props.isStopwatchStart;
    const setIsStopwatchStart = this.props.setIsStopwatchStart;
    const resetStopwatch = this.props.resetStopwatch;
    const setResetStopwatch = this.props.setResetStopwatch;

    const toggleStopwatch = () => {
      setIsStopwatchStart(!isStopwatchStart);
      setResetStopwatch(false);
    };

    const reset = () => {
      setIsStopwatchStart(false);
      setResetStopwatch(true);
      setFlagStatusWinButton(false);
    };

    return (
        <View style={styles.containerTimerComponent}>
          <Stopwatch
              laps
              msecs
              start={isStopwatchStart}
              reset={resetStopwatch}
              options={options}
              getMsecs={(timeMsecs) => {
                const timeMin = (timeMsecs/1000) / (60/12);
                if(numberTimer <= timeMin) reset()
              }}
          />
          <View>
            <Button color={'orange'} title={isStopwatchStart ? 'Stop' : 'Start'} onPress={toggleStopwatch} />
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
    width: '47%',
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
    fontSize: 17,
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

});

export default App;
