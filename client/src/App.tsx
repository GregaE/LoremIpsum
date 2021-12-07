import { withCookies, Cookies } from 'react-cookie';
import React, { useEffect } from 'react';
import Dashboard from './components/Dashboard/Dashboard';
import { useDispatch } from 'react-redux';
import AuthLogin from './components/Auth/AuthLogin';

import { FetchPersonal } from './utils/ApiService';

import { connect } from 'react-redux';
import { loginDetails } from './store/actions/toggleLogin';

function App({login}:any) {
  const dispatch = useDispatch();
  const cookies = new Cookies();
  const { isLoggedIn } = login;
  const render =  isLoggedIn || cookies.get('sid') ? <Dashboard/> : <AuthLogin />;

  useEffect(() => {
    if (login.userId === '' && !localStorage.getItem('user_id')) {
        dispatch({type: 'TOGGLE_LOGIN', payload: {userId: '', isLoggedIn: false } })
        return
    }
    const userId = localStorage.getItem('user_id');
    FetchPersonal(userId).then(res => {
      dispatch(loginDetails(res[0]))
    })
    dispatch({type: 'TOGGLE_LOGIN', payload: {userId: userId, isLoggedIn: true} });
  }, []);

  return (
    render
  )
}

const mapStateToProps = (state: any) => ({
  error: state.error,
  loading: state.loading,
  skills: state.skills,
  login: state.login
});

const mapDispatchToProps = (dispatch: any) => {
  return {
    toggleLoading: () => dispatch({ type: 'LOADING' }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withCookies(App));
