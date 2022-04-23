import * as React from 'react';
import './PasswordStrengthMeter.css';

export default function PasswordStrengthMeter(props) {
  const { password, meter } = props;

  const indicator = (pass, data) => {
    if (pass.length > 0 && data === 0) {
      return 'progress-weak';
    }

    if (pass.length > 0 && data === 1) {
      return 'progress-weak';
    }

    if (pass.length > 0 && data === 2) {
      return 'progress-fair';
    }

    if (pass.length > 0 && data === 3) {
      return 'progress-good';
    }

    if(pass.length > 0 && data === 4) {
      return 'progress-strong';
    }

    return 'progress-default';
  };

  return (
    <div className="password-strength-meter">
      { meter >= 0 ?
        <div className={`progress ${indicator(password, meter)}`}></div>
        :
        <div className="progress progress-default"></div>
      }
      { meter >= 1 ?
        <div className={`progress ${indicator(password, meter)}`}></div>
        :
        <div className="progress progress-default"></div>
      }
      { meter >= 2 ?
        <div className={`progress ${indicator(password, meter)}`}></div>
        :
        <div className="progress progress-default"></div>
      }
      { meter >= 3 ?
        <div className={`progress ${indicator(password, meter)}`}></div>
        :
        <div className="progress progress-default"></div>
      }
      { meter >= 4 ?
        <div className={`progress ${indicator(password, meter)}`}></div>
        :
        <div className="progress progress-default"></div>
      }
    </div>
  );
}