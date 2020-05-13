import React, { useRef } from 'react';
import { ScrollView, FlatList, Text, View, StyleSheet, Modal, PanAlert, Responder, PanResponder, Alert } from 'react-native';
import { Card, Icon, Rating, Input, Button} from 'react-native-elements';

import { baseUrl, colorGaztaroaClaro, colorGaztaroaOscuro } from '../comun/comun';
import { connect } from 'react-redux';
import { postFavorito, postComentario} from "../redux/ActionCreators";

import * as Animatable from 'react-native-animatable';


const mapStateToProps = state =>  {
    return{
        comentarios: state.comentarios,
        excursiones: state.excursiones,
        favoritos: state.favoritos
    }
}

const mapDispatchToProps = dispatch => ({
    postFavorito: (excursionId) => dispatch(postFavorito(excursionId)),
    postComentario: (comentario) => dispatch(postComentario(comentario))
})

function RenderExcursion(props) {
    const excursion = props.excursion;

    const cardAnimada = useRef(null);

    const reconocerDragDerechaIzquierda = ({moveX, moveY, dx, dy}) => {
        if ( dx < -50 )
            return true;
        else
            return false;
    }

    const reconocerDragIzquierdaDerecha = ({moveX, moveY, dx, dy}) => {
        if ( dx > -50 )
            return true;
        else
            return false;
    }

    const panResponder = PanResponder.create({
        onStartShouldSetPanResponder: (e, gestureState) => {
            return true;
        },
        onPanResponderGrant: () => {
            cardAnimada.current.rubberBand(1000)
                .then(endState => console.log(endState.finished ? 'terminado' : 'cancelado'));
        },
        onPanResponderEnd: (e, gestureState) => {
            console.log("PanResponder finalizado", gestureState);
            if (reconocerDragDerechaIzquierda(gestureState))
                Alert.alert(
                        "Añadir favorito",
                        'Confirmar que desea añadir' + excursion.nombre + ' a favoritos:',
                        [
                            {text: 'Cancelar', onPress: () => console.log('Excursion no añadida a favoritos'), style: 'cancel'},
                            {text: 'Ok', onPress: () => {props.favorita ? console.log('La excursion ya se encuentra entre las favoritas') : props.onPress()}}
                        ],
                        {cancelable: false}
                );
            if (reconocerDragIzquierdaDerecha (gestureState)) {
                props.onPressComentary();
            }
            return true;
        }
    })

    if (excursion != null){
        return(
            <Animatable.View 
                animation="fadeInDown" 
                duration={2000} 
                delay={500}
                ref={cardAnimada}
                {...panResponder.panHandlers}
            >
                <Card
                    featuredTitle={excursion.nombre}
                    image={{uri: baseUrl + excursion.imagen}}                
                >
                    <Text style={styles.formRow}>
                        {excursion.descripcion}
                    </Text>

                    <Icon 
                        raised
                        reverse
                        name={props.favorita ? 'heart' : 'heart-o'}
                        type='font-awesome'
                        color='#f50'
                        onPress={() => props.favorita ? console.log('La excursión ya se encuentra entre las favoritas') : props.onPress()}
                        style={styles.formRow}
                    />
                    <Icon 
                        raised
                        reverse
                        name={'pencil'}
                        type='font-awesome'
                        color= {colorGaztaroaOscuro}
                        onPress={() => props.onPressComentary()}
                        style={styles.formRow}
                    />
                </Card>
            </Animatable.View>
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
        <Animatable.View animation="fadeInDown" duration={2000} delay={500}>
            <Card title='Comentarios'>
                <FlatList 
                    data={comentarios}
                    renderItem={renderCommentarioItem}
                    keyExtractor={item => item.id.toString()}
                />
            </Card>
        </Animatable.View>
    );
}



class DetalleExcursion extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            autor: '',
            comentario: '',
            rating: 3,
            showModal: false
        }
    }
    marcarFavorito(excursionId){
        this.props.postFavorito(excursionId)
    }

    // Formulario de comentarios --------------------------------
    gestionarComentario(excursionId) {
        const fecha = new Date(Date.now()).toISOString();
        const comentario = {      
            id: null,      
            excursionId: excursionId,
            valoracion: this.state.rating,
            autor: this.state.autor,
            comentario: this.state.comentario,
            dia: fecha
        }
        console.log(comentario)
        this.props.postComentario(comentario)
        this.resetForm();
    }

    resetForm() {
        this.setState({
            rating: 3,
            autor: '',
            comentario: '',
            showModal: false
        });
    }

    toogleModal(){
        this.setState({showModal: !this.state.showModal});
    }

    // RENDER ------------------------------
    render(){
        const {excursionId} = this.props.route.params;
        return(
            <ScrollView>
                <RenderExcursion 
                    excursion={this.props.excursiones.excursiones[+excursionId]}
                    favorita={this.props.favoritos.some(el => el === excursionId)}
                    onPress={() => this.marcarFavorito(excursionId)}
                    onPressComentary={()=>this.toogleModal()}
                />
                 <RenderComentario 
                    comentarios={this.props.comentarios.comentarios.filter((comentario) => comentario.excursionId === excursionId)}
                />

                <Modal animationType={'slide'} transparent={false}
                    visible={this.state.showModal}
                    onDismiss={()=>{this.toogleModal();this.resetForm();}}
                    onRequestClose={()=>{this.toogleModal();this.resetForm();}}
                    type='clear'
                >
                    <View style={styles.modal}>  
                        <Text style={{justifyContent: 'center', fontSize: 14,color: '#EDEA00'}}>Rating: {this.state.rating}/5</Text>                      
                        <Rating 
                            imageSize={30}
                            startingValue={3}
                            onFinishRating={(rating) => this.setState({rating: rating})}
                        />
                        <Input
                            placeholder='Autor'
                            leftIcon={{ type: 'font-awesome', name: 'user' }}
                            leftIconContainerStyle={{marginRight: 15}}
                            onChangeText={(value) => this.setState({autor: value})}
                        />
                        <Input
                            placeholder='Comentario'
                            leftIcon={{ type: 'font-awesome', name: 'comment' }}
                            leftIconContainerStyle={{marginRight: 15}}
                            onChangeText={(value) => this.setState({comentario: value})}
                        />
                        <Button 
                            onPress={()=>{this.gestionarComentario(excursionId);}}
                            color={colorGaztaroaOscuro}
                            title='ENVIAR'
                        />
                        <Button 
                            onPress={()=>{this.toogleModal(); this.resetForm();}}
                            title='CANCELAR'
                            type='clear'
                        />
                    </View>
                </Modal>
            </ScrollView>        
        );

    }
}
const styles = StyleSheet.create({
    formRow: {
      alignItems: 'center',
      justifyContent: 'center',
      flex: 1,
      flexDirection: 'row',
      margin: 20
    },
    formLabel: {
        fontSize: 18,
        flex: 2
    },
    formItem: {
        flex: 1
    },
    modal: {
        justifyContent: 'center',
        margin: 20
    },
    modalTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        backgroundColor: '#512DA8',
        textAlign: 'center',
        color: 'white',
        marginBottom: 20
    },
    modalText: {
        fontSize: 18,
        margin: 10
    }

});

export default connect(mapStateToProps,mapDispatchToProps)(DetalleExcursion);