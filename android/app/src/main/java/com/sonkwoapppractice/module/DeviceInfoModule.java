package com.sonkwoapppractice.module;

/**
 *
 * created by lijianpo on 2021/05/06
 */

import android.content.pm.PackageInfo;
import android.content.pm.PackageManager;
import android.os.Build;

import androidx.annotation.Nullable;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;

import java.util.HashMap;
import java.util.Locale;
import java.util.Map;



public class DeviceInfoModule extends ReactContextBaseJavaModule {
  ReactApplicationContext reactContext;

  public DeviceInfoModule(ReactApplicationContext reactContext){
    super(reactContext);
    this.reactContext = reactContext;
  }

  @Override
  public String getName() {
    return "MyDeviceInfo";
  }

  @Nullable
  @Override
  public Map<String, Object> getConstants() {
    HashMap<String, Object> constants = new HashMap<>();
    String version = getVersion();
    String locale = getCurrentLanguage();
    constants.put("appVersion", version);
    constants.put("deviceLocale", locale);
    return super.getConstants();
  }

  private String getVersion(){
    PackageManager packageManager = reactContext.getPackageManager();
    String packageName = reactContext.getPackageName();
    String version = "";
    try{
      PackageInfo info = packageManager.getPackageInfo(packageName,0);
    }catch (PackageManager.NameNotFoundException e){
      e.printStackTrace();
    }
    return version;
  }

  private  String getCurrentLanguage(){
    Locale current;
    if(Build.VERSION.SDK_INT>=Build.VERSION_CODES.N){
      current = getReactApplicationContext().getResources().getConfiguration().getLocales().get(0);
    }else{
      current = getReactApplicationContext().getResources().getConfiguration().locale;
    }

    if(Build.VERSION.SDK_INT >= Build.VERSION_CODES.LOLLIPOP){
      return current.toLanguageTag();
    }else{
      StringBuilder builder = new StringBuilder();
      builder.append(current.getLanguage());
      if(current.getCountry()!=null){
        builder.append("-");
        builder.append(current.getCountry());
      }
      return  builder.toString();
    }
  }
}
