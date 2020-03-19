import React, {Component} from 'react';
import { Formik, Field, Form } from "formik";
import Sidebar from './Sidebar';

class Formulario extends Component{
    state = {
        user:{}
    }
    onSubmit = (values, {setSubmitting}) =>{
        setSubmitting(false);
        console.log(JSON.stringify(values));

        this.setState({
            user: values
        });
    }

    render(){
        const initialValues = {nombre: '', apellidos: '', bio: '', genero: ''}
        return(
            <div id="formulario">
                <div className="center">
                    <div id="content">
                        <h1 className="subheader">Formulario</h1>
                        {/* Mostrar valores del formulario*/}
                        {this.state.user.nombre &&
                            <div id="user-data">
                                <p>{this.state.user.nombre}</p>
                            </div>

                        }
                        
                        {/* Crear Formulario */}
                        <Formik 
                            initialValues={initialValues}
                            onSubmit={this.onSubmit}>
                            {({isSubmitting}) => (
                                <Form>
                                    <label>Nombre</label>
                                    <Field type="text" name="nombre"/>
                                    <label>Apellido</label>
                                    <Field type="text" name="apellidos" />

                                    <div className="form-group">
                                        <label>Biografia</label>
                                        <textarea name="bio"></textarea>
                                    </div>

                                    <Field type="radio" name="genero" value="Hombre" />Hombre
                                    <Field type="radio" name="genero" value="Mujer" />Mujer
                                    <Field type="radio" name="genero" value="Otro" />Otro
                                    <div className="clearfix"></div>
                                    <button 
                                        type="submit" 
                                        disabled={isSubmitting} 
                                        className="btn btn-success">

                                        Enviar
                                    </button>
                                </Form>
                            )}
                        </Formik>
                    </div>
                    <Sidebar />
                </div>
            </div>
        );
    }
}

export default Formulario;