import React, { useEffect, useState } from "react";
import {
  Button,
  Chip,
  IconButton,
  InputAdornment,
  Link,
  Paper,
  Switch,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  makeStyles,
} from "@material-ui/core";
import MainContainer from "../../components/MainContainer";
import MainHeader from "../../components/MainHeader";
import MainHeaderButtonsWrapper from "../../components/MainHeaderButtonsWrapper";
import SearchIcon from "@material-ui/icons/Search";
import Title from "../../components/Title";
import api from "../../services/api";
import toastError from "../../errors/toastError";
import convertToFormatDate from "../../helpers/convertToFormatDate";
import EditIcon from "@material-ui/icons/Edit";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";

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
  enabled: {
    background: "#4b874b",
    color: "white",
  },
  disabled: {
    background: "#dd6868",
    color: "white",
  },
  textField: {
    marginRight: theme.spacing(1),
    flex: 1,
  },
}));

const Schools = () => {
  const classes = useStyles();
  const [schools, setSchools] = useState([]);

  const fetchSchools = async () => {
    try {
      const { data } = await api.get("/schools/");
      setSchools(data.schools);
    } catch (err) {
      toastError(err);
    }
  };

  useEffect(() => {
    fetchSchools()
  }, [])

  console.log(schools)
  return (
    <MainContainer>
      <MainHeader>
        <Title>Escuelas</Title>
        <MainHeaderButtonsWrapper>
          <TextField
            placeholder="Buscar escuela..."
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
            // onClick={handleOpenCompanieModal}
          >
            Agregar Escuela
          </Button>
        </MainHeaderButtonsWrapper>
      </MainHeader>
      <Paper className={classes.mainPaper} variant="outlined">
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell align="center">Nombre</TableCell>
              <TableCell align="center">Cantidad de cursos</TableCell>
              <TableCell align="center">Estado</TableCell>
              <TableCell align="center">Fecha de creación</TableCell>
              <TableCell align="center">Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {schools?.map((school, index) => (
              <TableRow key={school.id}>
                <TableCell align="center">{school.name}</TableCell>
                <TableCell align="center">
                  <Link
                    className={classes.link}
                    // onClick={}
                  >
                    Ver
                  </Link>
                </TableCell>
                <TableCell align="center">
                  {school.enabled ? (
                    <Chip
                      label="Activado"
                      color="success"
                      className={classes.enabled}
                    />
                  ) : (
                    <Chip
                      label="Desactivado"
                      color="success"
                      className={classes.disabled}
                    />
                  )}
                </TableCell>
                <TableCell align="center">
                  {convertToFormatDate(school.createdAt)}
                </TableCell>
                <TableCell align="center">
                  <IconButton
                    size="small"
                    // onClick={() => handleOpenCompanieModal(companie)}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    size="small"
                    // onClick={() => handleOpenConfirmationModal(companie.id)}
                  >
                    <DeleteOutlineIcon />
                  </IconButton>
                  <Switch
                    checked={school.enabled}
                    // onChange={(event, value) =>
                    //   handleEnableCompany(companie, value)
                    // }
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </MainContainer>
  );
};

export default Schools;
