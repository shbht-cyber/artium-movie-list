import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import MovieListing from './components/MovieListing.jsx';
import SingleMovie from './components/SingleMovie.jsx';

const App = () => {
  return (
    <div className=' bg-black'>
      <div className='p-4 flex justify-between'>
        <h1 className='text-yellow-500 text-2xl font-bold'>Movie List</h1>
        <Link to="/" className='underline text-white'>Home</Link>
      </div>
      <Routes>
        <Route path="/" element={<MovieListing />} />
        <Route path="/movie/:id" element={<SingleMovie />} />
      </Routes>
    </div>
  );
};

export default App;
