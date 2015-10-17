(function() {

var app = angular.module('tags', ['ui.bootstrap']);

app.directive('editableBraces', function($uibModal) {
    /**
     * This directive makes it possible to edit parts of text
     * enclosed in curly braces. When any part of the text is clicked,
     * a modal which contains editable inputs is opened.
     * After clicking 'Save' the underlying text model is updated with changes.
     */

    var splitTextByBraces = function(text) {
        /** split the text by '{' and '}' and
            create input fields for values inside braces
        */
        console.log(text);
        var left_splits = text.split('{');
        var all_splits = [];
        left_splits.forEach(function(split) {
            var splits = split.split('}');
            all_splits = all_splits.concat(splits);
        });

        return all_splits;
    };

    return {
        template: "<span ng-click='openModal()'><span>Text: {{ tagText }}</span></span>",
        restrict: 'AE',
        scope: {
            tagText: '='
        },
        link: function(scope, element) {
            console.log("in link");

            var injectNewValues = function(all_splits, input_values) {
                ret_string = "";
                all_splits.forEach(function(split, i) {
                    if (i % 2 != 0) {
                        ret_string += '{' + input_values[(i-1)/2] + '}';
                    } else {
                        ret_string += split;
                    }
                });

                return ret_string;
            };

            scope.openModal = function() {
                var all_splits = splitTextByBraces(scope.tagText);

                var num_inputs = (all_splits.length - 1) / 2;
                scope.input_values = [];
                for (var i = 0; i < num_inputs; i++) {
                    scope.input_values.push(all_splits[i*2 + 1]);
                }

                var modalInstance = $uibModal.open({
                    template: '<p ng-repeat="(i, input_value) in input_values track by i"><input ng-model="input_values[i]" /></p><p><button ng-click="ok()">Save</button></p>',
                    controller: 'ModalInstanceCtrl',
                    resolve: {
                        items: function () {
                            return {
                                input_values: scope.input_values
                            };
                        }
                    }
                });

                modalInstance.result.then(
                    function(input_values) {
                        console.log("Closing success");
                        console.log(input_values);
                        input_values.forEach(function(val, i) {
                            input_values[i] = val.replace(/[{}]/g, ''); //braces not allowed in input
                        });
                        scope.tagText = injectNewValues(all_splits, input_values)
                    }, function() {
                        console.log("Dismiss");
                });
            };

        }
    }
});

app.directive('selectParent', function ($window) {
    return {
        restrict: 'A',
        link: function (scope, element) {
            element.on('click', function () {
                var selection = $window.getSelection();
                var range = document.createRange();
                console.log(element.parent());
                range.selectNodeContents(element.parent()[0]);
                range.setEndBefore(element[0]);
                selection.removeAllRanges();
                selection.addRange(range);
            });
        }
    }
});

app.controller('TagsController', function($scope) {
    console.log("tag_models in controller");
    console.log(tag_models);
    $scope.tags = tag_models;   //this variable is in scope from index.html

    $scope.filter_tags = function(tag_model) {
        var types = ["clone_information", "feature"];
        var features = ["start_end", "single_clone_region", "sil_til", "repeat"];

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

app.controller('ModalInstanceCtrl', function ($scope, $modalInstance, items) {

    $scope.input_values = items.input_values;

    $scope.ok = function() {
        $modalInstance.close($scope.input_values);
    };

    $scope.cancel = function() {
        $modalInstance.close();
    };
});

})();
