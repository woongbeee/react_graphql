import React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

function Getvisitors({ data, remove, updateHandle }) {
    const result = data.getVisitors.map((person) => {
        return person.createAt.substring(0, 10);
    });

    const newResult = new Set(result);
    const arr = Array.from(newResult);

    return arr.map((obj) => {
        return (
            <Accordion key={obj}>
                <AccordionSummary aria-controls="panel1a-content" id="panel1a-header">
                    <Typography>{obj}</Typography>
                </AccordionSummary>
                {data.getVisitors.map((person) => {
                    if (person.createAt.substring(0, 10) === obj) {
                        return (
                            <AccordionDetails key={person._id}>
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
                                      onClick={async () => {
                                          try {
                                            await remove({
                                              variables: {
                                                id: person._id,
                                              },
                                            });
                                          } catch {
                                            return 'Error!';
                                          }
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

export default function VisitorList({ data, remove, updateHandle }) {
    return (
        <div className="visitorList">
            <h2>Visitor's list</h2>
            <Getvisitors data={data} remove={remove} updateHandle={updateHandle} />
        </div>
    );
}
