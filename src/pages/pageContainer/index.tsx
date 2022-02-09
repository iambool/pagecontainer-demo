import { showToast } from '@tarojs/taro';
import { View, Text, Button, PageContainer, Slider, Switch, Radio, RadioGroup, Label } from '@tarojs/components'
import { useState } from 'react'
import { PageContainerProps } from '@tarojs/plugin-platform-weapp/types/shims-weapp'
import './index.scss'
/**
 * 问题列表
 * 3、弹层内容遮住了状态栏
 * 4、不支持navigateBack关闭弹层
 * 5、不支持ios右滑关闭弹层，仅支持安卓右滑关闭弹层
 * 6、
 */

const positions = ['bottom', 'top', 'center', 'right'];

const PageContainerTest = () => {
  const [config, setConfig] = useState<PageContainerProps>({
    show: false,
    duration: 300,
    overlay: true,
    position: 'center',
    round: false,
    overlayStyle: undefined,
    customStyle: undefined,
  });
  const openContainer = () => {
    setConfig({
      ...config,
      show: true
    })
  }
  const closeContainer = () => {
    setConfig({
      ...config,
      show: false
    })
  }
  const changeDurantion = (val: { detail: { value: number } }) => {
    setConfig({
      ...config,
      duration: val?.detail?.value ?? 0
    })
  }
  const changeOverlay = (val: { detail: { value: boolean } }) => {
    setConfig({
      ...config,
      overlay: val?.detail?.value ?? true
    })
  }
  const changePosition = (val: { detail: { value: any } }) => {
    setConfig({
      ...config,
      position: val?.detail?.value ?? 'bottom'
    })
  }

  const changeRound = (val: { detail: { value: boolean } }) => {
    setConfig({
      ...config,
      round: val?.detail?.value ?? false
    })
  }

  const onRequestClose = () => {
    setConfig({
      ...config,
      show: false
    });
    showToast({
      title: 'onRequestClose 触发关闭',
      icon: 'success',
      duration: 2000
    })
  }

  const onBeforeEnter = () => {
    console.log('onBeforeEnter: 1')
    showToast({
      title: 'onBeforeEnter打开啦',
      icon: 'success',
      duration: 2000
    })
  }

  const onEnter = () => {
    console.log('onEnter: 2')
    // alert('onEnter进入中')
  }

  const onAfterEnter = () => {
    console.log('onAfterEnter: 3')
    // alert('onAfterEnter进入后')
  }

  const onBeforeLeave = () => {
    console.log('onBeforeLeave: 4')
    // alert('onBeforeLeave离开前')
  }

  const onLeave = () => {
    console.log('onLeave: 5')
    // alert('onLeave离开中')
  }

  const onAfterLeave = () => {
    console.log('onAfterLeave: 6')
    // alert('onAfterLeave离开后')
  }

  const changeOverlayStyle = (val: { detail: { value: boolean } }) => {
    setConfig({
      ...config,
      overlayStyle: val?.detail?.value ? { backgroundColor: 'yellow' } : undefined
    });
  }

  const changeCustomStyle = (val: { detail: { value: boolean } }) => {
    setConfig({
      ...config,
      customStyle: val?.detail?.value ? { backgroundColor: 'yellow' } : undefined
    });
  }

  return <View>
    <View className='setting-contain'>
      <View className='title'>
        点击弹出容器
      </View>
      <View className='content'>
        <Button type='primary' onClick={openContainer}>
          弹出
        </Button>
      </View>
    </View>

    <View className='setting-contain'>
      <View className='title'>
        设置动画时长
      </View>
      <View className='content'>
        <Slider step={100} value={config.duration} onChange={changeDurantion} showValue min={0} max={3000} />
      </View>
    </View>

    <View className='setting-contain'>
      <View className='title'>
        是否显示遮罩层
      </View>
      <View className='content'>
        <Switch checked={config?.overlay} onChange={changeOverlay} />
      </View>
    </View>

    <View className='setting-contain'>
      <View className='title'>
        容器显示位置设置
      </View>
      <View className='content'>
        <RadioGroup onChange={changePosition}>
          {positions.map(item => (
            <Label for={item} key={item} className='radio-label'>
              <Radio value={item} className='radio-item'>{item}</Radio>
            </Label>
          ))}
        </RadioGroup>
      </View>
    </View>

    <View className='setting-contain'>
      <View className='title'>
        是否显示圆角
      </View>
      <View className='content'>
        <Switch checked={config?.round} onChange={changeRound} />
      </View>
    </View>

    <View className='setting-contain'>
      <View className='title'>
        设置遮罩层样式
      </View>
      <View className='content'>
        <Switch checked={!!config?.overlayStyle} onChange={changeOverlayStyle} />
      </View>
    </View>

    <View className='setting-contain'>
      <View className='title'>
        设置弹层样式
      </View>
      <View className='content'>
        <Switch checked={!!config?.customStyle} onChange={changeCustomStyle} />
      </View>
    </View>

    <PageContainer
      {...config}
      onRequestClose={onRequestClose} // back时触发
      onBeforeEnter={onBeforeEnter} // 进入前触发
      onEnter={onEnter}
      onAfterEnter={onAfterEnter}
      onBeforeLeave={onBeforeLeave}
      onLeave={onLeave}
      onAfterLeave={onAfterLeave}
    >
      <Text>我的内容</Text>
      <Button className='modal-btn' type='primary' onClick={closeContainer}>关闭</Button>
    </PageContainer>

  </View>;
}

export default PageContainerTest;
