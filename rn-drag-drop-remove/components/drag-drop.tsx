import React from "react";
import { View, Image, Animated, Dimensions } from "react-native";
import {
  PanGestureHandler,
  PanGestureHandlerStateChangeEvent,
  State,
} from "react-native-gesture-handler";
import { styles } from './styles';
export class DragAndDrop extends React.Component {
  state = {
    images: [
      { id: "cat", url: require("../assets/fat_cat.jpeg") },
      { id: "pug", url: require("../assets/pug_life.jpg") },
    ],
    floatingDelete: false,
  };
  point = new Array(2);

  render() {
    return (
      <View
        style={styles.container}
      >
        {this.floatingDelete()}
        <View
          style={styles.bottomContainer}
        >
          <View
            style={styles.imageContainer}
          >
            {this.getImages()}
          </View>
        </View>
      </View>
    );
  }

  floatingDelete() {
    if (this.state.floatingDelete) {
      return (
        <View
          style={styles.floatingContainer}
        >
          <Image
            style={styles.floatingIcon}
            source={require("../assets/delete.png")}
          ></Image>
        </View>
      );
    }
  }

  _onPanGestureEvent = (index: number) =>
    Animated.event(
      [
        {
          nativeEvent: {
            translationX: this.point[index].x,
            translationY: this.point[index].y,
          },
        },
      ],
      { useNativeDriver: false }
    );

  resetAnimationView(index: number) {
    Animated.spring(this.point[index], {
      toValue: { x: 0, y: 0 },
      speed: 200
    }).start(() => {
      this.setState({
        floatingDelete: false
      })
    });
  }

  onHandlerStateChange(
    { nativeEvent }: PanGestureHandlerStateChangeEvent,
    index: number
  ) {
    if (nativeEvent.state === State.END) {
      const width = Dimensions.get("window").width;
      const heightOffset = 60;
      const imageWidth = 40;
      const imageHeight = 40;
      const middleWidth = width / 2;
      if (
        nativeEvent.absoluteY < heightOffset + imageHeight &&
        nativeEvent.absoluteY > heightOffset - imageHeight
      ) {
        if (
          nativeEvent.absoluteX < middleWidth + imageWidth &&
          nativeEvent.absoluteX > middleWidth - imageWidth
        ) {
          const aux_images = this.state.images.filter((value, idx) => {
            if (idx !== index) {
              return value;
            }
          });
          this.setState({
            images: aux_images,
            floatingDelete: false
          });
        } else {
          this.resetAnimationView(index);
        }
      } else {
        this.resetAnimationView(index);
      }
    } else {
      this.setState({
        floatingDelete: true
      });
    }
  }

  getImages() {
    if (this.state.images.length > 0) {
      return this.state.images.map((image, index) => {
        this.point[index] = new Animated.ValueXY();
        return (
          <PanGestureHandler
            onGestureEvent={this._onPanGestureEvent(index)}
            onHandlerStateChange={({ nativeEvent }) =>
              this.onHandlerStateChange({ nativeEvent }, index)
            }
            key={image.id}
          >
            <Animated.Image
              key={image.id}
              style={[
                styles.image,
                {
                  transform: [
                    { translateY: this.point[index].y },
                    { translateX: this.point[index].x },
                  ],
                },
              ]}
              source={image.url}
            ></Animated.Image>
          </PanGestureHandler>
        );
      });
    }
  }
}
