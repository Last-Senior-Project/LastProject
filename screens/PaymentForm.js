import React, { useCallback, useState, useEffect } from "react";
import { View, Button, Text,StyleSheet } from "react-native";
import { useStripe } from "@stripe/stripe-react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import axios from "axios";
import tw from "tailwind-react-native-classnames";
import { gs, colors} from "../Styles"

const PaymentForm = () => {
  const route = useRoute();
  const [project, setProject] = useState(route.params.project);
  const { initPaymentSheet, presentPaymentSheet } = useStripe();

  const onCheckout = async () => {
    const response = await axios.post(
      "http://192.168.43.92:5000/payments/intents",
      { amount: Math.floor(total * 100) }
    );
    console.log(response.data);
    const initResponse = await initPaymentSheet({
      merchantDisplayName: "GigHive",
      paymentIntentClientSecret: response.data.paymentIntent,
    });

    if (initResponse.error) {
      console.log(initResponse.error);
      Alert.alert("Something went wrong");
      return;
    }

    await presentPaymentSheet();
  };
  const commission = (parseInt(project.price) * 10) / 100;
  console.log(commission);
  const total = parseInt(project.price) + commission;
  console.log(total);
  return (
    <View style={[tw`flex-1 justify-center items-center`,{backgroundColor:colors.darkBg}]} >
      <View style={[tw`bg-white rounded-lg shadow-lg p-6`]}>
        <View style={[tw`mb-4`,gs.title]}>
          <Text style={tw`text-lg font-bold`}>Payment Information</Text>
        </View>
        <Text style={tw`mb-2`}>{project.name}</Text>
        <Text style={tw`mb-2`}>{project.description}</Text>
        <Text style={tw`mb-4`}>Price :{project.price}+commission:10%</Text>
        <Text style={tw`mb-4`}>total : {total}$</Text>

        <View style={[tw`flex-row justify-center`,{borderRadius:8}]}>
          <Button title="Pay" onPress={onCheckout} color={"#2D3748"}/>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({

})

export default PaymentForm;
