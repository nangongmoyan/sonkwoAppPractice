//
//  DeviceInfo.m
//  sonkwoAppPractice
//
//  Created by sonkwo on 2021/5/7.
//

#import "DeviceInfo.h"

@implementation DeviceInfo

RCT_EXPORT_MODULE(MyDeviceInfo);

+ (BOOL)requiresMainQueueSetup
{
  return YES;
}

- (NSDictionary *)constantsToExport
{
  NSString *buildConfig = [[NSBundle mainBundle] objectForInfoDictionaryKey:@"BuildConfig"];
  return @{
           @"appVersion": [[NSBundle mainBundle] objectForInfoDictionaryKey:@"CFBundleShortVersionString"] ?: [NSNull null],
           @"deviceLocale": self.deviceLocale ?: [NSNull null],
           @"buildConfig": buildConfig
           };
}

- (NSString*) deviceLocale
{
  NSString *language = [[NSLocale preferredLanguages] firstObject];
  return language;
}

@end
