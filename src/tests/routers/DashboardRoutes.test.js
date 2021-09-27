import React from 'react';
import '@testing-library/jest-dom';
import {mount} from 'enzyme';
import { DashboardRoutes } from '../../routers/DashboardRoutes';
import { MemoryRouter } from 'react-router';
import { AuthContext } from '../../auth/AuthContext';


describe('Pruebas en <DashboardRoutes/>',()=>{

    const user = {
        name:'ezequiel',
        logged:true
    }
    const dispatch = jest.fn();

    test('debe de mostrase correctamente',()=>{
        const wrapper = mount(
            <MemoryRouter>
                <AuthContext.Provider value={{
                    user,dispatch
                }}>
                    <DashboardRoutes/>);      
                </AuthContext.Provider>
            </MemoryRouter>
        );

        //console.log(wrapper.html());
        expect(wrapper).toMatchSnapshot();
        expect(wrapper.find('.text-info').text().trim()).toBe('ezequiel');
    });

});