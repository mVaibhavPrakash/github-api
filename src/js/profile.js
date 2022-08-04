export class Profile {
  constructor(
    url,
    avatarURL,
    name,
    username,
    joinedAt,
    noRepos,
    followers,
    following
  ) {
    this.url = url;
    this.avatarURL = avatarURL;
    this.name = name;
    this.username = username;
    this.joinedAt = joinedAt;
    this.noRepos = noRepos;
    this.followers = followers;
    this.following = following;
  }

  get Profile() {
    return {
      url,
      avatarURL,
      name,
      username,
      jonedAt,
      noRepos,
      followers,
      following,
    };
  }
}

export const CreateProfile = (result, state, dispatch) => {
  const profile = new Profile(
    result.url,
    result.avatar_url,
    result.name,
    result.login,
    result.created_at,
    result.public_repos,
    result.followers,
    result.following
  );
  dispatch({ type: 'Set Profile', payload: profile });
};
