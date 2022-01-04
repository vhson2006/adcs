import React, { useEffect } from 'react';
import BaristaFooter from '../footers/barista';
import { Container } from 'react-bootstrap';
import { useHistory } from 'react-router';
import './style.scss';

const BaristaInsideLayout = (props: any) => {
  const { component } = props;
  const history = useHistory();
  
  useEffect(() => {
    const isAuthenticated = localStorage.getItem('token') ? true : false;
    if (isAuthenticated === false ) {
      setTimeout(() => {
        history.push('/');
      }, 200);
    }
  }, []);
  
  return (
    <Container>
      <div className="main-div">
        {component}
      </div>
      <section className="barista-section">
        <BaristaFooter />
      </section>
    </Container>
  )
}

export default BaristaInsideLayout;
