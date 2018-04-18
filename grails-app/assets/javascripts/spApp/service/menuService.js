(function (angular) {
    'use strict';
    /**
     * @memberof spApp
     * @ngdoc service
     * @name MenuService
     * @description
     *   Menu configuration
     */
    angular.module('menu-service', [])
        .factory('MenuService', ['$injector', '$q', '$http', '$timeout',
            function ($injector, $q, $http, $timeout) {
                var menuConfig = {};

                //TODO: support dynamic menu update

                if ($SH.menu.indexOf('http') == 0) {
                    var setup = $http.get($SH.menu).then(function (data) {
                        menuConfig = data.data;
                        return menuConfig;
                    });
                } else {
                    menuConfig = $SH.menu;
                    setup = $q.when(menuConfig)
                }

                return {
                    /**
                     * Get menu config
                     * @memberof MenuService
                     * @returns {Promise(Map)} menu configuration
                     */
                    getMenuConfig: function() {
                        if (menuConfig.size > 0) {
                            return $q.when(menuConfig)
                        } else {
                            return setup
                        }
                    }
                }
            }])
}(angular));