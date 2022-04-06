import { StyleSheet, Text, View } from 'react-native'
import axios from 'axios'
import { useEffect, useContext, useState } from 'react'
import { AuthContext } from '../store/auth-context'

function WelcomeScreen() {
  const [fetchMessage, setFetchMessage] = useState('')
  const context = useContext(AuthContext)
  const token = context.token
  useEffect(() => {
    axios
      .get(
        'https://react-native-course-4db27-default-rtdb.firebaseio.com/message.json?auth=' +
          token,
      )
      .then((response) => {
        setFetchMessage(response.data)
      })
  }, [token])
  return (
    <View style={styles.rootContainer}>
      <Text style={styles.title}>Welcome!</Text>
      <Text>You authenticated successfully!</Text>
      <Text>{fetchMessage}</Text>
    </View>
  )
}

export default WelcomeScreen

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
})
