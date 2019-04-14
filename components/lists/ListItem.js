import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableHighlight,
  Dimensions
} from "react-native";
import { MaterialIcons } from '@expo/vector-icons';
import colors from "../../styles/colors";
import { Rating } from 'react-native-ratings';


class ListItem extends React.Component {
  constructor(props) {
    super(props)
  }
  _onPress = () => {
    // console.log('pressed');
    this.props.route(this.props.index)
  }
  render() {
    const { name, area, rating, id } = this.props
    return (
      <TouchableHighlight key={id} onPress={this._onPress}>
        <View style={styles.container}>
          <View style={styles.infoContainer}>
            <Text style={styles.nameText}>{name}</Text>
            <Text style={styles.areaText}>{area}</Text>
            <View style={styles.ratingText}>
              <Rating
                style={{ paddingVertical: 10 }}
                imageSize={15}
                fractions={1}
                readonly={true}
                minValue={rating}
                startingValue={rating}
              />
            </View>
          </View>
          <View style={styles.navigateContainer}>
            <MaterialIcons name="directions" size={50} color={colors.white} />
          </View>
        </View>
      </TouchableHighlight>

    );
  }
}


export default ListItem;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'stretch',
    width: Dimensions.get('window').width - 30,
    height: 250,
    flexDirection: 'row',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 1,
    backgroundColor: colors.white,
    borderRadius: 10,
    marginLeft: 15,
    marginRight: 15,
  },
  infoContainer: {
    flex: 2,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  navigateContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.red01,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
  },
  nameText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.red01,
    marginBottom: 12,
  },
  areaText: {
    fontSize: 14,
    fontStyle: 'italic',
    marginBottom: 5,
  },
  ratingText: {
    justifyContent: 'flex-start',
    alignItems: 'flex-start'
  }
});