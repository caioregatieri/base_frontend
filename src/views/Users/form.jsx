import React, { useState, useEffect } from "react";
import { Grid, Row, Col } from "react-bootstrap";
import { useParams, useHistory  } from "react-router-dom";

import api            from '~/services/api';

import { Card }       from "~/components/Card/Card";
import { FormInputs } from "~/components/FormInputs/FormInputs";
import Button         from "~/components/CustomButton/CustomButton";

export default function(props) {
  const [form, setForm] = useState({
    id: '',
    name: '',
    email: '',
    password: '',
    confirm: ''
  });
  
  const { id } = useParams();
  const history = useHistory();

  useEffect(() => {
    async function loadForm(id) {
      const response = await api.get(`/users/${id}`);
      setForm({...form, ...response.data});
    }

    if (id) loadForm(id);
  }, []);


  const handleForm = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  }

  const onSubmit = async (e) => {
    try {
      e.preventDefault();

      if (form.password !== form.confirm)
      {
        props.notification({
          message: 'As senhas devem ser iguais',
          level: 'warning',
          position: 'tr',
        });
        return;
      }

      const method = !id ? 'post' : 'put';
      const url = !id ? `/users` : `/users/${id}`;
      await api[method](url, form);
      props.notification({
        message: 'Usuário salvo com sucesso',
        level: 'success',
        position: 'tr',
      });
      history.push('/admin/users');
    } catch (error) {
      props.notification({
        message: 'Erro ao criar usuário',
        level: 'error',
        position: 'tr',
      });
    }
  }

  const remove = async () => {
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

  return (
    <div className="content">
      <Grid fluid>
        <Row>
          <Col md={12}>
            <Card
              title="Informações"
              content={
                <form onSubmit={onSubmit}>
                  <FormInputs
                    ncols={["col-md-2", "col-md-5", "col-md-5"]}
                    properties={[
                      {
                        name: "id",
                        label: "ID",
                        type: "text",
                        bsClass: "form-control",
                        placeholder: "",
                        disabled: true,
                        value: form.id
                      },
                      {
                        name: "name",
                        label: "Nome",
                        type: "text",
                        bsClass: "form-control",
                        required: true,
                        placeholder: "Nome",
                        onChange: handleForm,
                        value: form.name
                      },
                      {
                        name: "email",
                        label: "E-mail",
                        type: "email",
                        bsClass: "form-control",
                        required: true,
                        placeholder: "E-mail",
                        onChange: handleForm,
                        value: form.email
                      }
                    ]}
                  />
                  <FormInputs
                    ncols={["col-md-6", "col-md-6"]}
                    properties={[
                      {
                        name: "password",
                        label: "Senha",
                        type: "password",
                        bsClass: "form-control",
                        required: !id,
                        placeholder: "Senha",
                        onChange: handleForm,
                        value: form.password
                      },
                      {
                        name: "confirm",
                        label: "Confirmação",
                        type: "password",
                        bsClass: "form-control",
                        required: !id,
                        placeholder: "Confirme a senha",
                        onChange: handleForm,
                        value: form.confirm
                      }
                    ]}
                  />

                  {id && (
                    <Button bsStyle="danger" fill type="button" onClick={remove}>
                      Excluir
                    </Button>
                  )}

                  <Button bsStyle="success" pullRight fill type="submit">
                    Salvar
                  </Button>
                  <div className="clearfix" />
                </form>
              }
            />
          </Col>
        </Row>
      </Grid>
    </div>
  );
}