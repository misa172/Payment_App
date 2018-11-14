import React, { Component } from 'react';
import { View, Text, Dimensions } from 'react-native';    
import LoginInput from '../custom-ui/login-input/LoginInput';
import {  Button, Toast } from 'native-base';
import { getForgotPassword }  from '../../no-redux/login';
import isEmpty from "../../validations/is-empty.validate";
const height = Dimensions.get('window').height;


class ForgotPassword extends Component {

  static navigationOptions = ({ navigation, navigationOptions }) => {
    return{
      headerStyle: {
        backgroundColor:'#42A5F5DC',
        // height: 40
      },
      headerTintColor: 'white',
      headerTitle: 'Forgot password'
    };
  };

  constructor(props) {
    super(props);
    this.state = { 
      emailOrPhone: '',
      errors: '',
    };
    this.handleForgotPassword = this.handleForgotPassword.bind(this);
  }

  handleForgotPassword(e) {
    getForgotPassword(this.state.emailOrPhone).then ( api => {
      if(api.type == false) this.setState({ errors: api.errors });
      else Toast.show({ text: 'Send password success', buttonText: 'Okay', type: "success" });
    });
  }

  onChangeTextEmailOrPhone(text) {
    // alert(JSON.stringify(this.props.errors));
    if(!isEmpty(this.state.errors.emailOrPhone)) {
      let { errors } = this.state;
      delete errors.emailOrPhone;
      this.setState({ emailOrPhone: text, errors});
    } else  this.setState({ emailOrPhone: text }); 
  }

  render() {
    const { errors } = this.state;
    return (
      <View style = {{ flex: 1}}>
        <View style = {{ marginHorizontal: 15  }}>
          <LoginInput 
            label = {'Email / Phone'} 
            onChangeText = { text => this.onChangeTextEmailOrPhone(text) }
            errorMessage = { errors.emailOrPhone }
            />
          <View style={{ height:height/40}} />
          <Button onPress = { this.handleForgotPassword } block style = {{ backgroundColor: '#ff1a1a' }}>
            <Text style = {{ color: '#fff',fontSize: 18, textDecorationLine: 'underline' }}>Get the password</Text>
          </Button>
          <View style={{ height:height/54}} />
        </View>
        <View style = {{ justifyContent: 'center', alignItems: 'center' }}>
          <Text style = {{ fontSize: 15}}>Please provide email address to get the password</Text>
        </View>
      </View>
    );
  }
}


export default ForgotPassword;