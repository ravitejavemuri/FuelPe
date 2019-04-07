import React from "react";
import { 
  View,
  Text,
  StyleSheet
} from "react-native";

const ListItem = ({name, area, rating}) => (
  <View style={styles.container}>
    <View style={styles.infoContainer}>
      <Text style={styles.nameText}>{name}</Text>
      <Text style={styles.areaText}>{area}</Text>  
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
    height:120,
    flexDirection:'row',
    padding:5,
    backgroundColor:'grey',
  },
  infoContainer:{
    flex:3,
    backgroundColor:'white',
    justifyContent: 'center',
    padding:2
    

  },
  ratingContainer:{
    flex:1,
    justifyContent: 'center',
    backgroundColor:'yellow',
    alignItems: 'center',
    padding:2
  },
  nameText : {
    fontSize :13,
    fontWeight:'bold',
    padding:2
  },
  areaText : {
    fontSize :12,
    fontStyle:'italic',
    //color:'grey'
  }


});