import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Dispatch, SetStateAction, useRef, useState } from "react";
import { Box } from "@mui/material";

// Types
interface valueDialogProp {
  open: boolean | undefined;
  handleClose: () => void;
  setTarget: Dispatch<SetStateAction<number | null>>;
  setCurrent: Dispatch<SetStateAction<number | null>>;
  setAim: Dispatch<SetStateAction<string | null>>;
}

export default function ValueDialog({
  open,
  handleClose,
  setTarget,
  setAim,
}: valueDialogProp) {
  const [enteredTarget, setEnteredTarget] = useState<number | null>(0);
  const [enteredAim, setEnteredAim] = useState<string | null>("");

  const submitButtonHandler = () => {
    setTarget(enteredTarget);
    setAim(enteredAim);
    closeButtonHandler();
    localStorage.setItem("target", enteredTarget?.toString() as string);
    localStorage.setItem("aim", enteredAim as string);
  };

  const closeButtonHandler = () => {
    setEnteredTarget(0);
    setEnteredAim("");
    handleClose();
  };

  return (
    <div>
      <Dialog open={open!} onClose={handleClose} maxWidth="md" fullWidth={true}>
        <DialogTitle
          sx={{
            backgroundImage:
              "linear-gradient(to right bottom, #4ca1af , #c4e0e5)",
            color: "white",
          }}
        >
          Hans Counter
        </DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ color: "#4ca1af" }}>
            Please input values that you want to set.
          </DialogContentText>
          <Box
            sx={{
              display: "flex",
              gap: "12px",
              flexDirection: "row",
              justifyContent: "space-evenly",
              alignItems: "center",
            }}
          >
            <TextField
              autoFocus
              onChange={(e) => {
                setEnteredAim(e?.currentTarget?.value);
              }}
              margin="dense"
              id="aim"
              label="Aim"
              type="text"
              variant="standard"
            />
            <TextField
              autoFocus
              onChange={(e) => {
                setEnteredTarget(Number(e?.currentTarget?.value));
              }}
              margin="dense"
              id="target"
              label="Target"
              type="number"
              variant="standard"
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeButtonHandler} sx={{ color: "#4ca1af" }}>
            Cancel
          </Button>
          <Button onClick={submitButtonHandler} sx={{ color: "#4ca1af" }}>
            Set
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
