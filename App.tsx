import * as React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  Button,
  FlatList,
  View,
  ActivityIndicator,
  TouchableWithoutFeedback,
  Keyboard
} from 'react-native';
import {usePostsQuery} from './src/services/postsApi';
import {AddPost} from './src/components/addPost';
import DeleteItem from './src/components/deletePost';
import {PAGE_LENGTH} from './src/constants'
import { PostModal } from './src/models/post.model';

function App(): JSX.Element {
  const [currentPage, setCurrentPage] = React.useState<number>(PAGE_LENGTH);
  const [showAdd, setShowAdd] = React.useState<Boolean>(true);
  const [postList, setPostList] = React.useState<PostModal[] | null>(null);
  const {data, refetch: refetchData, isLoading} = usePostsQuery(currentPage);

  React.useEffect(()=>{
    setPostList(data)
  },[data])

  const fetchMore = async () => {
    if (isLoading) return;
    setCurrentPage(currentPage + PAGE_LENGTH);
    refetchData();
  };

  const ItemSeparator = () => <View style={styles.separatorStyle} />;

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
    <SafeAreaView style={{flex: 1}}>
      {isLoading && (
        <ActivityIndicator
          size="large"
          color="#240E6C"
          style={styles.spinnerStyle}
        />
      )} 
        {!showAdd && <AddPost setShowAdd={setShowAdd} />}
        {showAdd && data && (
          <>
            <Text style={styles.headerStyle}>RTK Query</Text>
            {showAdd && (
              <View style={styles.buttonContainer}>
                <Button
                  onPress={() => setShowAdd(!showAdd)}
                  title={showAdd ? 'Add New Item' : 'Submit'}
                  color="#240E6C"
                />
              </View>
            )}
            <FlatList
              data={postList}
              renderItem={({item}) => (
                <DeleteItem title={item.title} userId={item.userId} />
              )}
              keyExtractor={item => item.id.toString()}
              ItemSeparatorComponent={ItemSeparator}
              onEndReached={fetchMore}
             onEndReachedThreshold ={.5}
            />
          </>
        )}
    </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}

export default App;

const styles = StyleSheet.create({
  headerStyle: {
    fontSize: 40,
    color: 'black',
    lineHeight: 50,
    textAlign: 'center',
    paddingTop: 50,
  },
  buttonContainer: {
    width: 150,
    alignSelf: 'center',
    marginBottom: 20,
    paddingTop: 20,
  },
  separatorStyle: {
    height: 2,
    backgroundColor: 'rgba(0,0,0,0.5)',
    marginLeft: 10,
    marginRight: 10,
  },
  spinnerStyle: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
