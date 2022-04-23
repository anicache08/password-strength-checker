import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Typography from '@mui/material/Typography';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import './App.css';

import PasswordStrengthMeter from "./components/PasswordStrengthMeter";
import { getPasswordStatus } from "./utils/api";

function App() {

  const [values, setValues] = React.useState({
    password: '',
    showPassword: false
  });

  const [meter, setMeter] = React.useState(0);
  const [status, setStatus] = React.useState({
    score: 'very weak',
    guessTimeString: 'less than a second',
    warning: '',
    suggestions: []
  });

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value ? event.target.value : '' });
    if(event.target.value.length === 0) {
      setMeter(0);
    }

    getPasswordStatus({
      password: event.target.value ? event.target.value : ''
    })
      .then((response) => {
        if(response.data) {
          console.log(response.data);
          setMeter(response.data.score);

          if(response.data.score === 0) {
            setStatus({...status,
              score: 'very weak',
              guessTimeString: response.data.guessTimeString ? response.data.guessTimeString : '',
              warning: response.data.warning ? response.data.warning : '',
              suggestions: response.data.suggestions ? response.data.suggestions : []
            });
          }
          else if(response.data.score === 1) {
            setStatus({...status,
              score: 'weak',
              guessTimeString: response.data.guessTimeString ? response.data.guessTimeString : '',
              warning: response.data.warning ? response.data.warning : '',
              suggestions: response.data.suggestions ? response.data.suggestions : []
            });
          }
          else if(response.data.score === 2) {
            setStatus({...status,
              score: 'medium',
              guessTimeString: response.data.guessTimeString ? response.data.guessTimeString : '',
              warning: response.data.warning ? response.data.warning : '',
              suggestions: response.data.suggestions ? response.data.suggestions : []
            });
          }
          else if(response.data.score === 3) {
            setStatus({...status,
              score: 'strong',
              guessTimeString: response.data.guessTimeString ? response.data.guessTimeString : '',
              warning: response.data.warning ? response.data.warning : '',
              suggestions: response.data.suggestions ? response.data.suggestions : []
            });
          }
          else {
            setStatus({...status,
              score: 'very strong',
              guessTimeString: response.data.guessTimeString ? response.data.guessTimeString : '',
              warning: response.data.warning ? response.data.warning : '',
              suggestions: response.data.suggestions ? response.data.suggestions : []
            });
          }
        }
      }, (error) => {
        console.log(error);
      });
  };

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <div className="App">
      <header className="App-header">
        <Typography variant="h3" component="div" gutterBottom>
          Is your password strong enough?
        </Typography>
        <div className="password-section">
          <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
            <InputLabel htmlFor="outlined-adornment-password">Type a password</InputLabel>
            <OutlinedInput
              id="outlined-adornment-password"
              type={values.showPassword ? 'text' : 'password'}
              value={values.password}
              onChange={handleChange('password')}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {values.showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label="Type a password"
            />
          </FormControl>
          <PasswordStrengthMeter password={values.password} meter={meter} />
          { values.password.length > 0 &&
            <Typography variant="h6" component="div" gutterBottom>
              Your password is {status.score}
            </Typography>
          }
          { values.password.length > 0 && status.guessTimeString.length > 0 &&
            <Typography variant="body2" gutterBottom>
              It will take {status.guessTimeString} to guess your password. {status.warning}
            </Typography>
          }

          { values.password.length > 0 &&
            status.suggestions.map((data, idx) => (
              <Typography key={idx} variant="subtitle2" gutterBottom component="div">
                {data}
              </Typography>
            ))
          }
        </div>
      </header>
    </div>
  );
}

export default App;
