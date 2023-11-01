import * as React from 'react';
import {useAddPostMutation} from '../services/postsApi';
import {Text, Button, View, TextInput, StyleSheet,Alert} from 'react-native';

export const AddPost = ({setShowAdd}) => {
  const [body, setBody] = React.useState('');
  const [title, setTitle] = React.useState('');
  const [userId, setUserId] = React.useState('');

  const [addPost] = useAddPostMutation();

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
    <View style={{justifyContent: 'center'}}>
      <Text style={styles.headerStyle}>Enter the details</Text>
      <TextInput
        placeholder="enter your id here"
        value={userId}
        onChangeText={text => setUserId(text)}
        style={styles.inputStyle}
      />
      <TextInput
        placeholder="enter your title here"
        style={styles.inputStyle}
        value={title}
        onChangeText={text => setTitle(text)}
      />
      <TextInput
        placeholder="enter your message here"
        value={body}
        onChangeText={text => setBody(text)}
        style={[
          styles.inputStyle,
          {
            marginBottom: 40,
          },
        ]}
      />
      <Button onPress={addHandler} title="Add" color="#240E6C" />
    </View>
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
  },
});
