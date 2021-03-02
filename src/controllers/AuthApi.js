import { firebase } from '../firebase/config';

function login(email, password, callback) {
  firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then((user) => {
      callback(null, user);
    })
    .catch((error) => {
      callback(error);
    });
}
function logout(callback) {
  firebase
    .auth()
    .signOut()
    .then(() => {
      callback();
    })
    .catch((error) => {
      callback(error);
    });
}
function forgot(email, callback) {
  firebase
    .auth()
    .sendPasswordResetEmail(email)
    .then(() => {
      callback(null);
    })
    .catch((error) => {
      callback(error);
    });
}
function register(email, password, callback) {
  firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then((user) => {
      callback(null, user);
    })
    .catch((error) => {
      callback(error);
    });
}

function changeEmail(password, newEmail, callback) {
  const user = firebase.auth().currentUser;
  const cred = firebase.auth.EmailAuthProvider.credential(user.email, password);
  user
    .reauthenticateWithCredential(cred)
    .then((e) => {
      if (!e) {
        user
          .updateEmail(newEmail)
          .sendEmailVerification()
          .then(() => callback())
          .catch((er) => callback(er));
      }
    })
    .catch((e) => callback(e));
}

function resetPassword(oldPassword, newPassword, callback) {
  const user = firebase.auth().currentUser;
  const cred = firebase.auth.EmailAuthProvider.credential(user.email, oldPassword);
  user
    .reauthenticateWithCredential(cred)
    .then((e) => {
      if (!e) {
        user
          .updatePassword(newPassword)
          .then(() => callback())
          .catch((er) => callback(er));
      }
    })
    .catch((e) => callback(e));
}

function deleteAccount(password, callback) {
  const user = firebase.auth().currentUser;
  const cred = firebase.auth.EmailAuthProvider.credential(user.email, password);
  user
    .reauthenticateWithCredential(cred)
    .then((e) => {
      if (!e) {
        user
          .delete()
          .then(() => callback())
          .catch((er) => callback(er));
      }
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
};
