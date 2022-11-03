import { StyleSheet, View } from "react-native";
import { useState } from "react";
import CheckBox from "./CheckBox";
import firebaseConfig from "./firebase";
//import Headers from "./TextAndHeaders";

export default function App() {
    const [feature1, set1] = useState(false);
    const [feature2, set2] = useState(false);
    const [feature3, set3] = useState(false);
    const [feature4, set4] = useState(false);
    const [feature5, set5] = useState(false);
    
    return (
        <View style={styles.container}>
            <CheckBox
                onPress={() => set1(!feature1)}
                title="Example Feature 1"
                isChecked={feature1}
              />
              <CheckBox
                onPress={() => set2(!feature2)}
                title="Example Feature 2"
                isChecked={feature2}
              />
              <CheckBox
                onPress={() => set3(!feature3)}
                title="Example Feature 3"
                isChecked={feature3}
              />
              <CheckBox
                onPress={() => set4(!feature4)}
                title="Example Feature 4"
                isChecked={feature4}
              />
              <CheckBox
                onPress={() => set5(!feature5)}
                title="Example Feature 5"
                isChecked={feature5}
              />
        </View>
      );
    }
  
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        justifyContent: "center",
        alignItems: "left",
      },
});
