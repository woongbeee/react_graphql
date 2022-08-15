import React from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';

const VisitorForm = ({ state, add, onChange, handleClose }) => {
    const { firstname, lastname, mobile, open, vertical, horizontal } = state;

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
                    onClick={() => {
                        add({
                            variables: {
                                firstname: firstname,
                                lastname: lastname,
                                mobile: mobile,
                            },
                        });
                    }}
                >
                    Submit
                </Button>
            )}
            {open ? (
                <Snackbar
                    anchorOrigin={{ vertical, horizontal }}
                    open={open}
                    onClose={handleClose}
                    message="Submitted!"
                    key={vertical + horizontal}
                />
            ) : null}
        </div>
    );
};

export default VisitorForm;
