import React, { PureComponent } from "react";
import { Text, View, ActivityIndicator, Alert, FlatList, RefreshControl } from "react-native";
import { Container,Header,Body,Title,Content,List,ListItem } from "native-base";
import Modal from '../components/modal';
import DataItem from '../components/list_item';
import { getArticles } from '../services/news';

export class HomeScreen extends PureComponent {
  constructor(props) {
    super(props);

    this._handleItemDataOnPress = this._handleItemDataOnPress.bind(this)
    this._handleModalClose = this._handleModalClose.bind(this)


    this.state = {
      isLoading: true,
      data: null,
      isError: false,
      setModalVisible: false,
      modalArticleData: {},
      refreshing: false,
      isFetching: false
    }
  }

  onRefresh() {
    this.setState({refrshing:false,data: [],isFetching: true}, () => getArticles().then(data=> {
      this.setState({
        isLoading: false,
        data: data,
        refrshing:false,
      })
    }, error=> {
      Alert.alert('Error', 'something happened, please refresh')
    }));
  }
  _handleItemDataOnPress(articleData) {
    this.setState({
      setModalVisible: true,
      modalArticleData:articleData
    })
  }

  _handleModalClose() {
    this.setState({
      setModalVisible: false,
      modalArticleData: {}
    })
  }

  componentDidMount() {
    getArticles().then(data=> {
      this.setState({
        isLoading: false,
        data: data
      })
    }, error=> {
      Alert.alert('Error', 'something happened, please refresh')
    })
  }


  render() {
    let view = this.state.isLoading ? (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <ActivityIndicator animating={this.state.isLoading} color='#00f0ff'/>
        <Text style={{marginTop: 8}} children='Please wait...'/>
      </View>
    ) : (
      <List
      dataArray={this.state.data}
      renderRow={(item) => {
        return(
          <ListItem>
            <DataItem onPress={this._handleItemDataOnPress} data={item}/>
          </ListItem>
        )
      }}
     />
    )
    return (
      <Container>
        <Header style={{backgroundColor: '#B40202'}}>
          <Body>
            <Title style={{fontSize: 27, color:'#fff'}} children="RealNews"/>
          </Body>
        </Header>
        <Content
          refreshControl={<RefreshControl
          onRefresh={() => this.onRefresh()}
          refreshing={this.state.isFetching, this.state.refreshing}/>}
          contentContainerStyle={{flex: 1, backgroundColor: '#fff'}}
          padder={false}>
          {view}
          </Content>
          <Modal showModal={this.state.setModalVisible} articleData=
          {this.state.modalArticleData} onClose={this._handleModalClose} />
      </Container>
    )
  }
}
