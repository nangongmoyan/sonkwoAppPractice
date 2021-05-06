package com.sonkwoapppractice.module;

/**
 *
 * created by lijianpo on 2021/05/06
 */

import android.app.Activity;
import android.content.Context;
import android.net.Uri;
import android.util.DisplayMetrics;
import android.util.Log;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;

import com.facebook.react.bridge.GuardedAsyncTask;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.uimanager.UIManagerModule;
import com.sonkwoapppractice.utils.ViewShot;
import com.sonkwoapppractice.utils.ViewShot.Formats;
import com.sonkwoapppractice.utils.ViewShot.Results;
import java.io.File;
import java.io.FilenameFilter;
import java.io.IOException;
import java.util.Collections;
import java.util.Map;


public class RNViewShotModule extends ReactContextBaseJavaModule {
  public static  final  String RNVIEW_SHOT = "RNViewShot";

  private final ReactApplicationContext reactContext;

  public RNViewShotModule(ReactApplicationContext reactContext){
    super(reactContext);
    this.reactContext = reactContext;
  }

  @Override
  public String getName() {
    return RNVIEW_SHOT;
  }

  @Override
  public Map<String, Object> getConstants() {
    return Collections.emptyMap();
  }

  @ReactMethod
  public void releaseCapture(String uri){
    final String path = Uri.parse(uri).getPath();
    if(path == null) return;
    File file = new File(path);
    if(!file.exists()) return;
    File parent = file.getParentFile();
    if(parent.equals(reactContext.getExternalCacheDir()) || parent.equals((reactContext.getCacheDir()))){
      file.delete();
    }
  }

  @ReactMethod
  public void captureRef(int tag, ReadableMap options, Promise promise){
    final ReactApplicationContext context = getReactApplicationContext();
    final DisplayMetrics dm = context.getResources().getDisplayMetrics();

    final String extension = options.getString("format");
    final  int imageFormat = "jpg".equals(extension)
      ? Formats.JPEG
      : "webm".equals(extension)
      ? Formats.WEBP
      : "raw".equals(extension)
      ? Formats.RAW
      : Formats.PNG;

    final double quality = options.getDouble("quality");
    final Integer scaleWidth = options.hasKey("width")?(int)(dm.density * options.getDouble("width")):null;
    final Integer scaleHeight = options.hasKey("height")?(int)(dm.density * options.getDouble("height")):null;
    final String resultStreamFormat = options.getString("result");
    final Boolean snapshotContentContainer = options.getBoolean("snapshotContentContainer");

    try {
      File outputFile = null;
      if(Results.TEMP_FILE.equals(resultStreamFormat)){
        outputFile = createTempFile(getReactApplicationContext(), extension);
      }
      final Activity activity = getCurrentActivity();
      final UIManagerModule uiManager = this.reactContext.getNativeModule(UIManagerModule.class);
      uiManager.addUIBlock(new ViewShot(tag,extension,imageFormat,quality,scaleWidth,scaleHeight,outputFile,resultStreamFormat,snapshotContentContainer,reactContext,activity,promise));
    }catch (final Throwable ex) {
      Log.e(RNVIEW_SHOT, "Failed to snapshot view tag " + tag, ex);
      promise.reject(ViewShot.ERROR_UNABLE_TO_SNAPSHOT, "Failed to snapshot view tag " + tag);
    }
  }

  @ReactMethod
  public void captureScreen(ReadableMap options, Promise promise) {
    captureRef(-1, options, promise);
  }

  private static final String TEMP_FILE_PREFIX = "ReactNative-snapshot-image";

  /**
   * Asynchronous task that cleans up cache dirs (internal and, if available, external) of cropped
   * image files. This is run when the catalyst instance is being destroyed (i.e. app is shutting
   * down) and when the module is instantiated, to handle the case where the app crashed.
   */
  private static class CleanTask extends GuardedAsyncTask<Void, Void> implements FilenameFilter {
    private final File cacheDir;
    private final File externalCacheDir;

    private CleanTask(ReactContext context){
      super(context);
      cacheDir = context.getCacheDir();
      externalCacheDir = context.getExternalCacheDir();
    }

    @Override
    protected void doInBackgroundGuarded(Void... params) {
      if(cacheDir != null ){
        cleanDirectory(cacheDir);
      }

      if(externalCacheDir != null){
        cleanDirectory(externalCacheDir);
      }
    }

    @Override
    public boolean accept(File dir, String filename) {
      return filename.startsWith(TEMP_FILE_PREFIX);
    }

    private void cleanDirectory(@NonNull final File directory) {
      final File[] toDelete = directory.listFiles(this);

      if (toDelete != null) {
        for (File file : toDelete) {
          if (file.delete()) {
            Log.d(RNVIEW_SHOT, "deleted file: " + file.getAbsolutePath());
          }
        }
      }
    }
  }

  /**
   * Create a temporary file in the cache directory on either internal or external storage,
   * whichever is available and has more free space.
   */
  @NonNull
  private File createTempFile(@NonNull final Context context, @NonNull final String ext) throws IOException {
    final File cacheDir = context.getExternalCacheDir();
    if(cacheDir == null) {
      throw new IOException("No cache directory available");
    }
//        final File externalCacheDir = context.getExternalCacheDir();
//        final File internalCacheDir = context.getCacheDir();
//        final File cacheDir;
//
//        if (externalCacheDir == null && internalCacheDir == null) {
//            throw new IOException("No cache directory available");
//        }
//
//        if (externalCacheDir == null) {
//            cacheDir = internalCacheDir;
//        } else if (internalCacheDir == null) {
//            cacheDir = externalCacheDir;
//        } else {
//            cacheDir = externalCacheDir.getFreeSpace() > internalCacheDir.getFreeSpace() ?
//                    externalCacheDir : internalCacheDir;
//        }


    final String suffix = "." + ext;
    return File.createTempFile(TEMP_FILE_PREFIX, suffix, cacheDir);
  }

}
