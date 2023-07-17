import { doc, setDoc, getDoc } from 'firebase/firestore';
import { db } from '../firebase/config';

const getUserSettingRef = (uid) => doc(db, 'users', uid, 'settings', uid);

async function getSettings(uid) {
  const res = await getDoc(getUserSettingRef(uid));
  if (res.exists) {
    return res.data();
  }
  return null;
}

function updateSettings(uid, userDetails) {
  setDoc(getUserSettingRef(uid), userDetails).catch((e) => console.error(e));
}

function setAckPrivacy(uid) {
  setDoc(doc(db, 'users', uid, 'privacyAck', uid), { accepted: true }).catch((e) =>
    console.error(e)
  );
}

export default {
  updateSettings,
  getSettings,
  setAckPrivacy,
};
