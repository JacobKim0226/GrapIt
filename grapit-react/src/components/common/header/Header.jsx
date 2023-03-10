import React, { useEffect, useState } from 'react';
import './header.css';
import { nav } from '../../data/Data';
import { Link, useNavigate } from 'react-router-dom';
import Nav from 'react-bootstrap/Nav';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { setUser, resetUser } from '../../../store/userSlice';

const Header = () => {
  const [navList, setNavList] = useState(false);

  let user = useSelector(state => state.user);
  let navigate = useNavigate();
  let dispatch = useDispatch();

  const [sessionValid, setSessionValid] = useState(false);

  useEffect(() => {
    axios.get('/api/checksession').then(res => {
      if (res.status === 200) {
        setSessionValid(true);
        dispatch(setUser(res.data));
      } else {
        setSessionValid(false);
        dispatch(resetUser());
      }
    });
  });

  return (
    <>
      <div className="container flex">
        <div className="logo">
          <h4>Grap-It</h4>
        </div>
        <nav className="stroke">
          <ul className={navList ? 'small' : 'flex'}>
            {nav.map((list, index) => (
              <li key={index}>
                <Link to={list.path}>{list.text}</Link>
              </li>
            ))}

            {user.nickName == null ? (
              <li>
                <Link to="/login">로그인</Link>
              </li>
            ) : (
              <li className="flex">
                <span className="nav-name">{user.nickName} </span>
                <Link style={{ fontSize: '15px' }} to="/logout">
                  로그아웃
                </Link>
              </li>
            )}
          </ul>
        </nav>
      </div>
    </>
  );
};

export default Header;
