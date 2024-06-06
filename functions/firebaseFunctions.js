import firebase from 'firebase';

const setData = async (path, data) => {
  try {
    return await firebase.database().ref(path).set(data);
  } catch (error) {
    throw error;
  }
};

const readData = async (path) => {
  try {
    const snapshot = await firebase.database().ref(path).once('value');
    return snapshot.val();
  } catch (error) {
    throw error;
  }
};

export { setData, readData };