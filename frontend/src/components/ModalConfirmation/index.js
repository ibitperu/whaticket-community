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
} from "@material-ui/core";
import React from "react";

const ModalConfirmation = ({ open, onClose, action }) => {
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
          onClick={action}
        >
          Añadir
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ModalConfirmation;
