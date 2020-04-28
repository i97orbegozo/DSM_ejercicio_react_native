import React, { Component } from 'react';

import { ScrollView, FlatList, SafeAreaView } from 'react-native';
import {Card, Text, ListItem} from 'react-native-elements';

import { baseUrl } from '../comun/comun';
import { connect } from 'react-redux';


const mapStateToProps = state =>  {
    return{
        actividades: state.actividades
    }
}

class QuienesSomos extends Component {

    render(){
        const renderQuienesSomosItem = ({item, index}) => {
            
            return (
                    <ListItem
                        key={index}
                        title={item.nombre}
                        subtitle={item.descripcion}
                        hideChevron={true}
                        //onPress={() => navigate('DetalleExcursion', { excursionId: item.id })}
                        leftAvatar={{ source: {uri: baseUrl + item.imagen}}}
                    />
            );
        }

       
        return(
            <>
            <SafeAreaView style={{ flex: 1 }}>
            <ScrollView>
                <Card
                    title="Un poquito de historia"
                    style={{margin: 10}}
                >
                    <Text style={{margin: 10}}>
                    El nacimiento del club de montaña Gaztaroa se remonta a la primavera de 1976 cuando jóvenes aficionados a la montaña y pertenecientes a un club juvenil decidieron crear la sección montañera de dicho club. Fueron unos comienzos duros debido sobre todo a la situación política de entonces. Gracias al esfuerzo económico de sus socios y socias se logró alquilar una bajera. Gaztaroa ya tenía su sede social. 
                    Desde aquí queremos hacer llegar nuestro agradecimiento a todos los montañeros y montañeras que alguna vez habéis pasado por el club aportando vuestro granito de arena. 
                    </Text>
                    <Text style={{margin: 10}}>
                    Gracias! 
                    </Text>
                </Card>

                <Card
                    title="Actividades y recursos"
                    constainerStyle={{marginBottom: 10}}
                >
                    <FlatList
                        data={this.props.actividades.actividades}
                        renderItem={renderQuienesSomosItem}
                        keyExtractor={item => item.id.toString()}
                    />
                </Card>
            </ScrollView>
            </SafeAreaView>
            </>    
        );
    }
}

export default connect(mapStateToProps)(QuienesSomos);