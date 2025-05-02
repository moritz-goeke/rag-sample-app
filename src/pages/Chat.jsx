import SendRoundedIcon from "@mui/icons-material/SendRounded";
import StopRoundedIcon from "@mui/icons-material/StopRounded";
import {
  Box,
  IconButton,
  InputAdornment,
  LinearProgress,
  TextField,
} from "@mui/material";
import axios from "axios";
import "katex/dist/katex.min.css";

import * as React from "react";
import AiMarkdown from "../components/AiMarkdown";
import {
  BLACK,
  BLUE,
  CHAT_AI_COLOR,
  CHAT_USER_COLOR,
  customScrollBar,
  RED,
} from "../components/consts";
import Typewriter from "../components/Typewriter";

export default function Chat() {
  const testData = [
    { message: "Hallo from gpt2!", from: "gpt", timestamp: Date.now() },
    { message: "Hallo from user2!", from: "user", timestamp: Date.now() },
    { message: "Hallo from gpt!", from: "gpt", timestamp: Date.now() },
    { message: "Hallo from user!", from: "user", timestamp: Date.now() },
  ];

  const [inputText, setInputText] = React.useState("");

  const [chatArray, setChatArray] = React.useState([]);
  // const [chatArray, setChatArray] = React.useState(testData);

  const [loadingAnswer, setLoadingAnswer] = React.useState(false);

  const [skipAnimation, setSkipAnimation] = React.useState(false);
  const [writing, setWriting] = React.useState(false);

  const defaultSettings = {
    temperature: 0.7,
    top_p: 0.95,
    frequency_penalty: 0,
    presence_penalty: 0,
    system_prompt: "",
    reasoningEffort: "medium",
  };

  const [currentContext, setCurrentContext] = React.useState("");

  const [settings, setSettings] = React.useState(defaultSettings);

  async function sendMessage(chatMessage, clearInputField) {
    if (chatMessage === "") return;
    setChatArray((prev) => [
      {
        message: chatMessage,
        from: "user",
        timestamp: Date.now(),
      },
      ...prev,
    ]);
    if (clearInputField) setInputText("");
    try {
      setLoadingAnswer(true);
      const res = await axios.post(
        "/api/openai",
        {
          message: chatMessage,
          conversation: JSON.stringify(chatArray.slice(0, 10)),
          config: JSON.stringify(settings),
          // model: "",
        },
        {
          headers: {
            "Content-Type": "text/plain",
          },
        }
      );
      setLoadingAnswer(false);
      setCurrentContext(res.data.choices[0].message?.context);
      setChatArray((prev) => [
        {
          message: res.data.choices[0].message.content
            .replace(/ ?\[.*?\]/g, "")
            .trim(),
          from: "gpt",
          timestamp: Date.now(),
        },
        ...prev,
      ]);
    } catch (e) {
      console.log(e);
      setLoadingAnswer(false);
      setChatArray((prev) => [
        {
          error: true,
          message: "Error in response. Please try again.",
          from: "gpt",
          timestamp: Date.now(),
        },
        ...prev,
      ]);
    }
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        width: 1,
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          width: 1,
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            width: 1,
            justifyContent: "center",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              width: 750,
              maxWidth: 1,
              mt: 5,
            }}
          >
            <Box
              sx={{
                display: "flex",
                width: 1,
                flexDirection: "column-reverse",
                overflowY: "scroll",
                minHeight: "60vh",
                maxHeight: "60vh",
                ...customScrollBar(),
              }}
            >
              {loadingAnswer && (
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignSelf: "flex-start",
                    mr: 2,
                    ml: 4,
                    alignItems: "center",
                    mt: 2,
                  }}
                >
                  {/* <Typography sx={{ fontStyle: "italic", pr: 1 }}>
                    GPT schreibt...
                  </Typography> */}
                  <LinearProgress
                    sx={{
                      width: 100,
                      mt: 0.5,
                      backgroundColor: BLACK,
                      "& .MuiLinearProgress-bar": {
                        backgroundColor: BLUE,
                      },
                    }}
                  />
                </Box>
              )}
              {chatArray.map((chatObject, index) => (
                <Box
                  key={index}
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems:
                      chatObject?.from === "user" ? "flex-end" : "flex-start",
                    alignSelf:
                      chatObject?.from === "user" ? "flex-end" : "flex-start",
                    mr: chatObject?.from === "user" ? 2 : 4,
                    ml: chatObject?.from === "gpt" ? 2 : 4,
                    mb: 1.5,
                  }}
                >
                  {/* <Typography sx={{ fontSize: 11, fontStyle: "italic", px: 1 }}>
                    {new Date(chatObject.timestamp).toLocaleString("de-DE", {
                      timeZone: "Europe/Berlin",
                    })}
                  </Typography> */}
                  <Box
                    sx={{
                      px: 2,
                      py: 1,
                      borderRadius: 3,
                      bgcolor:
                        chatObject?.from === "user"
                          ? CHAT_USER_COLOR
                          : CHAT_AI_COLOR,
                      boxShadow: 4,
                    }}
                  >
                    {index !== 0 ||
                    chatObject?.from === "user" ||
                    chatObject?.error ? (
                      <AiMarkdown>{chatObject.message}</AiMarkdown>
                    ) : (
                      <Typewriter
                        text={chatObject.message}
                        delay={4}
                        skipAnimation={skipAnimation}
                        setSkipAnimation={setSkipAnimation}
                        setWriting={setWriting}
                        setChatArray={setChatArray}
                      />
                    )}
                  </Box>
                </Box>
              ))}
            </Box>
            <TextField
              disabled={writing}
              variant="filled"
              placeholder="Start a chat"
              onKeyDown={(e) => {
                if (e.keyCode === 13 && !e.shiftKey) {
                  e.preventDefault();
                  sendMessage(inputText, true);
                }
              }}
              size="small"
              sx={{
                width: 1,
                ".MuiInputBase-root": {
                  borderRadius: 5,
                  py: 1,
                  pl: 2,
                  mt: { xs: 2, md: 5 },
                  display: "flex",
                  height: 100,
                },
              }}
              slotProps={{
                htmlInput: {
                  style: {
                    fontSize: 16,
                    lineHeight: 1,
                    textAlign: "center",
                  },
                },
                input: {
                  disableUnderline: true,
                  endAdornment: (
                    <InputAdornment position="end" sx={{ mr: "0.5rem" }}>
                      {writing ? (
                        <IconButton onClick={() => setSkipAnimation(true)}>
                          <StopRoundedIcon color={RED} />
                        </IconButton>
                      ) : (
                        <IconButton
                          onClick={() => sendMessage(inputText, true)}
                        >
                          <SendRoundedIcon color={RED} />
                        </IconButton>
                      )}
                    </InputAdornment>
                  ),
                },
              }}
              multiline
              maxRows={2}
              spellCheck={false}
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
            />
          </Box>
        </Box>
        <Box sx={{ height: 50 }} />
      </Box>
    </Box>
  );
}
