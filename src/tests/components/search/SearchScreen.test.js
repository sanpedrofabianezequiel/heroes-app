import React from 'react';
import '@testing-library/jest-dom'
import {mount} from 'enzyme';
import { MemoryRouter,Route } from 'react-router';
import { SearchScreen } from '../../../components/search/SearchScreen';

describe('Pruebas en <SearchScreen/>',()=>{

    test('debe de mostrarse correctamente con valores por defecto',()=>{
        const wrapper = mount(
            <MemoryRouter initialEntries={['/search']}>
                <Route path="/search" component={SearchScreen} />
            </MemoryRouter>
        );
        expect(wrapper).toMatchSnapshot();
        expect(wrapper.find('.alert-info').text().trim()).toBe('Search a hero');
    });

    test('debe de mostra a Batman y el input con el valor del QueryString',()=>{
        const wrapper= mount(
            <MemoryRouter initialEntries={['/search?q=batman']}>
                <Route path="/search" component={SearchScreen} />
            </MemoryRouter>
        );
        expect(wrapper.find('input').prop('value')).toBe('batman');
        //Podriamos chekiar algun componente inferior creado, o un snpachsot ya que se crea
        //cuando se encuenta
        expect(wrapper).toMatchSnapshot();
    });

    test('debe de mostrar un error si no se encuentra el Hero',()=>{
        const wrapper = mount(
            <MemoryRouter initialEntries={['/search?q=12345']}>
                <Route path='/search' component={SearchScreen} />
            </MemoryRouter>
        );

        expect(wrapper.find('.alert-danger').exists()).toBe(true);
        expect(wrapper).toMatchSnapshot();
    });

    test('debe de llamar al push del history',()=>{
        const history = {
            push:jest.fn()
        }
        const wrapper = mount(
            <MemoryRouter initialEntries={['/search?q=12345']}>
                <Route path='/search' component={()=><SearchScreen history={history} />} />
            </MemoryRouter>
        );

        //Simulamos el input change
        wrapper.find('input').simulate('change',{
            target:{
                name:'searchText',
                value:'batman'
            }
        })
        //Simulamos el submit
        wrapper.find('form').prop('onSubmit')({
            preventDefault(){}
        })

        // revisamos expect

        expect(history.push).toHaveBeenCalledWith(`?q=batman`);

    })
    
});