import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { BrowserRouter } from "react-router-dom";

import { ThemeProvider } from "./context/ThemeContext";
import { AuthProvider } from "./context/AuthContext";
import { EventProvider } from "./context/EventContext";
import { AchievementProvider } from "./context/AchievementContext";
import { ProfileProvider } from "./context/ProfileContext";
import { MembersProvider } from "./context/MembersContext";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <AuthProvider>
          <EventProvider>
            <AchievementProvider>
              <ProfileProvider>
                <MembersProvider>
                  <App />
                </MembersProvider>
              </ProfileProvider>
            </AchievementProvider>
          </EventProvider>
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>
);
