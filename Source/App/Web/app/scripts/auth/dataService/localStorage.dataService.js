"use strict";


angular.module("app")
    .service("LocalStorageService", [
        function() {            

            var setUserInfo = function(userInfo) {
                localStorage.setItem("userInfo", angular.toJson(userInfo));
            }

            var getUserInfo = function () {
                this.userInfo = angular.fromJson(localStorage.getItem("userInfo"));
                if (this.userInfo)
                    return this.userInfo;

                return undefined;
            }

            var getUserIsLoggedIn = function () {
                var userInfo = this.getUserInfo();
                if (userInfo) {
                    if(angular.isDefined(userInfo.IsLogin))
                        return true;
                    return false;
                }                        
                return false;
            }


            var getUserToken = function () {
                this.Token = this.getUserInfo().Token;
                if (this.Token)
                    return this.Token;

                return undefined;
            }


            var clearUserInfo = function () {
                localStorage.removeItem("userInfo");
            }


            return {
                setUserInfo: setUserInfo,
                getUserInfo: getUserInfo,
                getUserIsLoggedIn: getUserIsLoggedIn,
                getUserToken: getUserToken,
                clearUserInfo: clearUserInfo
            }
        }
    ]);