//
//  DeviceInfo.h
//  sonkwoAppPractice
//
//  Created by sonkwo on 2021/5/7.
//

#import <UIKit/UIKit.h>
#import <sys/utsname.h>
#if __has_include(<React/RCTBridge.h>)
#import <React/RCTBridgeModule.h>
#else
#import "RCTBridgeModule.h"
#endif
#import <React/RCTLog.h>

@interface DeviceInfo : NSObject<RCTBridgeModule>

@end
