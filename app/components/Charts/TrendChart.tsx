import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Svg, { G, Path } from 'react-native-svg';

export interface PriceData {
  date: number; // Timestamp
  price: number;
}

interface Props {
  data: PriceData[];
}

const PriceTrendAreaChart: React.FC<Props> = ({ data }) => {
  // Fonction pour calculer la moyenne des prix par date
  const calculateAveragePrices = (data: PriceData[]) => {
    const groupedData: { [key: number]: { total: number; count: number } } = {};
    data.forEach(({ date, price }) => {
      const timestamp = Math.floor(date / (24 * 60 * 60 * 1000)); // Convertir en jours
      if (!groupedData[timestamp]) {
        groupedData[timestamp] = { total: 0, count: 0 };
      }
      groupedData[timestamp].total += price;
      groupedData[timestamp].count += 1;
    });

    return Object.entries(groupedData).map(([timestamp, { total, count }]) => ({
      date: parseInt(timestamp) * (24 * 60 * 60 * 1000), // Reconvertir en timestamp
      price: total / count,
    }));
  };

  const processedData = calculateAveragePrices(data);

  // Trouver la plage de prix
  const prices = processedData.map((item) => item.price);
  const maxPrice = Math.max(...prices);
  const minPrice = Math.min(...prices);

  // Trouver la plage de dates
  const startDate = Math.min(...processedData.map((item) => item.date));
  const endDate = Math.max(...processedData.map((item) => item.date));

  // Échelles pour l'axe X et l'axe Y
  const scaleX = (val: number) => {
    const dateDiff = endDate - startDate;
    const diffRatio = (val - startDate) / dateDiff;
    return diffRatio * 200; // Largeur de la zone de dessin
  };

  const scaleY = (val: number) => {
    const priceDiff = maxPrice - minPrice;
    const diffRatio = (val - minPrice) / priceDiff;
    return diffRatio * 100; // Hauteur de la zone de dessin
  };

  // Construction du chemin pour l'area chart
  const path =
    processedData
      .map(({ date, price }, index) => {
        const x = scaleX(date);
        const y = scaleY(price);
        if (index === 0) {
          return `M ${x} ${100 - y}`;
        } else {
          return `L ${x} ${100 - y}`;
        }
      })
      .join(' ') +
    ` L ${scaleX(processedData[processedData.length - 1].date)} 100 L ${scaleX(
      processedData[0].date
    )} 100 Z`;

  return (
    <View style={styles.container}>
      <Svg height="100%" width="100%">
        <G>
          <Path d={path} fill="rgba(134, 65, 244, 0.5)" />
        </G>
      </Svg>
      {/* Axes */}
      <View style={styles.xAxis}>
        {processedData.map(({ date }, index) => (
          <Text key={index} style={styles.xAxisLabel}>
            {new Date(date).toLocaleDateString()}
          </Text>
        ))}
      </View>
      <View style={styles.yAxis}>
        {[...Array(5)].map((_, index) => (
          <Text key={index} style={styles.yAxisLabel}>
            {(((maxPrice - minPrice) / 4) * index + minPrice).toFixed(2)}
          </Text>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    height: 200,
    padding: 10,
  },
  xAxis: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  xAxisLabel: {
    fontSize: 10,
  },
  yAxis: {
    marginRight: 5,
  },
  yAxisLabel: {
    fontSize: 10,
  },
});

export default PriceTrendAreaChart;
