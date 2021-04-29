import React, {Component} from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import Cleave from 'cleave.js/react'
import calendarIcon from './img/icon_calender.svg';
import searchIcon from './img/icon_search.svg';


class pickADate extends Component{

  constructor(props, context) {
    super(props, context);
    this.onDateChangeFrom = this.onDateChangeFrom.bind(this);
    this.onDateChangeTo = this.onDateChangeTo.bind(this);
    this.getToday = this.getToday.bind(this);
    this.getTodayPlus = this.getTodayPlus.bind(this);
    this.state = {
      refresh: true,
      from: this.getToday(),
      to: this.getTodayPlus(),
      searching: false,
    };
    
  }

  getToday(){
    let today = new Date()
    return (today.getFullYear() + '/' + (today.getMonth()+1) + '/' + today.getDate())
  }

  getTodayPlus(){
    let today = new Date()
    return (today.getFullYear() + '/' + (today.getMonth()+1) + '/' + (today.getDate()+1))
  }

  onDateChangeFrom(event) {
    this.setState({from: new Date(event.target.value)})
    this.setState({refresh: !this.state.refresh})
  }

  onDateChangeTo(event) {
    let allday = new Date(event.target.value)
    allday = allday.setDate(allday.getDate()+1)
    this.setState({to: allday})
    this.setState({refresh: !this.state.refresh})
  }

  render() {

    const styles = StyleSheet.create({
      container: {
        flex: 1,
        position: 'absolute',
        justifyContent: 'flex-start',
        alignContent: 'flex-start',
        flexDirection: 'row',
        flexWrap: 'nowrap',
      }, 
      buttonLeft: {
        width: 250,
        height: 44,
        alignContent: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        borderTopLeftRadius: 10,
        borderBottomLeftRadius: 10,
        borderColor: '#dedede',
        borderWidth: 2,
        borderRightWidth: 1,
      },
      buttonRight: {
        width: 50,
        height: 44,
        alignContent: 'center',
        justifyContent: 'center',
        borderTopRightRadius: 10,
        borderBottomRightRadius: 10,
        borderColor: '#dedede',
        borderWidth: 2,
        borderLeftWidth: 1,
        backgroundColor: '#ededed',
      },
      text:{
        alignSelf: "center",
        marginHorizontal: 14,
        fontSize: 14,
        fontWeight: 600,
        color: '#444',
        flexDirection: 'row',
      },
      buttonImg: {
        width: 20,
        height: 20,
        alignSelf: 'center',
        tintColor: '#444',
      },
      dateInputStyle: {
        position: 'relative',
        bottom: 2,
        textAlign: 'center',
        fontSize: 14,
        fontWeight: 600,
        color: '#444',
      }
    
    });

    const dateInputStyle = {
      width: 80,
      textAlign: 'center',
      fontSize: 14,
      fontWeight: 600,
      color: '#444',
      borderWidth: 0,
    }
    

    return (
      <View style={styles.container}>
        <View style={styles.buttonLeft}>
          
          <Image source={calendarIcon} style={styles.buttonImg}/>
          <View style={styles.text}>
            <View>
            <Cleave style={dateInputStyle}
                placeholder={this.getToday()}
                options={{date: true, datePattern: ['Y', 'm', 'd']}}
                onChange={this.onDateChangeFrom} />
            </View>
            <Text style={styles.dateInputStyle}>-</Text>
            <View>
            <Cleave style={dateInputStyle}
                placeholder={this.getToday()}
                options={{date: true, datePattern: ['Y', 'm', 'd']}}
                onChange={this.onDateChangeTo} />
            </View>
          </View>        
        </View>
        <TouchableOpacity style={styles.buttonRight}
        onPress={() => {
          this.setState({refresh: !this.state.refresh, searching: true})
          this.props.dateToTop(this.state)
        }}>
          <Image source={searchIcon} style={styles.buttonImg} />
        </TouchableOpacity>
  
      </View>
    );
  }
}

export default pickADate

