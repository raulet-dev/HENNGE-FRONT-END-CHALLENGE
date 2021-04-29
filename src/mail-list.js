import React,{Component} from 'react';
import { StyleSheet, Text, View, FlatList, Image, TouchableOpacity} from 'react-native';
import attachIcon from './img/icon_clip.svg';
import upIcon from './img/icon_arrow01.svg';
import sideIcon from './img/icon_arrow02.svg';
import mailIcon from './img/icon_mail_sp.svg';

var items = []

class MailList extends Component{
  constructor(props)
  {
    super(props);
    this.state = {
      byFrom: 0,
      byTo: 0,
      bySubject: 0,
      byDate: 1,
      sortBy: this.sortData(props),
      orientation: props.orientation,
      refresh: true,
    }

    this.orderByFrom = this.orderByFrom.bind(this);
    this.orderByTo = this.orderByTo.bind(this);
    this.orderBySubject = this.orderBySubject.bind(this);
    this.orderByDate = this.orderByDate.bind(this);
    this.sortDate = this.sortData.bind(this);
    this.bodyContent = this.bodyContent.bind(this);
    this.refresh = this.refresh.bind(this);
  }
  

  UNSAFE_componentWillReceiveProps(props){
    items = []
    this.setState({sortBy: this.sortDate(props), orientation: props.orientation})
  } 

  sortData(props){
    const mails = props.dateToContent
    var idx = 0
    mails.forEach(elm => { 
      items[idx] = {show: false, hover: false}
      idx = idx + 1});
    return (mails.sort((a,b) => b.date.localeCompare(a.date)))
  }

  orderByFrom(){
    const mails = this.props.dateToContent
    if (this.state.byFrom === 0){
      this.setState({byFrom: 1})
      this.setState({sortBy: mails.sort((a,b) => b.from.localeCompare(a.from))})
    } else if(this.state.byFrom===1){
      this.setState({byFrom: 2})
      this.setState({sortBy: mails.sort((a,b) => a.from.localeCompare(b.from))})
    } else {
      this.setState({byFrom: 1})
      this.setState({sortBy: mails.sort((a,b) => b.from.localeCompare(a.from))})
    }
    this.setState({byDate: 0})
    this.setState({byTo: 0})
    this.setState({bySubject: 0})
    this.refresh()
  }
  orderByTo(){
    const mails = this.props.dateToContent
    if (this.state.byTo === 0){
      this.setState({byTo: 1})
      this.setState({sortBy: mails.sort((a,b) => b.to.localeCompare(a.to))})
    } else if(this.state.byTo===1){
      this.setState({byTo: 2})
      this.setState({sortBy: mails.sort((a,b) => a.to.localeCompare(b.to))})
    } else {
      this.setState({byTo: 1})
      this.setState({sortBy: mails.sort((a,b) => b.to.localeCompare(a.to))})
    }
    this.setState({byFrom: 0})
    this.setState({byDate: 0})
    this.setState({bySubject: 0}) 
    this.refresh()
  }
  orderBySubject(){
    const mails = this.props.dateToContent
    if (this.state.bySubject === 0){
      this.setState({bySubject: 1})
      this.setState({sortBy: mails.sort((a,b) => b.title.localeCompare(a.title))})
    } else if(this.state.bySubject===1){
      this.setState({bySubject: 2})
      this.setState({sortBy: mails.sort((a,b) => a.title.localeCompare(b.title))})
    } else {
      this.setState({bySubject: 1})
      this.setState({sortBy: mails.sort((a,b) => b.title.localeCompare(a.title))})
    }
    this.setState({byFrom: 0})
    this.setState({byTo: 0})
    this.setState({byDate: 0})
    this.refresh()
  }
  orderByDate(){
    const mails = this.props.dateToContent
    if (this.state.byDate === 0){
      this.setState({byDate: 1})
      this.setState({sortBy: mails.sort((a,b) => b.date.localeCompare(a.date))})
    } else if(this.state.byDate===1){
      this.setState({byDate: 2})
      this.setState({sortBy: mails.sort((a,b) => a.date.localeCompare(b.date))})
    } else {
      this.setState({byDate: 1})
      this.setState({sortBy: mails.sort((a,b) => b.date.localeCompare(a.date))})
    }
    this.setState({byFrom: 0})
    this.setState({byTo: 0})
    this.setState({bySubject: 0})
    this.refresh()
  }

  bodyContent(item, index){
    const style = {
      mailRow: {
        flexDirection: 'row',
        backgroundColor: (items[index].hover)?'#fafafa':'#fff',
        height: 'auto',
        justifyContent: 'flex-start',
        paddingHorizontal: 15,
        borderBottomWidth: 2,
        borderBottomColor: '#dedede',
        paddingVertical: 10,
      },
      body: {
        flex: 1,
        alignSelf: 'center',
        fontSize: 12,
        fontWeight: 700,
        marginHorizontal: 10,
        flexShrink: 1,
        overflow: 'hidden',
        color: (items[index].hover)?'blue':'#747474',
      },
      sideIcon:{
        width: 8,
        height: 6,
        alignSelf: 'center',
        tintColor: '#747474',
        marginRight: 10,
      },
    }

    if(items[index].show === true){
      return(
      <View style={style.mailRow}>
        <Text style={style.body}>
          <Image source={sideIcon} style={style.sideIcon}/>
          {item.body}</Text>
      </View>)
      }else {
       return <View/>
      }
  }

  refresh(){
    this.setState({refresh: !this.state.refresh})
  }
    

  render() {

    function FirstMail({ item, orientation }){
      var mailString = item.to.split(',')
      var count = item.to.split(',').length
        if(orientation === 'landscape'){
          return (count > 1) ? mailString[0] + ', ...' : mailString[0]
        }else {
          return (count > 2) ? mailString[0] + ', ' + mailString[1] + ', ...' : (count > 1)?mailString[0] + ', ' + mailString[1]:mailString[0]
        }  
    }
    function MailCount({ item,index,orientation }){
      var count = item.to.split(',').length
      if(orientation === 'landscape'){
        return (count > 1)? <Text style={{
          position: 'relative',
          fontSize: 11,
          fontWeight: 900,
          color: '#fff',
          backgroundColor: (items[index].hover)?'blue':'#949494',
          right: 0,
          borderRadius: 5,
          padding: 4,
          paddingVertical: 0,
        }}>+{count-1 }</Text>: ''
      }else {
        return (count > 2)? <Text style={{
          position: 'relative',
          fontSize: 11,
          fontWeight: 900,
          color: '#fff',
          backgroundColor: (items[index].hover)?'blue':'#949494',
          right: 0,
          borderRadius: 5,
          padding: 4,
          paddingVertical: 0,
        }}>+{count-2 }</Text>: ''
      }  
    }
    function HaveAttachment({ item, index }){
      return (item.atach) ? <Image source={attachIcon} style={
        {
          width: 15,
          height: 16,
          alignSelf: 'center',
          tintColor: (items[index].hover)?'blue':'#747474',
        }
      }/> : ''
    }
    function DateFormater({item}){
      var nowYear = new Date().getFullYear()
      var nowMonth = new Date().getMonth() + 1
      var nowDay = new Date().getDate()
      var mailYear = new Date(Date.parse(item.date)).getFullYear()
      var mailMonth = new Date(Date.parse(item.date)).getMonth() + 1
      var mailDay = new Date(Date.parse(item.date)).getDate()
      var mailHours = new Date(Date.parse(item.date)).getHours()
      var mailMinutes = new Date(Date.parse(item.date)).getMinutes()
      if (mailYear === nowYear){
        if (mailDay === nowDay){
          return (mailHours + ":" + mailMinutes)
        } else {
          switch(mailMonth){
            case 1: {
              return('Jan ' + mailDay)
            }
            case 2: {
              return('Feb ' + mailDay)
            }
            case 3: {
              return('Mar ' + mailDay)
            }
            case 4: {
              return('Apr ' + mailDay)
            }
            case 5: {
              return('May ' + mailDay)
            }
            case 6: {
              return('Jun ' + mailDay)
            }
            case 7: {
              return('Jul ' + mailDay)
            }
            case 8: {
              return('Aug ' + mailDay)
            }
            case 9: {
              return('Sep ' + mailDay)
            }
            case 10: {
              return('Oct ' + mailDay)
            }
            case 11: {
              return('Nov ' + mailDay)
            }
            default: {
              return('Dec ' + mailDay)
            }
          }
        }
      } else {
        return (mailYear + "/" + mailMonth + "/" + mailDay)
      }   
    }

    const styles = StyleSheet.create({
      container: {
          flex: 1,
          alignItems: 'stretch',
          justifyContent: 'flex-start',
          margin: (this.state.orientation==='landscape')?'1%':0,
          marginTop: 0,
      },
      titleBar:{
        flexDirection: 'row',
        backgroundColor: '#ededed',
        height: 40,
        justifyContent: 'flex-start',
        paddingHorizontal: 15,
        borderTopWidth: 2,
        borderBottomWidth: 2,
        borderColor: '#dedede'
      },
      titleBarPortrait: {
        flexDirection: 'row',
        backgroundColor: '#ededed',
        height: 40,
        justifyContent: 'flex-start',
        paddingHorizontal: 15,
        borderTopWidth: 2,
        borderBottomWidth: 2,
        borderColor: '#dedede',
        alignItems: 'flex-start',
        alignContent: 'flex-start',
      },
      mailRow: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        height: 40,
        justifyContent: 'flex-start',
        paddingHorizontal: 15,
        borderBottomWidth: 2,
        borderBottomColor: '#dedede',
      },
      mailRowPortrait: {
        flexDirection: 'column',
        backgroundColor: '#fff',
        height: 80,
        justifyContent: 'flex-start',
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#dedede',
      },
      rawText: {
        alignSelf: 'center',
        justifyContent: 'flex-start',
        fontSize: 12,
        fontWeight: 700,
        color: '#747474',
        marginHorizontal: 2,
        overflow: 'hidden',
        flexShrink: 1,
      },
      from: {
        flex: 2,
        alignSelf: 'center',
        fontSize: 12,
        fontWeight: 700,
        color: (this.state.byFrom===0)?'#747474':'#000',
        marginRight: 10,
        overflow: 'hidden',
        flexShrink: 1,
      },
      fromPortrait: {
        alignSelf: 'center',
        justifyContent: 'flex-start',
        fontSize: 12,
        fontWeight: 700,
        color: (this.state.byFrom===0)?'#747474':'#000',
        marginRight: 2,
        overflow: 'hidden',
        flexShrink: 1,
      },
      to: {
        flex: 2,
        alignSelf: 'center',
        fontSize: 12,
        fontWeight: 700,
        color: (this.state.byTo===0)?'#747474':'#000',
        marginHorizontal: 10,
        overflow: 'hidden',
        flexShrink: 1,
      },
      toPortrait: {
        alignSelf: 'center',
        justifyContent: 'flex-start',
        fontSize: 12,
        fontWeight: 700,
        color: (this.state.byTo===0)?'#747474':'#000',
        marginHorizontal: 2,
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
      mailIcon:{
        width: 10,
        height: 25,
        alignSelf: 'center',
        tintColor: '#747474',
        marginLeft: 0,
      },
      subject: {
        flex: 6,
        alignSelf: 'center',
        fontSize: 12,
        fontWeight: 700,
        color: (this.state.bySubject===0)?'#747474':'#000',
        marginHorizontal: 10,
        flexShrink: 1,
        overflow: 'hidden',
      },
      subjectPortrait: {
        alignSelf: 'center',
        justifyContent: 'flex-start',
        fontSize: 12,
        fontWeight: 700,
        color: (this.state.bySubject===0)?'#747474':'#000',
        marginHorizontal: 2,
        overflow: 'hidden',
        flexShrink: 1,
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
        color: (this.state.byDate===0)?'#747474':'#000',
        marginLeft: 10,
        flexShrink: 1,
        overflow: 'hidden',
      },
      datePortrait: {
        alignSelf: 'center',
        justifyContent: 'flex-start',
        fontSize: 12,
        fontWeight: 700,
        color: (this.state.byDate===0)?'#747474':'#000',
        marginLeft: 2,
        overflow: 'hidden',
        flexShrink: 1,
      },
      sideIcon:{
        width: 8,
        height: 6,
        alignSelf: 'center',
        tintColor: '#747474',
      },
    })
    
    if(this.state.orientation === 'landscape'){

        ///////////// Landscape View

      return (
        
        <View style={styles.container}>
          <View style={styles.titleBar}>
            <Text style={styles.from}
            onPress={this.orderByFrom}
            >From{(this.state.byFrom === 0)?'':(this.state.byFrom === 1)
              ?<Image source={upIcon} style={styles.sortIcon}/>
              :<Image source={upIcon} style={styles.sortIconInverted}/>}
            </Text>
            <Text style={styles.to}
            onPress={this.orderByTo}
            >To{(this.state.byTo === 0)?'':(this.state.byTo === 1)
              ?<Image source={upIcon} style={styles.sortIcon}/>
              :<Image source={upIcon} style={styles.sortIconInverted}/>}
            </Text>
            <Text style={styles.moreTo}></Text>
            <Text style={styles.subject}
            onPress={this.orderBySubject}
            >Subject
              {(this.state.bySubject === 0)?'':(this.state.bySubject === 1)
              ?<Image source={upIcon} style={styles.sortIcon}/>
              :<Image source={upIcon} style={styles.sortIconInverted}/>}
            </Text>
            <Text style={styles.attach}></Text>
            <Text style={styles.date}
            onPress={this.orderByDate}
            >Date{(this.state.byDate === 0)?'':(this.state.byDate === 1)
              ?<Image source={upIcon} style={styles.sortIcon}/>
              :<Image source={upIcon} style={styles.sortIconInverted}/>}
            </Text>
          </View>



          <FlatList
            data={this.state.sortBy}
            extraData={this.state}
            keyExtractor={x => String(x.date)}
            renderItem={({ item, index }) => 
            <TouchableOpacity onPress={()=>{
                items[index].show = !items[index].show
                this.refresh()
            }} 
            onMouseEnter={(e)=>{
              items[index].hover = true
              this.refresh()}}
            onMouseLeave={(e)=>{
              items[index].hover = false
              this.refresh()}}
            >
              <View>
                <View style={{
                  flexDirection: 'row',
                  backgroundColor: (items[index].hover)?'#fafafa':'#fff',
                  height: 40,
                  justifyContent: 'flex-start',
                  paddingHorizontal: 15,
                  borderBottomWidth: 2,
                  borderBottomColor: '#dedede',
                }}>
                  <Text style={{
                      flex: 2,
                      alignSelf: 'center',
                      fontSize: 12,
                      fontWeight: 700,
                      color: (this.state.byFrom===0)?(items[index].hover)?'blue':'#747474':'#000',
                      marginRight: 10,
                      overflow: 'hidden',
                      flexShrink: 1,
                    }} numberOfLines={1}>{item.from}</Text>
                  <Text style={{
                      flex: 2,
                      alignSelf: 'center',
                      fontSize: 12,
                      fontWeight: 700,
                      color: (this.state.byTo===0)?(items[index].hover)?'blue':'#747474':'#000',
                      marginHorizontal: 10,
                      overflow: 'hidden',
                      flexShrink: 1,
                  }} numberOfLines={1}>
                    <FirstMail item={item} orientation={this.state.orientation}/>
                  </Text>
                  <Text style={styles.moreTo}>
                    <MailCount item={item} index={index} orientation={this.state.orientation} />
                  </Text>
                  <Text style={
                    {
                      flex: 6,
                      alignSelf: 'center',
                      fontSize: 12,
                      fontWeight: 700,
                      color: (this.state.bySubject===0)?(items[index].hover)?'blue':'#747474':'#000',
                      marginHorizontal: 10,
                      flexShrink: 1,
                      overflow: 'hidden',
                    }
                  } numberOfLines={1}>{item.title}</Text>
                  <View style={styles.attach}>
                    <HaveAttachment item={item} index={index}/>
                  </View>
                  <Text style={
                    {
                      flex: 1,
                      alignSelf: 'center',
                      fontSize: 12,
                      fontWeight: 700,
                      color: (this.state.byDate===0)?(items[index].hover)?'blue':'#747474':'#000',
                      marginLeft: 10,
                      flexShrink: 1,
                      overflow: 'hidden',
                    }
                  } numberOfLines={1}>
                    <DateFormater item={item}/>
                  </Text>
                </View>
                <div>
                  {this.bodyContent(item, index)}
                </div>
              </View>
            </TouchableOpacity>
            }
          />
        </View>
  
      );

    }else{

        ///////////// Portrait View

      return (
        
        <View style={styles.container}>
          <View style={styles.titleBarPortrait}>
            <Text style={styles.fromPortrait}
            onPress={this.orderByFrom}
            >From{(this.state.byFrom === 0)?'':(this.state.byFrom === 1)
              ?<Image source={upIcon} style={styles.sortIcon}/>
              :<Image source={upIcon} style={styles.sortIconInverted}/>}
            </Text>
            <Text style={styles.rawText}>|</Text>
            <Text style={styles.toPortrait}
            onPress={this.orderByTo}
            >To{(this.state.byTo === 0)?'':(this.state.byTo === 1)
              ?<Image source={upIcon} style={styles.sortIcon}/>
              :<Image source={upIcon} style={styles.sortIconInverted}/>}
            </Text>
            <Text style={styles.rawText}>|</Text>
            <Text style={styles.subjectPortrait}
            onPress={this.orderBySubject}
            >Subject
              {(this.state.bySubject === 0)?'':(this.state.bySubject === 1)
              ?<Image source={upIcon} style={styles.sortIcon}/>
              :<Image source={upIcon} style={styles.sortIconInverted}/>}
            </Text>
            <Text style={styles.rawText}>|</Text>
            <Text style={styles.datePortrait}
            onPress={this.orderByDate}
            >Date{(this.state.byDate === 0)?'':(this.state.byDate === 1)
              ?<Image source={upIcon} style={styles.sortIcon}/>
              :<Image source={upIcon} style={styles.sortIconInverted}/>}
            </Text>
          </View>



          <FlatList
            data={this.state.sortBy}
            extraData={this.state}
            keyExtractor={x => String(x.date)}
            renderItem={({ item, index }) => 
            <TouchableOpacity onPress={()=>{
                items[index].show = !items[index].show
                this.refresh()
            }} 
            onMouseEnter={(e)=>{
              items[index].hover = true
              this.refresh()}}
            onMouseLeave={(e)=>{
              items[index].hover = false
              this.refresh()}}
            >
              <View>
                <View style={{
                  flexDirection: 'column',
                  backgroundColor: (items[index].hover)?'#fafafa':'#fff',
                  height: 80,
                  justifyContent: 'flex-start',
                  paddingHorizontal: 15,
                  paddingVertical: 10,
                  borderBottomWidth: 1,
                  borderBottomColor: '#dedede',
                }}>
                  <View style={{flex: 2, flexDirection: 'row'}}>
                    <View style={{width: 20, alignSelf: 'center'}}><Image source={mailIcon} style={styles.mailIcon}/></View>
                    <View style={{flex: 4}}>
                      <View style={{flex: 1, flexDirection: 'row'}}>
                        <View style={{flex: 1, flexDirection: 'row', alignSelf: 'center'}}>
                        <Text style={{
                            flex: 2,
                            alignSelf: 'center',
                            fontSize: 12,
                            fontWeight: 700,
                            color: (items[index].hover)?'blue':'#747474',
                            marginRight: 10,
                            overflow: 'hidden',
                            flexShrink: 1,
                          }} numberOfLines={1}>{item.from}</Text>
                        </View>
                        <View style={{width: 20, alignSelf: 'center'}}>
                          <View style={styles.attach}>
                            <HaveAttachment item={item} index={index}/>
                          </View>
                        </View>
                        <View style={{flexDirection: 'row', alignSelf: 'center'}}>
                          <Text style={
                            {
                              flex: 1,
                              alignSelf: 'center',
                              fontSize: 12,
                              fontWeight: 700,
                              color: (items[index].hover)?'blue':'#747474',
                              marginHorizontal: 5,
                              flexShrink: 1,
                              overflow: 'hidden',
                            }
                          } numberOfLines={1}>
                            <DateFormater item={item}/>
                          </Text>
                        </View>
                        <View style={{width: 20, alignSelf: 'center'}}>
                          <Image source={sideIcon} style={styles.sideIcon}/>
                        </View>
                      </View>
                      <View style={{flex: 1, flexDirection: 'row'}}>
                        <View style={{flex: 1, flexDirection: 'row', alignSelf: 'center'}}>
                          <Text style={{
                              flex: 1,
                              alignSelf: 'center',
                              fontSize: 12,
                              fontWeight: 700,
                              color: (items[index].hover)?'blue':'#747474',
                              marginRight: 10,
                              overflow: 'hidden',
                              flexShrink: 1,
                          }} numberOfLines={1}>
                            <FirstMail item={item} orientation={this.state.orientation}/>
                          </Text>
                          <View style={{width: 30, alignSelf: 'center'}}>
                            <Text style={styles.moreTo}>
                              <MailCount item={item} index={index} orientation={this.state.orientation}/>
                            </Text>
                          </View>
                        </View>
                      </View>
                    </View>
                  </View>
                  <View style={{flex: 1, flexDirection: 'row'}}>
                    <View style={{flex: 1, flexDirection: 'row', alignSelf: 'center'}}>
                      <Text style={
                        {
                          flex: 1,
                          alignSelf: 'center',
                          fontSize: 12,
                          fontWeight: 700,
                          color: (items[index].hover)?'blue':'#747474',
                          flexShrink: 1,
                          overflow: 'hidden',
                        }
                      } numberOfLines={1}>{item.title}</Text>
                    </View>
                  </View>
                </View>
                <div>
                  {this.bodyContent(item, index)}
                </div>
              </View>
            </TouchableOpacity>
            }
          />
        </View>
  
      );

    }

    


  }
}

export default MailList