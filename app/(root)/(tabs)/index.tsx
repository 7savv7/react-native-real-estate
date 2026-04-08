import { Text, View } from "react-native";
import "./../../globals.css"
import {Link} from "expo-router";

export default function App() {
    return (
        <View className="flex-1 items-center justify-center bg-white">
            <Link href={"/sign-in"}>Sign In</Link>
            <Text className="text-xl text-blue-500 font-rubik">
                Welcome to Nativewind!
            </Text>
        </View>
    );
}