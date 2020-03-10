import React, {Component} from 'react';
import { Formik, Field, Form } from "formik";
import Sidebar from './Sidebar';

class Formulario extends Component{
    onSubmit = (values, {setSubmitting}) =>{
        setSubmitting(false);
        alert(JSON.stringify(values));
    }
    render(){
        const initialValues = {nombre: '', apellidos: '', bio: '', genero: ''}
        return(
            <div id="formulario">
                <div className="center">
                    <div id="content">
                        <h1 className="subheader">Formulario</h1>
                        
                        {/* Crear Formulario */}
                        <Formik 
                            initialValues={initialValues}
                            onSubmit={this.onSubmit}>
                            {({isSubmitting}) => (
                                <Form>
                                    <label for="bio">Nombre</label>
                                    <Field type="text" name="nombre" />
                                    <label for="bio">Apellido</label>
                                    <Field type="text" name="apellidos" />

                                    <div class="form-group">
                                        <label for="bio">Biografia</label>
                                        <textarea name="bio"></textarea>
                                    </div>

                                    <Field type="radio" name="genero" value="Hombre" />Hombre
                                    <Field type="radio" name="genero" value="Mujer" />Mujer
                                    <Field type="radio" name="genero" value="Otro" />Otro
                                    <div class="clearfix"></div>
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