import React from 'react';
import '@testing-library/jest-dom';
import {shallow,mount} from 'enzyme';
import { AuthContext } from '../../../auth/AuthContext';
import { MemoryRouter, Router } from 'react-router';
import { Navbar } from '../../../../src/components/ui/Navbar';
import { types } from '../../../types/types';

describe('Pruebas en <NavBar/> ',()=>{

    const historyMock = {
        push:jest.fn(),
        replace:jest.fn(),
        location:{},
        listen:jest.fn(),
        createHref:jest.fn()
    }
    const contextValue = {
        dispatch: jest.fn(),
        user:{
            logged:true,
            name:'ezequiel'
        }
    }

    const wrapper = mount(
        <MemoryRouter>
            <AuthContext.Provider value={contextValue}>
                <Router history={historyMock} >
                    <Navbar />
                </Router>    
            </AuthContext.Provider>
        </MemoryRouter>
    );


    afterEach(()=>{
        jest.clearAllMocks();
    });


    test('debe de mostrarse correctamente',()=>{
        expect(wrapper).toMatchSnapshot();
        expect(wrapper.find('.text-info').text().trim()).toBe(contextValue.user.name);
    });

    test('debe de llamar el logout y usar History',()=>{
        wrapper.find('button').prop('onClick')();

        expect( contextValue.dispatch).toHaveBeenCalledWith({
            type:types.logout
        });

        expect(historyMock.replace).toHaveBeenCalledWith('/login');
    });

});


