import axios from 'axios';
import { CreateProfile } from './profile';

export const UserProfile = (state, dispatch) => {
  axios({
    method: 'GET',
    url: `https://api.github.com/users/${state.username}`,
  }).then((res) => {
    console.log(res);
    CreateProfile(res.data, state, dispatch);
  });
};

export const UserApiCall = (state, dispatch, worker) => {
  axios({
    method: 'GET',
    url: `https://api.github.com/users/${state.username}/repos`,
  })
    .then((res) => {
      if (res.status === 200) {
        const result = res.data;
        console.log(result);
        //Worker thread for complex tasks, like sorting
        worker.postMessage(result);
        worker.addEventListener('message', (event) => {
          dispatch({ type: 'Result', payload: event.data });
        });
        if (!state.isApiResultReady) dispatch({ type: 'Is Fetching' });
      } else {
        !state.isApiResultReady ? dispatch({ type: 'Is Fetching' }) : null;
        dispatch({ type: 'Error' });
      }
    })
    .catch((err) => {
      console.log(err);
      !state.isApiResultReady ? dispatch({ type: 'Is Fetching' }) : null;
      dispatch({ type: 'Error' });
    });
};

export const AllUserApiCall = (dispatch, worker, state) => {
  axios({
    method: 'GET',
    url: `https://api.github.com/users/${username}/repos`,
  })
    .then((res) => {
      if (res.status === 200) {
        const result = res.data;
        console.log(res);

        //Worker thread for complex tasks, like sorting

        worker.postMessage(result);
        worker.addEventListener('message', (event) => {
          dispatch({ type: 'Result', payload: event.data });
        });
        if (!state.isApiResultReady) dispatch({ type: 'Is Fetching' });
      } else {
        dispatch({ type: 'Error' });
      }
    })
    .catch((err) => {
      console.log(err);
      dispatch({ type: 'Error' });
    });
};

export const BarGraphApiCall = (setState, setGraphState, setError) => {
  axios({
    method: 'GET',
    url: `http://localhost:8082/chart`,
  })
    .then((res) => {
      if (res.status === 200) {
        const response = res.data;
        const label = Object.keys(response);
        const data = Object.values(response);
        setState([label, data]);
      } else {
        setError('Error fetching data from the server');
      }
      setGraphState(true);
    })
    .catch((err) => {
      console.log(err);
      setError('Error fetching data from the server');
    });
};
