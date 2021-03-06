import React from 'react';
import Content from './Content';
import MosaicGenerator from './MosaicGenerator/MosaicGenerator';

const Body = () => {
  return (
    <div className="flex-col w-4/5">
      <Content />
      <MosaicGenerator />
    </div>
  );
};

export default Body;
