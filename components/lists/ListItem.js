import React from "react";
import { 
  View,
  Text,
  StyleSheet,
  TouchableHighlight
} from "react-native";



class ListItem extends React.Component {
  constructor(props){
    super(props)
  }
  _onPress = () => {
    // console.log('pressed');
    this.props.route(this.props.index)
  }
  render() {
    const { name, area, rating, id} = this.props
    return (
       <TouchableHighlight key={id} onPress={this._onPress}>
    <View style={styles.container}>
      <View style={styles.infoContainer}>
        <Text style={styles.nameText}>{name}</Text>
        <Text style={styles.areaText}>{area}</Text>  
      </View>
      <View style={styles.ratingContainer}>
        <Text>{rating}</Text>
      </View>
    </View>
    </TouchableHighlight>

    );
  }
}


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