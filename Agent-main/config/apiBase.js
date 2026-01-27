import { Platform } from "react-native";
import Constants from "expo-constants";

const getHostUri = () =>
  Constants.expoConfig?.hostUri ||
  Constants.manifest?.debuggerHost ||
  Constants.manifest2?.extra?.expoGo?.debuggerHost ||
  "";

const getLanApiBase = () => {
  const hostUri = getHostUri();
  if (!hostUri) return null;
  const host = hostUri.split(":")[0];
  return `http://${host}:3000`;
};

const getConfigApiBase = () =>
  Constants.expoConfig?.extra?.apiBase ||
  Constants.manifest?.extra?.apiBase ||
  Constants.manifest2?.extra?.apiBase ||
  null;

export const API_BASE =
  process.env.EXPO_PUBLIC_API_BASE ||
  getConfigApiBase() ||
  (Platform.OS === "android"
    ? "http://10.0.2.2:3000"
    : Platform.OS === "web"
      ? "http://localhost:3000"
      : getLanApiBase() || "http://localhost:3000");
