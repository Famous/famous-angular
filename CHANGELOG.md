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

