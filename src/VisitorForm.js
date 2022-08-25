import React, { useState, useCallback } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';

const VisitorForm = ({ add }) => {
    const [text, setText] = useState({
        firstname: '',
        lastname: '',
        mobile: '',
        open: false,
    });

    const { firstname, lastname, mobile, open } = text;

    const onChange = (e) => {
        const { name, value } = e.target;
        setText({
            ...text,
            [name]: value,
        });
    };

    const handleClose = () => {
        setText({
            ...text,
            open: false,
        });
    };

    return (
        <div className="visitorForm">
            <TextField
                id="standard-basic"
                label="First name"
                variant="standard"
                name="firstname"
                value={firstname}
                onChange={onChange}
            />
            <TextField
                id="standard-basic"
                label="Last name"
                variant="standard"
                name="lastname"
                value={lastname}
                onChange={onChange}
            />
            <TextField
                id="standard-basic"
                label="Mobile"
                variant="standard"
                name="mobile"
                value={mobile}
                onChange={onChange}
            />
            <br />
            {firstname === '' || lastname === '' || mobile === '' ? (
                <p>*When all fields are filled, submit button comes up.</p>
            ) : (
                <Button
                    variant="outlined"
                    sx={{ margin: '10' }}
                    onClick={async () => {
                        try {
                          await add({
                            variables: {
                              firstname: firstname,
                              lastname: lastname,
                              mobile: mobile,
                              createAt: `${new Date()}`,
                            },
                          });
                        } catch {
                          return 'Error!';
                        }
                       setText({
                            firstname: '',
                            lastname: '',
                            mobile: '',
                            open: true,
                        });
                    }}
                >
                    Submit
                </Button>
            )}
            {open ? (
                <Snackbar
                    anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
                    open={open}
                    onClose={handleClose}
                    message="Submitted!"
                    key="topLeft"
                />
            ) : null}
        </div>
    );
};

export default VisitorForm;
