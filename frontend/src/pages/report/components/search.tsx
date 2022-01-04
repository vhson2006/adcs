import React, { useRef } from 'react';
import { Form, Row, Col, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { PAGE_SIZE, FIRST_PAGE } from '../../../commons/config';
import { redeemAction } from '../../../actions/main';
import { config } from '../../../commons/config';

const mapStateToProps = (state: any) => ({
  search: state.redeem.search,
});
const mapDispatchToProps = (dispatch: any) => ({
  searchRedeem: (params: any) => dispatch({ type: redeemAction.SAGA_GET_REDEEMS, value: params }),
});
const SearchComponent = (props: any) => {
  const { search, searchRedeem } = props;
  const newSearch = useRef(search);
  const searchHandler = () => {
    searchRedeem({ page: FIRST_PAGE, size: PAGE_SIZE, search: newSearch.current.value });
  }
  const downloadHandler = async () => {
    let anchor = document.createElement("a");
    document.body.appendChild(anchor);
    let file = `${config.API_URL}/api/redeem/download`;
    const token = localStorage.getItem('token');
    let headers = new Headers();
    headers.append('Authorization', `Bearer ${token}`);
    fetch(file, { headers })
      .then(response => response.blob())
      .then(blobby => {
        let objectUrl = window.URL.createObjectURL(blobby);
        anchor.href = objectUrl;
        anchor.download = 'report.csv';
        anchor.click();
        window.URL.revokeObjectURL(objectUrl);
      });
  }

  return (
    <Form.Group as={Row}>
      <Col sm={{ span: 6, offset: 2 }}>
        <FormattedMessage id="searchPlaceholder">
          {(msg) => <Form.Control ref={newSearch} placeholder={msg.toString()} defaultValue={search} />}
        </FormattedMessage>
      </Col>
      <Col sm={4}>
        <Button type="button" className="text-white" onClick={searchHandler}><FormattedMessage id="searchButton"/></Button>
        <Button type="button" className="text-white ms-3" onClick={downloadHandler}>Download</Button>
        <a href="/redeem" role="button" className="text-white btn btn-primary ms-3">Back</a>
      </Col>
    </Form.Group>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchComponent);
