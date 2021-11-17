import styled from 'styled-components';

export const Container = styled.div`
    display: flex;
    flex: 1;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
`;

export const ContainerButtonRefresh = styled.div`
    position: absolute;

    margin: 40px;

    button {
        height: 70px;
        width: 150px;

        border-radius: 10px;

        background-color: #00325a;

        color: #fff;

        font-size: 18px;
    }
`;