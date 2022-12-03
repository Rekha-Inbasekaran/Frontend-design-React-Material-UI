import React from 'react';
import TextField from '@mui/material/TextField';
import Grid from '@material-ui/core/Grid';
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import PublicIcon from '@mui/icons-material/Public';
import './App.css';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextareaAutosize
} from '@mui/material';
import { useForm } from "react-hook-form";
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    secondary: {
      main: '#3E5060',
    },
  },
});

const App = () => {
  const { register, handleSubmit, formState: { errors }, getValues } = useForm();
  const onSubmit = (data) => console.log(data);
  console.log(errors);


  const doesFormHasError = () => {
    return errors.firstName || errors.email;
  }

  const dialogMessage = () => {
    const email = getValues('email');
    const name = getValues('firstName');
    const description = getValues('description');

    if (doesFormHasError()) {
      return getErrorMsg();
    }

    return (
      <div>
        <p>The event has been scheduled for {name} with e-mail ID {email}.</p>
        {description &&
          <p>Note: {description}.</p>
        }
      </div>
    )
  }

  const dialogTitle = () => {
    if (doesFormHasError()) {
      return "Error"
    }
    return "Success"
  }

  const getErrorMsg = () => {
    if (errors.firstName?.message && errors.email?.message) {
      return "Please check your name and email!"
    }
    if (errors.firstName?.message) {
      return "Please check your name!"
    }
    if (errors.email?.message) {
      return "Please check your email!"
    }
  }

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <ThemeProvider theme={theme}>
      <div className="App__form">
        <Grid className="grid-container" container>
          <Grid className="grid-col-left" item sm={12} md={4}>
            <p color='secondary'>Gaurav garg</p>
            <p><h2>15 Minute meeting</h2></p>
            <p><span className='time-icon'><AccessTimeFilledIcon color='secondary' /></span> 15 min</p>
            <p><span className='calendar-icon'><CalendarTodayIcon color='secondary' /></span> 9:30am - 9:45am, Friday, December 16, 2022</p>
            <p><span className='globe-icon'><PublicIcon color='secondary' /></span> India Standard Time</p>
          </Grid>
          <Grid className="grid-col-right" item sm={12} md={8}>
            <h3> Enter Details</h3>
            <form onSubmit={handleSubmit(onSubmit)}>
              <TextField
                id="outlined-basic"
                name="firstName"
                label="First Name *"
                variant="outlined"
                fullWidth
                {...register("firstName", { required: "First Name is required." })}
                error={Boolean(errors.firstName)}
                helperText={errors.firstName?.message}
              />
              <TextField
                id="outlined-basic"
                label="E-mail *"
                variant="outlined"
                fullWidth
                name="email"
                {...register("email", { required: "E-mail Address is required." })}
                error={Boolean(errors.email)}
                helperText={errors.email?.message}
              />
              <Button className='add-guest-btn' variant="outlined" style={{ borderRadius: 50 }}>Add guests</Button>
              <p>Please share anything that will help prepare for our meeting</p>
              <TextareaAutosize
                aria-label="minimum height"
                minRows={3}
                placeholder="Minimum 3 rows"
                style={{ width: 200 }}
                {...register("description")}
              />
              <div className="clearfix"></div>
              <Button variant="contained" color="primary" className="btns" type="submit" onClick={handleClickOpen}>
                Schedule Event
              </Button>
              <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
              >
                <DialogTitle id="alert-dialog-title">
                  {dialogTitle()}
                </DialogTitle>
                <DialogContent>
                  <DialogContentText id="alert-dialog-description">
                    {/* {getErrorMsg()} */}
                    {dialogMessage()}
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleClose}>Cancel</Button>
                  <Button onClick={handleClose} autoFocus>
                    Ok
                  </Button>
                </DialogActions>
              </Dialog>

            </form>
          </Grid>
        </Grid>
      </div>
    </ThemeProvider>
  )
}
export default App