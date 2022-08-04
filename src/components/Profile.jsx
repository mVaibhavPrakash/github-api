import customHook from "../js/customHook"
import { UserProfile } from "../js/axios"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendar } from '@fortawesome/free-solid-svg-icons'
import { useEffect } from "react"
import { normalDate } from "../js/DateFormate"
import ProfileCards from "./ProfileCards"
import '../css/profile.css'
const Profile = () => {
    const [state,dispatch]=customHook()
    useEffect(() =>{
        UserProfile(state,dispatch)
    },[state.username])

    console.log(state.profile)
  return (
    <div id='profile'>
        <img id='img' src={state.profile.avatarURL} alt="avatar" />
        <h3 id='name'>{state.profile.name}</h3>
        <a id='url' href={state.profile.url} target="_blank" rel="noopener noreferrer">@{state.profile.username} </a>
        <p id='joinedat'><FontAwesomeIcon style={{marginRight:'15px'}} icon={faCalendar}/>{normalDate(state.profile.joinedAt)}</p>
        <ProfileCards noRepos={state.profile.noRepos} followers={state.profile.followers} following={state.profile.following}/>
    </div>
  )
}

export default Profile