import * as React from "react";
import { Container, Grid, Typography } from "@material-ui/core";
import ImageArea from "./Components/ImageArea.tsx";

function App() {
  return (
    <>
      <Container>
        <Typography align="center">
          <h3>Teste de Cógido para Colméia Visão Computacional </h3>
        </Typography>
        <Grid justifyContent="center" container={true}>
          <ImageArea />
        </Grid>
      </Container>
    </>
  );
}

export default App;
