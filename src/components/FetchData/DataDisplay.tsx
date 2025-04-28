import React from 'react';
import  useFetch  from '../../hooks/useFetch';

// Example usage
const DataDisplay: React.FC = () => {
  const { data, loading, error } = useFetch('https://api.example.com/data');

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <ul>
      {data.map((item: any) => (
        <li key={item.id}>{item.name}</li>
      ))}
    </ul>
  );
};