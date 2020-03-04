import React from "react";
import { Redirect } from "react-router-dom";

export const Logout = history => {
  try {
    localStorage.removeItem("user");
    return history.push("/signin");
  } catch (e) {
    console.error(e);
  }
};
