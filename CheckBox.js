
import { Pressable, StyleSheet, Text, View } from "react-native";
import { useState } from "react";
import React from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const CheckBox = (props) => {
    const iconName = props.isChecked ?
        "checkbox-marked" : "checkbox-blank-outline";
    // const toggleChoice = props.toggleChoice; 
    // const feature = props.feature;
    // const [checked, setChecked] = useState(false);
    // const handleChange = () =>{
    //     setChecked(!checked); toggleChoice(feature);
    // }
    return (
        <View style={styles.container}>
            <Pressable onPress={props.onPress}>
                <MaterialCommunityIcons 
                    name={iconName} size={24} color="#000" />
            </Pressable>
            <Text style={styles.title}>{props.title}</Text>
        </View>
    );
};

export default CheckBox;
  
const styles = StyleSheet.create({
    container: {
        justifyContent: "flex-start",
        alignContent: "center",
        flexDirection: "row",
        width: 300,
        marginTop: 5,
        marginHorizontal: 5,
    },
    title: {
        fontSize: 16,
        color: "#000",
        marginLeft: 5,
        fontWeight: "600",
    },
}); 