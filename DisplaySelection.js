import { View, Text, StyleSheet } from "react-native";
import React from "react";

const styles = StyleSheet.create({
    item: {
        padding: 10,
        fontSize: 18,
        height: 44,
      },
      displaySelectionContainer: {
        backgroundColor: "#fff",
        justifyContent: "flex-start",
        alignItems:"flex-end"
      },
});

const confirmFeatures = () =>{
    const selectedFeatures = [];
    if (feature1 === true){
        selectedFeatures.push({key: "Feature 1"});}
    if (feature2 === true){
        selectedFeatures.push({key: "Feature 2"});}
    if (feature3 === true){
        selectedFeatures.push({key: "Feature 3"});}
    if (feature4 === true){
        selectedFeatures.push({key: "Feature 4"});}
    if (feature5 === true){
        selectedFeatures.push({key: "Feature 5"});}
    return (
        <View syle={styles.displaySelectionContainer}>
            <FlatList
                data={selectedFeatures} 
                renderItem={({item}) => <Text style={styles.item}>{item.key}</Text>}
            />
        </View>
    );
};

export default confirmFeatures;
