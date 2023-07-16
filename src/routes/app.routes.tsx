import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Inicio } from '../pages/Inicio';
import { Registro } from '../pages/Registro';

const {Navigator, Screen}= createNativeStackNavigator();

export function AppRoutes() {
    return(
      <Navigator screenOptions={{ headerShown: false }}>
          <Screen name='inicio' component={Inicio}/>
          <Screen name='registro' component={Registro}/>       
      </Navigator>
    );
}