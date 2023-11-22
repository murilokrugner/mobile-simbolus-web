import React, { useState, useEffect } from "react";
import { ContainerDropdown } from "./styles";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import { Form, Input } from "@rocketseat/unform";
import logo from "../../../assets/simb.png";

import { signInRequest } from "../../../store/modules/auth/actions";

import ReactSelect from "react-select";

import api from "../../../services/api";

const schema = Yup.object().shape({
  email: Yup.string()
    .email("Insira um e-mail válido")
    .required("O e-mail é obrigatório"),
  password: Yup.string().required("A senha é obrigatória"),
});

export default function SignIn() {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.auth.loading);

  const [companies, setCompanies] = useState();
  const [selectCompany, setSelectCompany] = useState(null);
  const [loadingCompanies, setLoadingCompanies] = useState(true);

  async function loadCompanies() {
    try {
      const response = await api.get("companies");

      const data = [];

      const formatCompanies = response?.data?.map((item) => {
        data.push({ value: item.EMP_NOME, label: item.EMP_NOME });
      });

      setCompanies(data);
      setLoadingCompanies(false);

    } catch (error) {
      
    }
  }

  function handleSubmit({ email, password }) {
    const company = selectCompany.value;
    dispatch(signInRequest(company, email, password));
  }

  useEffect(() => {
    loadCompanies();
  }, []);

  return (
    <>
      <img src={logo} alt="simbolus" height="500px" />

      <Form schema={schema} onSubmit={handleSubmit}>
        <ContainerDropdown className={"dropdown"}>
          <ReactSelect
            name={selectCompany}
            value={selectCompany}
            defaultValue={selectCompany}
            onChange={(value) => setSelectCompany(value)}
            placeholder={"Empresa"}
            options={companies}
            isClearable={true}
            isLoading={loading}
          />
        </ContainerDropdown>
        <Input name="email" type="email" placeholder="Seu e-mail" />
        <Input
          name="password"
          type="password"
          placeholder="Sua senha secreta"
        />
        <button type="submit">{loading ? "Carregando..." : "Acessar"}</button>
        <footer>v1.0 Alpha</footer>
      </Form>
    </>
  );
}
