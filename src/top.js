import React, {useState} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import PickDate from './pick-date';


const top = (props)=> {
const [results, setResults] = useState(0)
const [refresh, setRefresh] = useState(true)


// filter from the mail data file the mails between the specified dates

const dateFilter = (value) => {
  let start = new Date(value.from)
  let end = new Date(value.to)
  let dates = mails.filter(x => {
    let mail = new Date(x.date)
    return mail >= start && mail <= end})
  if(dates.filter(x => String(x.date)).length > 0){
    setResults(dates.filter(x => String(x.date)).length)
    setRefresh(!refresh)
    dateToTopCallback(dates)
  } else {
    setResults(0)
    setRefresh(!refresh)
    dateToTopCallback(dates)
  }
}

// callback to app.js

const dateToTopCallback= (value) => {
  const data = {data: value, searching: true}
  props.dateToApp(data)
}

const mails = require('./mails.json');

  return (
      <View style={{
        flex: 1,
        alignItems: 'flex-start',
        margin: '1%',
        marginBottom: 0,
        borderBottomWidth: (results>0)?0:2,
        borderBottomColor: '#dedede'
      }}>
        <View style={styles.top}>
          <PickDate dateToTop={dateFilter}
          />
        </View>
        <View style={styles.bottom}>
          <Text style={styles.text}>Results: <Text style={{fontSize: 18}}>{results}</Text>mail(s)</Text>
        </View>    
      </View>
  );
}


export default top

const styles = StyleSheet.create({
  top:{
    flex: 1,
    justifyContent: 'flex-end',
    marginVertical: 10,
  },
  bottom: {
    justifyContent: 'flex-end',
    marginVertical: 4,
    zIndex: -1,
  },
  text: {
    bottom: 0,
    fontSize: 14,
    fontWeight: 700,
    color: '#747474',
  }
});