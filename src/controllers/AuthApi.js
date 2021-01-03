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

export default {
  login,
  logout,
  forgot,
  register,
};
