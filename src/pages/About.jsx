import { Box, Typography } from "@mui/material";
import * as React from "react";
import ArchitectureImg from "../assets/rag_architecture.png";
import "../index.css"; // this imports "*" for all pages (because it is a one-pager)

export default function About() {
  const fontSx = { fontSize: 14 };
  const subheaderSx = { fontSize: 17, mt: 1 };
  return (
    <Box
      sx={{
        width: 1,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        mt: 5,
      }}
    >
      <Box
        sx={{
          width: 1,
          display: "flex",
          flexDirection: "column",
          width: 700,
          maxWidth: 0.9,
          px: 5,
        }}
      >
        <Typography sx={{ fontWeight: 600, fontSize: 26, mb: 1 }}>
          Chat Application with Azure and RAG
        </Typography>
        <Typography sx={fontSx}>
          This architecture implements a modern chat application based on
          Retrieval-Augmented Generation (RAG) - a powerful combination of Large
          Language Models (LLMs) and context-based document retrieval. The goal
          is to provide users with well-founded, domain-specific answers to
          their questions - supported by internal company documents such as
          guides, manuals, or reports.
        </Typography>
        <Typography sx={{ my: 1, ...fontSx }}>
          The application uses various Azure services to provide a scalable,
          secure, and maintainable infrastructure:
        </Typography>
        <Box
          component="img"
          src={ArchitectureImg}
          sx={{
            width: 1,
            height: "auto",
            maxWidth: "85vw",
            borderRadius: 3,
            userSelect: "none",
            alignSelf: "center",
          }}
        />
        <Typography component="ol" sx={{ mt: 2, ...fontSx }}>
          <li>
            <strong>Azure Static Web Apps</strong> provides the frontend - an
            interactive chat interface for end users.
          </li>
          <li>
            <strong>Azure Functions</strong> handles the serverless business
            logic and orchestrates communication between the user, search, and
            AI.
          </li>
          <li>
            <strong>Azure AI Search</strong> searches an index of unstructured
            documents stored in <strong>Azure Blob Storage</strong>.
          </li>
          <li>
            <strong>Azure Foundry</strong> (with integrated OpenAI model)
            generates contextual answers based on the retrieved content.
          </li>
        </Typography>
        <Typography sx={{ fontWeight: "bold", mt: 2, fontSize: 20 }}>
          How does the process work? (RAG Flow)
        </Typography>
        <Typography sx={subheaderSx}>
          1. User sends a question in the chat app
        </Typography>
        <Typography sx={fontSx} component="ul">
          <li>
            The web app sends this question via REST API to an Azure Function.
          </li>
        </Typography>
        <Typography sx={subheaderSx}>
          2. Azure Function executes the RAG pipeline
        </Typography>
        <Typography sx={fontSx} component="ul">
          <li>
            The function receives the question and makes a semantic search
            request to Azure AI Search.
          </li>
          <li>
            AI Search searches the index created from the Blob Storage
            documents.
          </li>
          <li>The function receives relevant document passages.</li>
        </Typography>
        <Typography sx={subheaderSx}>3. Augmentation</Typography>
        <Typography sx={fontSx} component="ul">
          <li>
            The function combines the original question with the returned text
            passages.
          </li>
          <li>This enriched input is forwarded to Azure Foundry (LLM).</li>
        </Typography>
        <Typography sx={subheaderSx}>4. LLM generates an answer</Typography>
        <Typography sx={fontSx} component="ul">
          <li>
            The model analyzes the question in the context of the augmented
            information.
          </li>
          <li>
            It generates a precise, context-based answer – even for
            company-specific topics.
          </li>
        </Typography>
        <Typography sx={subheaderSx}>5. Answer sent to client</Typography>
        <Typography sx={fontSx} component="ul">
          <li>The function sends the LLM's answer back to the web app.</li>
          <li>The chat interface displays the final answer to the user.</li>
        </Typography>
      </Box>
      <Box sx={{ height: 200 }} />
    </Box>
  );
}
