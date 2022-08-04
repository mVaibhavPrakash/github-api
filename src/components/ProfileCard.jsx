import '../css/profilecards.css'

const ProfileCard = ({num,value}) => {
  return (
    <div className='profilecard'>
        <p className='num'>{num}</p>
        <p className='value'>{value}</p>
    </div>
  )
}

export default ProfileCard