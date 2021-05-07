package com.sonkwoapppractice.module;

import com.facebook.react.ReactPackage;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.uimanager.ViewManager;

import java.util.Arrays;
import java.util.Collections;
import java.util.List;

public class BuildConfigPackage implements ReactPackage {
  private Class buildConfigClass;

  public BuildConfigPackage(Class buildConfigClass) {
    this.buildConfigClass = buildConfigClass;
  }

  @Override
  public List<NativeModule> createNativeModules(ReactApplicationContext reactContext) {
    return Arrays.<NativeModule>asList(
      new BuildConfigModule(reactContext, buildConfigClass)
    );
  }


  @Override
  public List<ViewManager> createViewManagers(ReactApplicationContext reactContext) {
    return Collections.emptyList();
  }
}
