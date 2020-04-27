import React from 'react';
import { ScrollView, FlatList, Text, View } from 'react-native';
import { Card, Icon} from 'react-native-elements';

import { baseUrl } from '../comun/comun';

import { EXCURSIONES } from '../comun/excursiones';
import { COMENTARIOS } from '../comun/comentarios';


function RenderExcursion(props) {
    const excursion = props.excursion;

    if (excursion != null){
        return(
            <Card
                featuredTitle={excursion.nombre}
                image={{uri: baseUrl + excursion.imagen}}                
            >
                <Text style={{margin: 10}}>
                    {excursion.descripcion}
                </Text>

                <Icon 
                    raised
                    reverse
                    name={props.favorita ? 'heart' : 'heart-o'}
                    type='font-awesome'
                    color='#f50'
                    onPress={() => props.favorita ? console.log('La excursión ya se encuentra entre las favoritas') : props.onPress()}
                />
            </Card>
        );
    }else { 
        return(<View></View>);
    }
}

function RenderComentario(props){
    const comentarios = props.comentarios;

    const renderCommentarioItem = ({item,index}) => {
        return(
            <>
            <View key={index} style={{margin: 10}}>
                <Text style={{fontSize: 14}}>{item.comentario}</Text>
                <Text style={{fontSize: 12}}>{item.valoracion} Stars</Text>
                <Text style={{fontSize: 12}}>{'-- ' + item.autor + ' . ' + item.dia}</Text>
            </View>
            </>
        );
    };

    return (
        <Card title='Comentarios'>
             <FlatList 
                data={comentarios}
                renderItem={renderCommentarioItem}
                keyExtractor={item => item.id.toString()}
            />
        </Card>
    );
}

export default class DetalleExcursion extends React.Component {
    constructor(props){
        super(props);
        this.state ={
            excursion: EXCURSIONES,
            comentarios: COMENTARIOS,
            favoritos: []
        }
    }

    marcarFavorito(excursionId){
        this.setState({favoritos: this.state.favoritos.concat(excursionId)});
    }

    render(){
        const {excursionId} = this.props.route.params;
        return(
            <ScrollView>
                <RenderExcursion 
                    excursion={this.state.excursion[+excursionId]}
                    favorita={this.state.favoritos.some(el => el === excursionId)}
                    onPress={() => this.marcarFavorito(excursionId)}
                />
                 <RenderComentario 
                    comentarios={this.state.comentarios.filter((comentario) => comentario.excursionId === excursionId)}
                />
            </ScrollView>        
        );
    }
}
