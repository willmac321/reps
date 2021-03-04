import { firebase, db } from '../firebase/config';

function getSettings() {
  const user = firebase.auth().currentUser;
  return db.collection('users').doc(user.uid).collection('settings').get();
}

function updateSettings(uid, userDetails) {
  db.collection('users')
    .doc(uid)
    .collection('settings')
    .doc(uid)
    .set(userDetails)
    .catch((e) => console.error(e));
}

function resetSettings(uid, detailsId, defaultUserDetails) {
  return db
    .collection('users')
    .doc(uid)
    .collection('settings')
    .doc(detailsId)
    .set(defaultUserDetails);
}

export default {
  updateSettings,
  getSettings,
  resetSettings,
};
