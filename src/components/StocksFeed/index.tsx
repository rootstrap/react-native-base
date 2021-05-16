import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import styles from './styles.css';
import GridLayout from 'react-grid-layout';

interface StocksFeedProps {
  layout: any[];
}

const layout = [
  { i: 'a', x: 0, y: 0, w: 1, h: 2, static: true },
  { i: 'b', x: 1, y: 0, w: 3, h: 2, minW: 2, maxW: 4 },
  { i: 'c', x: 4, y: 0, w: 1, h: 2 },
];

const StocksFeed = (props: StocksFeedProps) => {
  return (
    <View style={componentStyles.container}>
      <Text>StocksFeed</Text>
      {/* <GridLayout className="layout" layout={props.layout || layout} cols={12} rowHeight={30} width={1200}>
                <div key="a">a</div>
                <div key="b">b</div>
                <div key="c">c</div>
            </GridLayout> */}
    </View>
  );
};

export default StocksFeed;

const componentStyles = StyleSheet.create({
  container: {},
});
