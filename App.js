/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import React, {Component} from 'react';
import {Share,Platform, StyleSheet, Text, View, ToolbarAndroid,ToastAndroid, Button, Alert, PermissionsAndroid} from 'react-native';
import {Kaede} from 'react-native-textinput-effects';
import {Print} from 'expo';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import ReactDOMServer from 'react-dom/server';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});


export default class App extends Component {

  constructor(props){
    super();
    this.state={
      products:[],
      name:'',
      quantity:'0',
      price:'0'
    }
  }
  _save = () => {
    var ar = {
      product:this.state.name,
      quantity:this.state.quantity,
      price:this.state.price
    }
    this.setState({products:[...this.state.products,ar],name:'',quantity:'',price:''})
    console.log(ar);
    ToastAndroid.show('ADDED' , ToastAndroid.SHORT);
  }
  _add = () => {
    Alert.alert('kfhdrdn')
    this.setState({name:'',quantity:'',price:''})
  }
  
   componentWillMount() {
    async function getLocationAsync() {
      const { Location, Permissions } = Expo;
      // permissions returns only for location permissions on iOS and under certain conditions, see Permissions.LOCATION
      const { status, permissions } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status === 'granted') {
       console.log('granted');
      } else {
        throw new Error('Location permission not granted');
      }
    }

    getLocationAsync();
    
  }

  _pdf = () => {
    
    var html = ` PROD---|--QUANT--|--RATE--|--TOTAL\n`
    var d = ''
    var total_price = 0;
    this.state.products.map((val) => {
        d+=`${val.product}`+'--->'+`${val.quantity}`+' pcs.  *'+`${val.price}`+' rs.  '+`${parseFloat(val.quantity)*parseFloat(val.price)}`+'rs.'+`\n`
        total_price += parseFloat(val.quantity)*parseFloat(val.price);
      })
      var currentdate = new Date(); 
var datetime = "Date Time: " + currentdate.getDate() + "/"
                + (currentdate.getMonth()+1)  + "/" 
                + currentdate.getFullYear() + " @ "  
                + currentdate.getHours() + ":"  
                + currentdate.getMinutes() + ":" 
                + currentdate.getSeconds();
    var datas = `${datetime}`+'\n\n'
    +html+d+`\n\n`+`TOTAL BILL-> ${total_price}`+' rs..';
console.log(datas)
    console.log(typeof htmlString);

  Share.share({
    message: datas,
    title: 'Wow, did you see that?'
  }, {
    // Android only:
    dialogTitle: 'Share BAM goodness',
  })
  }
  render() {
    
    return (
      <View style={styles.containerToolbar}>
      
      <ToolbarAndroid
      style={styles.toolbar}
      title="Bill"/>
      <Kaede
    label={'PRODUCtT'}
    inputPadding={10}
    style={{marginBottom: 10}}
    value={this.state.name}
    onChangeText={(text) => this.setState({name:text})}
  />
      <Kaede
    label={'PIECES'}
    inputPadding={10}
    keyboardType={'numeric'}
    style={{marginBottom: 10}}
    value={this.state.quantity}
    onChangeText={(text) => this.setState({quantity:text})}
  />
  <Kaede
    label={'RUPEES'}
    inputPadding={10}
    keyboardType={'numeric'}
    style={{marginBottom: 10}}
    value={this.state.price}
    onChangeText={(text) => this.setState({price:text})}
  />

  <View style={{flexDirection:'row',alignItems:'flex-start',justifyContent:'space-evenly'}}>
  <Button 
  onPress={this._save}
  title='SAVE'/>
  <Button 
  onPress={this._add}
  title='ADD MORE'/>
  <Button 
  onPress={this._pdf}
  title='GENERATE pdf'/>
  </View>
      </View>
    );
  }
}
var styles = StyleSheet.create({
  containerToolbar: {
    flex: 1,
    //justifyContent: 'center',
    justifyContent: 'flex-start',
    
    // https://github.com/facebook/react-native/issues/2957#event-417214498
 
    backgroundColor: '#F5FCFF',
  },
  toolbar: {
    backgroundColor: '#ef6576',
    height: 56,
    marginBottom: 10,
  },

});