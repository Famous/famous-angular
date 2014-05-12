Generating Doc Pages
-----------------
Go the root and type `gulp docs`.

Previewing Doc Pages
-----------------

If you want to test the static website, follow these steps:

* To test documentation, follow these steps:
  1. Install ruby & jekyll **if** you don't have it: http://jekyllrb.com/docs/installation/
    - `gem install pygments.rb --version "=0.5.0"`
    - `gem install wdm`
    - `gem install jekyll --version "=1.4.2"`
  2. Go back to project root and build the docs & the website in one task
    - `gulp build-site`
  3. Launch the local webserver.
    - `gulp site`
  4. Open http://localhost:4000/docs/api/ and see your changes! Re-run `gulp build-site` again whenever you change something.

**Templates in `templates` folder**

- `templates/pages-data.template.html` => `_layout/docs_api.html`
- `templates/index.template.html` => The 'index' page for a doc version
- `templates/lib/yaml.template.html` => the common yaml config items that every doc page includes
- `templates/api/componentGroup.template.html` => the template for every 'componentGroup' - eg an angular module
- `templates/api/api.template.html` - the base that every doc-item extends from
- `templates/api/{something}.template.html` - the template for {something} - eg directive.template.html for directives

Not everything in all the pages is used - a lot of it is from Angular templates.  Eg things like 'doc.deprecated' aren't used currently.

**New Versions**

Every version uses its own include for left menu, which is generated based on the docs available.

The first time a version is generated, if there is no _includes/api_menu_{{versionName}}.html, it will generate a generic one for you.

Then you can do what you want to edit that.
