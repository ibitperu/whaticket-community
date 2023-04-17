import React, { useState, useEffect, useRef } from "react";

import * as Yup from "yup";
import { Formik, FieldArray, Form, Field } from "formik";
import { toast } from "react-toastify";

import { makeStyles } from "@material-ui/core/styles";
import { green } from "@material-ui/core/colors";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import CircularProgress from "@material-ui/core/CircularProgress";

import { i18n } from "../../translate/i18n";

import api from "../../services/api";
import toastError from "../../errors/toastError";
import {
  Checkbox,
  FormControl,
  InputLabel,
  ListItemIcon,
  ListItemText,
  MenuItem,
  Select,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
  },
  textField: {
    marginRight: theme.spacing(1),
    flex: 1,
  },

  extraAttr: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
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
    width: 300,
  },
  indeterminateColor: {
    color: "#f50057",
  },
  selectAllText: {
    fontWeight: 500,
  },
  selectedAll: {
    backgroundColor: "rgba(0, 0, 0, 0.08)",
    "&:hover": {
      backgroundColor: "rgba(0, 0, 0, 0.08)",
    },
  },
}));

const ContactSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  number: Yup.string().min(8, "Too Short!").max(50, "Too Long!"),
  email: Yup.string().email("Invalid email"),
});

const options = [
  "Javascript",
  "Python",
  "Programación Básica",
  "Base de datos",
  "Mysql",
];

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;

const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
  getContentAnchorEl: null,
  anchorOrigin: {
    vertical: "bottom",
    horizontal: "center",
  },
  transformOrigin: {
    vertical: "top",
    horizontal: "center",
  },
  variant: "menu",
};

const ContactModal = ({ open, onClose, contactId, initialValues, onSave }) => {
  const [selected, setSelected] = useState([]);
  const [companySelected, setCompanySelected] = useState("");
  const [companies, setCompanies] = useState([]);

  const isAllSelected =
    options.length > 0 && selected.length === options.length;

  const handleChange = (event) => {
    const value = event.target.value;
    if (value[value.length - 1] === "all") {
      setSelected(selected.length === options.length ? [] : options);
      return;
    }
    setSelected(value);
  };

  const handleCompanyChange = (event) => {
    setCompanySelected(event.target.value);
  };

  const fetchCompanies = async () => {
    try {
      const { data } = await api.get("/companies/");
      setCompanies(data.companies);
    } catch (err) {
      toastError(err);
    }
  };

  const classes = useStyles();
  const isMounted = useRef(true);

  const initialState = {
    name: "",
    number: "",
    email: "",
  };

  const [contact, setContact] = useState(initialState);

  useEffect(() => {
    fetchCompanies();
    return () => {
      isMounted.current = false;
    };
  }, []);

  useEffect(() => {
    const fetchContact = async () => {
      if (initialValues) {
        setContact((prevState) => {
          return { ...prevState, ...initialValues };
        });
      }

      if (!contactId) return;

      try {
        const { data } = await api.get(`/contacts/${contactId}`);
        if (isMounted.current) {
          setContact(data);
        }
      } catch (err) {
        toastError(err);
      }
    };

    fetchContact();
  }, [contactId, open, initialValues]);

  const handleClose = () => {
    onClose();
    setContact(initialState);
  };

  const handleSaveContact = async (values) => {
    try {
      if (contactId) {
        await api.put(`/contacts/${contactId}`, values);
        handleClose();
      } else {
        const { data } = await api.post("/contacts", values);
        if (onSave) {
          onSave(data);
        }
        handleClose();
      }
      toast.success(i18n.t("contactModal.success"));
    } catch (err) {
      toastError(err);
    }
  };

  return (
    <div className={classes.root}>
      <Dialog open={open} onClose={handleClose} maxWidth="lg" scroll="paper">
        <DialogTitle id="form-dialog-title">
          {contactId
            ? `${i18n.t("contactModal.title.edit")}`
            : `${i18n.t("contactModal.title.add")}`}
        </DialogTitle>
        <Formik
          initialValues={contact}
          enableReinitialize={true}
          validationSchema={ContactSchema}
          onSubmit={(values, actions) => {
            setTimeout(() => {
              handleSaveContact({
                ...values,
                companySelected,
              });
              actions.setSubmitting(false);
            }, 400);
          }}
        >
          {({ values, errors, touched, isSubmitting }) => (
            <Form>
              <DialogContent dividers>
                <Typography variant="subtitle1" gutterBottom>
                  {i18n.t("contactModal.form.mainInfo")}
                </Typography>
                <Field
                  as={TextField}
                  label={i18n.t("contactModal.form.name")}
                  name="name"
                  autoFocus
                  error={touched.name && Boolean(errors.name)}
                  helperText={touched.name && errors.name}
                  variant="outlined"
                  margin="dense"
                  className={classes.textField}
                />
                <Field
                  as={TextField}
                  label={i18n.t("contactModal.form.number")}
                  name="number"
                  error={touched.number && Boolean(errors.number)}
                  helperText={touched.number && errors.number}
                  placeholder="5513912344321"
                  variant="outlined"
                  margin="dense"
                />
                <div>
                  <Field
                    as={TextField}
                    label={i18n.t("contactModal.form.email")}
                    name="email"
                    error={touched.email && Boolean(errors.email)}
                    helperText={touched.email && errors.email}
                    placeholder="Email address"
                    fullWidth
                    margin="dense"
                    variant="outlined"
                  />
                </div>

                <div>
                  <FormControl className={classes.formControl}>
                    <InputLabel id="mutiple-select-label">Etiquetas</InputLabel>
                    <Select
                      labelId="mutiple-select-label"
                      multiple
                      value={selected}
                      onChange={handleChange}
                      renderValue={(selected) => selected.join(", ")}
                      MenuProps={MenuProps}
                    >
                      <MenuItem
                        value="all"
                        classes={{
                          root: isAllSelected ? classes.selectedAll : "",
                        }}
                      >
                        <ListItemIcon>
                          <Checkbox
                            classes={{
                              indeterminate: classes.indeterminateColor,
                            }}
                            checked={isAllSelected}
                            indeterminate={
                              selected.length > 0 &&
                              selected.length < options.length
                            }
                          />
                        </ListItemIcon>
                        <ListItemText
                          classes={{ primary: classes.selectAllText }}
                          primary="Select All"
                        />
                      </MenuItem>
                      {options.map((option) => (
                        <MenuItem key={option} value={option}>
                          <ListItemIcon>
                            <Checkbox checked={selected.indexOf(option) > -1} />
                          </ListItemIcon>
                          <ListItemText primary={option} />
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </div>
                <div>
                  <FormControl className={classes.formControl}>
                    <InputLabel id="mutiple-select-label">Empresa</InputLabel>
                    <Select
                      labelId="mutiple-select-label"
                      value={companySelected}
                      onChange={handleCompanyChange}
                    >
                      {companies.map((company) => (
                        <MenuItem key={company.id} value={company.id}>
                          {company.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </div>

                <Typography
                  style={{ marginBottom: 8, marginTop: 12 }}
                  variant="subtitle1"
                >
                  {i18n.t("contactModal.form.extraInfo")}
                </Typography>

                <FieldArray name="extraInfo">
                  {({ push, remove }) => (
                    <>
                      {values.extraInfo &&
                        values.extraInfo.length > 0 &&
                        values.extraInfo.map((info, index) => (
                          <div
                            className={classes.extraAttr}
                            key={`${index}-info`}
                          >
                            <Field
                              as={TextField}
                              label={i18n.t("contactModal.form.extraName")}
                              name={`extraInfo[${index}].name`}
                              variant="outlined"
                              margin="dense"
                              className={classes.textField}
                            />
                            <Field
                              as={TextField}
                              label={i18n.t("contactModal.form.extraValue")}
                              name={`extraInfo[${index}].value`}
                              variant="outlined"
                              margin="dense"
                              className={classes.textField}
                            />
                            <IconButton
                              size="small"
                              onClick={() => remove(index)}
                            >
                              <DeleteOutlineIcon />
                            </IconButton>
                          </div>
                        ))}
                      <div className={classes.extraAttr}>
                        <Button
                          style={{ flex: 1, marginTop: 8 }}
                          variant="outlined"
                          color="primary"
                          onClick={() => push({ name: "", value: "" })}
                        >
                          {`+ ${i18n.t("contactModal.buttons.addExtraInfo")}`}
                        </Button>
                      </div>
                    </>
                  )}
                </FieldArray>
              </DialogContent>
              <DialogActions>
                <Button
                  onClick={handleClose}
                  color="secondary"
                  disabled={isSubmitting}
                  variant="outlined"
                >
                  {i18n.t("contactModal.buttons.cancel")}
                </Button>
                <Button
                  type="submit"
                  color="primary"
                  disabled={isSubmitting}
                  variant="contained"
                  className={classes.btnWrapper}
                >
                  {contactId
                    ? `${i18n.t("contactModal.buttons.okEdit")}`
                    : `${i18n.t("contactModal.buttons.okAdd")}`}
                  {isSubmitting && (
                    <CircularProgress
                      size={24}
                      className={classes.buttonProgress}
                    />
                  )}
                </Button>
              </DialogActions>
            </Form>
          )}
        </Formik>
      </Dialog>
    </div>
  );
};

export default ContactModal;
