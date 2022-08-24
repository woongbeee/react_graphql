import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import TextField from '@mui/material/TextField';

export default function UpdateForm({
    update,
    updateOpen,
    updateVisitor,
    updateClose,
}) {
    const [text, setText] = useState({
        firstname: '',
        lastname: '',
        mobile: '',
        update_open: updateOpen,
        update_visitor: updateVisitor,
    });

    const { firstname, lastname, mobile, update_open, update_visitor } = text;

    const onChange = (e) => {
        const { name, value } = e.target;
        setText({
            ...text,
            [name]: value,
        });
    };

    return (
        <Dialog open={update_open} onClose={updateClose}>
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
                    onClick={async () => {
                        await update({
                            variables: {
                                id: update_visitor,
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
