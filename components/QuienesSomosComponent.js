import React, { Component } from 'react';

import { ScrollView, FlatList, SafeAreaView, View } from 'react-native';
import {Card, Text, ListItem} from 'react-native-elements';

import { baseUrl } from '../comun/comun';
import { connect } from 'react-redux';
import { IndicadorActividad } from './IndicadorActividadComponent';


const mapStateToProps = state =>  {
    return{
        actividades: state.actividades
    }
}
function HistoriaRender(){
    return(
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
    );
}

function ActividadesRecursosRender(props){

    if (props.isLoading){
        return(
            <IndicadorActividad/>
        );
    }else if(props.errMess){
        return(
            <View>
                <Text>{props.errMess}</Text>
            </View>
        );
    }
    else{
        return(
            <Card
                title="Actividades y recursos"
                constainerStyle={{marginBottom: 10}}
            >
                <FlatList
                    data={props.data}
                    renderItem={props.renderItem}
                    keyExtractor={item => item.id.toString()}
                />
            </Card>
        );
    }
}

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

class QuienesSomos extends Component {

    render(){       
        return(
            <>
            <SafeAreaView style={{ flex: 1 }}>
            <ScrollView>
                
                <HistoriaRender/>
                <ActividadesRecursosRender
                    data={this.props.actividades.actividades}
                    renderItem={renderQuienesSomosItem}
                    isLoading ={this.props.actividades.isLoading}
                    errMess={this.props.actividades.errMess} 
                />
            </ScrollView>
            </SafeAreaView>
            </>    
        );
    }
}

export default connect(mapStateToProps)(QuienesSomos);