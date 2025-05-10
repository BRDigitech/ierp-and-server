const Logo = props => {
  return (
    <img
    src='/images/logos/brd.png'
    alt='Company Logo' // Always add an alt attribute for accessibility
    style={{
      width: '50px',
      height: '80px', // Set height equal to the width
      // borderRadius: '50%', // This makes the image circular
      objectFit: 'cover' // Ensures the image covers the area without being stretched
    }}
    {...props}
  />
  )
}

export default Logo
