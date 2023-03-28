import React, { useState } from "react";
import MainContainer from "../../components/MainContainer";
import MainHeader from "../../components/MainHeader";
import ConfirmationModal from "../../components/ConfirmationModal";
import MainHeaderButtonsWrapper from "../../components/MainHeaderButtonsWrapper";
import Title from "../../components/Title";
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  makeStyles,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@material-ui/core";
import DialogActions from "@material-ui/core/DialogActions";
import { PlayArrow, WatchLater } from "@material-ui/icons";
import TableRowSkeleton from "../../components/TableRowSkeleton";
import CampainModal from "../../components/CampainModal/index";

const useStyles = makeStyles((theme) => ({
  mainPaper: {
    flex: 1,
    padding: theme.spacing(1),
    overflowY: "scroll",
    ...theme.scrollbarStyles,
  },
  customTableCell: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  tag: {
    background: "#5050cf",
    padding: 5,
    borderRadius: 5,
    color: "white",
    margin: 4,
  },
  tagYellow: {
    background: "#c1b63b",
    padding: 5,
    borderRadius: 5,
    color: "white",
    margin: 4,
  },
  modal: {
    width: 400,
  },
}));

const campains = [
  {
    id: 1,
    name: "Curso 01",
    fecha: "01-02-23",
    message: "0/54",
  },
  {
    id: 2,
    name: "Curso 02",
    fecha: "01-03-23",
    message: "1/25",
  },
];

const contacts = [
  {
    id: 1,
    name: "9123123123",
    fecha: "01-02-23",
    estado: "Leído",
  },
  {
    id: 2,
    name: "931231231",
    fecha: "01-03-23",
    estado: "Enviado",
  },
];

const ConfirmSendClassModal = ({ open, onClose }) => {
  return (
    <Dialog open={open} onClose={onClose} scroll="paper">
      <DialogTitle>Agregar Campaña</DialogTitle>
      <DialogContent>
        <h3>¿Esta seguro de enviar esta clase?</h3>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary" variant="outlined">
          Cancelar
        </Button>
        <Button type="submit" color="primary" variant="contained">
          Añadir
        </Button>
      </DialogActions>
    </Dialog>
  );
};

const WatchInformationClass = ({ open, onClose, classes }) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      scroll="paper"
      className={classes.modal}
    >
      <DialogTitle>Información de la clase</DialogTitle>
      <DialogContent>
        <Button variant="contained">Leído</Button>
        <Button variant="outlined">Enviado</Button>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell align="center">Contacto</TableCell>
              <TableCell align="center">Clase</TableCell>
              <TableCell align="center">Estado</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <>
              {contacts.map((campain) => (
                <TableRow key={campain.id}>
                  <TableCell align="center">{campain.name}</TableCell>
                  <TableCell align="center">{campain.fecha}</TableCell>
                  <TableCell align="center">{campain.estado}</TableCell>
                </TableRow>
              ))}
            </>
          </TableBody>
        </Table>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary" variant="outlined">
          Cancelar
        </Button>
        <Button type="submit" color="primary" variant="contained">
          Añadir
        </Button>
      </DialogActions>
    </Dialog>
  );
};

const Campain = () => {
  const [confirmModalOpen, setConfirmModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const classes = useStyles();

  const [campainModalOpen, setCampainModalOpen] = useState(false);
  const [confirmCampainModalOpen, setConfirmCampainModalOpen] = useState(false);
  const [watchInformationModalOpen, setWatchInformationModalOpen] =
    useState(false);

  const handleCloseConfirmationModal = () => {
    setConfirmModalOpen(false);
  };

  const handleOpenCampainModal = () => {
    setCampainModalOpen(true);
  };

  const handleCloseCampainModal = () => {
    setCampainModalOpen(false);
  };

  const handleConfirmSendVideos = () => {
    setConfirmCampainModalOpen(true);
  };

  const handleCloseConfirmSendVideos = () => {
    console.log("Cerrar modal");
    setConfirmCampainModalOpen(false);
  };

  const handleOpenInformationModal = () => {
    setWatchInformationModalOpen(true);
  };

  const handleCloseInformationModal = () => {
    setWatchInformationModalOpen(false);
  };

  return (
    <MainContainer>
      <ConfirmationModal
        title="Titulo del modal"
        open={confirmModalOpen}
        onClose={handleCloseConfirmationModal}
      >
        Borrar mensaje
      </ConfirmationModal>
      <CampainModal open={campainModalOpen} onClose={handleCloseCampainModal} />
      <MainHeader>
        <Title>Campañas</Title>
        <MainHeaderButtonsWrapper>
          <Button
            variant="contained"
            color="primary"
            onClick={handleOpenCampainModal}
          >
            Agregar campaña
          </Button>
        </MainHeaderButtonsWrapper>
      </MainHeader>
      <Paper className={classes.mainPaper} variant="outlined">
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell align="center">Nombre Campaña</TableCell>
              <TableCell align="center">Creado</TableCell>
              <TableCell align="center">Tags</TableCell>
              <TableCell align="center">Progreso</TableCell>
              <TableCell align="center">Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <>
              {campains.map((campain) => (
                <TableRow key={campain.id}>
                  <TableCell align="center">{campain.name}</TableCell>
                  <TableCell align="center">{campain.fecha}</TableCell>
                  <TableCell align="center">
                    <span className={classes.tag}>Python</span>
                    <span className={classes.tagYellow}>Javascript</span>
                  </TableCell>
                  <TableCell align="center">{campain.message}</TableCell>
                  <TableCell align="center">
                    <IconButton
                      size="small"
                      onClick={handleOpenInformationModal}
                    >
                      <WatchLater />
                    </IconButton>

                    <IconButton size="small" onClick={handleConfirmSendVideos}>
                      <PlayArrow />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
              {loading && <TableRowSkeleton columns={4} />}
              <ConfirmSendClassModal
                open={confirmCampainModalOpen}
                onClose={handleCloseConfirmSendVideos}
              />
              <WatchInformationClass
                open={watchInformationModalOpen}
                onClose={handleCloseInformationModal}
                classes={classes}
              />
            </>
          </TableBody>
        </Table>
      </Paper>
    </MainContainer>
  );
};

export default Campain;
