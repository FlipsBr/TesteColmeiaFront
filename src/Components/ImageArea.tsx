import * as React from "react";
import { Button, TextField, Box } from "@material-ui/core";

import { useState } from "react";
import Webcam from "react-webcam";
import axios from "axios";

export default function ImageArea() {
  const [buttonState, setButtonState] = useState(false);
  const [saveButtonState, setSaveButtonState] = useState(true);
  const [imageName, setImageName] = useState("");
  const [imgSrc, setImgSrc] = React.useState(null);

  const handleClick = () => {
    console.log(webcamRef);
    buttonState == false ? setButtonState(true) : setButtonState(false);
  };

  /* Conjunto de estados da Imagem... */
  /* Essa função referencia a WebCam que seu navegador enxerga e utiliza o método .getScreeshot() da api do módulo... */
  const webcamRef = React.useRef(null);
  const capture = React.useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    setSaveButtonState(false);
    setImgSrc(imageSrc);
  }, [webcamRef, setImgSrc]);
  /* Aqui uso um formData para poder enviar arquivos maiores que 16mb de uma vez através do protocolo http */
  const saveImg = async () => {
    var formdata = new FormData();
    //add three variable to form
    formdata.append("Imagem", imgSrc);
    if (imageName) {
      formdata.append("imageName", imageName);
    }
    const res = await axios.post("http://localhost:3001/uploadImage", formdata);
    console.log(res);
    if (res) {
      console.log(res);
      console.log("Image succesfully sent to db...");
    } else console.log("fail");
  };

  /* Função que fica responsável por controlar a mudança do nome atrelado a foto.. */
  const onNameChange = (event) => setImageName(event.target.value);

  return (
    <div>
      <Box sx={{ mx: "auto", p: 2 }} display="flex">
        <Webcam audio={false} ref={webcamRef} screenshotFormat="image/jpeg" />
      </Box>
      <Box sx={{ mx: "auto" }} display="flex">
        <Button variant="contained" onClick={capture}>
          Capture photo
        </Button>
        <Button
          variant="contained"
          onClick={saveImg}
          disabled={saveButtonState}
        >
          Save Photo
        </Button>
        <Box sx={{ mx: "auto" }} display="flex">
          <TextField
            onChange={onNameChange}
            value={imageName}
            label={"Photo Name"}
          />
        </Box>
      </Box>
      <Box sx={{ mx: "auto", p: 2 }} display="flex">
        {imgSrc && <img src={imgSrc} alt="Capture" />}
      </Box>
    </div>
  );
}
