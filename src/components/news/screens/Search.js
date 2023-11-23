import { StyleSheet, Text, View, Pressable, Image, TextInput, FlatList } from 'react-native'
import React, { useState, useEffect } from 'react'
import { searchNews } from '../NewsService'

const Search = (props) => {
  const { navigation } = props
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = (query) => {
    setSearchQuery(query)
    onGetNewsDetail()
  };

  useEffect(() => {
    onGetNewsDetail()
  }, [])

  const onGetNewsDetail = async () => {
    const data = await searchNews(searchQuery)
    setSearchResults(data)
  }

  function displayPostedTime(date) {
    let now = new Date(); // Ngày hiện tại

    // Tính khoảng thời gian giữa ngày hiện tại và ngày đăng
    let timeDiff = Math.abs(now.getTime() - date.getTime());

    // Tính số ngày, giờ, phút và giây
    let days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
    let hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);

    // Xây dựng chuỗi thời gian đăng
    let postedTime = "";

    if (days > 0) {
      postedTime += days + "n ago";
    }

    else if (hours > 0) {
      postedTime += hours + "h ago";
    }

    else if (minutes > 0) {
      postedTime += minutes + "m ago";
    }

    else if (seconds > 0) {
      postedTime += seconds + "s ago";
    }

    else if (postedTime === "") {
      postedTime = "Just nows";
    } else {
      postedTime += "ago";
    }

    return postedTime;
  }

  const renderItem = ({ item }) => {
    let postedDate = new Date(item.createdAt);
    let postedTime = displayPostedTime(postedDate);
    return (
      <Pressable style={styles.cards} onPress={() => navigation.navigate("HomeStack", { screen: "Detail", params: { id: item._id } })}>
        <View style={styles.viewImg}>
          <Image source={{ uri: item.image }} style={{ width: 93, height: 93, borderRadius: 6 }} />
        </View>
        <View>
          <Text>Money</Text>
          <Text style={styles.title}>{item.title}</Text>
          <View style={styles.createdBy}>
            <Image source={require('../../../assets/images/bbc_news.jpg')} style={{ width: 20, height: 20, borderRadius: 60, marginRight: 4 }} />
            <Text style={styles.nameCreater} >{item.createdBy.name === null || item.createdBy.name == '' ? "BBC News" : item.createdBy.name}</Text>
            <Image source={require('../../../assets/images/icon_clock.png')} style={{ width: 14, height: 14, marginLeft: 8, marginTop: 2.5, marginRight: 4 }} />
            <Text>{postedTime}</Text>
          </View>
        </View>
      </Pressable>
    )
  }

  return (
    <View style={styles.body}>
      <Text style={styles.TextSearch}>Search</Text>
      <View style={styles.btnSearch}>
        <TextInput style={styles.inputSearch}
          placeholder="Search"
          value={searchQuery}
          onChangeText={handleSearch}
        />
        <Image source={require('../../../assets/images/icon_search.png')} style={{ width: 20, height: 20, position: 'absolute', top: 13, left: 12 }} />
        <Image source={require('../../../assets/images/icon_remove.png')} style={{ width: 12, height: 12, position: 'absolute', top: 17, right: 9 }} />
      </View>
      <View style={styles.news}>
        <Text style={styles.txtNews}>News</Text>
      </View>
      <FlatList
        data={searchResults}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        keyExtractor={item => item._id}
      />
    </View>
  )
}

export default Search

const styles = StyleSheet.create({
  txtNews:{
    fontFamily: "Poppins-Regular",
    fontStyle: 'normal',
    fontSize: 16,
    lineHeight: 22,
    letterSpacing: 0.12,
    textAlign:'center',
    borderBottomWidth: 2,
    borderBottomColor: '#1877F2',
    color: '#000000',
  },
  news: {
    marginRight: 10,
    padding: 2,
    marginTop: 16,
    marginBottom: 16,
    alignItems: 'center'
  },
  createdBy: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  nameCreater: {
    fontFamily: "Poppins-Regular",
    fontStyle: 'normal',
    fontWeight: "600",
    fontSize: 13,
    lineHeight: 19.5,
    letterSpacing: 0.12,
    color: '#4E4B66',
  },
  title: {
    fontFamily: "Poppins-Medium",
    fontStyle: 'normal',
    fontSize: 16,
    maxHeight: 72,
    lineHeight: 24,
    letterSpacing: 0.12,
    color: '#000000',
    marginBottom: 4,
    marginTop: 4
  },
  viewImg: {
    width: 96,
    height: 96,
  },
  cards: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
    padding: 8,
    height: 120,
    gap: 4,
    marginBottom: 3,
  },
  inputSearch: {
    display: 'flex',
    paddingLeft: 42,
    paddingRight: 27,
    flexDirection: 'row',
    width: '100%',
    height: 45,
    borderWidth: 1,
    borderRadius: 6,
    borderColor: '#4E4B66'
  },
  btnSearch: {
    position: 'relative',
  },
  TextSearch: {
    fontFamily: "Poppins-Bold",
    fontStyle: 'normal',
    fontSize: 32,
    lineHeight: 48,
    color: '#000000',
  },
  body: {
    flex: 1,
    paddingLeft: 24,
    paddingRight: 24,
    paddingTop: 24,
    backgroundColor: '#FFFFFF'
  }
})
{/* <Text onPress={() => navigation.navigate("HomeStack", { screen: "Detail", params: { user: "Jane" } })}>Search</Text> */ }