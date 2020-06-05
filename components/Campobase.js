import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { Icon, Image, Text } from 'react-native-elements';

import { NavigationContainer, DrawerActions } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerContent } from '@react-navigation/drawer';
import { SafeAreaView } from 'react-native-safe-area-context';
import Constants from 'expo-constants';

import { colorGaztaroaClaro } from '../comun/comun';

import { connect } from 'react-redux';
import { fetchExcursiones, fetchComentarios, fetchCabeceras, fetchActividades} from '../redux/ActionCreators';

import Calendario from './Calendario';
import DetalleExcursion from './DetalleExcursionComponent';
import Contacto from './ContactoComponent';
import QuienesSomos from './QuienesSomosComponent';
import Home from './HomeComponent';
import PruebaEsfuerzo from './PruebaEsfuerzoComponent';
import VistaFavoritos from './VistaFavoritosComponent';




const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

function CalendarioNavegador({navigation}) {
  return (
    <Stack.Navigator
      initialRouteName="Calendario"
      headerMode="screen"
      screenOptions={{
        headerTintColor: '#fff',
        headerStyle: { backgroundColor: '#015afc' },
        headerTitleStyle: { color: '#fff' },
      }}
    >
      <Stack.Screen
        name="Calendario"
        component={Calendario}
        options={{
          title: 'Calendario Gaztaroa',
          headerLeft: () => (
            <Icon name="menu" 
              size={28} 
              color='white'
              onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}/>
            ),
        }}
      />
      <Stack.Screen
        name="DetalleExcursion"
        component={DetalleExcursion}
        options={{
          title: 'Detalle Excursión',
        }}
      />
    </Stack.Navigator>
  );
}

function VistaFavoritosNavegador({navigation}) {
  return (
    <Stack.Navigator
      initialRouteName="Excursiones Favoritas"
      headerMode="screen"
      screenOptions={{
        headerTintColor: '#fff',
        headerStyle: { backgroundColor: '#015afc' },
        headerTitleStyle: { color: '#fff' },
        headerLeft: () => (
          <Icon name="menu" 
            size={28} 
            color='white'
            onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}/>
          )
      }}
    >
      <Stack.Screen
        name="Vista favoritos"
        component={VistaFavoritos}
        options={{
          title: 'Vista favoritos',
        }}
      />
    </Stack.Navigator>
  );
}


function HomeNavegador({navigation}){
  return(
    <Stack.Navigator
      initialRouteName='Home'
      headerMode='screen'
      screenOptions={{
        headerTintColor: '#fff',
        headerStyle: { backgroundColor: '#015afc' },
        headerTitleStyle: { color: '#fff'},
        headerLeft: () => (
          <Icon name="menu" 
            size={28} 
            color='white'
            onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}/>
          ),
      }}>
        <Stack.Screen
          name='Home'
          component={Home}
          options={{
            title: 'Campo base'
          }}
        />
    </Stack.Navigator>
  );
}

function ContactoNavegador({navigation}){
  return(
    <Stack.Navigator
      initialRouteName='Home'
      headerMode='screen'
      screenOptions={{
        headerTintColor: '#fff',
        headerStyle: { backgroundColor: '#015afc' },
        headerTitleStyle: { color: '#fff'},
        headerLeft: () => (
          <Icon name="menu" 
            size={28} 
            color='white'
            onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}/>
          ),
    }}>
      <Stack.Screen
        name="Contacto"
        component={Contacto}
        options={{
          title: 'Contacto',
        }}
      />
    </Stack.Navigator>
  );
}

function PruebaEsfuerzoNavegador({navigation}){
  return(
    <Stack.Navigator
      initialRouteName='Home'
      headerMode='screen'
      screenOptions={{
        headerTintColor: '#fff',
        headerStyle: { backgroundColor: '#015afc' },
        headerTitleStyle: { color: '#fff'},
        headerLeft: () => (
          <Icon name="menu" 
            size={28} 
            color='white'
            onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}/>
          ),
    }}>
      <Stack.Screen
        name="Prueba de Esfuerzo"
        component={PruebaEsfuerzo}
        options={{
          title: 'Prueba de Esfuerzo',
        }}
      />
    </Stack.Navigator>
  );
}

function QuienesSomosNavegador({navigation}){
  return(
    <Stack.Navigator
      initialRouteName='Home'
      headerMode='screen'
      screenOptions={{
        headerTintColor: '#fff',
        headerStyle: { backgroundColor: '#015afc' },
        headerTitleStyle: { color: '#fff'},
        headerLeft: () => (
          <Icon name="menu" 
            size={28} 
            color='white'
            onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}/>
          ),
    }}>
      <Stack.Screen
        name="Quienes Somos "
        component={QuienesSomos}
        options={{
          title: 'Quienes Somos',
        }}
      />
    </Stack.Navigator>
  );
}

function CustomDrawerContent(props){
  return(
    <DrawerContentScrollView {...props}>
      <SafeAreaView style={styles.container} forceInset={{top: 'always', horizontal: 'never'}}>
        <View style={styles.drawerHeader}>
          <View style={{flex: 1}}>
            <Image source={require('../imagenes/logo.png')} style={styles.drawerImage}/>
          </View>
          <View style={{flex: 2}}>
            <Text style={styles.drawerHeaderText}>Gaztaroa</Text>
          </View>
        </View>
        <DrawerItemList {...props}/>
      </SafeAreaView>
    </DrawerContentScrollView>
  );
}

function DrawerNavegador(){
  return(
    <Drawer.Navigator
      drawerStyle={{
        backgroundColor: '#c2d3da',
      }}
      initialRouteName='Home'
      drawerContent={props => <CustomDrawerContent {...props} />}
    >
      <Drawer.Screen name='Home' component={HomeNavegador}
        options={{
          drawerIcon: ({ tintColor }) => (
            <Icon 
              name='home'
              type='font-awesome'
              size={22}
              color={tintColor}
            />
          )
        }}
      />
      <Drawer.Screen name='Calendario' component={CalendarioNavegador}
        options={{
          drawerIcon: ({ tintColor }) => (
            <Icon 
              name='calendar'
              type='font-awesome'
              size={22}
              color={tintColor}
            />
          )
        }}
      />
      <Drawer.Screen name='Quienes Somos' component={QuienesSomosNavegador}
        options={{
          drawerIcon: ({ tintColor }) => (
            <Icon 
              name='info-circle'
              type='font-awesome'
              size={22}
              color={tintColor}
            />
          )
        }}  
      />

      <Drawer.Screen name='Prueba de Esfuerzo' component={PruebaEsfuerzoNavegador}
        options={{
          drawerIcon: ({ tintColor }) => (
            <Icon 
              name='heartbeat'
              type='font-awesome'
              size={22}
              color={tintColor}
            />
          )
        }}
      />

      <Drawer.Screen name='Excursiones Favoritas' component={VistaFavoritosNavegador}
        options={{
          drawerIcon: ({ tintColor }) => (
            <Icon 
              name='thumbs-up'
              type='font-awesome'
              size={22}
              color={tintColor}
            />
          )
        }}
      />

      <Drawer.Screen name='Contacto' component={ContactoNavegador}
        options={{
          drawerIcon: ({ tintColor }) => (
            <Icon 
              name='address-card'
              type='font-awesome'
              size={22}
              color={tintColor}
            />
          )
        }}
      />
    </Drawer.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flex:1,
  },
  drawerHeader: {
    backgroundColor: colorGaztaroaClaro,
    height: 100,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    flexDirection: 'row'
  },
  drawerHeaderText: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold'
  },
  drawerImage: {
    margin: 10,
    width: 80,
    height: 60
  }
});


// -------------------- REDUX ------------------------
const mapStateToProps = state => {
  return {
    excursiones: state.excursiones,
    comentarios: state.comentarios,
    cabeceras: state.cabeceras,
    actividades: state.actividades
  }
}
const mapDispachToProps = dispatch => ({
  fetchExcursiones: () => dispatch(fetchExcursiones()),
  fetchComentarios: () => dispatch(fetchComentarios()),
  fetchCabeceras: () => dispatch(fetchCabeceras()),
  fetchActividades: () => dispatch(fetchActividades()),
})

class Campobase extends Component {

  componentDidMount(){
    this.props.fetchExcursiones();
    this.props.fetchComentarios();
    this.props.fetchCabeceras();
    this.props.fetchActividades();
  }

  render() {
 
    return (
      <NavigationContainer>
        <View style={{flex:1, paddingTop: Platform.OS === 'android' ? 0 : Constants.statusBarHeight }}>
          <DrawerNavegador />
        </View>      
      </NavigationContainer>
    );
  }
}

export default connect(mapStateToProps, mapDispachToProps)(Campobase);