import React, { useState, useEffect }  from "react";
import { Grid, Row, Col } from "react-bootstrap";
import { useHistory  } from "react-router-dom";
import { Link } from "react-router-dom";

import api from '../../services/api';

import Card from "components/Card/Card";

import { MDBDataTable } from 'mdbreact';

const initial = {
  columns: [
    {
      label: 'Nome',
      field: 'name',
      sort: 'asc',
      searchable: true,
      width: 300
    },
    {
      label: 'E-mail',
      field: 'email',
      sort: 'asc',
      searchable: true,
      width: 300
    }
  ],
  rows: []
};

export default function(props) {
  const [table, setTable] = useState(initial);

  const history = useHistory();

  useEffect(() => {
    async function loadData() {
      try {
        const response = await api.get(`/users/datatable`);
        response.data.rows = response.data.data.map((row => ({...row, clickEvent: () => gotoEdit(row.id)})));
        delete response.data.data;
        setTable({...table, ...response.data});
      } catch(error) {
        props.notification({
          message: 'Erro ao carregar usuários',
          level: 'error',
          position: 'tr',
        });
      }
    }

    loadData();
  }, []);

  const gotoEdit = (id) => {
    history.push(`/admin/users/${id}`);
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
            <Card ctTableFullWidth ctTableResponsive content={
                <MDBDataTable striped bordered hover data={table} />
              }
            />
          </Col>
        </Row>
      </Grid>
    </div>
  );

}
