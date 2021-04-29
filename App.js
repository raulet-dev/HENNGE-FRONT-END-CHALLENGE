import { StatusBar } from 'expo-status-bar';
import React, {Component} from 'react';
import { StyleSheet, View, Dimensions, ImageBackground } from 'react-native';
import Top from './src/top';
import MailList from './src/mail-list';


class App extends Component{
  constructor()
  {
    super();
    this.state = {
      top: '50%', 
      left: '50%', 
      searching: false,
      data: '',
      refresh: true,
      orientation: 'landscape',
    }
  }
  getPosition = () =>
  {
    this.setState({
        top: (Dimensions.get('window').height/2)-(124/2),
        left: (Dimensions.get('window').width/2)-(117/2)
      })
  }
  getOrientation = () =>{
    if (Dimensions.get('screen').width < Dimensions.get('screen').height)
    {
      this.setState({orientation: 'portrait'})
    }
    else 
    {
      this.setState({orientation: 'landscape'})
    }
  }
  componentDidMount()
  {
    this.getPosition();
    this.getOrientation();
    Dimensions.addEventListener('change',() => {
      this.getPosition();
      this.getOrientation();
    });
  }

  refresh() {
    this.setState({refresh: !this.state.refresh})
    this.forceUpdate()
  }

  dropData = () =>{
    if(this.state.searching){
      return <MailList dateToContent={this.state.data} orientation={this.state.orientation}/> 
    } else {
      return <View></View>
    } 
  }

  dateToAppCallback = (value) =>{
    this.setState({data: value.data, searching: (value.data.length>0)?value.searching:false})
    this.refresh()
  }

  render() {
    const styles = StyleSheet.create({
      container: {
        flex: 2,
        backgroundColor: '#fff',
        marginHorizontal: (this.state.orientation==='landscape')?30:0,
        marginVertical: (this.state.orientation==='landscape')?15:5,
        padding: 0,
        borderWidth: 0,
        minWidth: 400,
      },
      top: {
        flex: 1,
        justifyContent: 'flex-start',
        minHeight:100,
      },
      bottom: {
        flex: 8,
        justifyContent: 'flex-end',
        minHeight: 300,
        zIndex: -1,
      },
      logo: {
          position: 'absolute',
          width: 117,
          height: 124,
          opacity: 1,
          top: this.state.top,
          left: this.state.left,
          zIndex: -2,
      }
    });

    
    return (
      <View style={styles.container}>
        <ImageBackground 
        style={styles.logo}
        source={require('./src/img/logo.png')}/>
        <View style={styles.top}>
          <Top dateToApp={this.dateToAppCallback}
          />
        </View>
        <View style={styles.bottom}>
          {this.dropData()}
        </View>
        <StatusBar style="auto" />
      </View>
    );
  }
}

export default App
