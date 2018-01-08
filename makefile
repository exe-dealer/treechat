PUB_SERVER := root@192.168.55.122
PUB_DIR := /var/www/treechat

pub:
	rsync -av \
		--checksum \
		--delete \
		--exclude ".*/" \
		--exclude node_modules \
		./ $(PUB_SERVER):$(PUB_DIR)
	ssh $(PUB_SERVER) " \
		cd $(PUB_DIR) \
		&& docker-compose up -d --build --force-recreate"	