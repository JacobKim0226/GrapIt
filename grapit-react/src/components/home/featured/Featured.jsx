import React from 'react';
import Heading from '../../common/Heading';
import './Featured.css';
import FeaturedCard from './FeaturedCard';

const Featured = () => {
  return (
    <>
      <section className="featured background">
        <div className="container">
          <Heading
            title="Grap-It 제공 서비스"
            subtitle="Get the best graph extracurricular service."
          />
          <FeaturedCard />
        </div>
      </section>
    </>
  );
};

export default Featured;
