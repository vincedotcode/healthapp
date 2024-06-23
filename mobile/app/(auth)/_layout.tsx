import React, { useEffect } from "react";
import { Tabs, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Colors from "@/constants/Colors";

const Layout = () => {
  const router = useRouter();

  useEffect(() => { }, []);

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors.light.primary,
        tabBarStyle: {
          backgroundColor: Colors.light.background,
          borderTopWidth: 0,
          height: 60,
          paddingVertical: 5,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "600",
          marginTop: -5,
        },
        tabBarIconStyle: {
          marginBottom: -3,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          tabBarLabel: "Health",
          tabBarIcon: ({ size, color }) => (
            <Ionicons name="fitness-outline" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="appointments"
        options={{
          tabBarLabel: "Appointments",
          tabBarIcon: ({ size, color }) => (
            <Ionicons name="medkit-outline" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="AI"
        options={{
          tabBarLabel: "AI",
          tabBarIcon: ({ size, color }) => (
            <MaterialCommunityIcons
            name="robot"
            size={size}
            color={color}
          />
          ),
        }}
      />

      <Tabs.Screen
        name="doctor"
        options={{
          tabBarLabel: "Doctors",
          tabBarIcon: ({ size, color }) => (
            <MaterialCommunityIcons
              name="doctor"
              size={size}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          tabBarLabel: "Profile",
          tabBarIcon: ({ size, color }) => (
            <Ionicons name="person-circle-outline" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
};

export default Layout;
