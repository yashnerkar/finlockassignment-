import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import { useNavigate } from "react-router-dom"
export default function SideBar({ activeComponent = "contacts", handleClick }) {
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    if (window.innerWidth <= 600) setShow(false);
  }, []);
  return (
    <>
      <Box style={{ position: "fixed", left: "0", top: "9vh", zIndex: 5 }}>
        <Box
          sx={{
            width: "fit-content",
            boxShadow: "1px 0px 2px 0px rgb(224,224,224)",
            height: "100vh",
            backgroundColor: "white",
            zIndex: 5,
            display: "flex",
          }}
        >
          <Box>
            {show ? (
              <>
                <Box
                  style={{
                    padding: "15px 40px 15px 20px",
                    borderBottom: "thin solid rgb(224,224,224)",
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    backgroundColor: "white",
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    navigate("/users")
                  }}
                >
                  <i class="fa-solid fa-users"></i>

                  <Box style={{ fontWeight: "semi-bold", fontSize: "14px" }}>
                    Users
                  </Box>
                </Box>
                <Box
                  style={{
                    padding: "15px 40px 15px 20px",
                    borderBottom: "thin solid rgb(224,224,224)",
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    backgroundColor: "white",
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    navigate("/organizations")
                  }}
                >
                  <i class="fa-sharp fa-solid fa-sitemap"></i>

                  <Box style={{ fontWeight: "semi-bold", fontSize: "14px" }}>
                    Organizations
                  </Box>
                </Box>
                <Box
                  style={{
                    padding: "15px 40px 15px 20px",
                    borderBottom: "thin solid rgb(224,224,224)",
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    backgroundColor:
                      activeComponent === "messages" ? "lightgray" : "white",
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    navigate('/groups')
                  }}
                >
                  {" "}
                  <i class="fa-solid fa-user-group"></i>
                  <Box style={{ fontWeight: "semi-bold", fontSize: "14px" }}>
                    Groups
                  </Box>
                </Box>{" "}
              </>
            ) : null}
          </Box>

          <Box
            style={{
              height: "100vh",
              display: "flex",
              width: "0",
              alignItems: "center",
              margin: "1px 0px",
              boxShadow: "1px 0px 2px 0px rgba(212,212,212,1)",
              backgroundColor: "white",
              zIndex: 100,
            }}
          >
            <Box
              style={{
                height: "10vh",
                width: "fit-content",
                boxShadow: "1px 0px 2px 0px rgba(212,212,212,1)",
                borderRadius: "0 10px 10px 0",
                display: "flex",
                alignItems: "center",
                padding: "0 2px 0px 2px",
                cursor: "pointer",
                zIndex: 10,
                backgroundColor: "white",
              }}
              onClick={() => setShow(!show)}
            >
              {!show ? (
                <i
                  className="fa-solid fa-chevron-right fa-md"
                  style={{
                    color: "green",
                  }}
                ></i>
              ) : (
                <i
                  className="fa-solid fa-chevron-left fa-md"
                  style={{ color: "green" }}
                ></i>
              )}
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
}
