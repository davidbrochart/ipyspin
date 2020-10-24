#!/usr/bin/env python
# coding: utf-8

# Copyright (c) David Brochart.
# Distributed under the terms of the Modified BSD License.

"""
TODO: Add module docstring
"""

from ipywidgets import DOMWidget
from traitlets import Unicode, Int, Float, Bool, Dict, observe
from ._frontend import module_name, module_version


class Spinner(DOMWidget):
    """TODO: Add docstring here
    """
    _model_name = Unicode('SpinnerModel').tag(sync=True)
    _model_module = Unicode(module_name).tag(sync=True)
    _model_module_version = Unicode(module_version).tag(sync=True)
    _view_name = Unicode('SpinnerView').tag(sync=True)
    _view_module = Unicode(module_name).tag(sync=True)
    _view_module_version = Unicode(module_version).tag(sync=True)

    lines = Int(13).tag(sync=True)  # The number of lines to draw
    length = Float(38).tag(sync=True)  # The length of each line
    width = Float(17).tag(sync=True)  # The line thickness
    radius = Float(45).tag(sync=True)  # The radius of the inner circle
    scale = Float(1).tag(sync=True)  # Scales overall size of the spinner
    corners = Float(1).tag(sync=True)  # Corner roundness (0..1)
    speed = Float(1).tag(sync=True)  # Rounds per second
    rotate = Float(0).tag(sync=True)  # The rotation offset
    animation = Unicode('spinner-line-fade-quick').tag(sync=True)  # The CSS animation name for the lines
    direction = Int(1).tag(sync=True)  # 1: clockwise, -1: counterclockwise
    color = Unicode('#000000').tag(sync=True)  # CSS color or array of colors
    fade_color = Unicode('transparent').tag(sync=True)  # CSS color or array of colors
    top = Unicode('50%').tag(sync=True)  # Top position relative to parent
    left = Unicode('50%').tag(sync=True)  # Left position relative to parent
    shadow = Unicode('0 0 1px transparent').tag(sync=True)  # Box-shadow for the lines
    z_index = Float(2000000000).tag(sync=True)  # The z-index (defaults to 2e9)
    class_name = Unicode('ipyspinner').tag(sync=True)  # The CSS class to assign to the spinner
    position = Unicode('absolute').tag(sync=True)  # Element positioning

    window_url = Unicode(read_only=True).tag(sync=True)

    _is_stopped = Bool(False).tag(sync=True)

    def __init__(self, *args, **kwargs):
        super(Spinner, self).__init__(*args, **kwargs)

    def stop(self):
        self._is_stopped = True

    def spin(self):
        self._is_stopped = False
