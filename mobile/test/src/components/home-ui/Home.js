import React, { Component } from 'react';
import { 
  View, 
  Text,
  StyleSheet, 
  Dimensions, 
  StatusBar, 
  TextInput, 
  TouchableOpacity,
  ScrollView
} from 'react-native';

import Swiper from "react-native-swiper";

import EvilIcons from "react-native-vector-icons/EvilIcons";
import Ionicons from "react-native-vector-icons/Ionicons";
import MCIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Entypo from "react-native-vector-icons/Entypo";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
const { width, height } = Dimensions.get('window');
const searchHeight = height / 13;
const impHeight = height / 8;
const promoHeight = height / 4;


class Home extends Component {


  render() {
    return (
      <ScrollView >
        <View style = {{ flex:1 }}>
          <StatusBar hidden= {true}/>
          <View style = {{ 
            height:searchHeight, 
            backgroundColor: "#1aa3ff", 
            justifyContent: "center", 
            alignItems: "center" ,
            flexDirection: "row" 
          }}>
            <View style = {{ 
              marginVertical: 8, 
              marginHorizontal: 15,
              borderRadius: 5, 
              backgroundColor: 'white', 
              flex: 1 ,
              justifyContent: "center",
              alignItems: "center" ,
              marginHorizontal: 10,
              flexDirection: "row"
            }}>
              <EvilIcons 
                name = "search"
                size = {32}
                color = "#c2c2a3"
              />
              <TextInput style = {{ flex: 1, paddingHorizontal: 3}}
                placeholder = "search"
                placeholderTextColor = "#c2c2a3"
                selectionColor = "#4d94ff"
                onFocus = { () => this.props.navigation.push("SearchScreen")}
              />
            </View>
            <TouchableOpacity 
              style = {{ marginRight: 8 }}
              >
              <Ionicons              
                name = "ios-notifications" 
                size = {32}
                color = "white"
              />
            </TouchableOpacity>
          </View>  
          <View style = {{ 
            height:impHeight, 
            backgroundColor: "#1aa3ff", 
            justifyContent: "space-around", 
            alignItems: "center" ,
            flexDirection: "row"          
            }}
          >
            <TouchableOpacity style = {{ 
              width: impHeight, 
              height: impHeight -10, 
              // backgroundColor: "#4d79ff", 
              marginBottom: 5,
              alignItems :"center",
              justifyContent: "center" 
            }} 
              onPress = { () => this.props.navigation.push('PayScanScreen') }
            >
              <MCIcons 
                name = "qrcode-scan"      
                size = {40}          
                color = "white"
                />
              <Text style = {{ color:"white", fontSize: 12 }} >QR Pay</Text>
            </TouchableOpacity>

            <TouchableOpacity style = {{ 
              width: impHeight + 10, 
              height: impHeight -10, 
              // backgroundColor: "#4d79ff", 
              marginBottom: 5,
              alignItems :"center",
              justifyContent: "center",
              // borderWidth: 2 
            }} >
              <FontAwesome5 
                name = "teamspeak"      
                size = {40}          
                color = "white"/>
              <Text style = {{ color:"white", fontSize: 12, textAlign: "center" }} >123,456 VND</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style = {{ 
              width: impHeight, 
              height: impHeight -10, 
              // backgroundColor: "#4d79ff", 
              marginBottom: 5,
              alignItems :"center",
              justifyContent: "center" 
            }} >
              <MCIcons 
                name = "credit-card-scan"      
                size = {40}          
                color = "white"
                />
              <Text style = {{ color:"white", fontSize: 12 }} >Connect</Text>
            </TouchableOpacity>

          </View>
          <View style = {{ 
            height:promoHeight, 
            backgroundColor: "green"      
            }}
          >
          {/* new class later */}
            <Swiper showsButtons = {true}>
              <View style = {{ flex: 1, justifyContent : "center", alignItems : "center", backgroundColor: "#9dd6eb" }}>
                <Text>Promotion 1</Text>
              </View>
              <View style = {{ flex: 1, justifyContent : "center", alignItems : "center", backgroundColor: "#9dd6b2" }}>
                <Text>Promotion 2</Text>
              </View>
              <View style = {{ flex: 1, justifyContent : "center", alignItems : "center", backgroundColor: "#97cae5" }}>
                <Text>Promotion 3</Text>
              </View>
              <View style = {{ flex: 1, justifyContent : "center", alignItems : "center", backgroundColor: "#92bbd9" }}>
                <Text>Promotion 4</Text>
              </View>
            </Swiper>
          </View>      
          <View style = {{ 
            flex:1,
            backgroundColor: "white", 
            }}
          >
          {/* flat list => split new class */}
            <View style = {{ height: 100, flexDirection: "row" }}>
              <TouchableOpacity style = {{ flex: 1, margin: 10}}>
                <View style = {{ justifyContent : "center", alignItems : "center", backgroundColor: "#4d79ff", flex: 1}}>
                  <Text>send gift</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity style = {{flex: 1, margin: 10}}>
                <View style = {{ justifyContent : "center", alignItems : "center", backgroundColor: "#4d79ff", flex: 1}}>
                  <Text>transfer</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity style = {{ flex: 1 , margin: 10}}>
                <View style = {{ justifyContent : "center", alignItems : "center", backgroundColor: "#4d79ff", flex: 1}}>
                  <Text>receive</Text>
                </View>
              </TouchableOpacity>
            </View>
            <View style = {{ height: 100, flexDirection: "row" }}>
              <TouchableOpacity style = {{ flex: 1, margin: 10}}>
                <View style = {{ justifyContent : "center", alignItems : "center", backgroundColor: "#4d79ff", flex: 1}}>
                  <Text>phone card</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity style = {{flex: 1, margin: 10}}>
                <View style = {{ justifyContent : "center", alignItems : "center", backgroundColor: "#4d79ff", flex: 1}}>
                  <Text>bill</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity style = {{ flex: 1, margin: 10}}>
                <View style = {{ justifyContent : "center", alignItems : "center", backgroundColor: "#4d79ff", flex: 1}}>
                  <Text>movie ticket</Text>
                </View>
              </TouchableOpacity>
            </View>

            <View style = {{ height: 100, flexDirection: "row" }}>
              <TouchableOpacity style = {{ flex: 1, margin: 10}}>
                <View style = {{ justifyContent : "center", alignItems : "center", backgroundColor: "#4d79ff", flex: 1}}>
                  <Text>air ticket</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity style = {{flex: 1, margin: 10}}>
                <View style = {{ justifyContent : "center", alignItems : "center", backgroundColor: "#4d79ff", flex: 1}}>
                  <Text>...</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity style = {{ flex: 1, margin: 10}}>
                <View style = {{ justifyContent : "center", alignItems : "center", backgroundColor: "#4d79ff", flex: 1}}>
                  <Text>...</Text>
                </View>
              </TouchableOpacity>
            </View>

          </View>
        </View>
      </ScrollView>
    );
  }
}
export default Home;