import React, {useState, useEffect} from 'react';

import { Container, ContainerRoutes } from './styles';

import ReactSelect from 'react-select';

import RoutesEmployee from '../RoutesEmployee';

import { useSelector } from 'react-redux';
import api from '../../services/api';

function Panel({dataEmployee, handleSetData, handleSetGeoJson, handleClean, handleSubmitTrasfer}) {
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

        let verify = false;

        const search = dataEmployee.map(item => {            
            if (item.user_name === selectEmployee.label) {
                handleSetData([item]);
                verify = true;
                return;
            }             
        });

        if (!verify) {
            alert(`Nenhum vendedor encontrado!`)
        }
    }

    function handleAllEmployees() {
        handleSetData(dataEmployee);
    }

    function handleGeoJson(json) {
        handleSetGeoJson(json)
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
            isClearable={false}
            isLoading={loadingEmployees}
          />

          <button type="button" onClick={searchEmployee}>Buscar</button>
          {/*<button type="button" onClick={handleAllEmployees}>Todos</button>*/}

         
           <ContainerRoutes>
               <h3>Rotas do vendedor</h3>
               <RoutesEmployee employee={selectEmployee ? selectEmployee.value : null } handleGeoJson={handleGeoJson} />
               <button type="button" onClick={handleClean}>Limpar</button>

               <button className="transfer" type="button" onClick={handleSubmitTrasfer}>Transferir rota para outro vendedor</button> 
           </ContainerRoutes>
        
      </Container>
  );
}

export default Panel;