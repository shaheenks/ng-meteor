Parties = new Mongo.Collection("parties");

if (Meteor.isClient){
    angular
        .module('socially', ['angular-meteor', 'ui.router']);
    
    angular
        .module('socially')
            .config(['$urlRouterProvider', '$stateProvider', '$locationProvider',
                 function($urlRouterProvider, $stateProvider, $locationProvider) {
                    
                     $locationProvider.html5Mode(true);
                     
                     $stateProvider
                        .state('parties', {
                         url: '/parties',
                         templateUrl: 'parties-list.ng.html',
                         controller: 'PartiesListCtrl'
                     })
                        .state('partyDetails', {
                        url: '/parties/:partyId',
                        templateUrl: 'parties-details.ng.html',
                        controller: 'PartiesDetailsCtrl'
                     });
                     
                     $urlRouterProvider.otherwise('/parties');
                     
                 }]);
    
    angular
        .module('socially')
            .controller('PartiesListCtrl', ['$scope', '$meteor',
                function($scope, $meteor){
                
                    $scope.parties=$meteor.collection(Parties);
                
                    $scope.remove = function (party) {
                        $scope.parties.remove(party);
                    }
                
                    $scope.removeAll = function () {
                        $scope.parties.remove({});
                    }
                
                    $scope.push = function(party) {
                        $scope.parties.save(party);
                    }
            
            }]);
    
    angular
        .module('socially')
            .controller('PartiesDetailsCtrl', ['$scope', '$stateParams', '$meteor',
                         function($scope, $stateParams, $meteor){
                             
                             $scope.partyId = $meteor.object(Parties, $stateParams.partyId, false);
                             
                             $scope.save = function () {
                                $scope.partyId.save();
                             };
                             
                             $scope.reset = function () {
                                $scope.partyId.reset();
                             };
                             
                         }]);

}

if (Meteor.isServer) {
    
}