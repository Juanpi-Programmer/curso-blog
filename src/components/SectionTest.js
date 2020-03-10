import React, {Component} from 'react';

class SectionTest extends Component{
    contador = 0;

    
    // constructor(props){
        
    //     super(props);

    //     this.state = {
    //         contador: 0
    //     }
    // }

    //Comprimo el coodigo del constructor
    state = {
        contador: 0
    }
    
    //Si los meto en funcion de flecha, no hace falta pasarle el bin(this)
    sumar = (e) => {
        //this.contador = this.contador+1;
        this.setState({
            contador: (this.state.contador+1)
        });
    }

    restar = (e) => {
        //this.contador = this.contador-1;
        this.setState({
            contador: (this.state.contador-1)
        });
    }

    render(){
        
        return(
            <section id="content">
                
                <h2 className="subheader">Últimos artículos</h2>

                <h2 className="subheader">Estado</h2>
                <p>
                    Contador: {this.state.contador}
                </p>
                <p>
                    <input type="button" value="Sumar" onClick={this.sumar}/>
                    <input type="button" value="Restar" onClick={this.restar}/>
                </p>
            </section>
        );
    }
}

export default SectionTest;