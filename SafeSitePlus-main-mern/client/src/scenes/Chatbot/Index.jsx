import React, { useState, useEffect, useRef } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  List,
  ListItem,
  ListItemText,
  CircularProgress,
  useTheme,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import ConstructionIcon from "@mui/icons-material/Construction";

const Chatbot = () => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const theme = useTheme(); // Get theme mode (light/dark)

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    const newMessages = [...messages, { text: input, sender: "user" }];
    setMessages(newMessages);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch(`http://localhost:8000/search`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: input }),
      });

      const data = await response.json();
      setMessages([...newMessages, { text: data.gemini_response, sender: "bot" }]);
    } catch {
      setMessages([...newMessages, { text: "Error, try again.", sender: "bot" }]);
    } finally {
      setIsLoading(false);
    }
  };

  // Auto-scroll to the latest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        p: 4,
        bgcolor: "linear-gradient(to bottom, #F59E0B, #FDE68A, #FEF3C7)",
      }}
    >
      <Box
        sx={{
          p: 6,
          bgcolor: "rgba(255, 255, 255, 0.3)",
          borderRadius: 3,
          boxShadow: 3,
          backdropFilter: "blur(10px)",
          width: "100%",
          maxWidth: 700,
          zIndex: 1,
          position: "relative",
        }}
      >
        {/* Welcome Section */}
        <Box textAlign="center" mb={4}>
          <Typography variant="h4" fontWeight="bold" fontFamily="Poppins">
            Catbot: Your Smart Site Assistant 🚧🤖
          </Typography>
          <Typography variant="h6" fontFamily="Dancing Script" color="text.secondary">
            Let me know if you need any updates or assistance!!
          </Typography>
        </Box>

        {/* Chat messages area with floating icons */}
        <Paper
          sx={{
            height: 400,
            overflowY: "auto",
            p: 2,
            mb: 2,
            bgcolor: "#fafafa",
            borderRadius: 2,
            position: "relative",
            backgroundImage: "url('https://www.transparenttextures.com/patterns/blueprint.png')",
            backgroundSize: "cover",
            scrollbarWidth: "none",
            "&::-webkit-scrollbar": { display: "none" },
          }}
        >
          {/* Floating Construction Icons inside the message area */}
          {[...Array(6)].map((_, i) => (
            <ConstructionIcon
              key={i}
              sx={{
                position: "absolute",
                top: `${Math.random() * 80 + 5}%`,
                left: `${Math.random() * 80 + 5}%`,
                fontSize: `${Math.random() * 24 + 16}px`,
                opacity: 0.2,
                color: i % 2 === 0 ? "#D3183D" : "#1976D2",
              }}
            />
          ))}

          <List>
            {messages.map((message, index) => (
              <ListItem key={index} sx={{ justifyContent: message.sender === "user" ? "flex-end" : "flex-start" }}>
                <Box
                  sx={{
                    p: 2,
                    borderRadius: "12px",
                    maxWidth: "70%",
                    boxShadow: 1,
                    fontSize: "0.95rem",
                    bgcolor: message.sender === "user" ? "#D3183D" : "#E3F2FD",
                    color: message.sender === "user" ? "white" : "#333",
                  }}
                >
                  <ListItemText primary={message.text} />
                </Box>
              </ListItem>
            ))}
            {isLoading && (
              <ListItem sx={{ justifyContent: "flex-start" }}>
                <Box sx={{ p: 2, borderRadius: "12px", maxWidth: "70%", boxShadow: 1, bgcolor: "#E3F2FD" }}>
                  <CircularProgress size={20} />
                </Box>
              </ListItem>
            )}
            <div ref={messagesEndRef} />
          </List>
        </Paper>

        {/* Input and send button */}
        <Box sx={{ display: "flex", gap: 2 }}>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Ask Something..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
            sx={{
              bgcolor: theme.palette.mode === "dark" ? "#000" : "#fff",
              color: theme.palette.mode === "dark" ? "#fff" : "#000",
              borderRadius: 2,
              "& .MuiOutlinedInput-root": {
                "& fieldset": { borderColor: "#666" },
                "&:hover fieldset": { borderColor: "#444" },
                "&.Mui-focused fieldset": { borderColor: "#222" },
              },
              "& input": { color: theme.palette.mode === "dark" ? "#fff" : "#000" }, // Fix text color in dark mode
            }}
          />
          <Button
            variant="contained"
            onClick={handleSendMessage}
            disabled={isLoading || !input.trim()}
            sx={{
              borderRadius: 2,
              px: 3,
              bgcolor: "#FFC107",
              "&:hover": { opacity: 0.8 },
            }}
          >
            <SendIcon />
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default Chatbot;
