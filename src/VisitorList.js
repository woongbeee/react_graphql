import React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

function Getvisitors({ data, remove, updateHandle }) {
      /*To show visitot's list on dates, get only date info from DB */
    
    const result = data.getVisitors.map((person) => {
        return person.createAt.substring(0, 10);
    });

  
    const newResult = new Set(result); /*Set object lets you store unique values of any type*/
    const arr = Array.from(newResult); /*To use map method, array-like object newResult turned to Array object.*/
    
    /*Or you can just code like below,
    * newResult.prototype=[]
    *Above code makes newResult(array-like object)'s prototype Array so it can use all Array's prototype methods*/

    return arr.map((obj) => {
        return (
            <Accordion>
                <AccordionSummary aria-controls="panel1a-content" id="panel1a-header">
                    <Typography>{obj}</Typography>
                </AccordionSummary>
                {data.getVisitors.map((person) => {
                    if (person.createAt.substring(0, 10) === obj) {
                        return (
                            <AccordionDetails>
                                <div id={person._id}>
                                    <p className="name">
                                        NAME: {person.firstname} {person.lastname}
                                    </p>
                                    <p className="number">MOBILE: {person.mobile}</p>
                                    <p className="time">
                                        VISITED AT: {person.createAt.substring(16, 24)}
                                    </p>
                                    <Button
                                        variant="outlined"
                                        color="error"
                                        onClick={() => {
                                            remove({
                                                variables: {
                                                    id: person._id,
                                                },
                                            });
                                        }}
                                    >
                                        Remove
                                    </Button>
                                    <Button
                                        variant="outlined"
                                        color="secondary"
                                        id={person._id}
                                        onClick={updateHandle}
                                    >
                                        Modify
                                    </Button>
                                </div>
                            </AccordionDetails>
                        );
                    }
                })}
            </Accordion>
        );
    });
}

export default function VisitorList({
    data,
    onChange,
    update,
    remove,
    updateHandle,
}) {
    return (
        <div className="visitorList">
            <h2>Visitor's list</h2>
            <Getvisitors
                data={data}
                onChange={onChange}
                update={update}
                remove={remove}
                updateHandle={updateHandle}
            />
        </div>
    );
}
