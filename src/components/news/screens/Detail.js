import { StyleSheet, Text, View, Image, Pressable, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { getNewsDetail } from '../NewsService'

const Detail = (props) => {
    const { navigation, route } = props
    const { id } = route?.params
    const [newsDetail, setNewDetail] = useState(null)

    const onGetNewsDetail = async () => {
        if (!id) return
        const data = await getNewsDetail(id)
        setNewDetail(data[0])
    }

    useEffect(() => {
        onGetNewsDetail();
    }, [id])

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

    if (!newsDetail) return <View><Text>Loading...</Text></View>
    let postedDate = new Date(newsDetail.createdAt);
    let postedTime = displayPostedTime(postedDate);
    return (
        <View style={styles.body}>
            <ScrollView showsVerticalScrollIndicator={false} style={{height:'100%'}}>
            <Pressable style={{ marginBottom: 16 }} onPress={() => { navigation.goBack() }}>
                <Image source={require('../../../assets/images/icon_back.png')} style={{width: 20, height: 20}} />
            </Pressable>
            <View style={styles.avataView}>
                <Image source={require('../../../assets/images/bbc_news.jpg')} style={{ width: 50, height: 50, borderRadius: 60, marginRight: 4 }} />
                <View style={{ justifyContent: 'center' }}>
                    <Text style={styles.textTrending}>BCC NEWS</Text>
                    <Text>{postedTime}</Text>
                </View>
            </View>
            <Image source={{ uri: newsDetail.image }}
                style={{ width: "100%", height: 248, borderRadius: 6 }} />
            <Text style={styles.title}>{newsDetail.title}</Text>
            <Text style={styles.content}>{newsDetail.content}</Text>
            </ScrollView>
        </View>
    )
}

export default Detail

const styles = StyleSheet.create({
    content:{
        fontFamily: "Poppins-Regular",
        fontStyle: 'normal',
        fontWeight: "400",
        fontSize: 16,
        lineHeight: 24,
        color: '#000000',
        marginBottom: 15,
    },
    title:{
        fontFamily: "Poppins-Regular",
        fontStyle: 'normal',
        fontWeight: "400",
        fontSize: 24,
        lineHeight: 36,
        color: '#000000',
        marginTop: 4,
        marginBottom: 15,
    },
    textTrending: {
        fontFamily: "Poppins-Medium",
        fontStyle: 'normal',
        fontWeight: "900",
        fontSize: 16,
        lineHeight: 24,
        color: '#000000',
    },
    avataView: {
        display: 'flex',
        flexDirection: 'row',
        marginBottom: 16,
    },
    body: {
        flex: 1,
        paddingLeft: 24,
        paddingRight: 24,
        paddingTop: 24,
        backgroundColor: '#FFFFFF'
    }
})