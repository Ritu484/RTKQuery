import * as React from 'react';
import {
  StyleSheet,
  Text,
  Dimensions,
  View,
  Alert,
  Button,
} from 'react-native';
import {useDeletePostMutation} from '../services/postsApi';


const DeleteItem = ({userId,title}) => {
  console.log(title)
  const [
    deletePost,
  ] = useDeletePostMutation();

  const handleDelete = async ()  => {
    try {
      Alert.alert(JSON.stringify(await deletePost(userId).unwrap()));
    } catch (error) {
      Alert.alert(JSON.stringify(error));
      // you can handle errors here if you want to
    }
  };
  var width = Dimensions.get('window').width - 20;
  return (
    <View style={styles.viewStyleSheet}>
      <Text style={[styles.textStyles, {width: width}]}>
        {title}
      </Text>
      <View
        style={{
          width: 100,
          alignSelf: 'center',
          marginBottom: 20,
          paddingTop: 20,
        }}
      >
        <Button onPress={handleDelete} title="Delete" color="#240E6C" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  textStyles: {
    fontStyle: 'italic',
    fontSize: 20,
    color: 'black',
    padding: 10,
    alignSelf: 'center',
  },
  viewStyleSheet: {
    margin: 5,
    backgroundColor: '#D0CFD3',
    borderRadius: 10,
  },
});
export default DeleteItem;
