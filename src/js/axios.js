import axios from 'axios';

export const UserApiCall = (state, dispatch, worker) => {
  axios({
    method: 'POST',
    url: `http://localhost:8082/username`,
    data: {
      username: state.username,
    },
    withCredentials: true,
  })
    .then((res) => {
      if (res.status === 200) {
        const result = res.data;

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

export const AllUserApiCall = (dispatch, worker,state) => {
  axios({
    method: 'GET',
    url: `http://localhost:8082/getall`,
  })
    .then((res) => {
      if (res.status === 200) {
        const result = res.data;

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
