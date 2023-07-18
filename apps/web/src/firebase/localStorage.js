import AsyncStorage from '@react-native-async-storage/async-storage';

const USER_STORE_KEY = 'localUser';

const storeLocalData = async (value, key) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(key.toString(), jsonValue);
  } catch (e) {
    return e;
  }
  return true;
};

const getLocalData = async (key) => {
  try {
    const jsonValue = await AsyncStorage.getItem(key.toString());
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    console.warn(e);
  }
  return null;
};

const removeLocalData = async () => {
  try {
    const keys = (await AsyncStorage.getAllKeys()).filter(
      (item) => item === USER_STORE_KEY || item.match(/(firebase|reps)+/gi)
    );

    await AsyncStorage.multiRemove(keys);
  } catch (e) {
    console.warn(e);
  }
  return true;
};

// const listAll = async () => {
//   let keys = [];
//   try {
//     keys = await AsyncStorage.getAllKeys();
//     console.log(await AsyncStorage.multiGet(keys));
//   } catch (e) {
//     // read key error
//   }

//   console.log(keys);
//   // example console.log result:
//   // ['@MyApp_user', '@MyApp_key']
//   return true;
// };

export { USER_STORE_KEY, removeLocalData, storeLocalData, getLocalData };
