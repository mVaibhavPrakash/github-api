import ProfileCard from "./ProfileCard"
import '../css/profilecards.css'

const ProfileCards = ({noRepos,followers,following}) => {
  return (
    <div id='profilecards'>
        <ProfileCard num={noRepos} value='REPOSITORIES'/>
        <ProfileCard num={followers} value='FOLLOWERS'/>
        <ProfileCard num={following} value='FOLLOWING'/>
    </div>
  )
}

export default ProfileCards