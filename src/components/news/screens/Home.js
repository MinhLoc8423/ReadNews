import { StyleSheet, Text, View, FlatList, Pressable, Image, ScrollView, TouchableOpacity } from 'react-native'
import React, { useState, useEffect } from 'react'

import { getNews } from '../NewsService'
import { SafeAreaView } from 'react-native-safe-area-context'

const Home = (props) => {
  const { navigation } = props
  const [news, setNews] = useState([])
  const [loading, setLoading] = useState(false)
  const [selectedItem, setSelectedItem] = useState(0);

  const onGetNews = async () => {
    setLoading(true)
    const news = await getNews()
    setNews(news)
    setLoading(false)
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
      <Pressable style={styles.cards} onPress={() => navigation.navigate("Detail", { id: item._id })}>
        <View style={styles.viewImg}>
          <Image source={{ uri: item.image }} style={{ width: 93, height: 93, borderRadius: 6 }} />
        </View>
        <View>
          <Text>Money</Text>
          <Text style={styles.title}>{item.title}</Text>
          <View style={styles.createdBy}>
            {item.createdBy.avatar === null || item.createdBy.avatar === "" ? <Image source={require('../../../assets/images/bbc_news.jpg')} style={{ width: 20, height: 20, borderRadius: 60, marginRight: 4 }} /> : <Image source={{ uri: item.createdBy.avatar }} style={{ width: 20, height: 20, borderRadius: 60, marginRight: 4 }} />}
            <Text style={styles.nameCreater} >{item.createdBy.name === null || item.createdBy.name == '' ? "BBC News" : item.createdBy.name}</Text>
            <Image source={require('../../../assets/images/icon_clock.png')} style={{ width: 14, height: 14, marginLeft: 8, marginTop: 2.5, marginRight: 4 }} />
            <Text>{postedTime}</Text>
          </View>
        </View>
      </Pressable>
    )
  }

  const handleItemPress = (index) => {
    setSelectedItem(index);
  };

  const renderItemAll = ({ item, index }) => {
    const itemStyles = [styles.item];
    if (index === selectedItem) {
      itemStyles.push(styles.selectedItem);
    }
    return (
      <TouchableOpacity onPress={() => handleItemPress(index)} >
        <View style={itemStyles} >
          <Text>{item.name}</Text>
        </View>
      </TouchableOpacity>
    )
  }

  useEffect(() => {
    onGetNews()
  }, [])

  return (
    <View style={styles.body}>
      <View style={styles.header}>
        <Image style={{ width: 99, height: 30 }} source={require('../../../assets/images/Logo.png')} />
        <Pressable style={styles.btn}>
          <Image source={require('../../../assets/images/icon_notification.png')} />
        </Pressable>
      </View>
      <Text style={styles.textTrending}>Latest</Text>
      <View style={{ marginBottom: 16 }} >
        <FlatList
          data={DATA}
          renderItem={renderItemAll}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          keyExtractor={item => item.id}
        />
      </View>
      <View style={{ height: '85%' }}>
        <FlatList
          data={news}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
          keyExtractor={item => item._id}
          onRefresh={onGetNews}
          refreshing={loading}
        />
      </View>
    </View>
  )
}

export default Home

const styles = StyleSheet.create({
  selectedItem: {
    borderBottomColor: '#1877F2',
  },
  item: {
    borderBottomWidth: 2,
    borderBottomColor: '#fff',
    marginRight: 10,
    padding: 2
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
  textTrending: {
    fontFamily: "Poppins-Medium",
    fontStyle: 'normal',
    fontWeight: "900",
    fontSize: 16,
    lineHeight: 24,
    color: '#000000',
    marginBottom: 16,
  },
  btn: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: 34,
    height: 34,
    backgroundColor: '#FFFFFF',
    borderColor: 'rgba(0, 0, 0, 0.1)',
    borderRadius: 6,
    elevation: 4,
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  body: {
    flex: 1,
    padding: 24,
    backgroundColor: '#FFFFFF'
  }
})

var DATA = [
  { "id": 1, "name": "All" },
  { "id": 2, "name": "Sports" },
  { "id": 3, "name": "Politics" },
  { "id": 4, "name": "Bussiness" },
  { "id": 5, "name": "Health" },
  { "id": 6, "name": "Travel" },
  { "id": 7, "name": "Science" },
]
