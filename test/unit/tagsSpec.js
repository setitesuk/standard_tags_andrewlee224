describe('Tags app', function() {

  describe('TagsController', function(){
    var scope, ctrl;

    beforeEach(module('tags'));

    beforeEach(inject(function($controller) {
      scope = {};
      ctrl = $controller('TagsController', {$scope:scope});
    }));

    it('should create "tags" model with 10 tags', function() {
      expect(scope.tags.length).toBe(10);
    });


    it('should filter the data properly', function() {
      scope.start_end = true;
      var filtered_tags = scope.tags.filter(scope.filter_tags);
      expect(filtered_tags.length).toBe(2);
    });

  });

  describe('extractTagModels service', function() {

      var extractTagModels;

      beforeEach(module('tags'));

      beforeEach(inject(function($injector) {
          extractTagModels = $injector.get('extractTagModels');
      }));

      it('should extract models from sample data', function() {
        var annotation_tags = { "annotation_tags": [
'Type:\n[X] Clone Information\n[ ] Feature\nFeatures:\n[X] Start/End\n[ ] Single Clone Region\n[ ] SIL/TIL\n[ ] Repeat\nText:\nThis is the start of sequence clone {clone name}.',

'Type:\n[ ] Clone Information\n[X] Feature\nFeatures:\n[ ] Start/End\n[X] Single Clone Region\n[ ] SIL/TIL\n[ ] Repeat\nText:'
            ]
        };

        var tagModels = extractTagModels(annotation_tags);

        expect(tagModels.length).toBe(2);

        console.log(tagModels);
        console.log(tagModels[0].type);

        expect(tagModels[0].type.clone_information).toBe(true);
        expect(tagModels[0].type.feature).toBe(false);
        expect(tagModels[0].features.start_end).toBe(true);
        expect(tagModels[1].type.clone_information).toBe(false);
        expect(tagModels[1].type.feature).toBe(true);
        expect(tagModels[1].features.single_clone_region).toBe(true);
      });

  })

});