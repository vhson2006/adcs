import React from 'react';
import { Container } from 'react-bootstrap';
import MainFooter from '../footers/main';
import './style.scss';

const MainLayout = (props: any) => {
  const { component } = props;
  
  return (
    <Container>
      <div className="main-div">
        <section className="main-section my-5">
          {component}
        </section>
      </div>
      <section className="main-section">
        <MainFooter />
      </section>
    </Container>
  )
}

export default MainLayout;
