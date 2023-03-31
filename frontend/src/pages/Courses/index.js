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
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import EditIcon from "@material-ui/icons/Edit";

import { Button, Link, IconButton } from "@material-ui/core";

import { makeStyles } from "@material-ui/core/styles";

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

const Courses = () => {
  const classes = useStyles();

  return (
    <MainContainer>
      <MainHeader>
        <Title>Cursos</Title>
        <MainHeaderButtonsWrapper>
          <TextField
            placeholder="Buscar curso"
            type="search"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon style={{ color: "gray" }} />
                </InputAdornment>
              ),
            }}
          />
          <Button variant="contained" color="primary">
            Agregar curso
          </Button>
        </MainHeaderButtonsWrapper>
      </MainHeader>
      <Paper className={classes.mainPaper} variant="outlined">
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell align="center">Nombre</TableCell>
              <TableCell align="center">Cantidad de alumnos</TableCell>
              <TableCell align="center">Videos</TableCell>
              <TableCell align="center">Escuela</TableCell>
              <TableCell align="center">Examen final</TableCell>
              <TableCell align="center">Proyecto</TableCell>
              <TableCell align="center">Estado</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {/* {courses.map((curse) => (
              <TableRow key={course.id}>
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
                </TableCell>
              </TableRow>
            ))} */}
          </TableBody>
        </Table>
      </Paper>
    </MainContainer>
  );
};

export default Courses;
