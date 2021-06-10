import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { Container, Content, Profile } from './styles';

import Notifications from '../../components/Notifications';
import logo from '../../assets/simb.png';

export default function Header() {
  const profile = useSelector(state => state.user.profile);

  return (
    <Container>
      <Content>
        <nav>
          <img src={logo} alt="logo" />
          <Link to="/dashboard">DASHBOARD</Link>
        </nav>
        <nav>    
          <Link to="/maps">MAPAS</Link>
        </nav>

        <aside>
          <Notifications />

          <Profile>
            <div>
              <strong>{profile.fun_nome}</strong>
              <Link to="/profile">Meu Perfil</Link>
            </div>
            <img
              src={'https://api.adorable.io/avatars/50/abott@adorable.pngprofile.avatar_url'}
              alt='avatar'
            />
          </Profile>
        </aside>
      </Content>
    </Container>
  );
}
