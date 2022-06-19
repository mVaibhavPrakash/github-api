export default () => {
  self.addEventListener('message', (e) => {
    if (!e) return;

    const data = e.data;

    /* Condition for handling sigle as well as multiple users data */
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
