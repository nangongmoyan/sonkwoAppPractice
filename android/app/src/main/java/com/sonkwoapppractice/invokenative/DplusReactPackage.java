package com.sonkwoapppractice.module;

/**
 *
 * created by lijianpo on 2021/05/06
 */

import androidx.annotation.NonNull;

import com.facebook.react.ReactPackage;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.uimanager.ViewManager;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

public class DplusReactPackage implements ReactPackage {
  private  Class buildConfigClass;

  public DplusReactPackage(Class buildConfigClass) {
    this.buildConfigClass = buildConfigClass;
  }

  @Override
  public List<ViewManager> createViewManagers(@NonNull ReactApplicationContext reactContext) {
    return Collections.emptyList();
  }

  /**
   * 如需要添加本地方法，只需在这里add
   *
   * @param reactContext
   * @return
   */

  @Override
  public List<NativeModule> createNativeModules(@NonNull ReactApplicationContext reactContext) {
    List<NativeModule> modules = new ArrayList<>();
//    modules.add(new DeviceInfoModule(reactContext));
    modules.add(new CookieManagerModule(reactContext));
    modules.add(new BuildConfigModule(reactContext, buildConfigClass));
    return  modules;
  }
}
