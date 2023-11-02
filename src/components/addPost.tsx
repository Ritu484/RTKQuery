import * as React from 'react';
import {
  Text,
  Button,
  Platform,
  TextInput,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  View,
} from 'react-native';
import {useAddPostMutation} from '../services/postsApi';

export const AddPost = ({setShowAdd}) => {
  const [body, setBody] = React.useState('');
  const [title, setTitle] = React.useState('');
  const [userId, setUserId] = React.useState('');
  const [addPost] = useAddPostMutation();
  const keyboardVerticalOffset = Platform.OS === 'ios' ? 40 : 0;

  const addHandler = async () => {
    try {
      let post = {
        title,
        body,
        userId,
      };
      Alert.alert(JSON.stringify(await addPost(post).unwrap()));
      setShowAdd(true);
    } catch (error) {
      Alert.alert(JSON.stringify(error));
    }
  };

  return (
      <KeyboardAvoidingView
        behavior="position"
        keyboardVerticalOffset={keyboardVerticalOffset}
      >
        <Text style={styles.headerStyle}>Enter the details</Text>
        <TextInput
          placeholder="Please enter the id"
          value={userId}
          onChangeText={text => setUserId(text)}
          style={styles.inputStyle}
        />
        <TextInput
          placeholder="Please enter the title"
          style={styles.inputStyle}
          value={title}
          onChangeText={text => setTitle(text)}
        />
        <TextInput
          placeholder="Please enter the message"
          value={body}
          onChangeText={text => setBody(text)}
          style={[
            styles.inputStyle,
            {
              marginBottom: 40,
            },
          ]}
        />
         <View style={styles.buttonContainer}>
        <Button onPress={addHandler} title="Add" color="#240E6C"  />
        </View>
      </KeyboardAvoidingView>
  );
};
const styles = StyleSheet.create({
  headerStyle: {
    fontSize: 40,
    color: 'black',
    lineHeight: 50,
    textAlign: 'center',
    paddingVertical: 50,
  },
  inputStyle: {
    borderWidth: 1,
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 20,
    marginHorizontal:48,
  },
  buttonContainer: {
    width: 150,
    alignSelf: 'center',
    marginBottom: 20,
    paddingTop: 20,
  },
});
