import React from 'react';
import { FlatList, Alert } from 'react-native';
import { ListItem } from 'react-native-elements';

import { baseUrl } from '../comun/comun';
import { connect } from 'react-redux';

import { IndicadorActividad } from './IndicadorActividadComponent';
import Swipeout from 'react-native-swipeout';

import { borrarFavorito } from '../redux/ActionCreators';

console.disableYellowBox = true;

const mapStateToProps = state =>  {
    return{
        excursiones: state.excursiones,
        favoritos: state.favoritos
    }
}
const mapDispatchToProps = dispatch => ({
    borrarFavorito: (excursionId) => dispatch(borrarFavorito(excursionId))
})

class VistaFavoritos extends React.Component {
    
    render(){
        
        const renderFavoritoItem = ({item, index}) => {
            
            const { navigate } = this.props.navigation;
            const rightButton = [
                {
                    text: 'Borrar',
                    type: 'delete',
                    onPress: () =>  Alert.alert(
                        "Borrar Excursion Favorita?",
                        "Confime que desea borrar la excursion" + item.nombre,
                        [
                          {
                            text: "Cancel",
                            onPress: () => console.log(item.nombre + "Favorito no borrado"),
                            style: "cancel"
                          },
                          { text: "OK", onPress: () => this.props.borrarFavorito(item.id) }
                        ],
                        { cancelable: false }
                      )
                }
            ]

            return (
                <Swipeout right={rightButton} autoClose={true}>
                    <ListItem
                        key={index}
                        title={item.nombre}
                        subtitle={item.descripcion}
                        hideChevron={true}
                        onPress={() => navigate('DetalleExcursion', { excursionId: item.id })}
                        leftAvatar={{ source: { uri: baseUrl + item.imagen}}}
                        onLongPress={() =>  Alert.alert(
                            "Borrar Excursion Favorita?",
                            "Confime que desea borrar la excursion" + item.nombre,
                            [
                              {
                                text: "Cancel",
                                onPress: () => console.log(item.nombre + "Favorito no borrado"),
                                style: "cancel"
                              },
                              { text: "OK", onPress: () => this.props.borrarFavorito(item.id) }
                            ],
                            { cancelable: false }
                          )
                      }
                    />
                </Swipeout>

            );
        }

        if (this.props.excursiones.isLoading){
            return(
                <IndicadorActividad/>
            );
        }else if(this.props.excursiones.errMess){
            return(
                <View>
                    <Text>{props.errMess}</Text>
                </View>
            );
        }
        else{
            return (
                <FlatList 
                    data={this.props.excursiones.excursiones.filter(
                        excursion => this.props.favoritos.some(el => el === excursion.id)
                    )}
                    renderItem={renderFavoritoItem}
                    keyExtractor={item => item.id.toString()}
                />
            );
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(VistaFavoritos);