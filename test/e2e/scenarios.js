describe('Tags App', function() {

  describe('tag list view', function() {

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

    it('should insert BA123456 into the "end" tag and select the contents', function() {

      // find the end tag
      var endTagText = element(by.xpath(
          "//span[contains(text(), 'This is the end of sequence clone')]"));

      expect(endTagText.getText()).toContain("This is the end of sequence clone {clone name}");

      endTagText.click().then(function() {
        var tagInput = element(by.css('.modal-dialog')).element(by.xpath(".//input"));
        tagInput.clear();
        tagInput.sendKeys("BA123456").then(function() {
            var saveButton = element(by.buttonText('Save'));
            saveButton.click().then(function() {
                expect(endTagText.getText()).toContain('This is the end of sequence clone {BA123456}.');
            })
        });
      }).then(function() {
        // get <li> parent and select contents
        var endTag = endTagText.element(
            by.xpath('..')).element(by.xpath('..')).element(by.xpath('..')).element(by.xpath('..'));
        var selectButton = endTag.element(by.buttonText('Select Tag'));
        selectButton.click(function() {
          var selection = window.getSelection();

          expect(selection.toString()).toContain('This is the end of sequence clone {BA123456}.');
        });
      });

    });

  });
});
