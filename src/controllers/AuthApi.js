import {
  createUserWithEmailAndPassword,
  deleteUser,
  EmailAuthProvider,
  reauthenticateWithCredential,
  sendEmailVerification,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
  updateEmail,
  updatePassword,
} from "firebase/auth";
import { auth } from "../firebase/config";

async function login(email, password, callback) {
  return signInWithEmailAndPassword(auth, email, password)
    .then((user) => {
      callback(null, user);
    })
    .catch((error) => {
      callback(error);
    });
}

async function logout(callback) {
  signOut(auth)
    .then(() => {
      if (callback) {
        callback();
      }
    })
    .catch((error) => {
      callback(error);
    });
}

function emailVerify(user) {
  sendEmailVerification(user);
}

function forgot(email, callback) {
  sendPasswordResetEmail(auth, email)
    .then(() => {
      callback(null);
    })
    .catch((error) => {
      callback(error);
    });
}

async function register(email, password, callback) {
  await createUserWithEmailAndPassword(auth, email, password)
    .then((res) => {
      callback(null, res.user.uid);
    })
    .catch((error) => {
      callback(error);
    });
}

function changeEmail(password, newEmail, callback) {
  const { user } = auth;
  const cred = EmailAuthProvider.credential(user.email, password);
  reauthenticateWithCredential(user, cred)
    .then((e) => {
      if (!e) {
        updateEmail(user, newEmail).then(() =>
          sendEmailVerification(user)
            .then(() => callback())
            .catch((er) => callback(er))
        );
      }
    })
    .catch((e) => callback(e));
}

function resetPassword(oldPassword, newPassword, callback) {
  const user = auth.currentUser;
  const cred = EmailAuthProvider.credential(user.email, oldPassword);
  reauthenticateWithCredential(user, cred)
    .then((e) => {
      if (!e) {
        updatePassword(user, newPassword)
          .then(() => callback())
          .catch((er) => callback(er));
      }
    })
    .catch((e) => callback(e));
}

function deleteAccount(password, callback) {
  const user = auth.currentUser;
  const cred = EmailAuthProvider.credential(user.email, password);
  reauthenticateWithCredential(user, cred)
    .then(() => {
      deleteUser(user)
        .then(() => callback())
        .catch((er) => callback(er));
    })
    .catch((e) => callback(e));
}

export default {
  login,
  logout,
  forgot,
  changeEmail,
  resetPassword,
  register,
  deleteAccount,
  emailVerify,
};
