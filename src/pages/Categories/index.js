import NavigationContainer from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import AllCategories from "./AllCategories.js";
import FrasesInsideCategorie from "./FrasesInsideCategorie.js";

export default function Categories(){
  const categStack = createNativeStackNavigator()

  return(
      <categStack.Navigator>
        <categStack.Screen name="AllCategories" component={AllCategories} options={{headerShown:false}}/>
        <categStack.Screen name="FrasesInsideCategorie" component={FrasesInsideCategorie} />
      </categStack.Navigator >
  )
}