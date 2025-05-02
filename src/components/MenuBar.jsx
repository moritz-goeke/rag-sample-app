import { Box, Button, Divider, Icon, Typography } from "@mui/material";
import * as React from "react";
import { useNavigate } from "react-router-dom";
import AzureLogo from "../assets/azure_logo.png";
import { BLUE, DARK, WHITE } from "../components/consts";
import "../index.css"; // this imports "*" for all pages (because it is a one-pager)

export default function MenuBar() {
  const pages = [
    { label: "Chat", route: "/" },
    { label: "About", route: "/about" },
  ];

  const navigate = useNavigate();

  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          width: 1,
          bgcolor: DARK,
          height: 65,
          justifyContent: "space-between",
          alignItems: "center",
          userSelect: "none",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Icon sx={{ width: "auto", height: 40, ml: 3 }}>
            <img draggable={false} src={AzureLogo} height="40px" />
          </Icon>
          <Typography
            sx={{
              display: { xs: "none", md: "inline" },
              ml: 2,
              color: WHITE,
              fontFamily: "Lato",
              fontSize: 22,
              fontWeight: 100,
              userSelect: "none",
            }}
          >
            Azure | <strong>R</strong>etrieval <strong>A</strong>ugmented{" "}
            <strong>G</strong>eneration Sample App
          </Typography>
          <Typography
            sx={{
              display: { xs: "inline", md: "none" },
              ml: 2,
              color: WHITE,
              fontFamily: "Lato",
              fontSize: 18,
              fontWeight: 100,
              userSelect: "none",
            }}
          >
            Azure | RAG
          </Typography>
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          width: 1,
          bgcolor: BLUE,
          height: 25,
          alignItems: "center",
          userSelect: "none",
        }}
      >
        <Box sx={{ width: 70 }} />
        {pages.map((page, index) => (
          <React.Fragment key={index}>
            <Button
              onClick={() => {
                navigate(page.route);
              }}
              sx={{ height: 25, color: WHITE }}
            >
              {page.label}
            </Button>
            {index !== pages.length - 1 && (
              <Divider
                flexItem
                orientation="vertical"
                sx={{ bgcolor: WHITE, my: 0.5, mx: 2 }}
              />
            )}
          </React.Fragment>
        ))}
      </Box>
    </Box>
  );
}
