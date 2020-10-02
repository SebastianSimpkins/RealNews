import React, { PureComponent } from 'react';
import { TouchableOpacity } from 'react-native';
import { Body,Text,Thumbnail,View } from 'native-base';
import TimeAgo from './time';

export default class ListDataItem extends PureComponent {
  constructor(props) {
    super(props);
    this.data = props.data;
    this._handlePress = this._handlePress.bind(this)
  }

  _handlePress() {
    const {url, title} = this.data
    this.props.onPress({url, title})
  }

  render() {
    return (
      <TouchableOpacity onPress={this._handlePress} style={{flexDirection: 'row'}} activeOpacity={0.5}>
        <Thumbnail style={{backgroundColor: '#eee', alignSelf: 'center'}}
        square Large source={{cache: 'force-cache', uri: this.data.urlToImage
        != null ? 'http://image-api.suckup.de/image-api.php?file='+this.data.urlToImage+'&quality=25' :
        'https://dummyimage.com/75/5e5e5e/ffffff&text=no+image'}} />
        <Body>
          <Text style={{fontSize: 16}} numberOfLines={2}>{this.data.title}</Text>
          <Text note numberOfLines={3}>{this.data.description}</Text>
          <View style={{flex: 1, flexDirection: 'row', marginTop: 8, marginLeft: 8}}>
            <Text note>{this.data.source.name}</Text>
            <TimeAgo date={this.data.publishedAt} />
          </View>
        </Body>
      </TouchableOpacity>
    )
  }
}
