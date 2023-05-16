import React from 'react'
import MyInput from '../components/ui/input/MyInput'
import MyButton from '../components/ui/button/MyButton'

type Props = {}

const Login = (props: Props) => {
  return (
    <div>
        <h1>Login page</h1>
        <form action="">
            <MyInput type="text" placeholder='Enter login'/>
            <MyInput type="password" placeholder='Enter password' />
            <MyButton>Login</MyButton>
        </form>
    </div>
  )
}

export default Login