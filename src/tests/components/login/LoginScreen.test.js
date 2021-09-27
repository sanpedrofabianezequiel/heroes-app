import React from 'react';
import '@testing-library/jest-dom';
import {shallow,mount} from 'enzyme';
import {LoginScreen} from '../../../components/login/LoginScreen';
import { AuthContext } from '../../../auth/AuthContext';
import { MemoryRouter, Router } from 'react-router';


describe('Pruebas <LoginScreen/>',()=>{

    const history = {
        replace:jest.fn()
    }

    const contextValue = {
        dispatch: jest.fn(),
        user:{
            logged:true,
            name:'ezequiel'
        }
    }

    const wrapper =  mount(
            <AuthContext.Provider value={contextValue} >
                    <LoginScreen  history={history} />    
            </AuthContext.Provider>    
    );
    test('debe de mostarse  correctamente',()=>{
        expect(wrapper).toMatchSnapshot();
    });

    test('debe de realizar el dispatch y la navegacion',()=>{
      const handleClick = wrapper.find('button').prop('onClick');

      handleClick();
      expect(contextValue.dispatch).toHaveBeenCalled();
      expect(history.replace).toHaveBeenCalled();  

      localStorage.setItem('lastPath','/dc');
      handleClick();
      expect(history.replace).toHaveBeenCalledWith('/dc');
    });    
});