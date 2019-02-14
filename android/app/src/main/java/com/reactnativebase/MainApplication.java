package com.reactnativebase;

import android.support.annotation.Nullable;
import com.lugg.ReactNativeConfig.ReactNativeConfigPackage;
import com.facebook.react.ReactPackage;
import com.facebook.react.ReactNativeHost;
import com.reactnativenavigation.NavigationApplication;
import com.reactnativenavigation.react.NavigationReactNativeHost;
import com.reactnativenavigation.react.ReactGateway;

import java.util.Arrays;
import java.util.List;

public class MainApplication extends NavigationApplication {
    @Override
    protected ReactGateway createReactGateway() {
        ReactNativeHost host = new NavigationReactNativeHost(this, isDebug(), createAdditionalReactPackages()) {
            @Override
            protected String getJSMainModuleName() {
                return "index.android";
            }
        };
        return new ReactGateway(this, isDebug(), host);
    }

    protected List<ReactPackage> getPackages() {
        return Arrays.<ReactPackage>asList(
            new ReactNativeConfigPackage()
        );
    }

    @Nullable
    @Override
    public List<ReactPackage> createAdditionalReactPackages() {
        return getPackages();
    }

     @Override
     public boolean isDebug() {
          return BuildConfig.DEBUG;
     }
}
