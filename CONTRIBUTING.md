## Dev Environment 

Before you start, tools you will need:
* Download and install [git](http://git-scm.com/downloads)
* Download and install [nodeJS](http://nodejs.org/download/)

####First time:
`git clone https://github.com/thomasstreet/famous-angular.git`

`npm install`

`npm install -g gulp`


####Thereafter:
Clone the submodules and install the frontend dependencies inside of your example folder.

`git submodule update --init --recursive`

`cd famous-angular-examples`

`bower install`

`cd ..`

`npm start`

Npm start will use gulp to concatenate files into famous-angular.js, which is built into the app folder. It will also watch for changes inside app and livereload as necessary.

Then open http://localhost:4000.

####To develop the library using the famous-angular-examples submodule

`gulp dev`

####To build the docs

`gulp docs`

####To run tests
Ensure that you have the [karma](http://karma-runner.github.io/0.12/intro/installation.html) command line interface installed.
'npm install -g karma-cli'

`karma start'


## Contribution Guidelines

When you commit your messages, follow this convention :
`<type>: <subject> <BLANK LINE> <optional message>`

For example:
```no-highlight
feat: add validation commit msg file

Optionally, you can validate commit messages using the following commands.  These will add a git hook that will check if you follow the convention:
* `cd <famous-angular-repo>`
* `ln -s ../../validateCommitMsg.js .git/hooks/commit-msg`

Installation:
 * cd <famous-angular-repo>
 * ln -s ../../validate-commit-msg.js .git/hooks/commit-msg
```

The following types are accepted in the commit messages:
- feat
- fix
- docs
- style
- refactor
- perf
- test
- chore
- revert

But only feat/fix/docs/perf will be in the changelog.

If you do a breaking change, add an explanation preceded by `BREAKING CHANGE: `. For example:
```no-highlight
fix: remove deprecated promise unwrapping

BREAKING CHANGE: promise unwrapping has been removed.
It can no longer be turned on.
```

If you want to reference an issue, you can add a new line with either `Closes` or `Fixes` followed by the issue number. For example:
```no-highlight
feat: add changelog auto generation

Usage: gulp changelog

Fixes #62
```

You can fix / close multiple issue with one commit, just add a new line for each.

### CLA
Famo.us would like contributors to sign their CLA, a simple agreement clarifying copyright matters.  This will be available online as an easy, click-through form shortly.  In the meantime, please:
1. Go ahead an make a PR
2. Email fetterman@famo.us and ask for the CLA
3. Confirm with a comment in the PR that you've signed the CLA