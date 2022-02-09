import React, { useState, useEffect } from 'react';
import { useMutation } from '@apollo/client';
import { gql, useQuery } from '@apollo/client';
import Dropdown from './Dropdown';


function MutationHook({query, setMetrics, setGlobalMetrics}){
  const  [ mutationFunc , { data, loading , error }] = useMutation(gql`${query}`, {
    onCompleted: data => {
      setMetrics(data.extensions.performanceData);
      setGlobalMetrics(data.extensions.performanceData);
    },
    fetchPolicy: 'no-cache'
  });
    
  useEffect(() => {
    mutationFunc();
  }, []);
  return null;
}

function QueryHook({query, setMetrics, setGlobalMetrics}){
  const { loading, error, data } = useQuery(gql`${query}`, {
    onCompleted: (data) => {
      setMetrics(data.extensions.performanceData);
      setGlobalMetrics(data.extensions.performanceData);
    },
    fetchPolicy: 'no-cache'
  });
  return null;
}

function Detail({ query, setGlobalMetrics }) {
  const [ metrics, setMetrics] = useState({});
  let isQuery, isMutation;
  
  if (query.trim().substring(0,8) === 'mutation') isMutation = true;
  else if (query.trim().substring(0,5) === 'query') isQuery = true;

  return (
    <div className="detail-container">
      {isQuery ? <QueryHook query={query} setMetrics={setMetrics} setGlobalMetrics={setGlobalMetrics}/> : 
        isMutation ? <MutationHook query={query} setMetrics={setMetrics} setGlobalMetrics={setGlobalMetrics}/> :
          <p>nothing</p>}
      <div className="query-time">Query Response Time: {metrics.queryTime}</div>
      <div className="resolver-breakdown">Resolver Breakdown:</div>
      <Dropdown obj={metrics} indent={1} />
    </div>
  );
}

export default Detail;