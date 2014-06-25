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

