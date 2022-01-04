import React from 'react';
import { connect } from 'react-redux';
import { Pagination } from 'react-bootstrap';
import { redeemAction } from '../../../actions/main';
import { PAGE_SIZE } from '../../../commons/config';
import '../style.scss';

const mapStateToProps = (state: any) => ({
  totalPage: state.redeem.totalPage,
  page: state.redeem.page,
  search: state.redeem.search,
});

const mapDispatchToProps = (dispatch: any) => ({
  gotoPage: (params: any) => dispatch({ type: redeemAction.SAGA_GET_REDEEMS, value: params })
});

const PaginationComponent = (props: any) => {
  const { page, search, totalPage, gotoPage } = props;
  const changePageHandler = (e: any) => {
    gotoPage({ page: e.target.getAttribute('value'), size: PAGE_SIZE, search: search });
  };
  
  return (
    <Pagination className="pagination-style">
      {
        [...Array(totalPage)].map((x, i) => (
          <Pagination.Item key={i} value={i + 1} active={ page == i + 1 ? true : false} onClick={changePageHandler}>
            {' '}
            {i + 1}
            {' '}
          </Pagination.Item>
        ))
      }
    </Pagination>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(PaginationComponent);
