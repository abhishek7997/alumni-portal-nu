import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import FileUpload from 'react-material-file-upload';
import { ForkLeft } from '@mui/icons-material';
import ReactPhoneInput from 'react-phone-input-material-ui';
import { TextField, withStyles } from '@material-ui/core';
import PasswordField from 'material-ui-password-field';
import { useState } from 'react';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import './Register.scss';
import Stack from '@mui/material/Stack';
const styles = theme => ({
    field: {
      margin: '10px 0',
    },
    countryList: {
      ...theme.typography.body1,
    },
  });
const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '100ch',
      height: '100%',
    },
  },
}));

function Register(props) {
    const { value, defaultCountry, onChange } = props;
  
    const classes = useStyles();
    

  return (
    <div id="centerDiv">
    <h1 id='h1'>Register</h1>
        <form id="survey-form" className={classes.root} noValidate autoComplete="off">
        <Stack direction="column" alignItems="center" spacing={2} className={classes.root} >
      <TextField id="outlined-basic" label="First Name" variant="outlined" />
      <TextField id="outlined-basic" label="Last Name" variant="outlined" />
      <TextField id="outlined-basic" label="Email" variant="outlined" />
      
      <React.Fragment>
      
      <ReactPhoneInput
      
        value={value}
        onChange={onChange} // passed function receives the phone value
        component={TextField}
      />
      </React.Fragment>
      <br></br>
      <div id='password'>
      <p>Password</p><span></span><PasswordField id='password1'
  hintText="At least 8 characters"
  floatingLabelText="Enter your password"
  errorText="Your password is too short"
/>
      </div>
      
<div id='password'>
    <p>Confirm Password</p><span></span><PasswordField id='password1'

hintText="At least 8 characters"
floatingLabelText="Enter your password"
errorText="Your password is too short"
label='Password'
/>
</div>

<TextField
          id="standard-multiline-static"
          label="User Bio"
          multiline
          rows={4}
          defaultValue=""
          variant="standard"
        />
<TextField id="outlined-basic" label="Batch" variant="outlined" />
<TextField id="outlined-basic" label="Company" variant="outlined" />
<TextField id="outlined-basic" label="Location" variant="outlined" />
<TextField id="outlined-basic" label="Job Role" variant="outlined" />
<Button variant="contained" component="label">
        Resume Upload
        <input hidden accept="image/*" multiple type="file" />
      </Button>
      Profile Picture:<IconButton color="primary" aria-label="upload picture" component="label">
        <input hidden accept="image/*" type="file" />
        <PhotoCamera />
      </IconButton>
      </Stack>
      
    </form>
    </div>
    
  );
      
  }
  
  export default withStyles(styles)(Register);