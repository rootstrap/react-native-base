package com.reactnativebase;

import android.os.Bundle; // here

import com.facebook.react.ReactActivity;
import com.facebook.react.ReactActivityDelegate;
import com.facebook.react.ReactRootView;
import com.swmansion.gesturehandler.react.RNGestureHandlerEnabledRootView;
import org.devio.rn.splashscreen.SplashScreen; // here


public class MainActivity extends ReactActivity {

  @Override
  protected void onCreate(Bundle savedInstanceState) {
      // Second parameter should be true if status bar is expecte to be hidden when splash screen is active
      SplashScreen.show(this, false);
      super.onCreate(savedInstanceState);
  }

  @Override
  protected String getMainComponentName() {
    return "ReactNativeBase";
  }

  @Override
  protected ReactActivityDelegate createReactActivityDelegate() {
    return new ReactActivityDelegate(this, getMainComponentName()) {
      @Override
      protected ReactRootView createRootView() {
       return new RNGestureHandlerEnabledRootView(MainActivity.this);
      }
    };
  }
}
