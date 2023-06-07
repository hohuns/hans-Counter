import { useCallback, useEffect, useMemo, useState } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import ValueDialog from "./components/Dialog";
import Divider from "@mui/material/Divider";
import AddIcon from "@mui/icons-material/Add";
import { IconButton } from "@mui/material";

function App() {
  const [target, setTarget] = useState<number | null>(0);
  const [current, setCurrent] = useState<number | null>(0);
  const [aim, setAim] = useState<string | null>("None");
  const [open, setOpen] = useState(false);

  // Dialog Handler
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // Value reloader
  useEffect(() => {
    setTarget(Number(localStorage.getItem("target")));
    setCurrent(Number(localStorage.getItem("current")));
    setAim(localStorage.getItem("aim"));
  }, []);

  useEffect(() => {
    console.log("hi");

    if (
      current === target &&
      current !== 0 &&
      target !== 0 &&
      current &&
      target
    ) {
      alert("You just reached your goal..!🎉🥳🎊");
      return () => {
        resetButtonHandler();
      };
    }
  }, [current, target]);

  // Button functions
  const resetButtonHandler = () => {
    setTarget(0);
    setCurrent(0);
    setAim("None");
    localStorage.setItem("target", "0");
    localStorage.setItem("current", "0");
    localStorage.setItem("aim", "None");
  };

  const plusButtonHandler = () => {
    if (current !== null) {
      const temp: number = current + 1;
      setCurrent(temp);
      localStorage.setItem("current", temp?.toString() as string);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        width: 400,
        padding: "15px",
        margin: "0 auto",
      }}
    >
      <Card
        sx={{
          width: "90vw",
          display: "flex",
          height: "40vh",
          justifyContent: "center",
          alignItems: "center",
          backgroundImage:
            "linear-gradient(to right bottom, #4ca1af , #c4e0e5)",
          flexDirection: "column",
        }}
      >
        <CardContent>
          <Typography
            variant="h5"
            color="white"
            align="center"
            sx={{ fontWeight: "100" }}
          >
            HANS Counter
          </Typography>
          <Divider sx={{ backgroundColor: "white", marginTop: "10px" }} />
          <Typography
            variant="h6"
            color="white"
            align="center"
            mt={5}
            sx={{ fontWeight: "100" }}
          >
            Aim: {aim}
          </Typography>
          <Typography
            variant="h6"
            color="white"
            align="center"
            sx={{ fontWeight: "100" }}
          >
            Target: {target}
          </Typography>
          <Typography
            variant="h6"
            color="white"
            align="center"
            sx={{ fontWeight: "100" }}
          >
            Current: {current}
          </Typography>
          <IconButton
            sx={{
              display: "flex",
              marginBottom: "15px",
              margin: "0 auto",
            }}
            onClick={plusButtonHandler}
          >
            <AddIcon
              fontSize="large"
              sx={{
                fill: "white",
              }}
            />
          </IconButton>
          <Divider sx={{ backgroundColor: "white", marginBottom: "15px" }} />
          <Stack spacing={2} direction="row">
            <Button
              variant="outlined"
              sx={{ color: "white", borderColor: "white", fontWeight: "100" }}
              onClick={handleClickOpen}
            >
              Set
            </Button>
            <Button
              variant="outlined"
              sx={{ color: "white", borderColor: "white", fontWeight: "100" }}
              onClick={resetButtonHandler}
            >
              Reset
            </Button>
          </Stack>
        </CardContent>
      </Card>
      <ValueDialog
        open={open}
        handleClose={handleClose}
        setTarget={setTarget}
        setCurrent={setCurrent}
        setAim={setAim}
      />
    </Box>
  );
}

export default App;
