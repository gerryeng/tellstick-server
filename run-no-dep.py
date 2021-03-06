#!/usr/bin/env python
# -*- coding: utf-8 -*-

import daemon
import getopt
import os
import sys
from pwd import getpwnam
from grp import getgrnam

plugins = {
	'telldus': ['DeviceManager', 'DeviceApiManager'],
	'telldus.web': ['React'],
	'tellduslive.web': ['WebRequestHandler'],
	#PLUGINS#
}
startup = {
	'events.base': ['EventManager'],
	'group': ['Group'],
	'led': ['Led'],
	'log': ['Logger'],
	'rf433': ['RF433'],
	'scheduler.base': ['Scheduler'],
	'tellduslive.base': ['TelldusLive'],
	#STARTUP#
}

def loadClasses(cls):
	classes = []
	for module in cls:
		m = __import__(module, globals(), locals(), cls[module])
		for c in cls[module]:
			classes.append(getattr(m, c))
	return classes

def main():
	from base import Application

	p = loadClasses(plugins)
	s = loadClasses(startup)

	app = Application(run=False)
	app.run(startup=s)

class PIDFile(object):
	def __init__(self):
		self.f = open('/var/run/tellstick-server.pid', 'w')

	def fileno(self):
		return self.f.fileno()

	def __enter__(self):
		self.f.write(str(os.getpid()))
		self.f.flush()

	def __exit__(self, exc_type, exc_val, exc_tb):
		self.f.close()

if __name__ == "__main__":
	try:
		opts, args = getopt.getopt(sys.argv[1:], "n", ["nodaemon"])
	except getopt.GetoptError as exc:
		print(exc)
		sys.exit(2)

	daemonize = True
	for opt, arg in opts:
		if opt == '--nodaemon':
			daemonize = False

	pidfile = PIDFile()
	params = {
		'detach_process': True,
		'pidfile': pidfile,
		'uid': getpwnam('nobody').pw_uid,
		'gid': getgrnam('nogroup').gr_gid,
		'files_preserve': [pidfile]
	}
	if not daemonize:
		params['detach_process'] = False
		params['stdout'] = sys.stdout
		params['stderr'] = sys.stderr

	with daemon.DaemonContext(**params):
		main()
