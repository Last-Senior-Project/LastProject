import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList } from 'react-native';
import axios from 'axios';
import { GiftedChat } from "react-native-gifted-chat"
const ChatBot = () => {
  const [messages, setMessages] = useState([])
  const apiKey = "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"
  let requests = 0;
  let lastRequestTime;
  const handleSend = async (newMessages = []) => {
    const currentTime = Date.now();
    if (requests > 0 && currentTime - lastRequestTime < 60000) {
      setTimeout(() => handleSend(newMessages), 60000 - (currentTime - lastRequestTime));
      return;
    }
    try {
      const userMessage = newMessages[0];
      setMessages(previousMessages => GiftedChat.append(previousMessages, userMessage))
      const messageText = userMessage.text.toLowerCase();
      const keywords = ['freelance', 'project', 'work', 'money','payment','project management','communication','time tracking','availability','platform security','refunds','ratings']
      if (!keywords.some(keyWord => messageText.includes(keyWord))) {
        const botMessage = {
          _id: new Date().getTime() + 1,
          text: "Hello! I am your personal assistant bot for this freelance application. My name is Gig-Hive, and I am here to assist you with any questions you might have. To get started, please select one of the following keywords that best describes what you would like to know: Payment / Project management / Communication / Client feedback / Freelancer profiles / Dispute resolution / Communication / Time tracking / Availability / Platform security / Onboarding / Refunds / Ratings / Freelance / Project / Work / Money  " ,
          createdAt: new Date(),
          user: {
            _id: 2,
            name: 'Chat Bot'
          }
        }
        setMessages(previousMessages => GiftedChat.append(previousMessages, botMessage));
        return
      }
      if (keywords.some(keyWord => messageText.includes(keyWord))) {
        let responseText;
        if (messageText.includes('freelance')) {
          responseText = "Freelancing is a way of working independently, rather than being employed by a company. Freelancers are self-employed and typically offer services to clients on a project basis.";
        } else if (messageText.includes('project')) {
          responseText = "A project is a temporary endeavor with a defined beginning and end, undertaken to meet unique goals and objectives, typically to bring about beneficial change or added value.";
        } else if (messageText.includes('work')) {
          responseText = "Work refers to an activity in which one expends effort to produce something, whether it's a physical product or a service.";
        } else if (messageText.includes('money')) {
          responseText = "Money is a medium of exchange in the form of coins, banknotes, or digital currency that is widely accepted in transactions.";
        }  else if (messageText.includes('payment')) {
          responseText = "How do I withdraw my earnings from the platform? You can withdraw your earnings by going to the 'Earnings' tab in your dashboard and selecting the payment method you prefer.";
        }
        else if (messageText.includes('project management')) {
          responseText = "How do I submit a proposal for a project? To submit a proposal, find a project that interests you and click the 'Submit Proposal' button. You will be prompted to enter your bid and other details.";
        }
        else if (messageText.includes('communication')) {
          responseText = "How do I send a message to a client or freelancer? You can send a message by clicking on the messaging icon in the dashboard and selecting the recipient from your contacts list.";
        }
        else if (messageText.includes('client feedback')) {
          responseText = "How can I view my client's feedback on my work? You can view your feedback by going to your freelancer profile and clicking on the 'Reviews' tab.";
        }
        else if (messageText.includes('freelancer profiles')) {
          responseText = "How can I make my profile more attractive to clients? Make sure your profile is complete, with a professional profile picture and detailed descriptions of your skills and experience.";
        }
        else if (messageText.includes('dispute resolution')) {
          responseText = "What should I do if I have a dispute with a client or freelancer? Contact support immediately to report the issue and seek a resolution.";
        }
        else if (messageText.includes('communication')) {
          responseText = "How do I send a message to a client or freelancer? You can send a message by clicking on the messaging icon in the dashboard and selecting the recipient from your contacts list.";
        }
        else if (messageText.includes('time tracking')) {
          responseText = "Is time tracking mandatory for every project? No, time tracking is optional for hourly projects. However, it is highly recommended to ensure accurate payment and transparency.";
        }
        else if (messageText.includes('availability')) {
          responseText = "How do I indicate my availability for new projects? You can set your availability status in your profile settings. You can choose to be available, not available, or available for specific hours.";
        }
        else if (messageText.includes('platform security')) {
          responseText = "How does the platform ensure the security of my personal and financial information? We use advanced encryption and security protocols to protect your information. We also regularly monitor the platform for any suspicious activity. What should I do if I suspect that my account has been compromised? Contact support immediately to report the issue and take steps to secure your account. Is it safe to use the platform for financial transactions? Yes, we use secure payment gateways and regularly monitor for fraudulent activity.";
        }
        else if (messageText.includes('refunds')) {
          responseText = "What is the platform's refund policy? The refund policy varies depending on the nature of the project and the parties involved. In most cases, refunds are only issued in the event of a dispute or cancellation.";
        }
        else if (messageText.includes('ratings')) {
          responseText = "How are ratings calculated on the platform? Ratings are calculated based on feedback from clients and other freelancers. Clients can rate freelancers on a scale of 1-5 stars, and freelancers can rate clients on a similar scale. What should I do if I receive unfair";
        }
        const botMessage = {
          _id: new Date().getTime() + 1,
          text: responseText,
          createdAt: new Date(),
          user: {
            _id: 2,
            name: 'Chat Bot'
          }
        }
        setMessages(previousMessages => GiftedChat.append(previousMessages, botMessage));
        return;
      }
      requests++;
      lastRequestTime = Date.now();
      const response = await axios.post('https://api.openai.com/v1/engines/text-davinci-003/completions', {
        prompt: `Get a response ${messageText}`,
        max_tokens: 1024,
        temperature: 0.2,
        n: 1
      }, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        }
      })
      console.log(response.data);
      const recipe = response.data.choices[0].text.trim();
      const botMessage = {
        _id: new Date().getTime() + 1,
        text: recipe,
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'Chat Bot'
        }
      }
      setMessages(previousMessages => GiftedChat.append(previousMessages, botMessage));
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <View style={{ flex: 1 }}>
      <View style={{
        backgroundColor: '#F5F5F5',
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomWidth: 1,
        marginTop: 40,
        marginBottom: 5
      }}>
        <Text style={{
          fontSize: 32,
          fontWeight: 'bold'
        }}>Gig-Hive Bot</Text>
      </View>
      <GiftedChat
        messages={messages}
        onSend={newMessages => handleSend(newMessages)}
        user={{ _id: 1 }}
      />
    </View>
  );
};
export default ChatBot;