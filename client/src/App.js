import React, { useState, useEffect } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Users from "./components/Users";
import Organizations from "./components/Organizations";
import Group from "./components/Groups";
import Login from "./components/Login";
import { useDispatch } from "react-redux";
import { handleData, handleFilterData } from "./components/actions/actionTypes";
import axios from "axios";

function App() {
  // const [user, setUser] = useState({ auth: false });

  const dispatch = useDispatch();
  useEffect(() => {
    async function fetchData() {
      const users = await axios.get("/api/users");
      dispatch(handleData({ users: users.data }));
      dispatch(handleFilterData({ users: users.data }));
      const organizations = await axios.get(
        "/api/organizations"
      );
      dispatch(handleData({ organizations: organizations.data }));
      dispatch(handleFilterData({ organizations: organizations.data }));
      const groups = await axios.get("/api/groups");
      dispatch(handleData({ groups: groups.data }));
      dispatch(handleFilterData({ groups: groups.data }));
    }
    fetchData();
  }, [dispatch]);
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/users" element={<Users />} />
          <Route path="/organizations" element={<Organizations />} />
          <Route path="/groups" element={<Group />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
