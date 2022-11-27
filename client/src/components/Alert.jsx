import * as React from 'react';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';

export default function BasicAlerts({
    severity, message, show
}) {
    // console.log(show);
    return (
        show ? (
            <Alert severity={severity}>{message}</Alert>) : null
    );
}