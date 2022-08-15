import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

function Modifyvisitor({ target, state, onChange, update }) {
    const { firstname, lastname, mobile, updateOpen } = state;

    return (
        <Dialog open={updateOpen} onClose={handleClose}>
            <DialogContent>
                <TextField
                    autoFocus
                    margin="dense"
                    name="firstname"
                    label="First name"
                    variant="standard"
                    value={firstname}
                    onChange={onChange}
                />
                <TextField
                    margin="dense"
                    name="lastname"
                    label="Last name"
                    variant="standard"
                    value={lastname}
                    onChange={onChange}
                />
                <TextField
                    margin="dense"
                    name="mobile"
                    label="Mobile"
                    variant="standard"
                    value={mobile}
                    onChange={onChange}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button
                    onClick={() => {
                        update({
                            variables: {
                                id: target,
                                firstname: firstname,
                                lastname: lastname,
                                mobile: mobile,
                            },
                        });
                        handleClose();
                    }}
                >
                    Modify
                </Button>
            </DialogActions>
        </Dialog>
    );
}
