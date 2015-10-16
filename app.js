(function() {

var app = angular.module('tags', []);

app.directive('editableBraces', function() {
    return {
        link: function(scope, element) {

        }
    }
});

app.controller('TagsController', function($scope) {
    console.log("tag_models in controller");
    console.log(tag_models);
    $scope.tags = tag_models;
    $scope.something = "something";

    $scope.filter_tags = function(tag_model) {
        types = ["clone_information", "feature"];
        features = ["start_end", "single_clone_region", "sil_til", "repeat"];

        var found = true;
        types.forEach(function(type) {
            if ($scope[type] === true && !tag_model.type[type]) {
                found = false;
                return;
            }
        });

        features.forEach(function(feature) {
            if ($scope[feature] === true && !tag_model.features[feature]) {
                found = false;
                return;
            }
        });

        return found;

    };
});

})();
