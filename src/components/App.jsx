import React, { useEffect, useState } from 'react';
import { gql, useMutation } from '@apollo/client';
import QueryInput from './QueryInput';
import Detail from './Detail';
import NavBar from './Navbar';
import Schema from './Schema';
import GraphData from './GraphData';


import '../assets/css/App.scss';

const GET_PEOPLE = gql`
  query {
    species(id: "5d963c76273db10a425ce9ac") {
      name
      people {
        id
        name
        species {
            name
            homeworld {
                name
            }
        }
      }
    }
  }
`;

const CREATE_PERSON = gql`
  mutation {
    createPerson(name: "Chon", hairColor: "green", eyeColor:"blue") {
      name
      hairColor
      eyeColor
      id
    }
  }
`;

function App() {
  const [query, setQuery] = useState('');

  return (
    <div>
      <div className="main">
        <Schema />
        <QueryInput 
          setQuery={setQuery}
        />
        <GraphData />
        <p>GraphQL performance details</p>
        {
          // query ? <Detail query={gql`${query}`} /> 
          //   : mutation ? <Mutation mutation={gql`${mutation}`} /> 
          //     : <p>No results to display...</p> 
          query ? <Detail query={query} /> : <p>No results to display</p>
        }
      </div>
    </div>
  );
}

export default App;
