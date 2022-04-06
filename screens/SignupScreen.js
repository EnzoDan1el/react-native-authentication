import { useState } from 'react'
import AuthContent from '../components/Auth/AuthContent'
import { createUser } from '../util/auth'
import LoadingOverlay from '../components/ui/LoadingOverlay'
import { Alert } from 'react-native'
import { useContext } from 'react'
import { AuthContext } from '../store/auth-context'

function SignupScreen() {
  const [isAuthenticating, setIsAuthenticating] = useState(false)

  const context = useContext(AuthContext)

  async function signupHandler({ email, password }) {
    setIsAuthenticating(true)
    try {
      const token = await createUser(email, password)
      context.authenticate(token)
    } catch (error) {
      Alert.alert(
        'Authentication Failed',
        'Could not create user, please check your email',
      )
      setIsAuthenticating(false)
    }
  }

  if (isAuthenticating) {
    return <LoadingOverlay message="Creating user" />
  }

  return <AuthContent onAuthenticate={signupHandler} />
}

export default SignupScreen
