"use strict";


angular.module("authApp")
    .service("LocalStorageService", [
        function() {

            return {

                setUserInfo: function(userInfo) {
                    localStorage.setItem("userInfo", angular.toJson(userInfo));
                },

                getUserInfo: function () {

                    this.userInfo = angular.fromJson(localStorage.getItem("userInfo"));
                    if (this.userInfo)
                        return this.userInfo;

                    return undefined;
                },

                getUserIsLoggedIn: function () {

                    var userInfo = this.getUserInfo();
                    if (userInfo) {
                        if(angular.isDefined(userInfo.IsLogin))
                            return true;
                        return false;
                    }                        
                    return false;
                },


                getUserToken: function () {

                    this.Token = this.getUserInfo().Token;
                    if (this.Token)
                        return this.Token;

                    return undefined;
                },                


                clearUserInfo: function () {

                    localStorage.removeItem("userInfo");
                }
            }
        }
    ]);