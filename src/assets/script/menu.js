angular.module('ionicApp', ['ionic'])

.controller('MainCtrl', function($scope) {
 
  $scope.side='left';
  
  $scope.logo = 'https://pmcdeadline2.files.wordpress.com/2016/07/logo-tv-logo.png';
  $scope.menu = [
                {
                    title: 'Inicio',
                    icon: 'ion-ios-home',
                    state: ''
                },
                {
                    title: 'Sobre nosotros',
                    icon: 'ion-information-circled',
                    submenu: [
                        {
                            title: 'Sopra Steria en breve',
                            icon: 'ion-ios-pie',
                            state: ''
                        },
                        {
                            title: 'Oficinas',
                            icon: 'ion-android-map',
                            state: ''
                        },
                        {
                            title: 'Cifras relevantes',
                            icon: 'ion-ios-analytics',
                            state: ''
                        },
                        {
                            title: 'Partners estratégicos',
                            icon: 'ion-ios-people',
                            state: ''
                        },
                        {
                            title: 'Innovación',
                            icon: 'ion-ios-flask',
                            state: ''
                        },
                        {
                            title: 'Historia',
                            icon: 'ion-ios-book',
                            state: ''
                        }

                    ]
                },
                {
                    title: 'Sectores',
                    icon: 'ion-ios-world',
                    submenu: [
                        {
                            title: 'Aerospace',
                            icon: 'ion-plane',
                            state: ''
                        },
                        {
                            title:'Seguros',
                            icon: 'ion-lock-combination',
                            state: ''
                        },
                        {
                            title: 'Banca',
                            icon: 'ion-briefcase',
                            state: ''
                        },
                        {
                            title: 'Telecomunicaciones',
                            icon: 'ion-network',
                            state: ''
                        },
                        {
                            title: 'Energía',
                            icon: 'ion-battery-half',
                            state: '',
                        }

                    ]
                },
                {
                    title: 'Oferta',
                    icon: 'ion-filing',
                    submenu: [
                        {
                            title: 'Redes sociales',
                            icon: 'ion-android-share-alt',
                            state: ''
                        },
                        {
                            title: 'Software Bancario',
                            icon: 'ion-ipad',
                            state: ''

                        },
                        {
                            title: 'Cloud',
                            icon: 'ion-ios-cloud-upload',
                            state: ''
                        },
                        {
                            title: 'Movilidad',
                            icon: 'ion-android-bus',
                            state: ''
                        }

                    ]
                },
                {
                    title: 'Eventos',
                    icon: 'ion-ios-calendar',
                    state: ''
                }
            ];
  
})
.directive('submenuList', function () {
        return {
            restrict : 'A',
            scope : {
                menuItem: '='
            },
            controller : SubmenuController,
            template: '<div class="header"> <i class="icon" ng-class="menuItem.icon"></i> <h2 ng-bind="menuItem.title"></h2></div><ion-list> <ion-item class="item-icon-left" ng-click="toggleSubmenu(index)"> <i class="icon ion-ios-arrow-back"></i> Atrás </ion-item> <ion-item class="item-icon-left" ng-repeat="(indexSubmenu, submenu) in menuItem.submenu" ng-click="onClickSubmenu(submenu)" menu-close> <i class="icon" ng-class="submenu.icon"></i>{{submenu.title}}</ion-item></ion-list>'
        };

        /* @ngInject */
        function SubmenuController ($scope, $state) {

            $scope.onClickSubmenu = onClickSubmenu;
            $scope.toggleSubmenu = toggleSubmenu;

            function onClickSubmenu(submenu) {
                if (angular.isUndefined(submenu.state)) {
                    submenu.callback();
                    return;
                }
                $state.go(submenu.state);
            }

            function toggleSubmenu() {
                $scope.menuItem.isOpen = !$scope.menuItem.isOpen;
            }

        }
    })
  .directive('menuSlide', function()  {
  return {
    restrict : 'E',
    transclude: {
      header: '?menuHeader',
      footer: '?menuFooter'
    },
    scope : {
      menu: '=',
      side: '=',
      logoPath: '=',
      title: '@'
    },
    controller : MenuController,
    template: '<ion-side-menu side="{{side}}" class="menu menu-{{side}}"><ion-content><div class="menu-container" ng-class="hasSubmenuOpenClass()"><div class="first-level-container"><div class="menu-backdrop" ng-click="closeSubmenu()"></div><div ng-transclude="header"><div class="header row"><i class="icon ion-power col-10" ng-click="disconect()"></i><div class="profile-pict col-offset-10 col-60"><img ng-src="{{logoPath}}"></img><span>Menú Multinivel</span></div></div></div><ion-list><div class="item-container" ng-repeat="(index, menuItem) in menu"><ion-item class="item-icon-left item-icon-right" ng-click="onClickMenu(index)"><i class="icon" ng-class="menuItem.icon"></i>{{menuItem.title}}<i class="icon ion-ios-arrow-forward" ng-if="hasSubmenu(index)"></i></ion-item><div ng-if="hasSubmenu(index)" class="second-level-menu" ng-class="getSubmenuOpenClass(index)"><div class="second-level-menu-content"><div submenu-generator submenu="menuItem"></div></div></div></div></ion-list></div></div><div class="menu-footer menu-version"><div ng-transclude="footer"><span>Version</span> <span>0.1.0</span></div></div></ion-content></ion-side-menu>',
             link: Link
             };

             /* @ngInject */
             function Link(scope, element) {
  var menuContent = angular.element(document).find('ion-side-menu-content');
  if (menuContent.length) {
    menuContent.addClass(scope.side);
  }
}

/* @ngInject */
function MenuController ($scope, $ionicSideMenuDelegate, $state) {

  var RIGHT_SIDE_MENU = 'right';

  $scope.closeMenu = closeMenu;
  $scope.onClickMenu = onClickMenu;
  $scope.toggleSubmenu = toggleSubmenu;
  $scope.hasSubmenuOpenClass = hasSubmenuOpenClass;
  $scope.closeSubmenu = initSubmenu;
  $scope.hasSubmenu = hasSubmenu;
  $scope.getSubmenuOpenClass = getSubmenuOpenClass;
  $scope.goToMenu = goToMenu;

  activate();

  function activate() {
    initSubmenu();
  }

  $scope.$on('menu-multilevel:close', closeMenu);

  $scope.$watch(
    function () {
      return isOpenMenu();
    },
    function (isOpen) {
      if (!isOpen) {
        initSubmenu();
      }
    }
  );

  function onClickMenu(index) {
    if (hasSubmenu(index)) {
      return toggleSubmenu(index);
    }
    toggleMenu();
    $state.go($scope.menu[index].callback);
  }

  function closeMenu() {
    toggleMenu();
  }

  function hasSubmenu(index) {
    return $scope.menu[index].hasOwnProperty('submenu') || $scope.menu[index].hasOwnProperty('component');
  }

  function toggleSubmenu(submenuIndex) {
    $scope.menu[submenuIndex].isOpen = !$scope.menu[submenuIndex].isOpen;
  }

  function hasSubmenuOpenClass() {
    return $scope.menu.reduce(isOpen, false) ? 'open' : '';

    function isOpen(isOpen, menu) {
      return isOpen || menu.isOpen;
    }
  }

  function goToMenu(state) {
    $state.go(state);
  }

  function initSubmenu() {
    $scope.menu = $scope.menu.map(closeAllSubMenus);

    function closeAllSubMenus(submenu) {
      submenu.isOpen = false;
      return submenu;
    }
  }

  function getSubmenuOpenClass(index) {
    return $scope.menu[index].isOpen ? 'open' : '';
  }

  function toggleMenu() {
    if (isRightSideMenu()) {
      return $ionicSideMenuDelegate.toggleRight();
    }
    return $ionicSideMenuDelegate.toggleLeft();
  }

  function isOpenMenu() {
    if (isRightSideMenu()) {
      return $ionicSideMenuDelegate.isOpenRight();
    }
    return $ionicSideMenuDelegate.isOpenLeft();
  }

  function isRightSideMenu() {
    return $scope.side === RIGHT_SIDE_MENU;
  }

}
})
.directive('submenuGenerator', function ($compile) {
        return {
            restrict : 'A',
            scope : {
                submenu: '='
            },
            link : Link,
        };

        function Link (scope, element) {

            var type = scope.submenu.component;

            if (angular.isUndefined(type)) {
                type = 'submenu-list';
            }
            var generatedTemplate = '<div ' + type +
                ' menu-item="submenu"></div>';
            element.append($compile(generatedTemplate)(scope));
        }
    });
