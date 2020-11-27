import React from 'react'
import {ActivityIndicator, TouchableOpacity, View} from 'react-native'
import {Icon} from 'react-native-elements'

const HeaderRightButton = (
  {
    iconName,
    iconType = 'material',
    onPress,
    disabled = false,
    loading = false
  }) =>
{
  return (
    <TouchableOpacity
      disabled={disabled}
      onPress={onPress}
    >
      <View style={{marginRight: 15, flexDirection: 'row'}}>
        <View>
          {
            loading
              ? <ActivityIndicator size="small" color="#000000" />
              : <Icon
                  name={iconName}
                  type={iconType}
                />
          }
        </View>
      </View>
    </TouchableOpacity>
  )
}

export default HeaderRightButton