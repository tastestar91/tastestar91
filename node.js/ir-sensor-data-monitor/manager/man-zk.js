'use strict';

const debug = require('debug')('ir-sensor-data-monitor:manager:man-zk');
const zookeeper = require('node-zookeeper-client');

const moduleManager = require('./module-manager');

const zkServerMap = new Map();

const zkConnectionTimeout = 5000;

const defaultZkOptions = {
	sessionTimeout: 10000,
	spinDelay: 500,
	retries: 0
};

moduleManager.registerModuleReleaseHandler(release);


// Create a ZooKeeper client
function createClient(quorum, /* [optional] */ options) {
	return new Promise((resolve, reject) => {
		let rejectTimeoutHandle;

		try {
			// If there exists a valid client, return the client
			let client = zkServerMap.get(quorum);
			if (client && client.getState().name === 'SYNC_CONNECTED') {
				resolve(client);
				return;
			}

			// If there exists no valid client, create a new client
			rejectTimeoutHandle = moduleManager.enableRejectTimeout(
				reject, zkConnectionTimeout, new Error('Connection timeout'));

			if (client) {
				zkServerMap.set(quorum, null);
				client.close();
			}

			if (options) {
				client = zookeeper.createClient(quorum, options);
			} else {
				client = zookeeper.createClient(quorum, defaultZkOptions);
			}

			client.on('authenticationFailed', () => {
				clearTimeout(rejectTimeoutHandle);
				debug('ERROR: [ZK/AUTH]: %s (%s)', 
					quorum, client.getState().name);
				reject(quorum);
				client.close();
			});

			client.on('expired', () => {
				zkServerMap.set(quorum, null);
				debug('ERROR: [ZK/SESSION_EXPIRED]: %s (%s)',
					quorum, client.getState().name);
				client.close();
			});

			client.on('disconnected', () => {
				zkServerMap.set(quorum, null);
				debug('INFO: [ZK/DISCONNECTED]: %s (%s)',
					quorum, client.getState().name);
				client.close();
			});

			client.once('connected', () => {
				clearTimeout(rejectTimeoutHandle);

				let zc = zkServerMap.get(quorum);
				if (zc && zc.getState().name === 'SYNC_CONNECTED') {
					resolve(zc);
					client.close();
				} else {
					zkServerMap.set(quorum, client);
					resolve(client);
					debug('Connected to ZooKeeper: %o (%o)',
						quorum, client.getState().name);
					if (zc) zc.close();
				}
			});

			client.connect();
		} catch (err) {
			if (rejectTimeoutHandle) clearTimeout(rejectTimeoutHandle);
			debug('ERROR:', err);
			reject(err);
		}
	});
}


// Release all resources
function release() {
	for (let zookeeper of zkServerMap.values()) {
		if (zookeeper) {
			try {
				zookeeper.close();
			} catch (err) {
				debug('ERROR:', err);
			}
		}
	}
	zkServerMap.clear();
}


// Get a znode list under a specific path 
function getZnodeList(quorum, path) {
	return new Promise(async (resolve, reject) => {
		try {
			let client = await createClient(quorum);
			client.getChildren(path, (error, children, stat) => {
				try {
					if (error) {
						throw new Error(error);
					}

					if (!children || children.length === 0) {
						throw new Error('No znodes');
					}

					resolve(children);
				} catch (err) {
					debug('ERROR: [ZK/GET_CHILDREN]: %s: %s: %s', 
						quorum, path, err.message);
					reject(err);
				}
			});
		} catch (err) {
			debug('ERROR: [ZK/GET_ZNODE_LIST]: %s: %s: %s', quorum, path, err);
			reject(err);
		}
	});
}


// Get data from a znode
function getZnodeData(quorum, znode) {
	return new Promise(async (resolve, reject) => {
		try {
			let client = await createClient(quorum);
			client.getData(znode, (error, data, stat) => {
				if (error) {
					debug('ERROR: [ZK/GET_DATA]: %s: %s: %s',
						quorum, znode, error);
					reject(error);
					return;
				}
				resolve(data.toString('utf8'));
			});
		} catch (err) {
			debug('ERROR: [ZK/GET_ZNODE_DATA]: %s: %s: %s',
				quorum, znode, err);
			reject(err);
		}
	});
}


// Set data to a znode
function setZnodeData(quorum, znode, data) {
	return new Promise(async (resolve, reject) => {
		try {
			let client = await createClient(quorum);
			client.exists(znode, (error, stat) => {
				try {
					if (error) {
						throw new Error(error);
					}

					if (stat) {
						client.setData(
							znode, Buffer.from(data), (error, stat) => {
							if (error) {
								debug('ERROR: [ZK/SET_DATA]: %s: %s: %s',
									quorum, znode, error);
								reject(error);
								return;
							}
							resolve(znode);
						});
					} else {
						client.mkdirp(
							znode, Buffer.from(data), (error, path) => {
							if (error) {
								debug('ERROR: [ZK/MKDIRP]: %s: %s: %s',
									quorum, znode, error);
								reject(error);
								return;
							}
							resolve(path);
						});
					}
				} catch (err) {
					debug('ERROR: [ZK/EXISTS]: %s: %s: %s',
						quorum, znode, err);
					reject(err);
				}
			});
		} catch (err) {
			debug('ERROR: [ZK/SET_ZNODE_DATA]: %s: %s: %s',
				quorum, znode, err);
			reject(err);
		}
	});
}


module.exports = {
	getZnodeList: getZnodeList,
	getZnodeData: getZnodeData,
	setZnodeData: setZnodeData
};
