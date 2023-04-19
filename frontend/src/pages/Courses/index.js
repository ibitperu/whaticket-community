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
import { Visibility } from "@material-ui/icons";

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
  FormControlLabel,
  Checkbox,
  Switch,
  Chip,
} from "@material-ui/core";

import { makeStyles } from "@material-ui/core/styles";
import { CloudUploadOutlined, PhotoCamera } from "@material-ui/icons";
import api from "../../services/api";
import toastError from "../../errors/toastError";

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
  studentTable: {
    marginTop: 20,
  },
  typography: {
    marginRight: 7,
  },
  modal: {
    width: "800px",
  },
  enabled: {
    background: "#4b874b",
    color: "white",
  },
  disabled: {
    background: "#dd6868",
    color: "white",
  },
}));

// const courses = [
//   {
//     id: 1,
//     name: "Programación básica",
//     students: [
//       {
//         id: 1,
//         name: "Miguel",
//         progress: "54/199",
//         company: "Ibit",
//       },
//       {
//         id: 2,
//         name: "Pedro",
//         progress: "54/199",
//         company: "Ibit",
//       },
//     ],
//     classes: [],
//     school: "Programación",
//     final_exam: null,
//     proyect: null,
//     enable: true,
//   },
//   {
//     id: 2,
//     name: "Marketing",
//     students: [
//       {
//         id: 1,
//         name: "Miguel",
//         progress: "54/199",
//         company: "Ibit",
//       },
//       {
//         id: 2,
//         name: "Pedro",
//         progress: "54/199",
//         company: "Ibit",
//       },
//     ],
//     classes: [],
//     school: "Programación",
//     final_exam: null,
//     proyect: null,
//     enable: true,
//   },
// ];

// const AddStudentModal = ({ open, onClose, classes, students }) => {
//   return (
//     <Dialog open={open} onClose={onClose} scroll="paper" fullWidth>
//       <MainHeader>
//         <DialogTitle>Agregar Estudiante</DialogTitle>
//         <MainHeaderButtonsWrapper>
//           <TextField
//             placeholder="Buscar estudiante"
//             type="search"
//             InputProps={{
//               startAdornment: (
//                 <InputAdornment position="start">
//                   <SearchIcon style={{ color: "gray" }} />
//                 </InputAdornment>
//               ),
//             }}
//           />
//         </MainHeaderButtonsWrapper>
//       </MainHeader>
//       <DialogContent dividers>
//         <Table size="small" className={classes.studentTable}>
//           <TableHead>
//             <TableRow>F. Inicio: 02/01/2023</TableRow>
//             <TableRow>
//               <TableCell align="center">N</TableCell>
//               <TableCell align="center">Nombre</TableCell>
//               <TableCell align="center">Empresa</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {students.map((student) => (
//               <TableRow key={student.id}>
//                 <TableCell align="center">
//                   <FormControlLabel control={<Checkbox />} />
//                 </TableCell>
//                 <TableCell align="center">{student.name}</TableCell>
//                 <TableCell align="center">{student.company}</TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </DialogContent>
//       <DialogActions>
//         <Button onClick={onClose} color="secondary" variant="outlined">
//           Cancelar
//         </Button>
//          <Button
//           type="submit"
//           color="primary"
//           variant="contained"
//           className={classes.btnWrapper}
//         >
//           Añadir
//         </Button>
//         <Button
//           type="submit"
//           color="primary"
//           variant="contained"
//           className={classes.btnWrapper}
//         >
//           Añadir
//         </Button>
//       </DialogActions>
//     </Dialog>
//   );
// };

// const AddCourseModal = ({ open, onClose, classes, modulesData }) => {
//   return (
//     <Dialog open={open} onClose={onClose} scroll="paper" fullWidth>
//       <DialogTitle>Agregar Curso</DialogTitle>
//       <DialogContent dividers>
//         <form>
//           <FormControl fullWidth>
//             <InputLabel>Nombre</InputLabel>
//             <Input type="text" />
//           </FormControl>
//           <FormControl fullWidth>
//             <InputLabel>Cantidad de videos</InputLabel>
//             <Input type="text" />
//           </FormControl>
//           <FormControl fullWidth>
//             <InputLabel>Escuela</InputLabel>
//             <Input type="text" />
//           </FormControl>

//           <IconButton
//             color="primary"
//             aria-label="upload picture"
//             component="label"
//           >
//             <Typography className={classes.typography}>Examen final</Typography>
//             <input hidden accept="image/*" type="file" />
//             <CloudUploadOutlined />
//           </IconButton>

//           <IconButton
//             color="primary"
//             aria-label="upload picture"
//             component="label"
//           >
//             <Typography className={classes.typography}>
//               Proyecto final
//             </Typography>
//             <input hidden accept="image/*" type="file" />
//             <CloudUploadOutlined />
//           </IconButton>
//           <FormControlLabel
//             value="start"
//             control={<Switch color="primary" />}
//             label="Habilitado"
//             labelPlacement="start"
//           />
//         </form>
//         <Table size="small" className={classes.studentTable}>
//           <TableHead>
//             <TableRow>F. Inicio: 08/01/2023</TableRow>
//             <TableRow>
//               <TableCell align="center">N</TableCell>
//               <TableCell align="center">Nombre</TableCell>
//               <TableCell align="center">Descripción</TableCell>
//               <TableCell align="center">Acciones</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {modulesData?.map((module, index) => (
//               <TableRow key={module.id}>
//                 <TableCell align="center">{index + 1}</TableCell>
//                 <TableCell align="center">{module.name}</TableCell>
//                 <TableCell align="center">{module.description}</TableCell>
//                 <TableCell align="center">
//                   <IconButton size="small">
//                     <EditIcon />
//                   </IconButton>
//                   <IconButton size="small">
//                     <DeleteOutlineIcon />
//                   </IconButton>
//                 </TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </DialogContent>
//       <DialogActions>
//         <Button onClick={onClose} color="secondary" variant="outlined">
//           Cancelar
//         </Button>
//          <Button
//           type="submit"
//           color="primary"
//           variant="contained"
//           className={classes.btnWrapper}
//         >
//           Añadir
//         </Button>
//         <Button
//           type="submit"
//           color="primary"
//           variant="contained"
//           className={classes.btnWrapper}
//         >
//           Añadir
//         </Button>
//       </DialogActions>
//     </Dialog>
//   );
// };

// const StudentsModal = ({ open, onClose, classes, students }) => {
//   const [addStudentModalOpen, setAddStudentModalOpen] = useState(false);
//   const [addCourseModal, setAddCourseModal] = useState(false);

//   const handleOpenAddStudentModal = () => {
//     setAddStudentModalOpen(true);
//   };

//   const handleCloseAddStudentModal = () => {
//     setAddStudentModalOpen(false);
//   };

//   const handleOpenAddCourseModal = () => {
//     setAddCourseModal(true);
//   };

//   const handleCloseAddCourseModal = () => {
//     setAddCourseModal(false);
//   };

//   return (
//     <Dialog open={open} onClose={onClose} scroll="paper" fullWidth>
//       <AddStudentModal
//         open={addStudentModalOpen}
//         onClose={handleCloseAddStudentModal}
//         classes={classes}
//         students={students}
//       />

//       <MainHeader>
//         <DialogTitle>Estudiantes</DialogTitle>
//         <MainHeaderButtonsWrapper>
//           <TextField
//             placeholder="Buscar estudiante"
//             type="search"
//             InputProps={{
//               startAdornment: (
//                 <InputAdornment position="start">
//                   <SearchIcon style={{ color: "gray" }} />
//                 </InputAdornment>
//               ),
//             }}
//           />
//           <Button
//             variant="contained"
//             color="primary"
//             onClick={handleOpenAddStudentModal}
//           >
//             Agregar estudiante
//           </Button>
//         </MainHeaderButtonsWrapper>
//       </MainHeader>
//       <DialogContent dividers>
//         <Table size="small" className={classes.studentTable}>
//           <TableHead>
//             <TableRow>F. Inicio: 02/01/2023</TableRow>
//             <TableRow>
//               <TableCell align="center">Nombre</TableCell>
//               <TableCell align="center">Empresa</TableCell>
//               <TableCell align="center">Progreso</TableCell>
//               <TableCell align="center">Acciones</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {students.map((student) => (
//               <TableRow key={student.id}>
//                 <TableCell align="center">{student.name}</TableCell>
//                 <TableCell align="center">{student.company}</TableCell>
//                 <TableCell align="center">{student.progress}</TableCell>
//                 <TableCell align="center">
//                   <Link className={classes.link}>
//                     Ver videos
//                   </Link>
//                 </TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//         <Table size="small" className={classes.studentTable}>
//           <TableHead>
//             <TableRow>F. Inicio: 08/01/2023</TableRow>
//             <TableRow>
//               <TableCell align="center">Nombre</TableCell>
//               <TableCell align="center">Empresa</TableCell>
//               <TableCell align="center">Progreso</TableCell>
//               <TableCell align="center">Acciones</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {students.map((student) => (
//               <TableRow key={student.id}>
//                 <TableCell align="center">{student.name}</TableCell>
//                 <TableCell align="center">{student.company}</TableCell>
//                 <TableCell align="center">{student.progress}</TableCell>
//                 <TableCell align="center">
//                   <Link className={classes.link}>
//                     Ver videos
//                   </Link>
//                 </TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </DialogContent>
//       <DialogActions>
//         <Button onClick={onClose} color="secondary" variant="outlined">
//           Cancelar
//         </Button>
//         {/* <Button
//           type="submit"
//           color="primary"
//           variant="contained"
//           className={classes.btnWrapper}
//           onClick={handleOpenAddStudentModal}
//         >
//           Añadir
//         </Button> */}
//       </DialogActions>
//     </Dialog>
//   );
// };

// const AddClassModal = ({ open, onClose, classes }) => {
//   return (
//     <Dialog open={open} onClose={onClose} scroll="paper" fullWidth>
//       <DialogTitle>Agregar clases</DialogTitle>
//       <DialogContent dividers>
//         <form>
//           <FormControl fullWidth>
//             <InputLabel>Nombre</InputLabel>
//             <Input type="text" />
//           </FormControl>
//           <TextField
//             fullWidth
//             id="outlined-textarea"
//             label="Descripción"
//             placeholder="Escriba su descripción..."
//             multiline
//           />
//           <IconButton
//             color="primary"
//             aria-label="upload picture"
//             component="label"
//           >
//             <Typography className={classes.typography}>Video</Typography>
//             <input hidden accept="image/*" type="file" />
//             <CloudUploadOutlined />
//           </IconButton>
//           <FormControlLabel
//             value="start"
//             control={<Switch color="primary" />}
//             label="Habilitado"
//             labelPlacement="start"
//           />
//         </form>
//       </DialogContent>
//       <DialogActions>
//         <Button onClick={onClose} color="secondary" variant="outlined">
//           Cancelar
//         </Button>
//         <Button
//           type="submit"
//           color="primary"
//           variant="contained"
//           className={classes.btnWrapper}
//         >
//           Aceptar
//         </Button>

//       </DialogActions>
//     </Dialog>
//   );
// };

// const AddClasesModal = ({ open, onClose, classes }) => {
//   const videos=[]
//   const [addClassOpenModel, setAddClassOpenModel] = useState(false);

//   const handleOpenAddClassModel = () => {
//     setAddClassOpenModel(true);
//   };

//   const handleCloseAddClassModel = () => {
//     setAddClassOpenModel(false);
//   };

//   return (
//     <Dialog open={open} onClose={onClose} scroll="paper" fullWidth>
//       <AddClassModal
//         open={addClassOpenModel}
//         onClose={handleCloseAddClassModel}
//         classes={classes}
//       />
//       <DialogTitle>Clases</DialogTitle>
//       <DialogContent dividers>
//         <Table size="small">
//           <TableHead>
//             <TableRow>
//               <TableCell align="center">N</TableCell>
//               <TableCell align="center">Título</TableCell>
//               <TableCell align="center">Estado</TableCell>
//               <TableCell align="center">Acción</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {videos.map((video, index) => (
//               <TableRow key={index}>
//                 <TableCell align="center">{index + 1}</TableCell>
//                 <TableCell align="center">{video.name}</TableCell>
//                 <TableCell align="center">Habilitado</TableCell>
//                 <TableCell align="center">
//                   <IconButton size="small">
//                     <EditIcon />
//                   </IconButton>
//                   <IconButton size="small">
//                     <DeleteOutlineIcon />
//                   </IconButton>
//                   <Switch />
//                 </TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </DialogContent>
//       <DialogActions>
//         <Button onClick={onClose} color="secondary" variant="outlined">
//           Cancelar
//         </Button>
//         <Button
//           type="submit"
//           color="primary"
//           variant="contained"
//           className={classes.btnWrapper}
//           onClick={handleOpenAddClassModel}
//         >
//           Añadir
//         </Button>

//       </DialogActions>
//     </Dialog>
//   );
// };

const classesDataForSend = [
  {
    id: 1,
    name: "Programación básica",
    description: "Programación básica descripción",
    message: "Hoy aprenderás todo sobre programación básica",
    classVideo: "google.com",
    enabled: true,
  },
  {
    id: 2,
    name: "Programación básica 2",
    description: "Programación básica descripción 2",
    message: "Hoy aprenderás todo sobre programación básica",
    classVideo: "google.com",
    enabled: true,
  }
]

const SendClassesModal = ({ open, onClose, classes, classesData }) => {
  console.log(classesData)
  return (
    <Dialog
      open={open}
      onClose={onClose}
      scroll="paper"
      fullWidth
      maxWidth={700}
      className={classes.Modal}
    >
      <DialogTitle>Clases</DialogTitle>
      <DialogContent dividers>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell align="center">N</TableCell>
              <TableCell align="center">Título</TableCell>
              <TableCell align="center">Mensaje</TableCell>
              <TableCell align="center">Video</TableCell>
              <TableCell align="center">Estado</TableCell>
              <TableCell align="center">Acción</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {classesDataForSend?.map((module, index) => {
              return (
                <>
                  <TableRow key={module.id}>
                    <TableCell align="center">{index + 1}</TableCell>
                    <TableCell align="center">
                      <Typography>
                        <b>{module.name}</b>
                      </Typography>
                    </TableCell>
                    <TableCell align="center">
                      <Typography>{module.message}</Typography>
                    </TableCell>
                    <TableCell align="center">
                      <Link className={classes.link}>{module.classVideo}</Link>
                    </TableCell>
                    <TableCell align="center">
                      {module.enabled ? (
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
                     <Link className={classes.link}>Enviar video</Link> 
                    </TableCell>
                  </TableRow>
                </>
              );
            })}
          </TableBody>
        </Table>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary" variant="outlined">
          Cancelar
        </Button>
        {/* <Button
          type="submit"
          color="primary"
          variant="contained"
          className={classes.btnWrapper}
          // onClick={handleOpenAddClassesModal}
        >
          Añadir
        </Button> */}
      </DialogActions>
    </Dialog>
  );
};

const AddStudentModal = ({ open, onClose, classes }) => {
  const [students, setStudents] = useState([]);

  const fetchContacts = async () => {
    console.log("fetchContacts");
    try {
      const { data } = await api.get("/contacts/");
      console.log(data);

      setStudents(data.contacts);
    } catch (err) {
      toastError(err);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  return (
    <Dialog open={open} onClose={onClose} scroll="paper" fullWidth>
      <MainHeader>
        <DialogTitle>Agregar Estudiante</DialogTitle>
        <MainHeaderButtonsWrapper>
          <TextField
            placeholder="Buscar estudiante"
            type="search"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon style={{ color: "gray" }} />
                </InputAdornment>
              ),
            }}
          />
        </MainHeaderButtonsWrapper>
      </MainHeader>
      <DialogContent dividers>
        <Table size="small" className={classes.studentTable}>
          <TableHead>
            <TableRow>F. Inicio: 02/01/2023</TableRow>
            <TableRow>
              <TableCell align="center">N</TableCell>
              <TableCell align="center">Nombre</TableCell>
              <TableCell align="center">Empresa</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {students?.map((student) => (
              <TableRow key={student.id}>
                <TableCell align="center">
                  <FormControlLabel control={<Checkbox />} />
                </TableCell>
                <TableCell align="center">{student.name}</TableCell>
                <TableCell align="center">{student.company}</TableCell>
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
        >
          Añadir
        </Button>
      </DialogActions>
    </Dialog>
  );
};

const StudentsModal = ({ open, onClose, classes, classesData }) => {
  const [addStudentModalOpen, setAddStudentModalOpen] = useState(false);
  const [addCourseModal, setAddCourseModal] = useState(false);
  const [students, setStudents] = useState([]);
  const [sendClassesModalOpen, setSendClassesModalOpen] = useState(false);


  const fetchContacts = async () => {
    console.log("fetchContacts");
    try {
      const { data } = await api.get("/contacts/");
      console.log(data);

      setStudents(data.contacts);
    } catch (err) {
      toastError(err);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  const handleOpenSendClassesModal = () => {
    setSendClassesModalOpen(true);
  };

  const handleCloseSendClassesModal = () => {
    setSendClassesModalOpen(false);
  };

  const handleOpenAddStudentModal = () => {
    setAddStudentModalOpen(true);
  };

  const handleCloseAddStudentModal = () => {
    setAddStudentModalOpen(false);
  };

  const handleOpenAddCourseModal = () => {
    setAddCourseModal(true);
  };

  const handleCloseAddCourseModal = () => {
    setAddCourseModal(false);
  };

  return (
    <Dialog open={open} onClose={onClose} scroll="paper" fullWidth>
      <AddStudentModal
        open={addStudentModalOpen}
        onClose={handleCloseAddStudentModal}
        classes={classes}
        students={students}
      />
       <SendClassesModal
        open={sendClassesModalOpen}
        onClose={handleCloseSendClassesModal}
        classes={classes}
        classesData={classesData}
      />

      <MainHeader>
        <DialogTitle>Estudiantes</DialogTitle>
        <MainHeaderButtonsWrapper>
          <TextField
            placeholder="Buscar estudiante"
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
            onClick={handleOpenAddStudentModal}
          >
            Agregar estudiante
          </Button>
        </MainHeaderButtonsWrapper>
      </MainHeader>
      <DialogContent dividers>
        <Table size="small" className={classes.studentTable}>
          <TableHead>
            <TableRow>F. Inicio: 02/01/2023</TableRow>
            <TableRow>
              <TableCell align="center">Nombre</TableCell>
              <TableCell align="center">Empresa</TableCell>
              <TableCell align="center">Progreso</TableCell>
              <TableCell align="center">Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {students.map((student) => (
              <TableRow key={student.id}>
                <TableCell align="center">{student.name}</TableCell>
                <TableCell align="center">{student.company}</TableCell>
                <TableCell align="center">{student.progress}</TableCell>
                <TableCell align="center">
                  <Link className={classes.link} onClick={handleOpenSendClassesModal}>Ver videos</Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <Table size="small" className={classes.studentTable}>
          <TableHead>
            <TableRow>F. Inicio: 08/01/2023</TableRow>
            <TableRow>
              <TableCell align="center">Nombre</TableCell>
              <TableCell align="center">Empresa</TableCell>
              <TableCell align="center">Progreso</TableCell>
              <TableCell align="center">Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {students.map((student) => (
              <TableRow key={student.id}>
                <TableCell align="center">{student.name}</TableCell>
                <TableCell align="center">{student.company}</TableCell>
                <TableCell align="center">{student.progress}</TableCell>
                <TableCell align="center">
                  <Link className={classes.link}>Ver videos</Link>
                </TableCell>
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

const AddModuleModal = ({ open, onClose, classes }) => {
  return (
    <Dialog open={open} onClose={onClose} scroll="paper" fullWidth>
      <DialogTitle>Agregar modulo</DialogTitle>
      <DialogContent dividers>
        <form>
          <FormControl fullWidth>
            <InputLabel>Nombre</InputLabel>
            <Input type="text" />
          </FormControl>
          <TextField
            fullWidth
            id="outlined-textarea"
            label="Descripción"
            placeholder="Escriba su descripción..."
            multiline
          />
          <FormControlLabel
            value="start"
            control={<Switch color="primary" />}
            label="Habilitado"
            labelPlacement="start"
          />
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
          Aceptar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

const AddClassModal = ({ open, onClose, classes }) => {
  return (
    <Dialog open={open} onClose={onClose} scroll="paper" fullWidth>
      <DialogTitle>Agregar clases</DialogTitle>
      <DialogContent dividers>
        <form>
          <FormControl fullWidth>
            <InputLabel>Nombre</InputLabel>
            <Input type="text" />
          </FormControl>
          <TextField
            fullWidth
            id="outlined-textarea"
            label="Descripción"
            placeholder="Escriba su descripción..."
            multiline
          />
          <TextField
            fullWidth
            id="outlined-textarea"
            label="Mensaje"
            placeholder="Escriba su mensaje..."
            multiline
          />
          <IconButton
            color="primary"
            aria-label="upload picture"
            component="label"
          >
            <Typography className={classes.typography}>Video</Typography>
            <input hidden accept="image/*" type="file" />
            <CloudUploadOutlined />
          </IconButton>
          <FormControlLabel
            value="start"
            control={<Switch color="primary" />}
            label="Habilitado"
            labelPlacement="start"
          />
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
          Aceptar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

const ClassesModal = ({ open, onClose, classes, classesData }) => {
  const [classModalOpen, setAddClassModalOpen] = useState(false);

  const handleOpenAddClassesModal = () => {
    setAddClassModalOpen(true);
  };

  const handleCloseAddClassesModal = () => {
    setAddClassModalOpen(false);
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      scroll="paper"
      fullWidth
      maxWidth={700}
      className={classes.Modal}
    >
      <AddClassModal
        open={classModalOpen}
        onClose={handleCloseAddClassesModal}
        classes={classes}
      />
      <DialogTitle>Clases</DialogTitle>
      <DialogContent dividers>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell align="center">N</TableCell>
              <TableCell align="center">Título</TableCell>
              <TableCell align="center">Mensaje</TableCell>
              <TableCell align="center">Video</TableCell>
              <TableCell align="center">Estado</TableCell>
              <TableCell align="center">Acción</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {classesData?.map((module, index) => {
              return (
                <>
                  <TableRow key={module.id}>
                    <TableCell align="center">{index + 1}</TableCell>
                    <TableCell align="center">
                      <Typography>
                        <b>{module.name}</b>
                      </Typography>
                    </TableCell>
                    <TableCell align="center">
                      <Typography>{module.message}</Typography>
                    </TableCell>
                    <TableCell align="center">
                      <Link className={classes.link}>{module.classVideo}</Link>
                    </TableCell>
                    <TableCell align="center">
                      {module.enabled ? (
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
                      <IconButton size="small">
                        <EditIcon />
                      </IconButton>
                      <IconButton size="small">
                        <DeleteOutlineIcon />
                      </IconButton>
                      <Switch />
                    </TableCell>
                  </TableRow>
                </>
              );
            })}
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
          onClick={handleOpenAddClassesModal}
        >
          Añadir
        </Button>
      </DialogActions>
    </Dialog>
  );
};

const VideosModal = ({ open, onClose, classes, modules }) => {
  const [currentClasses, setCurrentClasses] = useState([]);
  const [classModalOpen, setClassModalOpen] = useState(false);
  const [addModuleModalOpen, setAddModuleModalOpen] = useState(false);

  const handleOpenAddModuleModal = () => {
    setAddModuleModalOpen(true);
  };

  const handleCloseAddModuleModal = () => {
    setAddModuleModalOpen(false);
  };

  const handleOpenClassesModal = (classesData) => {
    setClassModalOpen(true);
    setCurrentClasses(classesData);
  };

  const handleCloseClassesModal = () => {
    setClassModalOpen(false);
  };

  return (
    <Dialog open={open} onClose={onClose} scroll="paper" maxWidth={700}>
      <ClassesModal
        open={classModalOpen}
        onClose={handleCloseClassesModal}
        classes={classes}
        classesData={currentClasses}
      />
      <AddModuleModal
        open={addModuleModalOpen}
        onClose={handleCloseAddModuleModal}
        classes={classes}
      />
      <DialogTitle>Módulos</DialogTitle>
      <DialogContent dividers>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell align="center">N</TableCell>
              <TableCell align="center">Título</TableCell>
              <TableCell align="center">Estado</TableCell>
              <TableCell align="center">Clases</TableCell>
              <TableCell align="center">Acción</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {modules?.map((module, index) => {
              return (
                <>
                  <TableRow key={module.id}>
                    <TableCell align="center">{index + 1}</TableCell>
                    <TableCell align="center">
                      <Typography>
                        <b>{module.name}</b>
                      </Typography>
                    </TableCell>
                    <TableCell align="center">
                      {module.enabled ? (
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
                      <Link
                        className={classes.link}
                        onClick={() => handleOpenClassesModal(module.classes)}
                      >
                        Ver clases
                      </Link>
                    </TableCell>
                    <TableCell align="center">
                      <IconButton size="small">
                        <EditIcon />
                      </IconButton>
                      <IconButton size="small">
                        <DeleteOutlineIcon />
                      </IconButton>
                      <Switch />
                    </TableCell>
                  </TableRow>
                </>
              );
            })}
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
          onClick={handleOpenAddModuleModal}
        >
          Añadir
        </Button>
      </DialogActions>
    </Dialog>
  );
};

const Courses = () => {
  const [courses, setCourses] = useState();
  const [modules, setModules] = useState([]);
  const [currentModules, setCurrentModules] = useState([]);
  const [currentStudents, setCurrentStudents] = useState([]);
  const [studentsModalOpen, setStudentsModalOpen] = useState(false);
  const [addCourseModal, setAddCourseModal] = useState(false);
  const [addClassModal, setAddClassModal] = useState(false);
  const [videoModalOpen, setVideoModalOpen] = useState(false);

  const handleOpenVideoModal = (modules) => {
    setCurrentModules(modules);
    setVideoModalOpen(true);
  };

  const handleCloseVideoModal = () => {
    setVideoModalOpen(false);
  };

  const handleOpenStudentsModal = () => {
    setStudentsModalOpen(true);
  };

  const handleCloseStudentsModal = () => {
    setStudentsModalOpen(false);
  };

  const handleOpenAddCourseModal = () => {
    setAddCourseModal(true);
  };

  const handleCloseAddCourseModal = () => {
    setAddCourseModal(false);
  };

  const handleOpenAddClassesModal = () => {
    setAddClassModal(true);
  };

  const handleCloseAddClassesModal = () => {
    setAddClassModal(false);
  };

  const classes = useStyles();

  const fetchCourses = async () => {
    try {
      const { data } = await api.get("/courses/");
      setCourses(data.courses);
    } catch (err) {
      toastError(err);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  return (
    <MainContainer>
      <VideosModal
        open={videoModalOpen}
        onClose={handleCloseVideoModal}
        classes={classes}
        modules={currentModules}
      />
      <StudentsModal
        open={studentsModalOpen}
        onClose={handleCloseStudentsModal}
        classes={classes}
        students={currentStudents}
        classesData={currentModules}
      />
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
          <Button
            variant="contained"
            color="primary"
            onClick={handleOpenAddCourseModal}
          >
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
              <TableCell align="center">Total clases</TableCell>
              <TableCell align="center">Escuela</TableCell>
              <TableCell align="center">Examen final</TableCell>
              <TableCell align="center">Proyecto</TableCell>
              <TableCell align="center">Estado</TableCell>
              <TableCell align="center">Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {courses?.map((course) => (
              <TableRow key={course.id}>
                <TableCell align="center">{course.name}</TableCell>
                <TableCell align="center">
                  <Link
                    className={classes.link}
                    onClick={handleOpenStudentsModal}
                  >
                    {/* Ver ({course.students.length}) */}
                    Ver
                  </Link>
                </TableCell>
                <TableCell align="center">
                  <IconButton
                    onClick={() => handleOpenVideoModal(course.modules)}
                  >
                    <Visibility />
                  </IconButton>
                </TableCell>
                <TableCell align="center">{course.school.name}</TableCell>
                <TableCell align="center">
                  <Link className={classes.link}>Ver examen</Link>
                </TableCell>
                <TableCell align="center">
                  <Link className={classes.link}>Ver proyecto</Link>
                </TableCell>
                <TableCell align="center">
                  {course.enabled ? (
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
                  <IconButton size="small" onClick={handleOpenAddCourseModal}>
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

export default Courses;
