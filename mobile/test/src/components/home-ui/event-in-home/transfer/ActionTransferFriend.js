import React, { Component } from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, ImageBackground } from 'react-native';
import { rechargeMoney } from '../../../../no-redux/recharge'
const { width, height } = Dimensions.get('window');
import { Form, Item, Input, Label, Button, Icon, Left,Thumbnail } from 'native-base';
import Modal from "react-native-modal";
import RNEventSource from 'react-native-event-source'
import isEmpty from '../../../../validations/is-empty.validate'
import GLOBAL from "../../../../config";
import {queryUserMoney} from "../../../../realm/userQueries"
const moneyUser = height /4
class ActionTransferFriend extends Component {
  constructor(props) {
    super(props);
    this.state = {
      money: "10000",
      modalVisible: false,
      passWord: "",
      sucessOrNot: null,
      modalFee:0,
      modalTime:"",
      modalID:"",
      modalPro:""
    };
    this.setModalVisible = this.setModalVisible.bind(this);
    this.setPassword = this.setPassword.bind(this);
    console.log(this.props.navigation.state.params.target);
  }
  
  setModalVisible(visible) {
    this.setState({
      modalVisible: visible,
      passWord: ""
    });
  }

  setPassword(value) {
    if (this.state.passWord.length >= 5) {
      if (this.state.passWord.length == 5) {
        this.setState({ passWord: this.state.passWord + value })
        rechargeMoney( this.state.money).then(result => {
          if(result.value["status"]==1)
            this.setState({
              modalVisible: !this.state.modalVisible,
              passWord: "",
              sucessOrNot: true,
              modalFee:result.value["Fee"],
              modalTime:result.value["DateTrans"],
              modalID:result.value["TranID"],
              modalPro:result.value["MoneyPromotion"]
            });
          else{
            this.setState({
              modalVisible: !this.state.modalVisible,
              passWord: "",
            });
          alert("error");
          }
        });
      }
    }
    else {
      this.setState({ passWord: this.state.passWord + value })
    }
  }
  render() {
    const { money } = this.state;
    return (
      <View style={{ flex: 1 }}>
        {/* Top bar */}
        <View style={{
          height: 50,
          backgroundColor: "#1aa3ff",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "row"
        }}>
          <TouchableOpacity style={{ marginLeft: 7 }} onPress={() => this.props.navigation.goBack()} >
            {/* <Ionicons
              name="ios-arrow-back"
              size={35}
              color="white"
            /> */}
            <Icon type='Ionicons' name='ios-arrow-back' style={{ color: "#fafafa" }} fontSize={35} />
          </TouchableOpacity>
          <View style={{ flex: 1 }}>
            <Text style={{ textAlign: "center", color: "white", fontWeight: "500", fontSize: 18 }} >{this.props.navigation.state.params.target.name}</Text>
          </View>
        </View>
        <View style={{
          height: moneyUser,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#EDEDED"
        }}>
        <ImageBackground source={require('../../../../image/background.png')} style={styles.backgroundImage} >
       
           <Thumbnail source={{uri:this.props.navigation.state.params.target.avatar}} large/>
          <Text style={{ textAlign: "center", color: "#424242", fontWeight: "300", fontSize: 25 }} >{this.props.navigation.state.params.target.name}</Text>
          <Text style={{ textAlign: "center", color: "#424242", fontWeight: "300", fontSize: 20 }} >Số ĐT: {this.props.navigation.state.params.target.phone}</Text>
          </ImageBackground>
        </View>
        <View style={{
          flex: 1,
          backgroundColor: "#ffffff"
        }} >
          <Form style={{
            marginTop: 10
          }}>
            <Item floatingLabel>
              <Label>Nhập số tiền</Label>
              <Input editable={false} value={this.state.money} />
            </Item>
          </Form>
          <Form style={{
            marginTop: 10
          }}>
            <Item floatingLabel>
              <Label>Lời nhắn</Label>
              <Input editable={false} value={this.state.money} />
            </Item>
          </Form>
          <Button style={{
            width: width - 20,
            marginTop: 30,
            marginLeft: 10,
            marginRight: 10
          }} block bordered iconRight textStyle="#1aa3ff"
            onPress={() => {
              if(this.state.money.length>0)
                this.setModalVisible(!this.state.modalVisible);
            }}>
            <Icon type='MaterialCommunityIcons' name='verified' style={{ color: "#1565c0" }} />
            <Text style={{ color: "#1565c0" }}>Xác nhận</Text>
          </Button>
        </View>
        <View style={{
          flex: 1,
          backgroundColor: "#ffffff",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "row"
        }}>
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: "#f5f5f5" }} >
            <View style={{ flex: 1, alignSelf: 'center', flexDirection: 'row', }}>
              <TouchableOpacity style={{ width: '33%', alignItems: 'center', justifyContent: 'center' }}
                onPress={() => this.setState({ money: this.state.money + "1" })}
              ><Text style={{ color: "black" }}>1</Text></TouchableOpacity>
              <TouchableOpacity style={{ width: '33%', alignItems: 'center', justifyContent: 'center' }}
                onPress={() => this.setState({ money: this.state.money + "2" })}><Text style={{ color: "black" }}>2</Text></TouchableOpacity>
              <TouchableOpacity style={{ width: '33%', alignItems: 'center', justifyContent: 'center' }}
                onPress={() => this.setState({ money: this.state.money + "3" })}><Text style={{ color: "black" }}>3</Text></TouchableOpacity>
            </View>
            <View style={{ flex: 1, alignSelf: 'center', flexDirection: 'row' }}>
              <TouchableOpacity style={{ width: '33%', alignItems: 'center', justifyContent: 'center' }}
                onPress={() => this.setState({ money: this.state.money + "4" })}><Text style={{ color: "black" }}>4</Text></TouchableOpacity>
              <TouchableOpacity style={{ width: '33%', alignItems: 'center', justifyContent: 'center' }}
                onPress={() => this.setState({ money: this.state.money + "5" })}><Text style={{ color: "black" }}>5</Text></TouchableOpacity>
              <TouchableOpacity style={{ width: '33%', alignItems: 'center', justifyContent: 'center' }}
                onPress={() => this.setState({ money: this.state.money + "6" })}><Text style={{ color: "black" }}>6</Text></TouchableOpacity>
            </View>
            <View style={{ flex: 1, alignSelf: 'center', flexDirection: 'row' }}>
              <TouchableOpacity style={{ width: '33%', alignItems: 'center', justifyContent: 'center' }}
                onPress={() => this.setState({ money: this.state.money + "7" })}><Text style={{ color: "black" }}>7</Text></TouchableOpacity>
              <TouchableOpacity style={{ width: '33%', alignItems: 'center', justifyContent: 'center' }}
                onPress={() => this.setState({ money: this.state.money + "8" })}><Text style={{ color: "black" }}>8</Text></TouchableOpacity>
              <TouchableOpacity style={{ width: '33%', alignItems: 'center', justifyContent: 'center' }}
                onPress={() => this.setState({ money: this.state.money + "9" })}><Text style={{ color: "black" }}>9</Text></TouchableOpacity>
            </View>
            <View style={{ flex: 1, alignSelf: 'center', flexDirection: 'row' }}>
              <TouchableOpacity style={{ width: '33%', alignItems: 'center', justifyContent: 'center' }}
                onPress={() => this.setState({ money: this.state.money + "0" })}><Text style={{ color: "black" }}>0</Text></TouchableOpacity>
              <TouchableOpacity style={{ width: '33%', alignItems: 'center', justifyContent: 'center' }}
                onPress={() => this.setState({ money: this.state.money + "000" })}><Text style={{ color: "black" }}>000</Text></TouchableOpacity>
              <TouchableOpacity style={{ width: '33%', alignItems: 'center', justifyContent: 'center' }}
                onPress={() => this.setState({ money: this.state.money.substring(0, (this.state.money.length - 1)) })}
                onLongPress={() => this.setState({ money: "" })} >
                <Icon type='Ionicons' name='ios-backspace' style={{ color: "black" }} /></TouchableOpacity>
            </View>
          </View>
        </View>
        <Modal
          aanimationIn="slideInUp"
          animationOut="slideOutDown"
          transparent={true}
          isVisible={this.state.modalVisible}
          style={{ margin: 0, flex: 1 }}>
          <View style={{ height: "50%", backgroundColor: 'rgba(0,0,0,0.5)' }}>
          </View>
          <View backgroundColor="#ffffff" style={{ height: "50%" }}>
            <View style={{ marginTop: 10, flexDirection: "row", alignItems: 'center', justifyContent: 'center' }}>
              <Text>Nhập mật khẩu để nạp tiền</Text>
            </View>
            <View style={{ flexDirection: "row", alignItems: 'center', justifyContent: 'center' }}>
              <View style={this.state.passWord.length > 0 ? styles.circleRounded : styles.circle} />
              <View style={this.state.passWord.length > 1 ? styles.circleRounded : styles.circle} />
              <View style={this.state.passWord.length > 2 ? styles.circleRounded : styles.circle} />
              <View style={this.state.passWord.length > 3 ? styles.circleRounded : styles.circle} />
              <View style={this.state.passWord.length > 4 ? styles.circleRounded : styles.circle} />
              <View style={this.state.passWord.length > 5 ? styles.circleRounded : styles.circle} />
            </View>
            <View style={{
              flex: 1,
              backgroundColor: "#ffffff",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "row"
            }}>
              <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: "#f5f5f5" }} >
                <View style={{ flex: 1, alignSelf: 'center', flexDirection: 'row', }}>
                  <TouchableOpacity style={{ width: '33%', alignItems: 'center', justifyContent: 'center' }}
                    onPress={() => {
                      this.setPassword(1)
                    }}
                  ><Text style={{ color: "black" }}>1</Text></TouchableOpacity>
                  <TouchableOpacity style={{ width: '33%', alignItems: 'center', justifyContent: 'center' }}
                    onPress={() => this.setPassword(2)}><Text style={{ color: "black" }}>2</Text></TouchableOpacity>
                  <TouchableOpacity style={{ width: '33%', alignItems: 'center', justifyContent: 'center' }}
                    onPress={() => this.setPassword(3)}><Text style={{ color: "black" }}>3</Text></TouchableOpacity>
                </View>
                <View style={{ flex: 1, alignSelf: 'center', flexDirection: 'row' }}>
                  <TouchableOpacity style={{ width: '33%', alignItems: 'center', justifyContent: 'center' }}
                    onPress={() => this.setPassword(4)}><Text style={{ color: "black" }}>4</Text></TouchableOpacity>
                  <TouchableOpacity style={{ width: '33%', alignItems: 'center', justifyContent: 'center' }}
                    onPress={() => this.setPassword(5)}><Text style={{ color: "black" }}>5</Text></TouchableOpacity>
                  <TouchableOpacity style={{ width: '33%', alignItems: 'center', justifyContent: 'center' }}
                    onPress={() => this.setPassword(6)}><Text style={{ color: "black" }}>6</Text></TouchableOpacity>
                </View>
                <View style={{ flex: 1, alignSelf: 'center', flexDirection: 'row' }}>
                  <TouchableOpacity style={{ width: '33%', alignItems: 'center', justifyContent: 'center' }}
                    onPress={() => this.setPassword(7)}><Text style={{ color: "black" }}>7</Text></TouchableOpacity>
                  <TouchableOpacity style={{ width: '33%', alignItems: 'center', justifyContent: 'center' }}
                    onPress={() => this.setPassword(8)}><Text style={{ color: "black" }}>8</Text></TouchableOpacity>
                  <TouchableOpacity style={{ width: '33%', alignItems: 'center', justifyContent: 'center' }}
                    onPress={() => this.setPassword(9)}><Text style={{ color: "black" }}>9</Text></TouchableOpacity>
                </View>
                <View style={{ flex: 1, alignSelf: 'center', flexDirection: 'row' }}>
                  <TouchableOpacity style={{ width: '33%', alignItems: 'center', justifyContent: 'center', backgroundColor: "#e0e0e0" }}
                    onPress={() => this.setModalVisible(!this.state.modalVisible)}>
                    <Icon type='Entypo' name='cross' style={{ color: "black" }} />
                  </TouchableOpacity>
                  <TouchableOpacity style={{ width: '33%', alignItems: 'center', justifyContent: 'center' }}
                    onPress={() => this.setPassword(0)}><Text style={{ color: "black" }}>0</Text></TouchableOpacity>
                  <TouchableOpacity style={{ width: '33%', alignItems: 'center', backgroundColor: "#e0e0e0", justifyContent: 'center' }}
                    onPress={() => this.setState({ passWord: this.state.passWord.substring(0, (this.state.passWord.length - 1)) })}>
                    <Icon type='Ionicons' name='ios-backspace' style={{ color: "black" }} /></TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </Modal>

        <Modal
          isVisible={this.state.sucessOrNot === true}>
          <View style={styles.modalContent}>
            <View style={{flexDirection:"row",borderColor: "#F7F8F9",borderWidth: 0.5,width:"100%",padding:10,backgroundColor:"#F0F4F7"}}> 
              <Icon type='MaterialCommunityIcons' name='check-circle' style={{ color: "#0EB709" ,marginRight:10}} />
              <Text style={{ color: "#0EB709", fontSize: 20 }}>GIAO DỊCH THÀNH CÔNG </Text>
            </View>
            <View style={{alignItems: "center",paddingBottom:10}}>
              <Text style={{ color: "#bdbdbd",  margin:5,fontSize: 15,marginTop:10 }}>SỐ TIỀN GIAO DỊCH </Text>
              <View style={{ flexDirection: "row" }}>
                <Text style={{ color: "#212121", fontSize: 30 }}>{this.state.money}</Text>
                <Text style={{ color: "#212121", fontSize: 15 }}> VND</Text>
              </View>
            </View>
            <View style={{width:"100%",backgroundColor:"#F0F4F7",padding:5,paddingLeft:10}}> 
             <View style={{flexDirection: 'row'}}>
              <Text style={{ width:"70%",color: "#212121", fontSize: 15,margin:3 }}>Loại dịch vụ </Text>
              <Text style={{ width:"30%",color: "#212121", fontSize: 15,margin:3 ,textAlign: 'center'}}>Nạp tiền </Text>
             </View>
             <View style={{flexDirection: 'row'}}>
              <Text style={{ width:"70%",color: "#212121", fontSize: 15,margin:3 }}>Phí giao dịch </Text>
              <Text style={{ width:"30%",color: "#212121", fontSize: 15,margin:3 ,textAlign: 'center'}}>{this.state.modalFee==0?"Miễn phí":this.state.modalFee+" VNĐ"}</Text>
             </View>
             <View style={{flexDirection: 'row'}}>
              <Text style={{ width:"60%",color: "#212121", fontSize: 15,margin:3 }}>Thời gian </Text>
              <Text style={{ width:"40%",color: "#212121", fontSize: 15,margin:3 ,textAlign: 'center'}}>{this.state.modalTime} </Text>
             </View>
             <View style={{flexDirection: 'row'}}>
              <Text style={{ width:"60%",color: "#212121", fontSize: 15,margin:3 }}>Khuyến mãi </Text>
              <Text style={{ width:"40%",color: "#212121", fontSize: 15,margin:3,textAlign: 'center' }}>{this.state.modalPro==0?"Không có":this.state.modalPro+" VNĐ"} </Text>
             </View>
             <View style={{flexDirection: 'row'}}>
              <Text style={{ width:"60%",color: "#212121", fontSize: 15,margin:3 }}>Mã giao dịch </Text>
              <Text style={{ width:"40%",color: "#212121", fontSize: 15,margin:3,textAlign: 'center' }}>{this.state.modalID} </Text>
             </View>
            </View>
            <View style={styles.buttonSuccess}>
              <TouchableOpacity onPress={() => this.setState({ sucessOrNot: null })}>
                <View style={{padding:5}}>
                 <Text style={{color:"white",fontSize:16}}>Đóng</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

          <Modal
          isVisible={this.state.sucessOrNot === false}>
          <View style={styles.modalContent}>
            <View style={{flexDirection:"row",borderColor: "#F7F8F9",borderWidth: 0.5,width:"100%",padding:10,backgroundColor:"#F0F4F7"}}> 
              <Icon type='FontAwesome' name='times-circle' style={{ color: "#CE3C3E" ,marginRight:10}} />
              <Text style={{ color: "#CE3C3E", fontSize: 20 }}>GIAO DỊCH THẤT BẠI </Text>
            </View>
            <View style={{alignItems: "center",paddingBottom:10}}>
              <Text style={{ color: "#bdbdbd",  margin:5,fontSize: 15,marginTop:10 }}>SỐ TIỀN GIAO DỊCH </Text>
              <View style={{ flexDirection: "row" }}>
                <Text style={{ color: "#212121", fontSize: 30 }}>{this.state.money}</Text>
                <Text style={{ color: "#212121", fontSize: 15 }}> VND</Text>
              </View>
            </View>
            <View style={{width:"100%",backgroundColor:"#F0F4F7",padding:5,paddingLeft:10}}> 
             <View style={{flexDirection: 'row'}}>
              <Text style={{ width:"70%",color: "#212121", fontSize: 15,margin:3 }}>Loại dịch vụ </Text>
              <Text style={{ width:"30%",color: "#212121", fontSize: 15,margin:3 }}>Nạp tiền </Text>
             </View>
             <View style={{flexDirection: 'row'}}>
              <Text style={{ width:"70%",color: "#212121", fontSize: 15,margin:3 }}>Phí giao dịch </Text>
              <Text style={{ width:"30%",color: "#212121", fontSize: 15,margin:3 }}>Miễn phí </Text>
             </View>
             <View style={{flexDirection: 'row'}}>
              <Text style={{ width:"60%",color: "#212121", fontSize: 15,margin:3 }}>Thời gian </Text>
              <Text style={{ width:"40%",color: "#212121", fontSize: 15,margin:3 }}>19:30 11/19/2018 </Text>
             </View>
            </View>
            <View style={styles.buttonFail}>
              <TouchableOpacity onPress={() => this.setState({ sucessOrNot: null })}>
                <View style={{padding:5}}>
                 <Text style={{color:"white",fontSize:16}}>Đóng</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

      </View>

    );
  }
}
const styles = StyleSheet.create({
  circle: {
    marginTop: 20,
    marginBottom: 20,
    marginLeft: 15,
    width: 15,
    height: 15,
    borderRadius: 100 / 2,
    backgroundColor: 'white',
    borderWidth: 1.5,
    borderColor: '#0d47a1',
  },
  circleRounded: {
    marginTop: 20,
    marginBottom: 20,
    marginLeft: 15,
    width: 15,
    height: 15,
    borderRadius: 100 / 2,
    backgroundColor: '#0d47a1',
    borderWidth: 1.5,
    borderColor: '#0d47a1',
  },
  buttonFail: {
    backgroundColor: "#CE3C3E",
    padding: 3,
    margin: 16,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,
    borderColor: "rgba(0, 0, 0, 0.1)"
  },
  buttonSuccess: {
    backgroundColor: "#0EB709",
    padding: 3,
    margin: 16,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,
    borderColor: "rgba(0, 0, 0, 0.1)"
  },
  modalContent: {
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,
    borderColor: "rgba(0, 0, 0, 0.1)"
  },
  backgroundImage:{
    flex:1,
    alignItems:'center',
    justifyContent:'center',
    width:"100%",
    height:"100%"
  }
})
export default ActionTransferFriend
;