import React from 'react';
import useContactUsForm from './CustomHooks';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Amplify from 'aws-amplify';
import aws_exports from './aws-exports';
import { withAuthenticator } from 'aws-amplify-react';
import '@aws-amplify/ui/dist/style.css';

Amplify.configure(aws_exports);

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const ContactUs = () => {
    const contactus = () => {
        /*alert(`User Created!
               Name: ${inputs.name} 
               Email: ${inputs.email}
               Message: ${inputs.message}`);*/
        
        //alert(`Thank you ${inputs.name} for submitting the form`);

        
        const toEmail = inputs.email;
        const subject = inputs.name;
        const body = inputs.message;
        //Send Email
        fetch('https://8qkaf7yn29.execute-api.us-east-1.amazonaws.com/prod/submit', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ toEmail, subject, body })
        })

        const emailid = inputs.email;
        const name = inputs.name;
        const message = inputs.message;
        //Save Data
        fetch('https://8qkaf7yn29.execute-api.us-east-1.amazonaws.com/prod/store', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ emailid, name, message })
        })

        window.$('#myModal').modal('show');
      }
    const {inputs, handleInputChange, handleSubmit} = useContactUsForm(contactus);
    const classes = useStyles();
    return (
      <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
      <Typography component="h1" variant="h5">
              Contact Form
            </Typography>
        <form onSubmit={handleSubmit} id="contact-form">
            <TextField
              variant="outlined"
              margin="normal"
              required 
              id="name"
              fullWidth
              label="Full Name"
              name="name"
              autoFocus
              inputProps={{ minLength: 2, maxLength: 30}} 
              onChange={handleInputChange} value={inputs.name} 
             />

            <TextField
              variant="outlined"
              margin="normal"
              required
              type="email"
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoFocus
              onChange={handleInputChange} value={inputs.email}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="message"
              label="Message"
              name="message"
              autoFocus
              multiline
              rows={4}
              placeholder="Enter your message here"
              onChange={handleInputChange} value={inputs.message}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary">
              Submit
            </Button>
        </form>
        </div>
        </Container>
      )
}
export default withAuthenticator(ContactUs, true);