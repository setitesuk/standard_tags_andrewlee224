describe('Tags App', function() {

  describe('Tag list view', function() {

    beforeEach(function() {
      browser.get('index.html');
    });


    it('should display the Clone Information tags first', function() {

      // finds the <li> elements
      var tagsList = element.all(by.repeater('tag in tags').column('tag.type.clone_information'));

      var isCloneMap = [];
      tagsList.then(function(cloneInfos) {
        for (var i = 0; i < cloneInfos.length; i++) {
          var cloneInfo = cloneInfos[i];
          // read the Clone Information paragraph
          cloneInfo.getText().then(function(val) {
            if (val === '[X] Clone Information') {
                isCloneMap.push(true);
            } else {
                isCloneMap.push(false);
            }
          });
        }
      }).then(function() {
        expect(isCloneMap.length).toBe(10);

        expect(isCloneMap).toEqual(
            [true, true, true,
                false, false, false, false, false, false, false]
        );
      });
    });
  });
});
