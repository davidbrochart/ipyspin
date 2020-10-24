// Copyright (c) David Brochart
// Distributed under the terms of the Modified BSD License.

import {Spinner} from 'spin.js';

import {
  DOMWidgetModel,
  DOMWidgetView,
  ISerializers,
} from '@jupyter-widgets/base';

import { MODULE_NAME, MODULE_VERSION } from './version';

import '../css/widget.css';
import 'spin.js/spin.css';

export class SpinnerModel extends DOMWidgetModel {
  defaults() {
    return {
      ...super.defaults(),
      _model_name: SpinnerModel.model_name,
      _model_module: SpinnerModel.model_module,
      _model_module_version: SpinnerModel.model_module_version,
      _view_name: SpinnerModel.view_name,
      _view_module: SpinnerModel.view_module,
      _view_module_version: SpinnerModel.view_module_version,
      lines: 14, // The number of lines to draw
      length: 38, // The length of each line
      width: 17, // The line thickness
      radius: 45, // The radius of the inner circle
      scale: 1, // Scales overall size of the spinner
      corners: 1, // Corner roundness (0..1)
      speed: 1, // Rounds per second
      rotate: 0, // The rotation offset
      animation: 'spinner-line-fade-quick', // The CSS animation name for the lines
      direction: 1, // 1: clockwise, -1: counterclockwise
      color: '#000000', // CSS color or array of colors
      fade_color: 'transparent', // CSS color or array of colors
      top: '50%', // Top position relative to parent
      left: '50%', // Left position relative to parent
      shadow: '0 0 1px transparent', // Box-shadow for the lines
      z_index: 2000000000, // The z-index (defaults to 2e9)
      class_name: 'ipyspinner', // The CSS class to assign to the spinner
      position: 'absolute', // Element positioning
      _is_stopped: false
    };
  }

  static serializers: ISerializers = {
    ...DOMWidgetModel.serializers
  }

  initialize(attributes: any, options: any) {
    super.initialize(attributes, options);
    this.set('window_url', window.location.href);
    this.save_changes();
  }

  static model_name = 'SpinnerModel';
  static model_module = MODULE_NAME;
  static model_module_version = MODULE_VERSION;
  static view_name = 'SpinnerView';
  static view_module = MODULE_NAME;
  static view_module_version = MODULE_VERSION;
}

export class SpinnerView extends DOMWidgetView {
  render() {
    this.el.classList.add('custom-widget');

    this.opt_names = [
      'lines',
      'length',
      'width',
      'radius',
      'scale',
      'corners',
      'speed',
      'rotate',
      'animation',
      'direction',
      'color',
      'fade_color',
      'top',
      'left',
      'shadow',
      'z_index',
      'class_name',
      'position'
    ];
    this.opts = {};
    this.opt_changed();

    this.spinner = new Spinner(this.opts).spin(this.el);

    this.model.on_some_change(this.opt_names, this.opt_changed, this);
    this.model.on('change:_is_stopped', this.stop_changed, this);
  }

  opt_changed() {
    for (let opt of this.opt_names) {
      let opt_camel = opt;
      let i = opt.indexOf('_');
      if (i != -1) {
        opt_camel = opt.substring(0, i).concat(opt[i+1].toUpperCase(), opt.substring(i+2));
      }
      this.opts[opt_camel] = this.model.get(opt);
    }
    if (this.spinner) {
      this.spinner.opts = this.opts;
      this.spinner.spin(this.el);
    }
  }

  stop_changed() {
    let is_stopped = this.model.get('_is_stopped');
    if (is_stopped) {
      this.spinner.stop();
    }
    else {
      this.spinner.spin(this.el);
    }
  }

  opt_names: string[];
  opts: { [id: string] : any; };
  spinner: any;
}
