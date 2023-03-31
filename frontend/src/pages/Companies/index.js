import React, { useState, useEffect, useReducer } from "react";
import MainContainer from "../../components/MainContainer";
import MainHeader from "../../components/MainHeader";
import MainHeaderButtonsWrapper from "../../components/MainHeaderButtonsWrapper";
import Title from "../../components/Title";
import InputAdornment from "@material-ui/core/InputAdornment";
import SearchIcon from "@material-ui/icons/Search";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import EditIcon from "@material-ui/icons/Edit";

import {
  FormControl,
  InputLabel,
  Input,
  Button,
  MenuItem,
  Select,
  Link,
  IconButton,
  Card,
  CardActions,
  CardContent,
  Typography,
  Switch,
} from "@material-ui/core";

import { makeStyles } from "@material-ui/core/styles";

const companies = [
  {
    id: 1,
    name: "Intel",
    enable: true,
    date: "03/03/23",
    contacts: [
      {
        id: 1,
        name: "Miguel",
        phone: "931123123",
        email: "miguel@gmail.com",
      },
      {
        id: 2,
        name: "Pedro",
        phone: "931123123",
        email: "pedro@gmail.com",
      },
    ],
    students: [
      {
        id: 1,
        name: "Miguel",
        phone: "931123123",
        email: "miguel@gmail.com",
      },
      {
        id: 2,
        name: "Pedro",
        phone: "931123123",
        email: "pedro@gmail.com",
      },
    ],
  },
];

const useStyles = makeStyles((theme) => ({
  mainPaper: {
    flex: 1,
    padding: theme.spacing(1),
    overflowY: "scroll",
    ...theme.scrollbarStyles,
  },
  main: {
    margin: 10,
  },
  btnWrapper: {
    position: "relative",
  },
  link: {
    cursor: "pointer",
  },
  card: {
    margin: 10,
    border: "1px solid grey",
  },
}));

const AddCompanieModal = ({ open, onClose, classes }) => {
  return (
    <Dialog open={open} onClose={onClose} scroll="paper" fullWidth>
      <DialogTitle>Agregar Compañía</DialogTitle>
      <DialogContent dividers>
        <form>
          <FormControl fullWidth>
            <InputLabel>Nombre</InputLabel>
            <Input type="text" />
          </FormControl>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Estado</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="Age"
            >
              <MenuItem value={true}>Habilitado</MenuItem>
              <MenuItem value={false}>Deshabilitado</MenuItem>
            </Select>
          </FormControl>
        </form>
        <FormControl></FormControl>
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
        >
          Añadir
        </Button>
      </DialogActions>
    </Dialog>
  );
};

const StudentsModal = ({ open, onClose, classes, students }) => {
  const [addStudentModalOpen, setAddStudentModalOpen] = useState(false);
   
  const handleOpenAddStudentModal = () => {
    setAddStudentModalOpen(true);
  };

  const handleCloseAddStudentModal = () => {
    setAddStudentModalOpen(false);
  };

  return (
    <Dialog open={open} onClose={onClose} scroll="paper" fullWidth>
      <AddStudentModal
        open={addStudentModalOpen}
        onClose={handleCloseAddStudentModal}
        classes={classes}
      />
      <DialogTitle>Estudiantes</DialogTitle>
      <DialogContent dividers>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell align="center">Nombre</TableCell>
              <TableCell align="center">Teléfono</TableCell>
              <TableCell align="center">Email</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {students.map((student) => (
              <TableRow key={student.id}>
                <TableCell align="center">{student.name}</TableCell>
                <TableCell align="center">{student.phone}</TableCell>
                <TableCell align="center">{student.email}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
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
          onClick={handleOpenAddStudentModal}
        >
          Añadir
        </Button>
      </DialogActions>
    </Dialog>
  );
};

const AddStudentModal = ({ open, onClose, classes }) => {
  return (
    <Dialog open={open} onClose={onClose} scroll="paper" fullWidth> 
      <DialogTitle>Agregar estudiante</DialogTitle>
      <DialogContent dividers>
        <form>
          <FormControl fullWidth>
            <InputLabel>Nombre</InputLabel>
            <Input type="text" />
          </FormControl>
          <FormControl fullWidth>
            <InputLabel>Email</InputLabel>
            <Input type="text" />
          </FormControl>
          <FormControl fullWidth>
            <InputLabel>Teléfono</InputLabel>
            <Input type="text" />
          </FormControl>
        </form>
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
        >
          Añadir
        </Button>
      </DialogActions>
    </Dialog>
  );
};

const ContactsModal = ({ open, onClose, classes, contacts }) => {
  const [addContactModalOpen, setAddContactModalOpen] = useState(false);
   
  const handleOpenAddContactModal = () => {
    setAddContactModalOpen(true);
  };

  const handleCloseAddContactModal = () => {
    setAddContactModalOpen(false);
  };

  return (
    <Dialog open={open} onClose={onClose} scroll="paper" fullWidth>
      <AddContactModal
        open={addContactModalOpen}
        onClose={handleCloseAddContactModal}
        classes={classes}
      />
      <DialogTitle>Contactos</DialogTitle>
      <DialogContent dividers>
        {contacts.map((contact) => (
          <Card sx={{ minWidth: 275 }} className={classes.card}>
            <CardContent>
              <Typography variant="h5" component="div">
                Miguel Catillo
              </Typography>
              <FormControl fullWidth>
                <InputLabel>Correo</InputLabel>
                <Input type="email" value={contact.email} />
              </FormControl>
              <FormControl fullWidth>
                <InputLabel>Número</InputLabel>
                <Input type="number" value={contact.phone} />
              </FormControl>
            </CardContent>
          </Card>
        ))}
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
          onClick={handleOpenAddContactModal}
        >
          Añadir
        </Button>
      </DialogActions>
    </Dialog>
  );
};

const AddContactModal = ({ open, onClose, classes }) => {
  return (
    <Dialog open={open} onClose={onClose} scroll="paper" fullWidth> 
      <DialogTitle>Agregar Contacto</DialogTitle>
      <DialogContent dividers>
        <form>
          <FormControl fullWidth>
            <InputLabel>Nombre</InputLabel>
            <Input type="text" />
          </FormControl>
          <FormControl fullWidth>
            <InputLabel>Email</InputLabel>
            <Input type="text" />
          </FormControl>
          <FormControl fullWidth>
            <InputLabel>Teléfono</InputLabel>
            <Input type="text" />
          </FormControl>
        </form>
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
        >
          Añadir
        </Button>
      </DialogActions>
    </Dialog>
  );
};

const Companies = () => {
  const classes = useStyles();
  const [companieModalOpen, setCompanieModalOpen] = useState(false);
  const [contactsModalOpen, setContactsModalOpen] = useState(false);
  const [studentsModalOpen, setStudentsModalOpen] = useState(false);

  const handleOpenCompanieModal = () => {
    setCompanieModalOpen(true);
  };

  const handleCloseCompanieModal = () => {
    setCompanieModalOpen(false);
  };

  const handleOpenStudentsModal = () => {
    setStudentsModalOpen(true);
  };

  const handleCloseStudentsModal = () => {
    setStudentsModalOpen(false);
  };

  const handleOpenContactsModal = () => {
    setContactsModalOpen(true);
  };

  const handleCloseContactsModal = () => {
    setContactsModalOpen(false);
  }; 

  return (
    <MainContainer>
      <AddCompanieModal
        open={companieModalOpen}
        onClose={handleCloseCompanieModal}
        classes={classes}
      />

      <MainHeader>
        <Title>Compañías</Title>
        <MainHeaderButtonsWrapper>
          <TextField
            placeholder="Buscar compañía"
            type="search"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon style={{ color: "gray" }} />
                </InputAdornment>
              ),
            }}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleOpenCompanieModal}
          >
            Agregar compañía
          </Button>
        </MainHeaderButtonsWrapper>
      </MainHeader>
      <Paper className={classes.mainPaper} variant="outlined">
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell align="center">Nombre</TableCell>
              <TableCell align="center">Contactos</TableCell>
              <TableCell align="center">Cantidad de alumnos</TableCell>
              <TableCell align="center">Estado</TableCell>
              <TableCell align="center">Fecha de creación</TableCell>
              <TableCell align="center">Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {companies.map((companie) => (
              <TableRow key={companie.id}>
                <ContactsModal
                  open={contactsModalOpen}
                  onClose={handleCloseContactsModal}
                  classes={classes}
                  contacts={companie.contacts}
                />
                <StudentsModal
                  open={studentsModalOpen}
                  onClose={handleCloseStudentsModal}
                  classes={classes}
                  students={companie.students}
                />
                <TableCell align="center">{companie.name}</TableCell>
                <TableCell align="center">
                  <Link
                    className={classes.link}
                    onClick={handleOpenContactsModal}
                  >
                    Ver ({companie.contacts.length})
                  </Link>
                </TableCell>
                <TableCell align="center">
                  <Link
                    className={classes.link}
                    onClick={handleOpenStudentsModal}
                  >
                    Ver ({companie.students.length})
                  </Link>
                </TableCell>
                <TableCell align="center">Habilitado</TableCell>
                <TableCell align="center">{companie.date}</TableCell>
                <TableCell align="center">
                  <IconButton size="small" onClick={handleOpenCompanieModal}>
                    <EditIcon />
                  </IconButton>
                  <IconButton size="small">
                    <DeleteOutlineIcon />
                  </IconButton>
                  <Switch />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </MainContainer>
  );
};

export default Companies;
