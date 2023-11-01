import * as React from 'react';
import {usePostsQuery} from './src/services/postsApi';
import {AddPost} from './src/components/addPost';
import DeleteItem from './src/components/deletePost';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  Button,
  FlatList,
  View,
} from 'react-native';
import { PostModal } from './src/models/post.model';

function App(): JSX.Element {
  const [currentPage, setCurrentPage] = React.useState(10);
  const [showAdd, setShowAdd] = React.useState<Boolean>(true);
  const {data, refetch: refetchData, isLoading} = usePostsQuery(currentPage);

  const fetchMore = async () => {
    if (isLoading) return;
    setCurrentPage(currentPage + 10);
    refetchData();
  };

  const renderItem = ({item}):PostModal => {
    console.log(item.body)
    return <DeleteItem item />;
  };
  const ItemSeparator= () => (
    <View
      style={{
        height: 2,
        backgroundColor: 'rgba(0,0,0,0.5)',
        marginLeft: 10,
        marginRight: 10,
      }}
    />
  );

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={{alignItems: 'center'}}>
        {!showAdd && <AddPost setShowAdd={setShowAdd} />}
        {showAdd && data && (
          <>
            <Text
              style={{
                fontSize: 40,
                color: 'black',
                lineHeight: 50,
                textAlign: 'center',
                paddingTop: 50,
              }}
            >
              RTK Query{' '}
            </Text>
            {showAdd && (
              <View
                style={{
                  width: 150,
                  alignSelf: 'center',
                  marginBottom: 20,
                  paddingTop: 20,
                }}
              >
                <Button
                  onPress={() => setShowAdd(!showAdd)}
                  title={showAdd ? 'Add New Item' : 'Submit'}
                  color="#240E6C"
                />
              </View>
            )}
            <FlatList
              data={data}
            //  renderItem={renderItem}
              renderItem={({ item }) => <DeleteItem title={item.title} body={item.body} userId={item.userId} />}
              keyExtractor={item => item.id.toString()}
              ItemSeparatorComponent={ItemSeparator}
              onEndReached={fetchMore}
              onEndReachedThreshold={0}
            />
          </>
        )}
      </View>
    </SafeAreaView>
  );
}

export default App;
