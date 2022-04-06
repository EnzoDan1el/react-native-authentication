import AuthContent from '../components/Auth/AuthContent'
import { login } from '../util/auth'
import { useState, useContext } from 'react'
import LoadingOverlay from '../components/ui/LoadingOverlay'
import { Alert } from 'react-native'
import { AuthContext } from '../store/auth-context'

function LoginScreen() {
  const [isAuthenticating, setIsAuthenticating] = useState(false)
  const context = useContext(AuthContext)

  async function loginHandler({ email, password }) {
    setIsAuthenticating(true)
    try {
      const token = await login(email, password)
      context.authenticate(token)
    } catch (error) {
      Alert.alert('Athentication failed', 'Could not log you in')
      setIsAuthenticating(false)
    }
  }

  if (isAuthenticating) {
    return <LoadingOverlay message="Loggin you in..." />
  }
  return <AuthContent isLogin onAuthenticate={loginHandler} />
}

export default LoginScreen
