import React, { useEffect } from 'react';
import { Container, Card } from 'react-bootstrap';
import EditRedeemComponent from './components/edit-redeem';
import PaginationComponent from './components/pagination';
import SearchComponent from './components/search';
import RedeemsComponent from './components/redeems';
import { useHistory } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';

const ReportPage = () => {
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
      <Card className="my-5">
        <Card.Header className="text-center">
          <FormattedMessage id="reportTitle"/>
        </Card.Header>
        <Card.Body>
          <SearchComponent/>
          <RedeemsComponent/>
          <PaginationComponent/>
        </Card.Body>
      </Card>
      <EditRedeemComponent/>
    </Container>
  );
};

export default ReportPage;
