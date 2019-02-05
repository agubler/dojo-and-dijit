import renderer from '@dojo/framework/widget-core/vdom';
import DijitWrapper from '@dojo/interop/dijit/DijitWrapper';
import * as _Button from 'dijit/form/Button';
import { watch } from '@dojo/framework/widget-core/decorators/watch';
import WidgetBase from '@dojo/framework/widget-core/WidgetBase';
import { v, w } from '@dojo/framework/widget-core/d';

const Button = DijitWrapper(_Button, 'button');

class App extends WidgetBase {
	@watch()
	private _counter = 0;

	private _decrease() {
		this._counter--;
		return true;
	}

	private _increase() {
		this._counter++;
		return true;
	}

	render() {
		return v('div', [
			v('div', [ w(Button, { label: 'decrease', onClick: this._decrease }) ]),
			v('span', [ `${this._counter}` ]),
			v('div', [ w(Button, { label: 'increase', onClick: this._increase })])
		])
	}
}


const r = renderer(() => w(App, {}));
r.mount();
