import React from "react";
import { Formik, Form, Field } from "formik";

import { makeStyles } from "@material-ui/core/styles";
import { green } from "@material-ui/core/colors";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";

import { FormControl, InputLabel, MenuItem, Select } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
  },
  textField: {
    marginRight: theme.spacing(1),
    flex: 1,
  },

  btnWrapper: {
    position: "relative",
  },

  buttonProgress: {
    color: green[500],
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: -12,
    marginLeft: -12,
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  colorAdorment: {
    width: 20,
    height: 20,
  },
}));

const CampainModal = ({ open, onClose, queueId }) => {
  const classes = useStyles();
  const handleClose = () => {
    onClose();
  };

  return (
    <div className={classes.root}>
      <Dialog open={open} onClose={handleClose} scroll="paper">
        <DialogTitle>Agregar Campaña</DialogTitle>
        <Formik>
          {({ touched, errors, isSubmitting, values }) => (
            <Form>
              <DialogContent dividers>
                <TextField
                  id="outlined-basic"
                  label="Nombre"
                  variant="outlined"
                  style={{ width: "400px" }}
                />
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">
                    Seleccione conexión
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="Age"
                  >
                    <MenuItem value={30}>Ibit Perú</MenuItem>
                  </Select>
                </FormControl>
                <div>
                  <Field
                    as={TextField}
                    label="Mensaje"
                    multiline
                    rows={5}
                    fullWidth
                    variant="outlined"
                    margin="dense"
                  />
                </div>
                <Button variant="contained" component="label">
                  Subir video
                  <input type="file" hidden />
                </Button>
              </DialogContent>
              <DialogActions>
                <Button
                  onClick={handleClose}
                  color="secondary"
                  variant="outlined"
                >
                  Cancelar
                </Button>
                <Button
                  type="submit"
                  color="primary"
                  variant="contained"
                  className={classes.btnWrapper}
                >
                  Añadir
                </Button>
              </DialogActions>
            </Form>
          )}
        </Formik>
      </Dialog>
    </div>
  );
};

export default CampainModal;
