import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { Container, Content, Profile } from './styles';

import { signOut } from '../../store/modules/auth/actions';

import logo from '../../assets/simb.png';

export default function Header() {
  const dispatch = useDispatch();

  const profile = useSelector(state => state.user.profile);

  function handleSignOut() {
    dispatch(signOut());
  }

  return (
    <Container>
      <Content>
        <nav>
          <img src={logo} alt="logo" />
          <Link to="/maps">MAPAS</Link>
        </nav>
        <nav>
          <Link to="/create-notifications">NOTIFICAÇÕES</Link>
        </nav>
        <nav>
          <Link to="/alter-password">ALTERAR SENHA</Link>
        </nav>

        <aside>
         {/**  <Notifications /> */}

          <Profile>
            <div>
              <strong>{profile.fun_nome}</strong>
              <button type="button" onClick={handleSignOut}>
                Sair
              </button>
            </div>
            <img
              src={`https://api.multiavatar.com/${profile.fun_nome}.png`}
              alt='avatar'
            />
          </Profile>
        </aside>
      </Content>
    </Container>
  );
}
