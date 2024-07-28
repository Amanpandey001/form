import React, {useEffect} from 'react'
const Final = () => {
  useEffect(() => {
    document.title = "Thank You"; // Change this to the desired title
  }, []);
  return (
    <div>
        I am Final page
    </div>
  )
}
export default Final
