import React from 'react';
import '@testing-library/jest-dom';
import { mount } from 'enzyme';
import { MemoryRouter, Route, Router } from 'react-router';
import { HeroScreen } from '../../../../src/components/heroes/HeroScreen';

describe('Prueabs en <HeroScreen/>',()=>{   

    test('debe de mostrar el componente redirect si no hay argumentos en el URL',()=>{
   
        const historyMock = {
            length :10,
            push:jest.fn(),
            goBack:jest.fn()
        }
   
        const wrapper = mount(
            <MemoryRouter initialEntries={['/heroe']}>
                <HeroScreen  history={historyMock}/>
            </MemoryRouter>
        );
        
        expect(wrapper).toMatchSnapshot();
        expect(wrapper.find('Redirect').exists()).toBe(true);

    });

    test('debe de mostrar un heroe si el parametro existe y se encuentra',()=>{

        const wrapper = mount(
            <MemoryRouter initialEntries={['/hero/marvel-spider']}>
                <Route path="/hero/:heroeId" component={HeroScreen} />
            </MemoryRouter>
        );
        expect(wrapper.find('.row').exists()).toBe(true);
    });

    test('debe de regresar a la pantalla anterior con PUSH',()=>{
        const historyMock ={
            length:1,
            push:jest.fn(),
            goBack:jest.fn()
        }
        const wrapper = mount(
            <MemoryRouter initialEntries={['/hero/marvel-spider']}>
                <Route path="/hero/:heroeId" component={()=><HeroScreen history={historyMock} />} />
            </MemoryRouter>
        );
        wrapper.find('button').prop('onClick')();

        expect(historyMock.push).toHaveBeenCalledWith('/');
        expect(historyMock.goBack).not.toHaveBeenCalled();
    });

    test('debe de regresar a la pantalla anterior GOBACK',()=>{
        const historyMock ={
            length:10,
            push:jest.fn(),
            goBack:jest.fn()
        }
        const wrapper = mount(
            <MemoryRouter initialEntries={['/hero/marvel-spider']}>
                <Route path="/hero/:heroeId" component={()=><HeroScreen history={historyMock} />} />
            </MemoryRouter>
        );
        wrapper.find('button').prop('onClick')();

        expect(historyMock.push).not.toHaveBeenCalled();
        expect(historyMock.goBack).toHaveBeenCalled();
    });

    test('debe de llamar el REDIRECT si el hero no existe',()=>{
        const historyMock ={
            length:10,
            push:jest.fn(),
            goBack:jest.fn()
        }
        const wrapper = mount(
            <MemoryRouter initialEntries={['/hero/marvel-spider12332123']}>
                <Route path="/hero/:heroeId" component={()=><HeroScreen history={historyMock} />} />
            </MemoryRouter>
        );
        //expect(wrapper.find('Redirect').exists()).toBe(true);
        expect(wrapper.text()).toBe('');
    });


});