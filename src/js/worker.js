export default () => {
  self.addEventListener('message', (e) => {
    // eslint-disable-line no-restricted-globals
    if (!e) return;

    const data = e.data;

    if (Array.isArray(data)) {
      const result = data.sort((a, b) => {
        return b.repositories.length - a.repositories.length;
      });
      postMessage(result);
    } else {
      const res = [];
      res.push(data);
      postMessage(res);
    }
  });
};
