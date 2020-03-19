import React, {Component} from 'react';
import Pelicula from './Pelicula';
import Slider from './Slider';
import Sidebar from './Sidebar';

class Movies extends Component{ 

    state = {

    }

    cambiarTitle = () => {

        var { peliculas }=this.state;
        //var random = Math.floor(Math.random() * 3);
        peliculas[0].title="BATMAN VS EL GATO";

        this.setState({
            peliculas: peliculas
        });
    }
    
    favorita = (pelicula, indice) =>{
        console.log("FAvorita MArcada" + indice);
        this.setState({
            favorita: pelicula
        });
    }

    //Se carga antes que todo
    componentWillMount(){
        this.setState({
            peliculas: [
                {title: 'Batman VS Superman', image: 'https://pics.filmaffinity.com/Batman_v_Superman_El_amanecer_de_la_Justicia-113098552-large.jpg'},
                {title: 'Gran Torino', image: 'https://pics.filmaffinity.com/Gran_Torino-278262332-mmed.jpg'},
                {title: 'Looper', image: 'https://pics.filmaffinity.com/Looper-874353819-mmed.jpg'}
            
            ],
            nombre: 'Juan Pablo',
            favorita: {}
        });
    }

    //DdMount se carga cuando ya esta todo cargado
    componentDidMount(){
        //alert("YA se ha montado el componente");
    }


    render(){
        return(
            <React.Fragment>
                <Slider 
                    title="Peliculas"
                    size="slider-small"
                />
                <div className="center">
                    <div id="content" className="peliculas">
                        <h3 className="subheader">Listado de Peliculas</h3>
                        <p>Seleccion favorita de {this.state.nombre}</p>
                        <button onClick={this.cambiarTitle}>Modificar titulo de BAtman</button>

                        {/*Condicionales */}
                        {this.state.favorita.title ? (
                            <p className="favorita">
                                <strong>La pelicula favorita es: </strong>
                                <span>{this.state.favorita.title}</span>
                            </p>
                            ): (
                                <p>NO hay prlicula Favorita</p>
                            )
                        }
                        
                        {/** Crear Componente Pelicula */}

                        <div id="articles" className="peliculas">
                        {
                            this.state.peliculas.map((pelicula, i )=>{
                                return(
                                <Pelicula 
                                        key={i} 
                                        pelicula={pelicula} 
                                        indice={i}
                                        marcarFavorito={this.favorita}
                                    />
                                );
                            })
                        }
                        </div>
                    </div>
                    <Sidebar />
                </div>
            </React.Fragment>
        );
    }
}

export default Movies;