import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { ModalPortal } from "react-native-modals";
import { Provider } from "react-redux";
import StackNavigator from "./StackNavigator";
import store from "./store";
import { StripeProvider} from '@stripe/stripe-react-native';
export default function App() {
  return (
    <>
      <StripeProvider publishableKey="pk_test_51N7gQfAZRX59Sn8GR3XVdwtxMpAkdC96tmS4YM9u8Qgjo3aght9SAQ61QhbGPDI4lFhMb1xKuIz3fzkBwn83Qz0B00MOGqVJSY">
      <Provider store={store}>
        <StackNavigator />
        <ModalPortal />
      </Provider>
      </StripeProvider>
    </>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});