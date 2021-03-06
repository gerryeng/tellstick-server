#!/usr/bin/env python
# -*- coding: utf-8 -*-

try:
	from setuptools import setup
except ImportError:
	from distutils.core import setup

setup(
	name='ProductionTest',
	version='0.1',
	packages=['productiontest'],
	package_dir = {'':'src'},
	entry_points={ \
		'telldus.startup': ['c = productiontest:Server [cREQ]']
	},
	extras_require = dict(cREQ = 'Base>=0.1\nBoard>=0.1\nTelldusLive>=0.1\nRF433>=0.1\nZWave>=0.1'),
)
