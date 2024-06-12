import { DeleteOutline, SaveOutlined, UploadFileOutlined } from "@mui/icons-material"
import { Button, Grid, IconButton, TextField, Typography } from "@mui/material"
import Swal from "sweetalert2";
import { ImageGallery } from "../components"
import { useSelector, useDispatch } from "react-redux";
import { useForm } from "../../hooks/useForm"
import { useEffect, useMemo, useRef } from "react";
import { setActiveNote, startDeletingNote, startSaveNote, startUploadingFiles } from "../../store/journal";
import 'sweetalert2/dist/sweetalert2.css'

export const NoteView = () => {

    const { active: note, messageSaved, isSaving } = useSelector(state => state.journal);
    const { body, title, date, onInputChange, formState} = useForm(note);
    const dispatch = useDispatch();

    const dateString = useMemo(() => {
        const newDate = new Date(date);
        return newDate.toUTCString();
    }, [date]);

    const fileInputRef = useRef();

    useEffect(() => {
        dispatch(setActiveNote(formState));
    }, [formState]);

    useEffect(() => {
        if (messageSaved.length > 0) {
            Swal.fire('Nota actualizada', messageSaved, 'success')
        }
    }, [messageSaved]);

    const onSaveNote = () => {
        dispatch(startSaveNote())
    }

    const onFileInputChange = ({target}) => {
        if (target.files === 0) return;
        dispatch(startUploadingFiles(target.files))
    }

    const onDeleteNote = () => {
        dispatch(startDeletingNote({}));
    }

    return (
        <Grid container direction='row' justifyContent='space-between' alignItems='center' sx={{mb: 1}} className="animate__animated animate__fadeIn animate__faster">

            <Grid item>
                <Typography fontSize={39} fontWeight='light'>{dateString}</Typography>
            </Grid>

            <Grid item>

                <input
                    type="file"
                    multiple
                    ref={fileInputRef}
                    onChange={onFileInputChange}
                    style={{display: 'none'}}
                    accept="image/*"
                />

                <IconButton
                    color="primary"
                    disabled={isSaving}
                    onClick={() => fileInputRef.current.click()}
                >
                    <UploadFileOutlined/>
                </IconButton>            

                <Button 
                    color="primary" 
                    sx={{ padding: 2}}
                    onClick={ onSaveNote}
                    disabled={isSaving}
                >
                    <SaveOutlined sx={{fontSize: 30, mr: 1}}/>
                    Guardar
                </Button>
            </Grid>

            <Grid container>
                <TextField
                    type='text' 
                    variant='filled' 
                    fullWidth 
                    placeholder="Ingrese un titulo" 
                    label="Titulo" 
                    sx={{border: 'none', mb: 1}}
                    name="title"
                    value={title}
                    onChange={onInputChange}
                />
                <TextField 
                    type='text' 
                    variant='filled' 
                    fullWidth 
                    multiline 
                    placeholder="Que sucedio en el dia de hoy?" 
                    minRows={5}
                    value={body}
                    name="body"
                    onChange={onInputChange}
                />
            </Grid>

            <Grid container justifyContent="end">
                <Button 
                    color="error" 
                    onClick={onDeleteNote}
                    sx={{ mt: 2 }}

                >
                    <DeleteOutline/>
                    Borrar
                </Button>

            </Grid>

            <ImageGallery images={note.imageUrls} />


        </Grid>
    )
}
