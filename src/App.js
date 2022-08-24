import React, { useState, useCallback } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import VisitorForm from './VisitorForm';
import VisitorList from './VisitorList';
import UpdateForm from './UpdateForm';

const today = new Date();

const ADD_VISITOR = gql`
mutation Mutation($firstname: String!, $lastname: String!, $mobile: String!,$createAt:String!) {
  addVisitor(firstname: $firstname, lastname: $lastname, mobile: $mobile,createAt:$createAt) {
    _id
  }
}
`;

const GET_VISITORS = gql`
query Query {
  getVisitors {
    _id
    firstname
    lastname
    mobile
    createAt 
  }  
}
`;

const UPDATE_VISITOR = gql`
mutation Mutation($id: ID, $firstname: String!, $lastname: String!, $mobile: String!) {
  updateVisitor(_id: $id, firstname: $firstname, lastname: $lastname, mobile: $mobile) {
    _id
  }
}
`;

const DELETE_VISITOR = gql`
mutation DeleteVisitor($id: ID) {
  deleteVisitor(_id: $id) {
    _id
  }
}
`;

export default function App() {
    const [state, setState] = useState({
        updateOpen: false,
        updateVisitor: '',
    });

    const { updateOpen, updateVisitor } = state;

    const updateHandle = useCallback((e) => {
        setState({
            ...state,
            updateOpen: true,
            updateVisitor: e.target.id,
        });
    }, []);

    const updateClose = useCallback(() => {
        setState({
            ...state,
            updateOpen: false,
            updateVisitor: '',
        });
    }, []);

    const [add] = useMutation(ADD_VISITOR, {
        refetchQueries: [{ query: GET_VISITORS }],
    });

    const [update] = useMutation(UPDATE_VISITOR, {
        refetchQueries: [{ query: GET_VISITORS }],
    });

    const [remove] = useMutation(DELETE_VISITOR, {
        refetchQueries: [{ query: GET_VISITORS }],
    });

    const { loading, data } = useQuery(GET_VISITORS);
    if (loading) return 'Loading...';

    const total = data.getVisitors.filter((person) => {
        const a = person.createAt.substring(0, 10);
        const b = today.toDateString().substring(0, 10);
        return a == b;
    });

    return (
        <>
            <h1>Visitors log</h1>
            <span role="img">&#9997;</span>
            <h3>
                {today.toDateString()}, Today {total.length} visited
            </h3>
            <div className="main">
                <VisitorForm add={add} />
                <VisitorList data={data} remove={remove} updateHandle={updateHandle} />
                {updateOpen ? (
                    <UpdateForm
                        update={update}
                        updateOpen={updateOpen}
                        updateVisitor={updateVisitor}
                        updateClose={updateClose}
                    />
                ) : null}
            </div>
        </>
    );
}
