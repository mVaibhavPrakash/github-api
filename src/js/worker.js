export default () => {
  self.addEventListener('message', (e) => {
    // eslint-disable-line no-restricted-globals
    if (!e) return;

    const data = e.data;
    const result = data.sort((a, b) => {
      return ('' + a.name).localeCompare(b.name);
    });
    console.log(result);
    postMessage(result);
  });
};
