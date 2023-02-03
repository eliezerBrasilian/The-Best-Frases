import {BannerAd, BannerAdSize, TestIds} from 'react-native-google-mobile-ads';
import {StyleSheet, View} from 'react-native';
export default function BannerAds() {
  const adUnitId = 'ca-app-pub-4318787550457876/1812665180';
  const teste = 'ca-app-pub-3940256099942544/6300978111';
  return (
    <View style={styles.bannerStyle}>
      <BannerAd
        unitId={adUnitId}
        size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
        requestOptions={{
          requestNonPersonalizedAdsOnly: true,
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  bannerStyle: {
    alignItems: 'center',
    //paddingHorizontal:15,
  },
});
