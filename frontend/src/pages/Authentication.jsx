import * as React from "react";
import {
  Button,
  TextField,
  Box,
  Snackbar,
  IconButton,
  InputAdornment,
  Grid,
  Typography,
} from "@mui/material";
import { AuthContext } from "../contexts/AuthContext";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

export default function Authentication() {
  const [showPassword, setShowPassword] = React.useState(false);
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [name, setName] = React.useState("");
  const [error, setError] = React.useState("");
  const [message, setMessage] = React.useState("");
  const [formState, setFormState] = React.useState(0);
  const [open, setOpen] = React.useState(false);

  const { handleRegister, handleLogin } = React.useContext(AuthContext);

  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{6,}$/;
    return passwordRegex.test(password);
  };

  const handleAuth = async () => {
    try {
      if (formState === 0) {
        let result = await handleLogin(username, password);
        console.log("Login Response: ", result);
      } else if (formState === 1) {
        if (!validatePassword(password)) {
          setError(
            "Password must contain at least one lowercase letter, one uppercase letter, one special character, and be at least 6 characters long."
          );
          return;
        }
        let result = await handleRegister(name, username, password);
        console.log("Register Response: ", result);
        setUsername("");
        setMessage(result);
        setOpen(true);
        setError("");
        setFormState(0);
        setPassword("");
      }
    } catch (err) {
      console.log("Error in handleAuth: ", err);
      let message = err.response?.data?.message || "An error occurred";
      setError(message);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Grid
      container
      component="main"
      sx={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "",
      }}
    >
      <Grid
        item
        xs={11}
        sm={8}
        md={6}
        lg={4}
        sx={{
          p: 4,
          boxShadow: 3,
          borderRadius: 2,
          backgroundColor: "white",
        }}
      >
        <Typography variant="h5" align="center" gutterBottom>
          {formState === 0 ? "Sign In" : "Sign Up"}
        </Typography>

        <Box component="form" noValidate sx={{ mt: 1 }}>
          {formState === 1 && (
            <TextField
              margin="normal"
              required
              fullWidth
              id="name"
              label="Full Name"
              name="name"
              value={name}
              autoFocus
              onChange={(e) => setName(e.target.value)}
            />
          )}

          <TextField
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            value={username}
            autoFocus
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            value={password}
            type={showPassword ? "text" : "password"}
            onChange={(e) => setPassword(e.target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            id="password"
          />
          <p style={{ color: "red" }}>{error}</p>

          <Button
            type="button"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            onClick={handleAuth}
          >
            {formState === 0 ? "Login" : "Register"}
          </Button>

          <div style={{ textAlign: "center", marginTop: "10px" }}>
            <Button
              variant={formState === 0 ? "contained" : ""}
              onClick={() => setFormState(0)}
              sx={{ marginRight: 2 }}
            >
              Sign In
            </Button>
            <Button
              variant={formState === 1 ? "contained" : ""}
              onClick={() => setFormState(1)}
            >
              Sign Up
            </Button>
          </div>
        </Box>

        <Snackbar
          open={open}
          autoHideDuration={4000}
          onClose={handleClose}
          message={message}
        />
      </Grid>
    </Grid>
  );
}
