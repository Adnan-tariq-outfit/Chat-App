"use client";
// import { Provider } from "react-redux";
import { AuthProvider } from "@/contexts/AuthContext";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import AppThemeProvider from "@/contexts/AppThemeContext";
// import store from "@/redux/store";
import { InitColorSchemeScript } from "@mui/material";
import { Toaster } from "react-hot-toast";
import { ChatProvider } from "@/contexts/ChatContext";

export default function RootProviders({ children }) {
  return (
    <>
      {/* <Provider store={store}> */}

      <InitColorSchemeScript attribute="class" />
      <AppRouterCacheProvider>
        <AppThemeProvider>
          <AuthProvider>
            <ChatProvider>{children}</ChatProvider>
          </AuthProvider>
        </AppThemeProvider>
      </AppRouterCacheProvider>
      <Toaster />
      {/* </Provider> */}
    </>
  );
}
