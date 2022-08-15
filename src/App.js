import React, { useReducer} from 'react';
import { useQuery, useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import VisitorForm from './VisitorForm';
import VisitorList from './VisitorList';
import UpdateForm from './UpdateForm';

const today = new Date();

const initialState = {
    firstname: '',
    lastname: '',
    mobile: '',
    open: false,
    vertical: 'top',
    horizontal: 'left',
    updateVisitor: '',
    updateOpen: false,
};

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

function reducer(state, action) {
    switch (action.type) {
        case 'ONCHANGE':
            return {
                ...state,
                [action.name]: action.value,
            };

        case 'HANDLECLOSE':
            return { ...state, open: false };

        case 'UPDATEHANDLE':
            return { ...state, updateOpen: true, updateVisitor: action.id };

        case 'UPDATECLOSE':
            return { ...state, updateOpen: false };

        case 'ADDCOMPLETE':
            return { ...state, firstname: '', lastname: '', mobile: '', open: true };

        case 'UPDATECOMPLETE':
            return {
                ...state,
                firstname: '',
                lastname: '',
                mobile: '',
                updateVisitor: '',
                updateOpen: false,
            };
    }
}

export default function App() {
    const [state, dispatch] = useReducer(reducer, initialState);
    const { firstname, lastname, mobile, updateOpen } = state;

    const onChange = (e) => {
        const { name, value } = e.target;
        dispatch({ type: 'ONCHANGE', name, value });
    };

    const handleClose = () => {
        dispatch({ type: 'HANDLECLOSE' });
    };

    const updateHandle = (e) => {
        const { id } = e.target;
        dispatch({ type: 'UPDATEHANDLE', id });
    };

    const updateClose = (e) => {
        dispatch({ type: 'UPDATECLOSE' });
    };

    const [add] = useMutation(ADD_VISITOR, {
        variables: {
            firstname: firstname,
            lastname: lastname,
            mobile: mobile,
            createAt: `${new Date()}`,
        },
        refetchQueries: [{ query: GET_VISITORS }],
        onCompleted: () => dispatch({ type: 'ADDCOMPLETE' }),
    });

    const { loading, data } = useQuery(GET_VISITORS);

    const [update] = useMutation(UPDATE_VISITOR, {
        refetchQueries: [{ query: GET_VISITORS }],
        onCompleted: () => {
            dispatch({ type: 'UPDATECOMPLETE' });
        },
    });

    const [remove] = useMutation(DELETE_VISITOR, {
        refetchQueries: [{ query: GET_VISITORS }],
    });

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
                <VisitorForm
                    state={state}
                    add={add}
                    onChange={onChange}
                    handleClose={handleClose}
                />
                <VisitorList
                    state={state}
                    data={data}
                    onChange={onChange}
                    updateHandle={updateHandle}
                    remove={remove}
                />
                {updateOpen ? (
                    <UpdateForm
                        state={state}
                        updateHandle={updateHandle}
                        updateClose={updateClose}
                        onChange={onChange}
                        update={update}
                    />
                ) : null}
            </div>
        </>
    );
}
