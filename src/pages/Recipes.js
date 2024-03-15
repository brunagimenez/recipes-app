import React from 'react';
import { useParams } from 'react-router-dom';
import Meals from '../components/Meals';
import Drinks from '../components/Drinks';

export default function Recipes() {
  const { type } = useParams();

  return (
    <div>
      {type === 'meals' ? <Meals /> : <Drinks />}
    </div>
  );
}
