import * as React from 'react';
import {StyleSheet, Text, Dimensions, View, Alert, Button} from 'react-native';
import {useDeletePostMutation} from '../services/postsApi';

const DeleteItem = ({userId, title}) => {
  const [deletePost] = useDeletePostMutation();

  const handleDelete = async () => {
    try {
      Alert.alert(JSON.stringify(await deletePost(userId).unwrap()));
    } catch (error) {
      Alert.alert(JSON.stringify(error));
    }
  };
  var width = Dimensions.get('window').width - 20;
  return (
    <View style={styles.viewStyleSheet}>
     <Text style={[styles.textStyles, {width: width}]}>User ID: {userId}</Text>
      <Text style={[styles.textStyles, {width: width}]}>Message : {title}</Text>
      <View
        style={styles.buttonContainer}
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
    padding: 5,
    alignSelf: 'center',
  },
  viewStyleSheet: {
    margin: 5,
    backgroundColor: '#D0CFD3',
    borderRadius: 10,
  },
  buttonContainer:{
    width: 100,
    alignSelf: 'center',
    marginBottom: 20,
    paddingTop: 20,
  }
});
export default DeleteItem;
