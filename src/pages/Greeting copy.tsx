import React from 'react'

interface GreetingProps {
  userName?: string;
}

const Greeting: React.FC<GreetingProps> = ({ userName }) => {
  return (
    <div>Hello , {userName || 'World'} </div>
  )
}

export default Greeting