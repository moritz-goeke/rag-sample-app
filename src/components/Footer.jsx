import { Box, Divider, Typography } from "@mui/material";
import * as React from "react";
import { LIGHT } from "./consts";

export default function Footer() {
  return (
    <Box sx={{ mb: 1 }}>
      <Divider flexItem sx={{ bgcolor: LIGHT, mx: 4, mt: 2 }} />
      <FooterLine sxObject={{ mt: 1 }}>
        {new Date().getFullYear()} | RAG Sample App | Built on Microsoft Azure
      </FooterLine>
    </Box>
  );
}

export function FooterLine({ children, sxObject = {}, typographySx = {} }) {
  return (
    <Box
      sx={{
        width: 1,
        display: "flex",
        justifyContent: "center",
        ...sxObject,
      }}
    >
      <Typography
        align="center"
        sx={{
          userSelect: "none",
          justifySelf: "center",
          fontFamily: "Lato",
          fontSize: 11,
          ...typographySx,
        }}
      >
        {children}
      </Typography>
    </Box>
  );
}
