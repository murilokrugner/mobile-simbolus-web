import React, {useState, useEffect} from 'react';

import { Container } from './styles';

import ReactSelect from 'react-select';

import { useSelector } from 'react-redux';
import api from '../../services/api';

function Panel({dataEmployee, handleSetData}) {
    const [selectEmployee, setSelectEmployee] = useState('');
    const [employees, setEmployees] = useState([]);
    const [loadingEmployees, setLoadingEmployees] = useState(true);

    const [loadingEmployee, setLocationEmployee] = useState([]);

    const profile = useSelector(state => state.user.profile);

    async function loadEmployees() {
        const response = await api.get(`employees?company=${profile.emp_codigo}`);

        const data = [];

        const formatEmployees = response.data.map(item => {
        data.push({'value': item.FUN_CODIGO, 'label': item.FUN_NOME});
        });

        setEmployees(data);

        setLoadingEmployees(false);
    }

    async function searchEmployee() {
        if (selectEmployee === '' || selectEmployee === null) {
            alert('Selecione o vendendor');
            return;
        }

        const search = dataEmployee.map(item => {
            if (item.name === selectEmployee.label) {
                handleSetData([item]);
                return;
            }              
        });
    }

    function handleAllEmployees() {
        handleSetData(dataEmployee);
    }

    useEffect(() => {
        loadEmployees();
    }, []);

  return (
      <Container>
          <h3>Localizar vendedor</h3>
        <ReactSelect    
            name={selectEmployee}
            value={selectEmployee}
            defaultValue={selectEmployee}
            onChange={value => setSelectEmployee(value)}
            placeholder={'Selecionar vendedor'}                    
            options={employees}
            isClearable={true}
            isLoading={loadingEmployees}
          />

          <button type="button" onClick={searchEmployee}>Buscar</button>
          <button type="button" onClick={handleAllEmployees}>Todos</button>
      </Container>
  );
}

export default Panel;