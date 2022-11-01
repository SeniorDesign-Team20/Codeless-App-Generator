import React, { Component } from 'react';
import { Text, View } from 'react-native';

class Headers extends Component {
  render() {
    return (
        <View>
            <Text style={styles.baseText}>You can either select features from the list, 
                or write what you want included in the text box!
            </Text>
        </View>
    );
  }
}

const styles = StyleSheet.create({
    baseText: {
      fontWeight: 'bold'
    },
})

export default Headers;

