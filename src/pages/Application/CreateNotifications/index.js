import React, {useEffect, useState} from 'react';
import { Container } from './styles';
import { useSelector } from 'react-redux';
import ReactSelect from 'react-select';
import api from '../../../services/api';
import { toast } from 'react-toastify';

export default function CreateNotifications() {
  const [loading, setLoading] = useState(true);
  const [employees, setEmployees] = useState([]);
  const [selectEmployee, setSelectEmployee] = useState('');
  const profile = useSelector(state => state.user.profile);
  const [message, setMessage] = useState('');

  function handleChange(event) {
    setMessage(event.target.value);
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
    if(message === '' || message === undefined || message === null) {
      alert('Digite a mensagem');
      return;
    }

    createNotificationAll();
  }

  async function createNotification() {
    const idGen = new Date().getTime().toString();

    await api.post('notification', {
      id: idGen.slice(2, 10),
      user_id: selectEmployee.value,
      message: message,
      lida: 0,
      data: new Date(),
      tipo: 0
    });

    toast.success('Notificação enviada com sucesso para: ' + selectEmployee.label);
    setSelectEmployee('');
    setMessage('');
  }

  async function createNotificationAll() {

    await api.post('notification-all', {
      message: message,
    });

    toast.success('Notificação enviada com sucesso para todos os vendedores');
    setSelectEmployee('');
    setMessage('');
  }

  async function handleSubmitEmployee({}) {
    if (selectEmployee === '' || selectEmployee === null || selectEmployee === undefined) {
      alert('Selecione o vendedor');
      return;
    }

    if(message === '' || message === undefined || message === null) {
      alert('Digite a mensagem');
      return;
    }

    try {
      createNotification(message);     
    } catch (error) {
      toast.error('Ocorreu um erro ao enviar a notificação, tente novamente mais tarde');
      return;
    }
  }

  useEffect(() => {
    loadEmployees();
  }, []);

  return (
    <Container>
      <h2>Criar notificação</h2>
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
        <input name="message" type="text" value={message} onChange={handleChange} placeholder="Mensagem de notificação" />       
      </form>

      <button type="button" onClick={handleSubmitEmployee}>Enviar notificação para o vendedor</button>
      <button type="button" onClick={handleSubmit}>Enviar notificação para todos os vendedor</button>
    </Container>
  );
}
