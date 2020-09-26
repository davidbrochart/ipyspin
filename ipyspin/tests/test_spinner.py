#!/usr/bin/env python
# coding: utf-8

# Copyright (c) David Brochart.
# Distributed under the terms of the Modified BSD License.

import pytest

from ..spin import Spinner


def test_spinner_creation_blank():
    s = Spinner()
    assert s.lines == 13
