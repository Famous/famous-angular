---
layout: docs_api
active: angularjs
title: "Action Sheet"
header_sub_title: "Slide in prompts for actions"
---

Available in:
<div class="label label-danger">Ionic-Angular 0.9.x</div>


Action Sheet
===

The Action Sheet is a slide-up pane that lets the user choose from a set of options. Dangerous options are highlighted in red and made obvious, and there are easy ways to cancel out out of action sheet, such as tapping the backdrop or even hitting escape on the keyboard for desktop testing.


<img src="http://ionicframework.com.s3.amazonaws.com/docs/controllers/actionSheet.gif" alt="Action Sheet" style="border: 1px solid #eee">

## Ionic-Angular Usage

To trigger an Action Sheet in your code, use the `$ionicActionSheet` service in your angular controllers:

```javascript

angular.module('test', ['ionic'])

.controller(function($scope, $ionicActionSheet) {

  // Triggered on a button click, or some other target
  $scope.show = function() {

    // Show the action sheet
    $ionicActionSheet.show({

      // The various non-destructive button choices
      buttons: [
        { text: 'Share' },
        { text: 'Move' },
      ],

      // The text of the red destructive button
      destructiveText: 'Delete',

      // The title text at the top
      titleText: 'Modify your album',

      // The text of the cancel button
      cancelText: 'Cancel',

      // Called when the sheet is cancelled, either from triggering the
      // cancel button, or tapping the backdrop, or using escape on the keyboard
      cancel: function() {
      },

      // Called when one of the non-destructive buttons is clicked, with
      // the index of the button that was clicked. Return
      // "true" to tell the action sheet to close. Return false to not close.
      buttonClicked: function(index) {
        return true;
      },

      // Called when the destructive button is clicked. Return true to close the
      // action sheet. False to keep it open
      destructiveButtonClicked: function() {
        return true;
      }
    });

  };
});
```
