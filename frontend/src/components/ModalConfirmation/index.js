import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Link,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  makeStyles,
} from "@material-ui/core";
import React from "react";

const useStyles = makeStyles((theme) => ({
  btnWrapper: {
    position: "relative",
  },
}));

const ModalConfirmation = ({ open, onClose, action }) => {
  const classes = useStyles();

  const handleAction = () => {
    action()
    onClose()
  }

  return (
    <Dialog open={open} onClose={onClose} scroll="paper" fullWidth>
      <DialogTitle>Videos</DialogTitle>
      <DialogContent dividers>
        <Typography>¿Esta seguro de realizar esta acción?</Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary" variant="outlined">
          Cancelar
        </Button>
        <Button
          type="submit"
          color="primary"
          variant="contained"
          className={classes.btnWrapper}
          onClick={handleAction}
        >
          Añadir
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ModalConfirmation;
