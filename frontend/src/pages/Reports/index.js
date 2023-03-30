import { Box, Button, Container, TextField, Grid } from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import MainContainer from "../../components/MainContainer";
import MainHeader from "../../components/MainHeader";
import MainHeaderButtonsWrapper from "../../components/MainHeaderButtonsWrapper";
import Title from "../../components/Title";

const data = [
  { name: "Enero", an: 4000, vu: 2400, amt: 2400 },
  { name: "Febrero", an: 3000, vu: 1398, amt: 2210 },
  { name: "Marzo", an: 2000, vu: 9800, amt: 2290 },
  { name: "Abril", an: 2780, vue: 3908, amt: 2000 },
  { name: "Mayo", an: 1890, vue: 4800, amt: 2181 },
  { name: "Junio", an: 2390, vu: 3800, amt: 2500 },
  { name: "Julio", an: 3490, vu: 4300, amt: 2100 },
];

const data2 = [
  {
    name: "A",
    value: 20,
    amt:200,
  },
  {
    name: "B",
    value: 30,
    amt: 300
  },
  {
    name: "C",
    value: 20,
    amt: 300
  },
  {
    name: "D",
    value: 30,
    amt: 300
  }
]

const students = [
  { id: 1, name: "Miguel" },
  { id: 2, name: "Pedro"},
];

const tags = [
  { id: 1, name: "Angular" },
  { id: 2, name: "Vue" }
]

const Reports = () => {
  return (
    <Container>
      <Grid>
        <MainContainer>
          <MainHeader>
            <Title>Informes</Title>
            <MainHeaderButtonsWrapper>
              <Button variant="contained" color="primary">
                Filtrar
              </Button>
            </MainHeaderButtonsWrapper>
          </MainHeader>
          <Box sx={{ flexGrow: 1 }}>
            <Grid container>
              <Grid item xs={6}>
                <Autocomplete
                  id="free-solo-demo"
                  freeSolo
                  options={students.map((option) => option.name)}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Estudiantes"
                      margin="normal"
                      variant="outlined"
                    />
                  )}
                />
              </Grid>
              <Grid item xs={6}>
                <Autocomplete
                  id="free-solo-demo"
                  freeSolo
                  options={tags.map((option) => option.name)}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Etiquetas"
                      margin="normal"
                      variant="outlined"
                  />
                  )}
                />
              </Grid>
            </Grid> 
          </Box>
        </MainContainer>
      </Grid>
      <Grid style={{ marginTop: 40 }}>
        <MainContainer>
          <BarChart
            width={500}
            height={300}
            data={data}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="an" fill="#8884d8" />
            <Bar dataKey="vu" fill="#82ca9d" />
          </BarChart>
        </MainContainer>
      </Grid>
      <Grid style={{ marginTop: 40 }}>
          <BarChart
            width={600}
            height={400}
            data={data2}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="value" type="number" />
            <YAxis dataKey="name" type="category" />
            <Tooltip />
            <Legend />
            <Bar dataKey="value" fill="#8884d8" />
          </BarChart>
      </Grid>
    </Container>
  );
};

export default Reports;
