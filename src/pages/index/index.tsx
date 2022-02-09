import { Component } from 'react'
import { navigateTo } from '@tarojs/taro'
import { View, Text, Button } from '@tarojs/components'
// import { StatusBar } from 'react-native';
import './index.scss'

export default class Index extends Component {

  render() {
    return (
      <View className='index'>
        {/* <StatusBar
          translucent
          backgroundColor='blue'
        /> */}
        <Text>Hello world!</Text>
        <Button onClick={() => navigateTo({
          url: '/pages/pageContainer/index'
        })}
        >跳转</Button>
      </View>
    )
  }
}
