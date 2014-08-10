/**
 * @ngdoc directive
 * @name faCuboid
 * @module famous.angular
 * @restrict EA
 * @description
 * This directive is used to create reusable cuboid (rectangular prism) shapes
 * with arbitrary content
 * The order of the faces is [Front, Top, Right, Bottom, Left, Back]
 * Order can be managed/enforced with `fa-index`
 */

angular.module('famous.angular')
  .directive('faCuboid', ["$famous", "$famousDecorator", function ($famous, $famousDecorator) {
    return {
      template: '<div></div>',
      transclude: true,
      scope: true,
      restrict: 'EA',
      compile: function(tElement, tAttrs, transclude){
        var Modifier = $famous['famous/core/Modifier'];
        var Surface = $famous['famous/core/Surface'];
        var RenderNode = $famous['famous/core/RenderNode'];
        var Transform = $famous['famous/core/Transform'];

        var _colors = ["#b58900","#cb4b16","#dc322f","#6c71c4","#268bd2","#2aa198","#859900"];

        return {
          pre: function(scope, element, attrs){
            var isolate = $famousDecorator.ensureIsolate(scope);


            //TODO:  set up watch/observe and update everything accordingly
            var _dimens = scope.$eval(attrs.faDimensions);

            var PI_OVER_2 = Math.PI / 2;
            var PI = Math.PI;
            var _faceSpecs = [
              /*front */ {origin: [0,0], translate: [0,0,0], rotate: [0,0,0], size: [_dimens[0], _dimens[1]]},
              /*top   */ {origin: [0,0], translate: [0,0,-_dimens[2]], rotate: [PI_OVER_2, 0, 0], size: [_dimens[0], _dimens[2]]},
              /*right */ {origin: [0,0], translate: [_dimens[0],0,0], rotate: [0, PI_OVER_2, 0], size: [_dimens[2], _dimens[1]]},
              /*bottom*/ {origin: [0,0], translate: [0,_dimens[1],0], rotate: [-PI_OVER_2, 0, 0], size: [_dimens[0], _dimens[2]]},
              /*left  */ {origin: [0,0], translate: [0,0,-_dimens[2]], rotate: [0, -PI_OVER_2, 0], size: [_dimens[2], _dimens[1]]},
              /*back  */ {origin: [0,0], translate: [_dimens[0],0,-_dimens[2]], rotate: [0, PI, 0], size: [_dimens[0], _dimens[1]]}
            ];

            var _root = new RenderNode();
            var _faces = [new RenderNode(),new RenderNode(),new RenderNode(),new RenderNode(),new RenderNode(),new RenderNode()];
            angular.forEach(_faces, function(face){_root.add(face)});

            var _children = [];

            var _resequenceChildren = function(){

              var sequence = [];

              //first pass, populate specific indexes into their preferred spots
              angular.forEach(_children, function(child, i){
                if(child.index !== undefined){
                  if(sequence[child.index] !== undefined) throw new Error("Multiple children have the same index (" + child.index + ")");
                  sequence[child.index] = child;
                }
              });

              var counter = 0;
              //second pass, fill out the rest
              angular.forEach(_children, function(child, i){
                //do not include if already sequenced
                if(sequence.indexOf(child) === -1){
                  while(sequence[counter] !== undefined) { counter++ };
                  sequence[counter] = child;
                }
              });

              //now the sequence is in the correct order:  assign each rendernode to the _faces' rendernodes
              
            }


            //TODO:  manage origin and align?  will this be necessary?

            //Construct the cuboid



            angular.forEach(_faceSpecs, function(spec, i){
              var _mod = new Modifier({
                origin: function(){return spec.origin},
                align: function(){return [0, 0]},
                transform: function(){
                  var trans = Transform.multiply(Transform.translate.apply(this, spec.translate), Transform.rotate.apply(this, spec.rotate));
                  return trans;
                },
              });

              var _face = new RenderNode().add(_mod);

              //TODO:  set child content instead of surface
              var _surf = new Surface({size: spec.size, properties: {backgroundColor: _colors[i], backfaceVisibility: 'visible'}});
              _face.add(_surf);
              _root.add(_face);
            });


            var isolate = $famousDecorator.ensureIsolate(scope);

            isolate.renderNode = _root;
            $famousDecorator.addRole('renderable',isolate);
            isolate.show();
            
            $famousDecorator.sequenceWith(scope, function(data) {
              isolate.renderNode.add(data.renderGate);
              isolate.children.push(data);
            });

          },
          post: function(scope, element, attrs){
            var isolate = $famousDecorator.ensureIsolate(scope);

            transclude(scope, function(clone) {
              element.find('div').append(clone);
            });

            $famousDecorator.registerChild(scope, element, isolate);
          }
        };
      }
    };
  }]);
