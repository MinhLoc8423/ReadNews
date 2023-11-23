import { Image, Pressable, StyleSheet, Text, View, FlatList, Alert } from 'react-native'
import React, { useState, useEffect, useContext } from 'react'
import { getMyNews } from '../NewsService'
import { UserContext } from '../../users/UserContext'

const Profile = (props) => {
  const { navigation } = props
  const [news, setNews] = useState([])
  const [loading, setLoading] = useState(false)
  const [loading1, setLoading1] = useState(false)

  const { onLogout } = useContext(UserContext)

  const onLogoutPress = async () => {
    setLoading1(true)
    const result = await onLogout()
    if (!result) {
      Alert.alert('Login failed!')
    }
    setLoading1(false)
  }

  const onGetNews = async () => {
    setLoading(true)
    const news = await getMyNews()
    setNews(news)
    setLoading(false)
  }

  useEffect(() => {
    onGetNews()
  }, [])

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
          <Text style={styles.title1}>{item.title}</Text>
          <View style={styles.createdBy}>
            <Image source={require('../../../assets/images/bbc_news.jpg')} style={{ width: 20, height: 20, borderRadius: 60, marginRight: 4 }} />
            <Text style={styles.nameCreater} >Wilson Franci</Text>
            <Image source={require('../../../assets/images/icon_clock.png')} style={{ width: 14, height: 14, marginLeft: 8, marginTop: 2.5, marginRight: 4 }} />
            <Text>{postedTime}</Text>
          </View>
        </View>
      </Pressable>
    )
  }

  return (
    <View style={styles.body}>
      <Text style={styles.title}>Profile</Text>
      <View style={styles.header}>
        <Image source={require('../../../assets/images/avata.png')} style={{ width: 100, height: 100 }} />
        <View style={styles.vFl}>
          <Text style={styles.textFl}>2156</Text>
          <Text style={{ fontFamily: "Poppins-Medium" }}>Followers</Text>
        </View>
        <View style={styles.vFl}>
          <Text style={styles.textFl}>567</Text>
          <Text style={{ fontFamily: "Poppins-Medium" }}>Following</Text>
        </View>
        <View style={styles.vFl}>
          <Text style={styles.textFl}>23</Text>
          <Text style={{ fontFamily: "Poppins-Medium" }}>News</Text>
        </View>
      </View>
      <Text style={styles.textFl}>Wilson Franci</Text>
      <Text style={{ fontFamily: "Poppins-Medium" }} >Lorem Ipsum is simply dummy text of the printing and typesetting industry.</Text>
      <View style={[styles.header, { marginTop: 16 }]}>
        <Pressable style={styles.btn} onPress={() => { navigation.navigate("EditProfile") }} >
          <Text style={styles.btnLabel}>Edit profile</Text>
        </Pressable>
        <Pressable style={styles.btn} >
          <Text style={styles.btnLabel} onPress={onLogoutPress}>{loading1 ? 'Loading...' : 'Logout'}</Text>
        </Pressable>
      </View>
      <View style={styles.news}>
        <Text style={styles.txtNews}>News</Text>
      </View>
      <View style={{ height: '55%' }}>
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

export default Profile

const styles = StyleSheet.create({
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
  title1: {
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
  txtNews: {
    fontFamily: "Poppins-Regular",
    fontStyle: 'normal',
    fontSize: 16,
    lineHeight: 22,
    letterSpacing: 0.12,
    textAlign: 'center',
    borderBottomWidth: 2,
    borderBottomColor: '#1877F2',
    color: '#000000',
  },
  news: {
    marginRight: 10,
    padding: 2,
    marginBottom: 16,
    alignItems: 'center'
  },
  btnLabel: {
    fontFamily: "Poppins-Medium",
    fontStyle: 'normal',
    fontWeight: "600",
    fontSize: 16,
    lineHeight: 24,
    letterSpacing: 0.12,
    color: '#FFFFFF',
  },
  btn: {
    width: '45%',
    height: 50,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,
    backgroundColor: '#1877F2',
    borderRadius: 6,
  },
  textFl: {
    fontFamily: "Poppins-Medium",
    fontStyle: 'normal',
    fontSize: 16,
    lineHeight: 24,
    color: '#000000',
  },
  vFl: {
    alignItems: 'center',
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    textAlign: 'center',
    fontFamily: 'Poppins-Regular',
    fontStyle: 'normal',
    fontSize: 16,
    lineHeight: 24,
    color: '#000000',
    marginBottom: 16,
    marginTop: 24
  },
  body: {
    flex: 1,
    padding: 24,
    backgroundColor: '#FFFFFF'
  }
})