import React from 'react'
import { useNavigate } from 'react-router-dom';

const useGoBackHistory = () => {
    const history = useNavigate();
    return history(-1);
}

export default useGoBackHistory