import React, { useState, useEffect, forwardRef }  from "react";
import { Grid, Row, Col } from "react-bootstrap";
import { useHistory  } from "react-router-dom";
import { Link } from "react-router-dom";

import { Delete, Edit } from '@material-ui/icons'

import api from '../../services/api';

import Table from "~/components/Table";

export default function(props) {
  const [isLoading, setIsLoading] = useState(false);

  const history = useHistory();

  useEffect(() => {
    // async function loadData() {
    //   try {
    //     const response = await api.get(`/users/datatable`);
    //     response.data.rows = response.data.data.map((row => ({...row, clickEvent: () => gotoEdit(row.id)})));
    //     delete response.data.data;
    //     setTable({...table, ...response.data});
    //   } catch(error) {
    //     props.notification({
    //       message: 'Erro ao carregar usuários',
    //       level: 'error',
    //       position: 'tr',
    //     });
    //   }
    // }

    // loadData();
  }, []);

  const remove = async (id) => {
    try {
      if (!window.confirm('Deseja mesmo excluir?')) return;
      await api.delete(`/users/${id}`);
      props.notification({
        message: 'Usuário excluido com sucesso',
        level: 'success',
        position: 'tr',
      });
      history.push('/admin/users');
    } catch (error) {
      props.notification({
        message: 'Erro ao excluir usuário',
        level: 'error',
        position: 'tr',
      });
    }
  }

  const tableColumns = [
    {
      title: 'Avatar',
      field: 'avatar',
      render: rowData => (
        <img
          style={{ height: 36, borderRadius: '50%' }}
          src={rowData.avatar}
        />
      ),
      sorting: false,
    },
    { title: 'Id', field: 'id' },
    { title: 'First Name', field: 'first_name' },
    { title: 'Last Name', field: 'last_name' },
  ].map(row => ({...row, disableClick: true, cellStyle: {fontSize: '14px'}}));

  const tableActions = [
    {
      icon: forwardRef((props, ref) => <Edit {...props} ref={ref} style={{ fontSize: 20, color: '#337ab7' }} />),
      tooltip: 'Editar',
      onClick: (_, rowData) => history.push(`/admin/users/${rowData.id}`)
    },
    {
      icon: forwardRef((props, ref) => <Delete {...props} ref={ref} style={{ fontSize: 20, color: '#ff4a55' }} />),
      tooltip: 'Excluir',
      onClick: (_, rowData) => remove(rowData.id)
    }
  ];

  const tableData = query => {
    return new Promise((resolve, reject) => {
        let url = 'https://reqres.in/api/users?';
        url += 'per_page=' + query.pageSize;
        url += '&page=' + (query.page + 1);
        setIsLoading(true);
        fetch(url)
            .then(response => response.json())
            .then(result => {
                resolve({
                    data: result.data,
                    page: result.page - 1,
                    totalCount: result.total,
                });
                setIsLoading(false);
            })
            .catch(error => {
                reject(error)
                setIsLoading(false);
            });
    });
  }

  return (
    <div className="content">
      <Grid fluid>
        <Row>
          <Col md={12} style={{marginBottom: '10px'}}>
            <Link className="btn-fill pull-right btn btn-primary" to="/admin/users/cad">Adicionar</Link>
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            <Table
              title=""
              columns={tableColumns}
              actions={tableActions}
              data={tableData}
              isLoading={isLoading}
            />
          </Col>
        </Row>
      </Grid>
    </div>
  );

}
