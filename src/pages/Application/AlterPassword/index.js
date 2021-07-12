import React, {useEffect, useState} from 'react';
import { Container } from './styles';
import { useSelector } from 'react-redux';
import ReactSelect from 'react-select';
import api from '../../../services/api';
import { toast } from 'react-toastify';

export default function AlterPassword() {
  const [loading, setLoading] = useState(true);
  const [loadingPass, setLoadingPass] = useState(false);
  const [employees, setEmployees] = useState([]);
  const [selectEmployee, setSelectEmployee] = useState('');
  const profile = useSelector(state => state.user.profile);
  const [password, setpassword] = useState('');

  function handleChange(event) {
    setpassword(event.target.value);
  }

  async function loadEmployees() {
    const response = await api.get(`employees?company=${profile.emp_codigo}`);

        const data = [];

        const formatEmployees = response.data.map(item => {
        data.push({'value': item.FUN_CODIGO, 'label': item.FUN_NOME});
        });

        setEmployees(data);

        setLoading(false);
  }

  async function handleSubmit() {
    setLoadingPass(true);

    if(password === '' || password === undefined || password === null) {
      alert('Digite a nova senha');
      setLoadingPass(false);
      return;
    }

    try {
        await api.put('alter-password', {
            id: selectEmployee.value,
            newPassword: password,
        });

        toast.success('Senha alterada com sucesso');

        setLoadingPass(false);

    } catch (error) {
        toast.error('Erro ao alterar a senha, tente novamente mais tarde');

        setLoadingPass(false);
        return;
    }

  }


  useEffect(() => {
    loadEmployees();
  }, []);

  return (
    <Container>
      <h2>Alterar senha de usuário do vendedor</h2>
        <ReactSelect    
            name={selectEmployee}
            value={selectEmployee}
            defaultValue={selectEmployee}
            onChange={value => setSelectEmployee(value)}
            placeholder={'Selecionar vendedor'}                    
            options={employees}
            isClearable={false}
            isLoading={loading}
          />

      <form>
        <input name="password" type="password" value={password} onChange={handleChange} placeholder="Nova senha" />       
      </form>

      <button type="button" onClick={handleSubmit}>{loadingPass ? 'Carregando...' : 'Alterar senha'}</button>
    </Container>
  );
}
