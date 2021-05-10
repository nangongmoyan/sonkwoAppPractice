package com.sonkwoapppractice.invokenative;


import android.content.Intent;
import android.net.Uri;
import android.provider.Settings;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

public class OpenAppSettingsModule extends ReactContextBaseJavaModule {

  private final ReactApplicationContext reactContext;

  public OpenAppSettingsModule(ReactApplicationContext reactContext){
    super(reactContext);
    this.reactContext =reactContext;
  }

  @Override
  public String getName() { return "OpenAppSettings"; }

  @ReactMethod
  public void open() {
    Intent intent =  new Intent();
    intent.setAction(Settings.ACTION_APPLICATION_DETAILS_SETTINGS);
    Uri uri = Uri.fromParts("package", reactContext.getPackageName(),null);
    intent.setData(uri);
    intent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
    reactContext.startActivity(intent);
  }

  @ReactMethod
  public void appDetailsSettings(){
    Intent intent = new Intent(Settings.ACTION_APPLICATION_DETAILS_SETTINGS);
    intent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
    intent.addFlags(Intent.FLAG_ACTIVITY_NO_HISTORY);
    intent.setData(Uri.parse("package:" + reactContext.getPackageName()));
    if(intent.resolveActivity(reactContext.getPackageManager()) != null){
      reactContext.startActivity(intent);
    }
  }
}
