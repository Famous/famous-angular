<a name="0.5.0"></a>
# 0.5.0 (2014-10-10)


## Bug Fixes

- typo
 ([96f6e383](https://github.com/Famous/famous-angular/commit/96f6e3834965473973194755566957a0c97388ff))
- compare attr.disabled with a string to disable click on surface
 ([4714e383](https://github.com/Famous/famous-angular/commit/4714e383be78071089321a4c35cf04894ea6ed22))
- add .bowerrc that specifies installation directory (fixes inconsistent bower version behaviors)
 ([7c31c9d4](https://github.com/Famous/famous-angular/commit/7c31c9d424b1d5bb3d700157785ae91e9ac0e9cb))
- handle DOM clean-up more effectively when both fa-animate-enter and fa-animate-leave are present on one element
 ([4e34a22f](https://github.com/Famous/famous-angular/commit/4e34a22fdc1a8f8a1a64be7ef5f2c81c1e4c21c1))


## Features

- track famo.us 0.3.0
 ([624091e7](https://github.com/Famous/famous-angular/commit/624091e7d4203d342a8762c50f6b4563374bc005))
- support fa-options and fa-index with fa-edge-swapper
 ([024a37e3](https://github.com/Famous/famous-angular/commit/024a37e3048df69eb66caa51d18ec8d29f9dd187))
- implement fa-edge-swapper
 ([5ec55132](https://github.com/Famous/famous-angular/commit/5ec551327f44f1d6188860d816b247b149f9a9cd))
- default to linear easing in $timeline step
 ([8ea7d8b2](https://github.com/Famous/famous-angular/commit/8ea7d8b263d442e8b045e62cfaa44e77ae859f9f))


## Documentation

- add documentation for fa-animate-leave, fa-animate-halt, fa-animate-move
 ([f74ef7b9](https://github.com/Famous/famous-angular/commit/f74ef7b91b14ebeff0ccebf07f7d88c7db1d8081))
- add basic fa-animate-enter documentation
 ([48b4b386](https://github.com/Famous/famous-angular/commit/48b4b386ee92c78d2ae01a48d87a53fbf3a5acb4))
- add documentation for fa-edge-swapper
 ([8b3ae339](https://github.com/Famous/famous-angular/commit/8b3ae3394a00967b6d367bf4efd8f305ed509a11))
- modify multi piping example to work
 ([3f3403bc](https://github.com/Famous/famous-angular/commit/3f3403bc3dddb46dec5382788fa76a6e8b808952))
- clarify submodule init step for library development in README
 ([5d54a015](https://github.com/Famous/famous-angular/commit/5d54a0154ad7ee204db13507b6bf609d7f478d63))


## Breaking Changes

- due to [624091e7](https://github.com/Famous/famous-angular/commit/624091e7d4203d342a8762c50f6b4563374bc005),
 

Famo.us 0.3.0 introduces some breaking changes.

* Boilerplate:
  * Must change src of famous-global from:
    "bower_components/famous/famous-global.js"
      to
    "bower_components/famous/dist/famous-global.js"

  * May need to perform a `bower cache clean` before updating your bower packages.  Verify that "bower_components/famous/CHANGELOG.md" mentions 0.3.0 to ensure that the update was successful.

* Application code:
  * Famo.us 0.3.0 defaults `align` to [0,0] instead of defaulting to any provided value of `origin`.  In cases where `origin` is defined but `align` is not, element alignment will be broken.  Simplest fix for existing code is to add an `fa-align` attribute that matches `fa-origin` on any element where `fa-origin` is defined and `fa-align` is not.
  * Vanilla Famo.us Surfaces' `eventHandler` member has been renamed to `_eventOutput`.
  * See the [Famo.us CHANGELOG](https://github.com/Famous/famous/blob/v0.3.0/CHANGELOG.md) for more details.


<a name="0.4.0"></a>
# 0.4.0 (2014-09-18)


## Bug Fixes

- deep-watch fa-options to support inline options declarations without digest errors
 ([d6067018](https://github.com/Famous/famous-angular/commit/d6067018b7721899adf121247fbd2e4d333a57f0))
- remove unnecessary exception when fa-container-surface's children are removed
 ([422576a5](https://github.com/Famous/famous-angular/commit/422576a573d5bd42ddb4d9a23f49bdff377e7006))
- invoke isolate.hide() when elements are destroyed (fixes, e.g. clean-up when transitioning states with ui-router)
 ([269c6d64](https://github.com/Famous/famous-angular/commit/269c6d646f008ada50c6acead77da7f9cd1ae153))
- minification process
 ([1a88a6b0](https://github.com/Famous/famous-angular/commit/1a88a6b0af5200699d2f9ed06f76fd60975b62cd))
- Updated canvas and video surfaces to support new  methods
 ([b7c81aae](https://github.com/Famous/famous-angular/commit/b7c81aae64ce5a640ecfac33dc16f57a3759cc67))


## Features

- support removing children from fa-header-footer-layout
 ([01fefee2](https://github.com/Famous/famous-angular/commit/01fefee23f7eb9e55cda72405b040e27aeaa84ec))
- add fa-option directive
 ([221cf4e3](https://github.com/Famous/famous-angular/commit/221cf4e34bdc92a9efc8f11a78d6c3fbb5545185),
 [#193](https://github.com/Famous/famous-angular/issues/193))
- support piping to/from Modifiers (e.g. Draggable) with fa-pipe-to and fa-pipe-from
 ([070bf026](https://github.com/Famous/famous-angular/commit/070bf026644f1e49ce259144f1851bac606dee0d))
- implement fa-draggable
 ([a11c12dc](https://github.com/Famous/famous-angular/commit/a11c12dc927225ca0b1a4b1b0b4187760c08fe5a))
- add observe on faSize of faSurface
 ([b621ff53](https://github.com/Famous/famous-angular/commit/b621ff5398aa606ef52d3126b76615356fa5febd))


## Documentation

- add live examples for surface, tap, touchend, touchmove, touchstart
 ([d27595eb](https://github.com/Famous/famous-angular/commit/d27595ebe3adbc2d8b574a3861824ed8df7167c0))
- modified scrollview live examples, add sequential + surface live examples
 ([66b8d3e3](https://github.com/Famous/famous-angular/commit/66b8d3e34c1c1ece1b6bf98df6213adb381af5eb))
- add live examples for pipefrom, rendernode, scrollview
 ([8bb10f87](https://github.com/Famous/famous-angular/commit/8bb10f8746672b7b8c29189b7a2dcfeeff393796))
- add modifier live examples
 ([21533a5c](https://github.com/Famous/famous-angular/commit/21533a5cca45612f93f175c872c9838353acde4a))
- add live examples for app flipper grid header image index modifier
 ([5783027a](https://github.com/Famous/famous-angular/commit/5783027af3ad457626917e542d7e90c8a34cab7e))
- fix scope => $scope typos in famousAnimate.js
 ([bb291703](https://github.com/Famous/famous-angular/commit/bb29170313ead2da18ed17e08346490b7521cd07))
- correct the documentation for sizing elements in a fa-header-footer-layout
 ([7d0becbe](https://github.com/Famous/famous-angular/commit/7d0becbeb5b1223bf2a1d17a6ddbfeefd20dc8d6),
 [#196](https://github.com/Famous/famous-angular/issues/196))
- clarify global installation of bower in readme
 ([d40a893b](https://github.com/Famous/famous-angular/commit/d40a893b342e07160264cd3d4c5dc29c77ab4669))


<a name="0.3.0"></a>
# 0.3.0 (2014-08-15)


## Bug Fixes

- expose .util on window for non-DI use
 ([3820b783](https://github.com/Famous/famous-angular/commit/3820b783ebabbfc50da1aa63ac1ec00bf0b81304))
- throw exception if fa-elements are added to fa-surface
 ([60c8fe05](https://github.com/Famous/famous-angular/commit/60c8fe05539c51e7d004c76404e473530ad42a82))
- make famous#getIsolate correctly manage cases where scope is null
 ([175a775a](https://github.com/Famous/famous-angular/commit/175a775a04e2bc9245ae1e8c14c7d6a2e940dedf))
- support proper translate-z (and general 3D) behavior in Chrome
 ([1f82bd97](https://github.com/Famous/famous-angular/commit/1f82bd97d9fb03249023b6a90f8e3ce787bb38e5))
- add check for isFaElement for animate leave
 ([4d009c5d](https://github.com/Famous/famous-angular/commit/4d009c5d0f34ae6cdafe5e10cbc7b54e3decd526))


## Features

- implement fa-video-surface
 ([9a07f11d](https://github.com/Famous/famous-angular/commit/9a07f11d69016eb5b46983d7ba7da451c11d133a))
- ngClick decorated for fa-surface with touch
 ([3e50b871](https://github.com/Famous/famous-angular/commit/3e50b871a0f52ff90a9905917a027f5dafea95c8))
- add all mouseEvents
 ([cbd875bc](https://github.com/Famous/famous-angular/commit/cbd875bcfe5436fb2085e7265f4b65d147051330))
- decorate ng-click to register on renderNode in fa-directives
 ([968b09ac](https://github.com/Famous/famous-angular/commit/968b09ac3b85d6fe29003cdcb1844058d3419af1))
- update famous-angular.css to support changes in Famo.us core
 ([864bd8b8](https://github.com/Famous/famous-angular/commit/864bd8b8ca5866959e34af3f85cbc8a0108e96c2))
- removed the requirejs dependency
 ([c9d318f2](https://github.com/Famous/famous-angular/commit/c9d318f27bb5d5f0ecdadf0029955976b5d8eff0))
- add hide and show functionality on renderables
 ([767fea86](https://github.com/Famous/famous-angular/commit/767fea86397ffcc874de463bb8f630d091c27e08))


## Performance Improvements

- include the famous modules definition in $famous provider
 ([12668f2a](https://github.com/Famous/famous-angular/commit/12668f2a287439397f2a33907bdfb835a32ed2df))


## Documentation

- fixed docs code interpreted by jekyll & angular
 ([4993f169](https://github.com/Famous/famous-angular/commit/4993f169c1305afd922626c040fb64d16d8cbf82))
- live demos
 ([4b519241](https://github.com/Famous/famous-angular/commit/4b519241abb367dbb80f742833ea104abf87dfae),
 [#158](https://github.com/Famous/famous-angular/issues/158))
- update readme to describe how to get started without RequireJS
 ([aa553e4c](https://github.com/Famous/famous-angular/commit/aa553e4c9e7c0df146d98670457f62310b211fbe))


<a name="0.2.0"></a>
# 0.2.0 (2014-08-04)


## Bug Fixes

- faOptions in faGridLayout to work properly
 ([99086406](https://github.com/Famous/famous-angular/commit/990864068c1b8f7ee8ce052e9622033620ab3d9e))
- make addClass and removeClass return the correct element (enables ng-bind-html)
 ([4c62288a](https://github.com/Famous/famous-angular/commit/4c62288a11f081fc4e59f682e8371265b6c26875))
- make fa-grid-layout respect changes in ng-repeat index when updating
 ([0410113d](https://github.com/Famous/famous-angular/commit/0410113d07df68a147137efe8c89c7283bdc9bd7))
- fix errors caused by empty class names getting applied to Surfaces via
 ([4054c446](https://github.com/Famous/famous-angular/commit/4054c446c9d0995814805ce3406cc3ad1247051b))


## Features

- deprecate fa-animation
 ([e50d3536](https://github.com/Famous/famous-angular/commit/e50d35367b8f28181fe40ce47d312456f81bfada))
- run unit tests with PhantomJS
 ([481a483c](https://github.com/Famous/famous-angular/commit/481a483c3a3a0c4359790f21c0fd106e68ed12bd))
- add fa-mouseover directive
 ([b2d00d09](https://github.com/Famous/famous-angular/commit/b2d00d095fff2fb9f3d66cf406e28633cf7ef730))
- support removing children from fa-flipper
 ([f97e357d](https://github.com/Famous/famous-angular/commit/f97e357d5e231c01c8f45c4464a8b2477460fd01))
- implement physics support by accepting Particles as fa-modifier attributes
 ([32c8ebe9](https://github.com/Famous/famous-angular/commit/32c8ebe97011b5fc6adcb964cfc209924654a77f))
- add timeline service to replace fa-animation
 ([dd5494d1](https://github.com/Famous/famous-angular/commit/dd5494d15329413cd6033df8db43f9a37b597cd9))
- added faCanvasSurface
 ([82295bf1](https://github.com/Famous/famous-angular/commit/82295bf1448d35529befe9e22c1be0ee2201adad))
- support reflowing fa-grid-layout and fa-scrollview when fa-index changes
 ([3a7d6ee4](https://github.com/Famous/famous-angular/commit/3a7d6ee4e990e1a0e81832fdfb1f066b15821cc7))
- throw error objects
 ([c0d3130a](https://github.com/Famous/famous-angular/commit/c0d3130abf7eba74da176ffbbfb2db5656bc7fa8))


## Documentation

- update fa-modifier ng-doc with support for Particles
 ([32f296db](https://github.com/Famous/famous-angular/commit/32f296dbb972956d949b15e6293f1cce1acb2a1f))
- add link to starter kit zip in README
 ([cd75fd43](https://github.com/Famous/famous-angular/commit/cd75fd436715703769897c03bf303a746b94bd8a))
- add link to Pivotal roadmap in README
 ([b9599c1e](https://github.com/Famous/famous-angular/commit/b9599c1ea494f478920a86345a772dbccba24403))


<a name="0.1.0"></a>
# 0.1.0 (2014-07-13)


## Bug Fixes

- remove $timeout in faScrollView and use scope.$$postDigest instead
 ([137f260f](https://github.com/Famous/famous-angular/commit/137f260fe117ae7260d7bdad848241616fa92f29))
- fix some cases where 'digest is already in progress' is thrown for fa-modifiers
 ([f5d9fa01](https://github.com/Famous/famous-angular/commit/f5d9fa0127b4135efef0d2f622077dec1cfbdfa4))
- consolidating the sequencer into a single call, and modifying the destruction listener to run on scope.$id instead of scope
 ([aa65be37](https://github.com/Famous/famous-angular/commit/aa65be37fb4f4bdc3ab638ccb253056b5f806d27))
- track if the animation has been halted at the level of the element using the existing status data
 ([a265623b](https://github.com/Famous/famous-angular/commit/a265623b714e7a8cc1fba6231ad2108c1535cca4))
- defer unregistering sequenced items until their elements, not their scopes, are destroyed
 ([8517838c](https://github.com/Famous/famous-angular/commit/8517838c909a546a36045a589a634f887251953a))
- defer execution of modifier blanking to the resolution of the animation queue
 ([d5889834](https://github.com/Famous/famous-angular/commit/d5889834111e6ce55d710a8753baed1610dcf749))


## Features

- enable setting perspective on an fa-app (Famo.us Context)
 ([d99b39be](https://github.com/Famous/famous-angular/commit/d99b39beb8b35fd014cb61b8daa7fc53d04eac07))
-  fa-grid-layout options and update the GridLayout when changed
 ([445707fb](https://github.com/Famous/famous-angular/commit/445707fbb7d4158acae35153c643bb331bd13fd8))
- support $done callbacks for complex animations and conditional animation chains in the $animate event lifecycle
 ([82bdfe0d](https://github.com/Famous/famous-angular/commit/82bdfe0d9d2d876669c72f9fe8c86edb3ecd5f68))
- restore coverage for ng-class manipulation, with and without ngAnimate
 ([1cf7f151](https://github.com/Famous/famous-angular/commit/1cf7f1513b129a1fef97ffb8f5a3c76be42958b4))
- full and ngAnimate-compliant  event lifecycle support for Famo.us/Angular
 ([2f857868](https://github.com/Famous/famous-angular/commit/2f857868a0ffcc8b66f73bd3580faaade66592c9))


## Documentation

- fix naming typo in fa-flipper
 ([6345ca76](https://github.com/Famous/famous-angular/commit/6345ca763024c4ac98c9593e664cad0878c35e7c))
- fix broken links to famous docs
 ([56fad126](https://github.com/Famous/famous-angular/commit/56fad126fd0aa593fabee8b5bdaf6489788114a0))
- add basic documentation for fa-flexible-layout
 ([1a6794da](https://github.com/Famous/famous-angular/commit/1a6794dac1d4449880f7e7cb87773fb47f989006))
- clarifying and cleaning up famousAnimate.js documentation
 ([93eec030](https://github.com/Famous/famous-angular/commit/93eec030aa0aad5f172c8a00e809f85a800d35b8))
- cleaning up examples for $famousDecorator
 ([3c74717d](https://github.com/Famous/famous-angular/commit/3c74717dda361212f0215d46cc36bcc1190d7d75))
- added a step for test
 ([0bc9bdb0](https://github.com/Famous/famous-angular/commit/0bc9bdb09b1a92707272679c2249f49307a3f27b))
- corrected command to start tests
 ([4c92e30c](https://github.com/Famous/famous-angular/commit/4c92e30c8a09e44f05b33409f90b8e059d898aa0))
- ANIMATION_DURATION should be DURATION
 ([f70264d8](https://github.com/Famous/famous-angular/commit/f70264d87a668ae83ebc852059428230b1650996))


<a name="0.0.17"></a>
# 0.0.17 (2014-06-24)


## Bug Fixes

- fix edge cases where fa-surface#isClassable hits an undefined reference
 ([d4b352d5](https://github.com/Famous/famous-angular/commit/d4b352d5babe82e825c26b3f96b2844897913c8e))
- make multiple ng-shows inside of an fa-surface behave as expected
 ([5478f03b](https://github.com/Famous/famous-angular/commit/5478f03b5b6179317b851917b3db9c42e2a99287))
- correctly remove ng-repeated fa-surfaces from fa-scroll-view and fa-sequential-layout
 ([55328faf](https://github.com/Famous/famous-angular/commit/55328faf40f327f5eb6801ae1dc9162aa33ecf66))


## Features

- implement fa-flexible-layout
 ([7b3ffd76](https://github.com/Famous/famous-angular/commit/7b3ffd76d3b575b9452a6fae6971c97c6c9dbd28))
- implement fa-properties on fa-image-surface, the same as on fa-surface
 ([cee67e0c](https://github.com/Famous/famous-angular/commit/cee67e0c9dbbd9ecd50d75510bf9692bdf446c15))
- implement fa-properties on fa-surface; make ad hoc property declaration more generic
 ([7c101d06](https://github.com/Famous/famous-angular/commit/7c101d0662dd9c43087c90bf2f685481e139c69e))
-  add margin and padding properties to fa-surface
 ([16842b23](https://github.com/Famous/famous-angular/commit/16842b2356302de8f82e149d6c8e5c547dfbe1d3))
- implement fa-container-surface
 ([94998b7c](https://github.com/Famous/famous-angular/commit/94998b7c94c475635c5227af2ca366f015e891d9))


## Documentation

- add CLA instructions to CONTRIBUTING.md
 ([2954e26c](https://github.com/Famous/famous-angular/commit/2954e26c8cf367ba986c0467412d389ec5863113))
- add animation directive - edit: surf, grid, app, mod, pipe n more
 ([bbb02889](https://github.com/Famous/famous-angular/commit/bbb02889bff9a5fd67985d9c6f75a6c32aa5ca99))
- fix fa-pipe - add imagesurf, header, seq, flipper
 ([70283d0c](https://github.com/Famous/famous-angular/commit/70283d0cc3f2993ae4c6fe16064e745f4e3d4bd4))
- edit animation, modifier, tap -  add imagesurface
 ([7654d276](https://github.com/Famous/famous-angular/commit/7654d276b32b746ba3cbd09458eaa63424078bb3))
- edit scrollview touchend move start view
 ([610191b5](https://github.com/Famous/famous-angular/commit/610191b5444152e78aa129ea0c12d9ae5aea7629))
- edit app, click, index, rendernode
 ([f605521a](https://github.com/Famous/famous-angular/commit/f605521ac16a02fad6dcc89f67c4748cc52b7840))
- edit faSurface
 ([540b39b0](https://github.com/Famous/famous-angular/commit/540b39b03e295b3fd96fb3307816fc677360f2d1))
- edit fa-modifier
 ([4ceb4464](https://github.com/Famous/famous-angular/commit/4ceb44641ee7f97e2d5b936cd19ca21395b6d6c2))
- edit faAnimation + faScrollView
 ([65a31257](https://github.com/Famous/famous-angular/commit/65a31257a42b5535f971c40b719ba28288c5307e))
- add click, tap, index
 ([45c0d072](https://github.com/Famous/famous-angular/commit/45c0d072213169725de3db89600948079faec449))
- add fa-app
 ([2e21d736](https://github.com/Famous/famous-angular/commit/2e21d736f83f3a8232b8598fb6ba245dd8eafb5c))
- add rendernode
 ([f651daa6](https://github.com/Famous/famous-angular/commit/f651daa6c8c3d27833ec425508be349ac76a7735))
- add fa-transform + fa-transform-order
 ([66d2923d](https://github.com/Famous/famous-angular/commit/66d2923d7bf86b6eaa60b67a84b6b239d2632d5c))
- add touchstart touchmove touchend
 ([448efdcd](https://github.com/Famous/famous-angular/commit/448efdcd3dfe901e2fedc4f7d76eda73f6d61623))
- add fa-pipe-from examples
 ([b3a1f36c](https://github.com/Famous/famous-angular/commit/b3a1f36c14ac6137e428e882c76d7b7ae987f08f))


<a name="0.0.16"></a>
# 0.0.16 (2014-06-07)


## Bug Fixes

- fix bugs in fa-touchmove, fa-touchstart, fa-touchend
 ([5babd640](https://github.com/Famous/famous-angular/commit/5babd6403cde559cae85736e7196bbfb95521029))


## Features

- implement fa-header-footer-layout
 ([6b6338f7](https://github.com/Famous/famous-angular/commit/6b6338f76ebcacd000fb0300f85c281da7efe119))
- implement fa-sequential-layout directive
 ([23429a66](https://github.com/Famous/famous-angular/commit/23429a6692bc2c9f56e3f66cee28346c6ab7a843))


<a name="0.0.15"></a>
# 0.0.15 (2014-06-04)


## Bug Fixes

- handle multiple classes in fa-surface, both in class attribute and in ng-class
 ([e48c187a](https://github.com/Famous/famous-angular/commit/e48c187abfba93732f907fe83b1eb70979758617))
- allow $famous.find to return multiple elements
 ([1a880727](https://github.com/Famous/famous-angular/commit/1a880727e0e4711a1ba48cd54b83b68d5734c0f4),
 [#80](https://github.com/Famous/famous-angular/issues/80))


## Features

- implement faFlipper directive
 ([64c98b65](https://github.com/Famous/famous-angular/commit/64c98b655e790ce48b96531585ab4eb84eeba673))


## Documentation

- add scrollview examples + add headings modifier surface
 ([4ea11ad7](https://github.com/Famous/famous-angular/commit/4ea11ad73e6ca20ca4f3080013811113f99c2627))
- modifier surface scrollview progress examples
 ([e5746674](https://github.com/Famous/famous-angular/commit/e5746674daf5920e15c7a95d9a1bb2caee75b495))


<a name="0.0.14"></a>
# 0.0.14 (2014-05-31)


## Bug Fixes

- fix 'undefined is not a function' error from angular-animate
 ([022f8a75](https://github.com/Famous/famous-angular/commit/022f8a7528c60ec9cdbe7219bb7be2e3322a1e29))


<a name="0.0.13"></a>
# 0.0.13 (2014-05-30)


## Bug Fixes

- reverting invocation order of faPipeFrom to its previous state
 ([9485fdb3](https://github.com/Famous/famous-angular/commit/9485fdb3c1084db1038cae9641c5fbdeeefddf51))
- modified execution order for faPipeFrom was correct
 ([3862a8a7](https://github.com/Famous/famous-angular/commit/3862a8a7687812575f56cbc5c287ac6bf45fced9))
- fixing invocation order of unpiping in faPipeFrom
 ([8dc41641](https://github.com/Famous/famous-angular/commit/8dc41641ece5291fc80cb4cca5ced53340a83e1a))
- modify fa-pipe-from and fa-pipe-to to unbind their event listeners when their scopes are destroyed
 ([405e0d61](https://github.com/Famous/famous-angular/commit/405e0d616c73023030dcbef135b52ad841417a2c))
- ensure that fa-modifier $observe callbacks will always fire at least once.
 ([c248ebd9](https://github.com/Famous/famous-angular/commit/c248ebd95055cfe300ffbf22e4bd10de8db67763))
- reverting invocation order of faPipeFrom to its previous state
 ([ed1dcfb3](https://github.com/Famous/famous-angular/commit/ed1dcfb364813d1e345e3eb89c2cf9f9775c9a48))
- modified execution order for faPipeFrom was correct
 ([291b7887](https://github.com/Famous/famous-angular/commit/291b7887bdbdf952f4d7aa7d8ff9a1844e7050d6))
- fix fa-animation behavior when two animates are assigned to one field with non-overlapping domains
 ([ab745093](https://github.com/Famous/famous-angular/commit/ab74509370162035ec2ff8ac136fbabf63bd04b5))
- fixing invocation order of unpiping in faPipeFrom
 ([8855f4fe](https://github.com/Famous/famous-angular/commit/8855f4feefeeb0e1606433ec83257b9813810a2b))
- make fa-animation work correctly without jquery
 ([e844971d](https://github.com/Famous/famous-angular/commit/e844971dbb526fe97684d82261a6a3c7b6a069ac))
- added changelog.js & validateCommitMsg.js to bower ignore list
 ([4c97c1b8](https://github.com/Famous/famous-angular/commit/4c97c1b8155161aad72e99188d902b6b83c53366))
- modify fa-pipe-from and fa-pipe-to to unbind their event listeners when their scopes are destroyed
 ([4957f7f4](https://github.com/Famous/famous-angular/commit/4957f7f485670ee4a86fab7ee57fa971ad8a2e54))
- make function-passing to fa-transform fields more reasonable
 ([ef7ad8e3](https://github.com/Famous/famous-angular/commit/ef7ad8e345f5369409297a2832e4ba2d2ebc6651))


## Features

- adds support for ng-class on all surfaces :smile:
 ([c869fb1e](https://github.com/Famous/famous-angular/commit/c869fb1e6214b056487d1622e4bc82bbceeff887))
- Added the changelog and release gulp tasks
 ([a0406e1a](https://github.com/Famous/famous-angular/commit/a0406e1a62cbbefe3bedc8a8b01af7e27385f824),
 [#62](https://github.com/Famous/famous-angular/issues/62))
- Added validation commit msg file
 ([a3b57051](https://github.com/Famous/famous-angular/commit/a3b570516e0938f961c887600dd59e582a12c2de))


## Documentation

- clearly stating what fa-pipe-to and fa-pipe-from are supposed to be doing
 ([568d6d85](https://github.com/Famous/famous-angular/commit/568d6d85908f0acd4ffeb74c547c658b623ec4de))
- clearly stating what fa-pipe-to and fa-pipe-from are supposed to be doing
 ([8a9ba9ab](https://github.com/Famous/famous-angular/commit/8a9ba9ab5245edcd8c1e847c46a4387789a56e0e))
- added a link to the starter app
 ([5e36d45d](https://github.com/Famous/famous-angular/commit/5e36d45d60a353bc45e2c3ab5ae35239bc4a84f9))
- update contact info and change sample commit messages to imperative tense
 ([843c9e82](https://github.com/Famous/famous-angular/commit/843c9e8246deb297c1ce4b0cf8460a340fa609a9))
- updated the list of accepted types in the commit messages
 ([334bc7a6](https://github.com/Famous/famous-angular/commit/334bc7a671985edee07f39a5d1e68e6cbe113a30))
- updated the contribute section to include the commits validation
 ([442cb0c9](https://github.com/Famous/famous-angular/commit/442cb0c9ca4c7ebdd05b80b950cb677b1f8428bc))

