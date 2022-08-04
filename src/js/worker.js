export default () => {
  self.addEventListener('message', (e) => {
    if (!e) return;

    const data = e.data;
    /* Condition for handling sigle as well as multiple users data */
    const result = data.filter((a) => {
      return {
        html_url: a.html_url,
        repository_name: a.name,
        url: a.html_url,
        key: a.id,
        language: a.language,
        forks_count: a.forks,
        stars_count: a.stargazers_count,
      };
    });
    postMessage(result);
  });
};
