import React, {Component} from 'react';
import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom';
import Error from './components/Error';


//Importar Componentes
import Home from './components/Home';
import Header from './components/Header';
import Footer from './components/Footer';
import Blog from './components/Blog';
import Formulario from './components/Formulario';
import Movies from './components/Movies';
import Search from './components/Search';
import Article from './components/Article';
import CreateArticle from './components/CreateArticle';
import EditArticle from './components/EditArticle';

class Router extends Component{
    render(){
        
        return(
            
            <BrowserRouter>
                 <Header />
                
                {/* CONFIGURAR RUTAS Y PAGINAS */}
                
                    <Switch>

                        <Route exact path="/" component={Home} />
                        <Route exact path="/home" component={Home} />
                        <Route exact path="/blog" component={Blog} />
                        <Route exact path="/blog/articulo/:id" component={Article} />
                        <Route exact path="/blog/crear" component={CreateArticle} />
                        <Route exact path="/blog/editar/:id" component={EditArticle} />
                        <Route exact path="/formulario" component={Formulario} />
                        <Route exact path="/blog/busqueda/:search" component={Search} />
                        <Route exact path="/redirect/:search" render={
                            (props) => {
                                let search=props.match.params.search;
                                return(<Redirect to={'/blog/busqueda/'+ search} />)}
                        } />
                        <Route exact path="/peliculas" component={Movies} />

                        <Route exact path="/pruebas/:nombre/:apellidos?" render={(props) => {
                            var nombre= props.match.params.nombre;
                            var apellidos=props.match.params.apellidos;

                            
                            return(
                                <div className="content">
                                    <h2 className="subheader">Pagina de pruebas</h2>
                                    <h3>
                                        {nombre && !apellidos &&
                                            <span> {nombre} </span>
                                        }

                                        {nombre && apellidos &&
                                            <span>{nombre} {apellidos}</span>
                                        }
                                        
                                    </h3>
                                </div>
                            );
                        }
                        
                        } />
                        <Route component={Error} />
                    </Switch>
                    
                    
                    <div className="clearfix"></div>

                    <Footer />

            </BrowserRouter>
        );
    }
}

export default Router;