import { Box, Button, Container, Grid, TextField } from "@material-ui/core";
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
  { name: "A", uv: 4000, pv: 2400, amt: 2400 },
  { name: "B", uv: 3000, pv: 1398, amt: 2210 },
  { name: "C", uv: 2000, pv: 9800, amt: 2290 },
  { name: "D", uv: 2780, pv: 3908, amt: 2000 },
  { name: "E", uv: 1890, pv: 4800, amt: 2181 },
  { name: "F", uv: 2390, pv: 3800, amt: 2500 },
  { name: "G", uv: 3490, pv: 4300, amt: 2100 },
];

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
          <Box sx={{ display: "flex" }}>
            <TextField label="Usuarios" variant="outlined" />
            <TextField label="Usuarios" variant="outlined" />
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
            <Bar dataKey="pv" fill="#8884d8" />
            <Bar dataKey="uv" fill="#82ca9d" />
          </BarChart>
        </MainContainer>
      </Grid>
    </Container>
  );
};

export default Reports;
