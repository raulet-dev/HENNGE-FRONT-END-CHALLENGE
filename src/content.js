import React,{useState} from 'react';
import { StyleSheet, Text, View, FlatList, Image } from 'react-native';
import attachIcon from './img/icon_clip.svg';
import upIcon from './img/icon_arrow01.svg';
import sideIcon from './img/icon_arrow02.svg';
import MailList from './mail-list'


/*         keyExtractor={x => String(x.date)} */

const Content = (props) => {
  const mails = require('./mails.json');

  const [results, setResults] = useState(0)
  const [sortBy, setSortBy] = useState(mails.sort((a,b) => b.date.localeCompare(a.date)))
  const [byFrom, setByFrom] = useState(0)
  const [byTo, setByTo] = useState(0)
  const [bySubject, setBySubject] = useState(0)
  const [byDate, setByDate] = useState(1)
  const [refresh, setRefresh] = useState(true)

 

  function orderByFrom(){
    if (byFrom===0){
      setByFrom(1)
      setSortBy(mails.sort((a,b) => b.from.localeCompare(a.from)))
    } else if(byFrom===1){
      setByFrom(2)
    } else {
      setByFrom(1)
    }
    setByTo(0)
    setBySubject(0)
    setByDate(0)
  }
  function orderByTo(){
    (byTo===0)?setByTo(1)
    :(byTo===1)
    ?setByTo(2)
    :setByTo(1)
    setByFrom(0)
    setBySubject(0)
    setByDate(0)
  }
  function orderBySubject(){
    (bySubject===0)?setBySubject(1):(bySubject===1)?setBySubject(2):setBySubject(1)
    setByFrom(0)
    setByTo(0)
    setByDate(0)
  }
  function orderByDate(){
    if (byDate===0){
      setByDate(1)
      setSortBy(mails.sort((a,b) => b.date.localeCompare(a.date)))
    } else if(byDate===1){
      setByDate(2)
      setSortBy(mails.sort((a,b) => a.date.localeCompare(b.date)))
    } else {
      setByDate(1)
      setSortBy(mails.sort((a,b) => b.date.localeCompare(a.date)))
    }
    setByFrom(0)
    setByTo(0)
    setBySubject(0)
    setRefresh(!refresh)
  }
    
  return (
      <View style={styles.container}>
      <View style={styles.titleBar}>
        <Text style={styles.from}
        onPress={orderByFrom}
        >From{(byFrom === 0)?'':(byFrom === 1)
          ?<Image source={upIcon} style={styles.sortIcon}/>
          :<Image source={upIcon} style={styles.sortIconInverted}/>}
        </Text>
        <Text style={styles.to}
        onPress={orderByTo}
        >To{(byTo === 0)?'':(byTo === 1)
          ?<Image source={upIcon} style={styles.sortIcon}/>
          :<Image source={upIcon} style={styles.sortIconInverted}/>}
        </Text>
        <Text style={styles.moreTo}></Text>
        <Text style={styles.subject}
        onPress={orderBySubject}
        >Subject
          {(bySubject === 0)?'':(bySubject === 1)
          ?<Image source={upIcon} style={styles.sortIcon}/>
          :<Image source={upIcon} style={styles.sortIconInverted}/>}
        </Text>
        <Text style={styles.attach}></Text>
        <Text style={styles.date}
        onPress={orderByDate}
        >Date{(byDate === 0)?'':(byDate === 1)
          ?<Image source={upIcon} style={styles.sortIcon}/>
          :<Image source={upIcon} style={styles.sortIconInverted}/>}
        </Text>
      </View>
      <MailList sortBy={sortBy} refresh={refresh}/>
    </View>
  );
}

export default Content

const styles = StyleSheet.create({
  container: {
      flex: 1,
      alignItems: 'stretch',
      justifyContent: 'flex-start',
      margin: '1%',
      marginTop: 0,
  },
  titleBar:{
    flexDirection: 'row',
    backgroundColor: '#ededed',
    height: 40,
    justifyContent: 'flex-start',
    paddingHorizontal: 15,
    borderBottomWidth: 2,
    borderBottomColor: '#dedede'
  },
  mailRow: {
    flexDirection: 'row',
    backgroundColor: '#f8f8f8',
    height: 40,
    justifyContent: 'flex-start',
    paddingHorizontal: 15,
    borderBottomWidth: 2,
    borderBottomColor: '#dedede',
  },
  from: {
    flex: 2,
    alignSelf: 'center',
    fontSize: 12,
    fontWeight: 700,
    color: '#747474',
    marginRight: 10,
  },
  to: {
    flex: 2,
    alignSelf: 'center',
    fontSize: 12,
    fontWeight: 700,
    color: '#747474',
    marginHorizontal: 10,
    overflow: 'hidden',
    flexShrink: 1,
  },
  moreTo: {
    flex: 0.4,
    alignSelf: 'center',
    marginHorizontal: 10,
  },
  moreToBox: {
    position: 'relative',
    fontSize: 11,
    fontWeight: 900,
    color: '#fff',
    backgroundColor: '#949494',
    right: 0,
    borderRadius: 5,
    padding: 4,
    paddingVertical: 0,
  },
  sortIcon:{
    width: 8,
    height: 6,
    alignSelf: 'center',
    tintColor: '#747474',
    marginLeft: 5,
  },
  sortIconInverted:{
    width: 8,
    height: 6,
    alignSelf: 'center',
    tintColor: '#747474',
    marginLeft: 5,
    transform: [{rotate: '180deg'}],
  },
  subject: {
    flex: 6,
    alignSelf: 'center',
    fontSize: 12,
    fontWeight: 700,
    color: '#747474',
    marginHorizontal: 10,
    flexShrink: 1,
    overflow: 'hidden',
  },
  body: {
    alignSelf: 'center',
  },
  attach: {
    flex: 0.5,
    alignSelf: 'center',
    marginHorizontal: 0,
  },
  attachIcon:{
    width: 15,
    height: 16,
    alignSelf: 'center',
    tintColor: '#747474',
  },
  date: {
    flex: 1,
    alignSelf: 'center',
    fontSize: 12,
    fontWeight: 700,
    color: '#747474',
    marginLeft: 10,
    flexShrink: 1,
    overflow: 'hidden',
  }
  });