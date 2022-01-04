import React, { useEffect } from 'react';
import BaristaFooter from '../footers/barista';
import { Container } from 'react-bootstrap';
import { useHistory } from 'react-router';
import './style.scss';

const BaristaLayout = (props: any) => {
  const { component } = props;
  const history = useHistory();
  const isAuthenticated = localStorage.getItem('token') ? true : false;
  
  useEffect(() => {
    if (isAuthenticated) {
      setTimeout(() => {
        history.push('/redeem');
      }, 200)
    }
  }, [])
  
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

export default BaristaLayout;
