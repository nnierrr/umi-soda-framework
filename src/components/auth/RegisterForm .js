import React, { useState, useEffect } from "react";
import _ from 'lodash';
import { Button, Form, Grid, Header, Segment, Message } from "semantic-ui-react";
import { register } from "../../actions/authActions";
import { connect } from "react-redux";

const RegisterForm = props => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
    user_role: "blogger"
  });

  const user_roles = [
    { key: "b", text: "Blogger", value: "blogger" },
    { key: "a", text: "CMS Admin", value: "cms-admin" }
  ];

  const { name, email, password, password2, user_role } = user;

    const [errorMsg, setMsgError] = useState([]);

    const { getPage, errors, register } = props;

    useEffect(() => {
        if (!_.isEmpty(errors)) {
            errors.map(error => {
                setMsgError(msg => [...msg, error.msg]);
            });
            console.log(errorMsg);  
        } else {
            setMsgError([]);
        }
    }, [errors]);

  const changePage = () => {
    getPage("login");
  };

  const onSubmit = e => {
    e.preventDefault();
    register(user);
  }

  const onChangeUserRole = (e ,{value}) => {
    setUser({
        ...user,
        user_role: value
    });
  }

  const onChange = e => {
      setUser({
        ...user,
        [e.target.name]: e.target.value
      });
  };

  return (
      <Grid
          textAlign="center"
          style={{ height: "100vh" }}
          verticalAlign="middle"
      >
          <Grid.Column style={{ maxWidth: 450 }}>
              <Header as="h1" color="standard" inverted textAlign="center">
                  umiSoda | Framework
              </Header>
          <Form onSubmit={onSubmit} size="large">
                  <Segment stacked>
                      <Form.Input
                          fluid
                          icon="user outline"
                          iconPosition="left"
                          placeholder="Username"
                          name="name"
                          value={name}
                          onChange={onChange}
                      />
                      <Form.Input
                          fluid
                          icon="user"
                          iconPosition="left"
                          placeholder="E-mail address"
                          name="email"
                          value={email}
                          onChange={onChange}
                      />
                      <Form.Input
                          fluid
                          icon="lock"
                          iconPosition="left"
                          placeholder="Password"
                          type="password"
                          name="password"
                          value={password}
                          onChange={onChange}
                      />
                      <Form.Input
                          fluid
                          icon="lock"
                          iconPosition="left"
                          placeholder="Confirm Password"
                          type="password"
                          name="password2"
                          value={password2}
                          onChange={onChange}
                      />
                      <Form.Select
                          fluid
                          options={user_roles}
                          name="user_role"
                          value={user_role}
                          onChange={onChangeUserRole}
                          placeholder='User Role'   
                      />
                      <Button color="yellow" fluid size="large">
                          Register
                      </Button>
                  </Segment>
              </Form>

              {!_.isEmpty(errorMsg) && (
                  <Message error header="Oopsie!" list={errorMsg} />
              )}

              <Header as="h4" color="standard" inverted textAlign="center">
                  <span className="ui yellow small header" style={{ cursor: 'grab' }} onClick={changePage}>
                      Back to Login
                  </span>
              </Header>
          </Grid.Column>
      </Grid>
  );
};

const mapStateToProps = state => {
    console.log(state);
    return {
        user: state.auth.user,
        errors: state.auth.errors
    };
};

export default connect(mapStateToProps, { register, alert })(RegisterForm);
