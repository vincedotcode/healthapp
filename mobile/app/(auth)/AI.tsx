import React, { useState } from "react";
import { StyleSheet, Text, View, ScrollView, ActivityIndicator } from "react-native";
import Button from "@/components/Button";
import { Card, CardContent, CardFooter } from "@/components/Card";
import Input from "@/components/Input";
import useHealthChatService from "@/services/ai";

const Ai = () => {
  const [messages, setMessages] = useState<{ text: string, type: 'user' | 'ai' }[]>([]);
  const [message, setMessage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const { sendMessageToHealthChat } = useHealthChatService();

  const handleSendMessage = async () => {
    if (message.trim()) {
      const newMessages = [...messages, { text: message, type: 'user' as const }];
      setMessages(newMessages);
      setMessage("");
      setLoading(true);

      try {
        const response = await sendMessageToHealthChat(message);
        setMessages([...newMessages, { text: response.response, type: 'ai' as const }]);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>AI BOT</Text>
      <ScrollView style={styles.chatContainer} contentContainerStyle={styles.chatContent}>
        {messages.map((msg, index) => (
          <Card key={index} style={styles.messageCard}>
            <CardContent>
              <Text style={msg.type === 'user' ? styles.userMessageText : styles.aiMessageText}>
                {msg.type === 'user' ? 'User: ' : 'AI: '}
                {msg.text}
              </Text>
            </CardContent>
            <CardFooter>
              <Text style={styles.timestamp}>Just now</Text>
            </CardFooter>
          </Card>
        ))}
        {loading && (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="small" color="#0000ff" />
            <Text style={styles.loadingText}>Loading...</Text>
          </View>
        )}
      </ScrollView>
      <View style={styles.inputContainer}>
        <Input
          value={message}
          onChangeText={setMessage}
          placeholder="Type a message"
          containerStyle={styles.input}
        />
        <Button variant="default" onPress={handleSendMessage}>
          Send
        </Button>
      </View>
    </View>
  );
};

export default Ai;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f8f8",
    padding: 10,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },
  chatContainer: {
    flex: 1,
    marginBottom: 10,
  },
  chatContent: {
    paddingVertical: 10,
  },
  messageCard: {
    marginBottom: 10,
  },
  userMessageText: {
    fontSize: 16,
    color: "#333",
  },
  aiMessageText: {
    fontSize: 16,
    color: "#007BFF",
  },
  timestamp: {
    fontSize: 12,
    color: "#888",
    textAlign: "right",
  },
  loadingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
  },
  loadingText: {
    marginLeft: 10,
    fontSize: 16,
    color: "#333",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  input: {
    flex: 1,
    marginRight: 10,
  },
});
