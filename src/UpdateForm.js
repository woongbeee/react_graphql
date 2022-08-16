import React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import TextField from '@mui/material/TextField';

export default function UpdateForm({ state, updateClose, onChange, update }) {
    const { firstname, lastname, mobile, updateVisitor, updateOpen } = state;

    return (
        <Dialog open={updateOpen} onClose={updateClose}>
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
                <Button onClick={updateClose}>Cancel</Button>
                <Button
                    onClick={() => {
                        update({
                            variables: {
                                id: updateVisitor,
                                firstname: firstname,
                                lastname: lastname,
                                mobile: mobile,
                            },
                        });

                        updateClose();
                    }}
                >
                    Modify
                </Button>
            </DialogActions>
        </Dialog>
    );
}
