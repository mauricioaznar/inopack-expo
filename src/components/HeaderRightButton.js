import React from 'react'
import {TouchableOpacity, View} from 'react-native'
import {Icon} from 'react-native-elements'

const HeaderRightButton = (
  {
    iconName,
    iconType = 'material',
    onPress,
    disabled = false
  }) =>
{
  return (
    <TouchableOpacity
      disabled={disabled}
      onPress={onPress}
    >
      <View style={{marginRight: 15, flexDirection: 'row'}}>
        <View>
          <Icon
            name={iconName}
            type={iconType}
          />
        </View>
      </View>
    </TouchableOpacity>
  )
}

export default HeaderRightButton