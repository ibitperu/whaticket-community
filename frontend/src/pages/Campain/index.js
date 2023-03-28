import React, { useState } from "react";
import MainContainer from "../../components/MainContainer";
import MainHeader from "../../components/MainHeader";
import ConfirmationModal from "../../components/ConfirmationModal";
import MainHeaderButtonsWrapper from "../../components/MainHeaderButtonsWrapper";
import Title from "../../components/Title";
import {
  Button,
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

const Campain = () => {
  const [confirmModalOpen, setConfirmModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const classes = useStyles();

  const [campainModalOpen, setCampainModalOpen] = useState(false);

  const handleCloseConfirmationModal = () => {
    setConfirmModalOpen(false);
  };

  const handleOpenCampainModal = () => {
    setCampainModalOpen(true);
  };

  const handleCloseCampainModal = () => {
    setCampainModalOpen(false);
  };

  const handleOpenWatchProgress = () => {
    console.log("Watch");
  };

  const handleConfirmSendVideos = () => {
    console.log("Send");
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
                    <div className={classes.customTableCell}>
                      <Typography
                        style={{ width: 300, align: "center" }}
                        noWrap
                        variant="body2"
                      >
                        {campain.message}
                      </Typography>
                    </div>
                  </TableCell>
                  <TableCell align="center">
                    <IconButton size="small" onClick={handleOpenWatchProgress}>
                      <WatchLater />
                    </IconButton>

                    <IconButton size="small" onClick={handleConfirmSendVideos}>
                      <PlayArrow />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
              {loading && <TableRowSkeleton columns={4} />}
            </>
          </TableBody>
        </Table>
      </Paper>
    </MainContainer>
  );
};

export default Campain;
