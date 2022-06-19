export const Data = (state) => {
  return state.length > 0
    ? {
        labels: state[0],
        datasets: [
          {
            label: 'Language Count',
            data: state[1],
            backgroundColor: ['red', 'green'],
          },
        ],
      }
    : null;
};
