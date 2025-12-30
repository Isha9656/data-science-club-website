import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { AuthProvider } from "./context/AuthContext";
import "./index.css";
import { EventProvider } from "./context/EventContext";
import { AchievementProvider } from "./context/AchievementContext";
import { ProfileProvider } from "./context/ProfileContext";
import { ThemeProvider } from "./context/ThemeContext";
import { MembersProvider } from "./context/MembersContext";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <AuthProvider>
  <EventProvider>
    <AchievementProvider>
      <ProfileProvider>
        <MembersProvider>
          <ThemeProvider>
            <BrowserRouter>
              <App />
            </BrowserRouter>
          </ThemeProvider>
        </MembersProvider>
      </ProfileProvider>
    </AchievementProvider>
  </EventProvider>
</AuthProvider>
);
