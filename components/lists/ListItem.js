import React from "react";
import { 
  View,
  Text,
  StyleSheet
} from "react-native";

const ListItem = ({name, area, rating}) => (
  <View style={styles.container}>
    <View style={styles.infoContainer}>
      <Text>{name}</Text>
      <Text>{area}</Text>  
    </View>
    <View style={styles.ratingContainer}>
      <Text>{rating}</Text>
    </View>
  </View>
  )
export default ListItem;

const styles = StyleSheet.create({
  container: {
    flex: 4,
    alignItems: 'stretch',
   
    flexDirection:'row',
    padding:15,
    backgroundColor:'aqua',
  },
  infoContainer:{
    flex:3,
    backgroundColor:'pink',
    justifyContent: 'center',

  },
  ratingContainer:{
    flex:1,
    justifyContent: 'center',
    backgroundColor:'yellow',
    alignItems: 'center',


  }

});