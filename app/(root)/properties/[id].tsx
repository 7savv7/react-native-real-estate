import {View, Text} from "react-native";
import {useLocalSearchParams} from "expo-router";

const Property = () => {
    const {id} = useLocalSearchParams();

    return (
        <View>
            <Text>Hello {id}</Text>
        </View>
    )
}

export default Property