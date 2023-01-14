import { AsyncStorage } from "@react-native-async-storage/async-storage-native";
import React, { useState,useEffect } from "react";
import axios from 'axios';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TextInput,
    Button,
    TouchableOpacity,
} from "react-native";
// import { StatusBar } from "expo-status-bar";

const HomeScreen = ({ navigation }) => {
    const [tweet, setTweet] = useState("");
    const [sentiment, setSentiment] = useState("");
    const [score, setScore] = useState("");

    function createPost() {
        axios
            .post("http://127.0.0.1:8000/sentiment_analysis/", {
                text: tweet,
            })
            .then((response) => {
                setSentiment(response.data.sentiment);
                setScore(response.data.probability)
            });
    }

    return (
        <View style={styles.container}>
            <View style={styles.inputView}>
                <TextInput
                    style={styles.TextInput}
                    placeholder="Write your tweet here ..."
                    placeholderTextColor="#003f5c"
                    onChangeText={(tweet) => setTweet(tweet)}
                />
            </View>
            <TouchableOpacity style={styles.loginBtn}>
                <Button style={styles.loginText} onPress={createPost} title="Press me"
                    color="#f194ff" />
            </TouchableOpacity>

            <View style={styles.textDiv}>
                <Text >{sentiment}</Text>
                <Text style={styles.text}>{score}</Text>
            </View>


        </View>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
    image: {
        marginBottom: 40,
    },
    inputView: {
        backgroundColor: "#FFC0CB",
        borderRadius: 30,
        width: "70%",
        height: 45,
        marginBottom: 20,
        alignItems: "center",
    },
    TextInput: {
        height: 50,
        flex: 1,
        padding: 10,
        marginLeft: 20,
    },
    textDiv :{
        marginTop: 30
    },
    text : {
        marginTop: 10
    },
    forgot_button: {
        height: 30,
        marginBottom: 30,
    },
    loginBtn: {
        width: "60%",
        borderRadius: 25,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 40,
        backgroundColor: "#FF1493",
    },
});
export default HomeScreen;