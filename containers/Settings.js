import React, { Component } from "react";
import {
    View,
    Text,
    AsyncStorage
} from "react-native";
import { Container, Content, Header, Left, Card, CardItem } from 'native-base';
import colors from '../styles/colors';
import { FontAwesome } from '@expo/vector-icons';
import RoundedButton from '../components/buttons/RoundedButton';
import firebase from 'firebase';

class Settings extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user_id: '',
            user_data: { email: '', givenName: '', familyName: '', name: '', photoUrl: '' },
        }
    }
    async componentWillMount() {
        try {
            let user_data = await AsyncStorage.getItem('user_info');
            let user_id = await AsyncStorage.getItem('user_id');
            this.setState({ user_id: user_id });
            this.setState({ user_data: { email: JSON.parse(user_data).email, givenName: JSON.parse(user_data).givenName, familyName: JSON.parse(user_data).familyName, name: JSON.parse(user_data).name, photoUrl: JSON.parse(user_data).photoUrl } });
        } catch (err) {

            console.log("err from settings module", err);
        }
    }
    render() {
        return (
            <Container>
                <Header style={{ backgroundColor: colors.red01, height: 90, borderBottomColor: colors.grey }}>
                    <Left>
                        <Text style={{ color: colors.white, marginLeft: 15, fontSize: 20, fontWeight: '700' }}>Settings</Text>
                    </Left>
                </Header>
                <Content>
                    <Card>
                        <CardItem>
                            <Text style={{ fontSize: 18, fontWeight: '700', paddingBottom: 10 }}>Account</Text>
                        </CardItem>
                        <CardItem>
                            <Left>
                                <Text>User Name</Text>
                            </Left>
                            <Text>{this.state.user_data.name}</Text>
                        </CardItem>
                        <CardItem>
                            <Left>
                                <Text>Email Address</Text>
                            </Left>
                            <Text>{this.state.user_data.email}</Text>
                        </CardItem>
                    </Card>
                    <Card>
                        <CardItem>
                            <Text style={{ fontSize: 18, fontWeight: '700', paddingBottom: 10 }}>FuelPe App 0.1.10</Text>
                        </CardItem>
                        <CardItem>
                            <Left>
                                <Text>View Tutorial</Text>
                            </Left>
                            <FontAwesome name="chevron-right" size={16} style={{ color: colors.red01 }} />
                        </CardItem>
                        <CardItem>
                            <Left>
                                <Text>Frequently Asked Questions</Text>
                            </Left>
                            <FontAwesome name="chevron-right" size={16} style={{ color: colors.red01 }} />
                        </CardItem>
                        <CardItem>
                            <Left>
                                <Text>How it Works</Text>
                            </Left>
                            <FontAwesome name="chevron-right" size={16} style={{ color: colors.red01 }} />
                        </CardItem>
                    </Card>
                    <Card>
                        <CardItem>
                            <Text style={{ fontSize: 18, fontWeight: '700', paddingBottom: 10 }}>Legal</Text>
                        </CardItem>
                        <CardItem>
                            <Left>
                                <Text>Terms & Conditions</Text>
                            </Left>
                            <FontAwesome name="chevron-right" size={16} style={{ color: colors.red01 }} />
                        </CardItem>
                        <CardItem>
                            <Left>
                                <Text>Privacy Policy</Text>
                            </Left>
                            <FontAwesome name="chevron-right" size={16} style={{ color: colors.red01 }} />
                        </CardItem>
                    </Card>
                    <View style={{marginTop: 10}}></View>
                    <RoundedButton
                        text="SIGN OUT"
                        textColor={colors.white}
                        background={colors.black}
                        handleOnPress={() => firebase.auth().signOut()}
                        style={{ fontWeight: '700' }}
                    />
                </Content>
            </Container>
        );
    }
}
export default Settings;