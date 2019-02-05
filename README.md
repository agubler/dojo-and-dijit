# Dojo and Dijit Example

dijit widgets can be included in modern Dojo applications using the `@dojo/interop/DijitWrapper`. To run the example run `npm run dev` and go to `http://localhost:9999`.

### Install Dependencies

Ensure that `dojo`, `dijit` and `dojo-typings` are installed from npm.

To expose the typings, add `"./node_modules/dojo-typings/dijit/1.11/modules.d.ts"` to the `include` option in the `tsconfig.json`.

### Create a dojo loader configuration

Firstly a dojo loader configuration is required to enable the application to load the dojo/dijit and other external dependencies. This is called `loaderConfig.js`.

```js
dojoConfig = {
	baseUrl: "externals/",
	packages: [
		{ name: 'dojo', location: 'dojo' },
		{ name: 'dijit', location: 'dijit' }
	],
	has: {
		highcontrast: 0
	},
	async: true
};
```

The baseUrl is set to `externals/` as this is location that the build will output the deps.

### Configure the dependencies required

Once the loader configuration is done, we need to configure the build process to know what output in the build and what to inject into the page. This configuration is done in the `.dojorc` and is explained in detail [here](https://github.com/dojo/cli-build-app#externals-object):

```json
{
	"build-app": {
			"externals": {
				"dependencies": [
					{ "from": "loaderConfig.js", "inject": true },
					{ "from": "node_modules/dojo", "to": "dojo", "name": "dojo", "inject": "dojo.js", "type": "umd" },
					{ "from": "node_modules/dijit", "to": "dijit", "name": "dijit", "inject": "themes/claro/claro.css", "type": "umd" }
				]
		}
	}
}
```

This configuration tells the build to copy resources over to the externals output directory, in this case the `loaderConfig.js` and both the `dojo` and `dijit` dependencies. The `inject` configuration tells the build process to include the specified resources to the application's `index.html`.

### Apply the claro theme

Add the `claro` class to the applications `index.html`

### Use the DijitWrapper with dijit widgets

In the application import a dijit widget, wrap in the `DijitWrapper` and then use as a Dojo widget.

```ts
import WidgetBase from '@dojo/framework/widget-core/WidgetBase';
import * as _Button from 'dijit/form/Button';
import DijitWrapper from '@dojo/interop/dijit/DijitWrapper';

const Button = DijitWrapper(_Button, 'button');

class MyWidget extends WidgetBase {
	render() {
		return w(Button, { label: 'my-button-label' });
	}
}
```
