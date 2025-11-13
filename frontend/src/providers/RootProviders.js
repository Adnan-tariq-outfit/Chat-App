"use client";
// import { Provider } from "react-redux";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import AppThemeProvider from "@/contexts/AppThemeContext";
// import store from "@/redux/store";
import { InitColorSchemeScript } from "@mui/material";

export default function RootProviders({ children }) {
  return (
    <>
      {/* <Provider store={store}> */}
      <InitColorSchemeScript attribute="class" />
      <AppRouterCacheProvider>
        <AppThemeProvider>{children}</AppThemeProvider>
      </AppRouterCacheProvider>

      {/* </Provider> */}
    </>
  );
}
