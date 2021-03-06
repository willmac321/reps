import { firebase, db } from '../firebase/config';

async function getSettings(uid) {
  return db
    .collection('users')
    .doc(uid)
    .collection('settings')
    .doc(uid)
    .get()
    .then((res) => {
      if (res.exists) {
        return res.data();
      }
      return null;
    })
    .catch((e) => e);
}

function updateSettings(uid, userDetails) {
  db.collection('users')
    .doc(uid)
    .collection('settings')
    .doc(uid)
    .set(userDetails)
    .catch((e) => console.error(e));
}

function setAckPrivacy(uid) {
  db.collection('users')
    .doc(uid)
    .collection('privacyAck')
    .doc(uid)
    .set({ accepted: true })
    .catch((e) => console.error(e));
}

export default {
  updateSettings,
  getSettings,
  setAckPrivacy,
};
